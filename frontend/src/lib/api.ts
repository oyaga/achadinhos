// Lightweight, typed wrapper around fetch for the Achadinhos backend.
//
// - Reads the base URL from NEXT_PUBLIC_API_URL.
// - Auto-injects Authorization: Bearer <token> when available.
// - On 401, transparently tries POST /auth/refresh once. If that fails,
//   wipes the auth storage and emits a window event ("auth:logout") so
//   the React tree can reset.
// - localStorage is intentionally used (PWA must work offline). XSS risk
//   is acknowledged for this phase.

const STORAGE_ACCESS = "achadinhos.auth.access";
const STORAGE_REFRESH = "achadinhos.auth.refresh";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";

// ============== Types ==============

// Only síndicos (public sign-up) and admins (internal) have login accounts.
export type UserRole = "sindico" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string | null;
  avatar_url?: string | null;
  condo_name?: string | null;
  condo_role?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ApiErrorPayload {
  status: number;
  code?: string;
  message: string;
  details?: unknown;
}

export class ApiError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(payload: ApiErrorPayload) {
    super(payload.message);
    this.name = "ApiError";
    this.status = payload.status;
    this.code = payload.code;
    this.details = payload.details;
  }
}

// ============== Token storage helpers ==============

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(STORAGE_ACCESS);
  } catch {
    return null;
  }
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(STORAGE_REFRESH);
  } catch {
    return null;
  }
}

export function setTokens(access: string, refresh: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_ACCESS, access);
    window.localStorage.setItem(STORAGE_REFRESH, refresh);
  } catch {
    // ignore
  }
}

export function clearTokens(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_ACCESS);
    window.localStorage.removeItem(STORAGE_REFRESH);
  } catch {
    // ignore
  }
}

function emitLogout(): void {
  if (!isBrowser()) return;
  try {
    window.dispatchEvent(new Event("auth:logout"));
  } catch {
    // ignore
  }
}

// ============== Core request ==============

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  // If true, do not attempt to attach Authorization header even if a token exists.
  skipAuth?: boolean;
  // If true, do not attempt 401 -> refresh -> retry. Used internally by refresh itself.
  skipRefresh?: boolean;
  // Allow callers to opt out of JSON parsing (rare).
  parseAs?: "json" | "text" | "none";
  // Extra headers (Content-Type is auto-set when body is provided).
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

async function rawRequest<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    body,
    skipAuth = false,
    parseAs = "json",
    headers: extraHeaders,
    signal,
  } = options;

  const url = path.startsWith("http")
    ? path
    : `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (body !== undefined && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (!skipAuth) {
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const init: RequestInit = {
    method,
    headers,
    signal,
  };
  if (body !== undefined) {
    init.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (err) {
    throw new ApiError({
      status: 0,
      code: "network_error",
      message:
        err instanceof Error
          ? `Falha de conexão: ${err.message}`
          : "Falha de conexão com o servidor",
    });
  }

  if (res.status === 204) {
    return undefined as T;
  }

  if (!res.ok) {
    let payload: Partial<ApiErrorPayload> = {};
    try {
      const text = await res.text();
      if (text) {
        try {
          const parsed = JSON.parse(text) as Record<string, unknown>;
          payload = {
            code: typeof parsed.code === "string" ? parsed.code : undefined,
            message:
              typeof parsed.message === "string"
                ? parsed.message
                : typeof parsed.error === "string"
                  ? (parsed.error as string)
                  : undefined,
            details: parsed.details,
          };
        } catch {
          payload = { message: text };
        }
      }
    } catch {
      // ignore body read error
    }

    throw new ApiError({
      status: res.status,
      code: payload.code,
      message:
        payload.message ?? defaultErrorMessage(res.status),
      details: payload.details,
    });
  }

  if (parseAs === "none") return undefined as T;
  if (parseAs === "text") return (await res.text()) as unknown as T;
  // json
  const text = await res.text();
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
}

function defaultErrorMessage(status: number): string {
  if (status === 0) return "Sem conexão com o servidor";
  if (status === 400) return "Requisição inválida";
  if (status === 401) return "Sessão expirada. Entre novamente.";
  if (status === 403) return "Você não tem permissão para essa ação";
  if (status === 404) return "Não encontrado";
  if (status === 409) return "Conflito (recurso já existe)";
  if (status === 422) return "Dados inválidos";
  if (status >= 500) return "Erro no servidor. Tente novamente em alguns instantes.";
  return `Erro ${status}`;
}

// Single-flight refresh: if multiple requests get 401 at the same time, only
// one network refresh fires; the others await the same promise.
let inflightRefresh: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (inflightRefresh) return inflightRefresh;
  const refresh = getRefreshToken();
  if (!refresh) return null;

  inflightRefresh = (async () => {
    try {
      const data = await rawRequest<AuthResponse>("/auth/refresh", {
        method: "POST",
        body: { refresh_token: refresh },
        skipAuth: true,
        skipRefresh: true,
      });
      setTokens(data.access_token, data.refresh_token);
      return data.access_token;
    } catch {
      clearTokens();
      emitLogout();
      return null;
    } finally {
      inflightRefresh = null;
    }
  })();

  return inflightRefresh;
}

export async function request<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  try {
    return await rawRequest<T>(path, options);
  } catch (err) {
    if (
      err instanceof ApiError &&
      err.status === 401 &&
      !options.skipRefresh &&
      !options.skipAuth &&
      getRefreshToken()
    ) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return rawRequest<T>(path, { ...options, skipRefresh: true });
      }
    }
    throw err;
  }
}

// ============== Domain helpers ==============

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AddressPayload {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface RegisterSindicoPayload {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  address: AddressPayload;
  condo_name: string;
  condo_role: "morador" | "sindico" | "conselho";
}

export const auth = {
  async registerSindico(payload: RegisterSindicoPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/register/sindico", {
      method: "POST",
      body: payload,
      skipAuth: true,
    });
  },
  async login(payload: LoginPayload): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: payload,
      skipAuth: true,
    });
  },
  async refresh(refreshToken: string): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
      skipAuth: true,
      skipRefresh: true,
    });
  },
  // Best-effort logout. Backends differ; we just discard tokens locally.
  async logout(): Promise<void> {
    try {
      await request<void>("/auth/logout", {
        method: "POST",
        parseAs: "none",
      });
    } catch {
      // ignore — server may not have this endpoint or token may already be invalid
    }
  },
};

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export const me = {
  async get(): Promise<User> {
    return request<User>("/me");
  },
  async update(patch: Partial<User>): Promise<User> {
    return request<User>("/me", {
      method: "PATCH",
      body: patch,
    });
  },
  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    return request<void>("/me/password", {
      method: "PATCH",
      body: payload,
      parseAs: "none",
    });
  },
};

export interface ProductPhoto {
  id: string;
  product_id: string;
  url: string;
  position: number;
  created_at?: string;
}

export function getImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1";
  const host = base.replace(/\/api\/v1\/?.*$/, "");
  return `${host}${path}`;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ApiCategory {
  id: string;
  label: string;
  short: string;
  icon: string;
  badge?: string;
  desc?: string;
  count: number;
}

export interface ApiProvider {
  id: string;
  name: string;
  category_id: string;
  category?: ApiCategory;
  avatar: string;
  rating: number;
  reviews_count: number;
  badge?: string;
  verified: boolean;
  distance_label: string;
  price_label: string;
  response_time_label: string;
  description: string;
  services: string[];
  years_active: number;
  jobs_done: number;
  whatsapp: string;
  highlight: boolean;
  owner_user_id?: string;
  created_at?: string;
}

export interface ApiReview {
  id: string;
  provider_id: string;
  user_id: string;
  user?: { id: string; name: string; email: string };
  rating: number;
  text: string;
  helpful_count: number;
  tags: string[];
  verified: boolean;
  created_at: string;
}

export interface ApiProduct {
  id: string;
  seller_id: string;
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  rating: number;
  reviews_count: number;
  tag?: string;
  badge?: string;
  stock: string;
  whatsapp_override?: string;
  link_override?: string;
  manufacturer?: string;
  photos?: ProductPhoto[];
  seller?: {
    id: string;
    name: string;
    avatar?: string;
    description?: string;
    whatsapp?: string;
    link?: string;
    partner?: boolean;
  };
  created_at?: string;
}

export interface ApiFavorite {
  id: string;
  user_id: string;
  target_type: "provider" | "product";
  target_id: string;
  created_at: string;
}

// ============== Admin panel ==============

export interface AdminSeller {
  id: string;
  name: string;
  avatar?: string;
  description?: string;
  whatsapp: string;
  link?: string;
  partner: boolean;
  created_at?: string;
}

export interface AdminSellerPayload {
  name: string;
  description?: string;
  whatsapp: string;
  link?: string;
  partner?: boolean;
}

export interface AdminProviderPayload {
  name: string;
  category_id: string;
  description: string;
  services?: string[];
  whatsapp: string;
  years_active?: number;
  jobs_done?: number;
  price_label?: string;
  response_time_label?: string;
  distance_label?: string;
  coverage?: "bairro" | "cidade" | "regiao";
  radius_km?: number;
  verified?: boolean;
  highlight?: boolean;
  badge?: string;
}

export interface AdminProductPayload {
  name: string;
  category: string;
  price: number;
  old_price?: number | null;
  seller_id: string;
  tag?: string;
  badge?: string;
  stock?: string;
  link?: string;
  manufacturer?: string;
}

export const adminApi = {
  // ── Empresas (sellers) ──
  async listSellers(): Promise<AdminSeller[]> {
    const res = await request<{ data: AdminSeller[] }>("/admin/sellers");
    return res.data ?? [];
  },
  async createSeller(payload: AdminSellerPayload): Promise<AdminSeller> {
    return request<AdminSeller>("/admin/sellers", { method: "POST", body: payload });
  },
  async updateSeller(id: string, payload: Partial<AdminSellerPayload>): Promise<AdminSeller> {
    return request<AdminSeller>(`/admin/sellers/${id}`, { method: "PATCH", body: payload });
  },
  async deleteSeller(id: string): Promise<void> {
    return request<void>(`/admin/sellers/${id}`, { method: "DELETE", parseAs: "none" });
  },

  // ── Prestadores (providers) ──
  async listProviders(): Promise<ApiProvider[]> {
    const res = await request<{ data: ApiProvider[] }>("/admin/providers");
    return res.data ?? [];
  },
  async createProvider(payload: AdminProviderPayload): Promise<ApiProvider> {
    return request<ApiProvider>("/admin/providers", { method: "POST", body: payload });
  },
  async updateProvider(id: string, payload: Partial<AdminProviderPayload>): Promise<ApiProvider> {
    return request<ApiProvider>(`/admin/providers/${id}`, { method: "PATCH", body: payload });
  },
  async deleteProvider(id: string): Promise<void> {
    return request<void>(`/admin/providers/${id}`, { method: "DELETE", parseAs: "none" });
  },

  // ── Produtos ──
  async listProducts(): Promise<ApiProduct[]> {
    const res = await request<{ data: ApiProduct[] }>("/admin/products");
    return res.data ?? [];
  },
  async createProduct(payload: AdminProductPayload): Promise<ApiProduct> {
    return request<ApiProduct>("/admin/products", { method: "POST", body: payload });
  },
  async updateProduct(id: string, payload: Partial<AdminProductPayload>): Promise<ApiProduct> {
    return request<ApiProduct>(`/admin/products/${id}`, { method: "PATCH", body: payload });
  },
  async deleteProduct(id: string): Promise<void> {
    return request<void>(`/admin/products/${id}`, { method: "DELETE", parseAs: "none" });
  },
  async uploadProductPhoto(productId: string, file: File): Promise<ProductPhoto> {
    const token = getAccessToken();
    const formData = new FormData();
    formData.append("file", file);
    const url = `${BASE_URL}/admin/products/${productId}/photos`;
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(url, { method: "POST", headers, body: formData });
    if (!res.ok) {
      let msg = `Erro ${res.status}`;
      try { const j = (await res.json()) as { message?: string }; if (j.message) msg = j.message; } catch {}
      throw new ApiError({ status: res.status, message: msg });
    }
    return res.json() as Promise<ProductPhoto>;
  },
  async deleteProductPhoto(productId: string, photoId: string): Promise<void> {
    return request<void>(`/admin/products/${productId}/photos/${photoId}`, {
      method: "DELETE",
      parseAs: "none",
    });
  },
};

export const categoriesApi = {
  async list(): Promise<ApiCategory[]> {
    return request<ApiCategory[]>("/categories");
  },
};

export const providersApi = {
  async list(params?: {
    category?: string;
    highlight?: boolean;
    q?: string;
    sort?: string;
    limit?: number;
    offset?: number;
  }): Promise<PagedResponse<ApiProvider>> {
    const qs = new URLSearchParams();
    if (params?.category) qs.set("category", params.category);
    if (params?.highlight) qs.set("highlight", "true");
    if (params?.q) qs.set("q", params.q);
    if (params?.sort) qs.set("sort", params.sort);
    if (params?.limit != null) qs.set("limit", String(params.limit));
    if (params?.offset != null) qs.set("offset", String(params.offset));
    const query = qs.toString();
    return request<PagedResponse<ApiProvider>>(query ? `/providers?${query}` : "/providers");
  },
  async get(id: string): Promise<ApiProvider> {
    return request<ApiProvider>(`/providers/${id}`);
  },
  async listReviews(id: string): Promise<{ data: ApiReview[]; limit: number; offset: number }> {
    return request(`/providers/${id}/reviews`);
  },
  async createReview(id: string, payload: { rating: number; text?: string; tags?: string[] }): Promise<ApiReview> {
    return request<ApiReview>(`/providers/${id}/reviews`, { method: "POST", body: payload });
  },
};

export const productsApi = {
  async list(params?: {
    category?: string;
    q?: string;
    sort?: string;
    limit?: number;
    offset?: number;
  }): Promise<PagedResponse<ApiProduct>> {
    const qs = new URLSearchParams();
    if (params?.category && params.category !== "all") qs.set("category", params.category);
    if (params?.q) qs.set("q", params.q);
    if (params?.sort) qs.set("sort", params.sort);
    if (params?.limit != null) qs.set("limit", String(params.limit));
    if (params?.offset != null) qs.set("offset", String(params.offset));
    const query = qs.toString();
    return request<PagedResponse<ApiProduct>>(query ? `/products?${query}` : "/products");
  },
  async get(id: string): Promise<{ product: ApiProduct; related_products: ApiProduct[] }> {
    return request(`/products/${id}`);
  },
};

export const favoritesApi = {
  async list(type?: "provider" | "product"): Promise<ApiFavorite[]> {
    const path = type ? `/favorites?type=${type}` : "/favorites";
    return request<ApiFavorite[]>(path);
  },
  async add(targetType: "provider" | "product", targetId: string): Promise<ApiFavorite> {
    return request<ApiFavorite>("/favorites", {
      method: "POST",
      body: { target_type: targetType, target_id: targetId },
    });
  },
  async remove(targetType: "provider" | "product", targetId: string): Promise<void> {
    return request<void>("/favorites", {
      method: "DELETE",
      body: { target_type: targetType, target_id: targetId },
      parseAs: "none",
    });
  },
};
