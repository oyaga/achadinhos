"use client";

import { useEffect, useState } from "react";
import {
  sellersApi,
  type AdminSeller,
  type ApiProduct,
  type SellerReview,
} from "@/lib/api";
import type { ContactInput } from "@/hooks/use-whatsapp-history";

// Dados e ações do perfil público de uma empresa. Compartilhado entre o
// overlay mobile (SellerDetail) e a página desktop (/empresa/[id]) para a
// lógica de fetch, avaliações e contato viver num lugar só.
export function useSellerData(
  seller: AdminSeller,
  onRecordContact: (input: ContactInput) => void,
) {
  const [full, setFull] = useState<AdminSeller>(seller);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [portfolio, setPortfolio] = useState<string[]>(
    (seller.portfolio_photos ?? []).map((p) => p.url),
  );
  const [reviews, setReviews] = useState<SellerReview[]>([]);
  const [myRating, setMyRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [sending, setSending] = useState(false);
  const [reviewMsg, setReviewMsg] = useState<string | null>(null);

  // The list/slide payloads omit category and portfolio — fetch the full record.
  useEffect(() => {
    void sellersApi
      .get(seller.id)
      .then((res) => {
        setFull(res.seller);
        setProducts(res.products ?? []);
        setPortfolio((res.seller.portfolio_photos ?? []).map((p) => p.url));
      })
      .catch(() => {});
  }, [seller.id]);

  useEffect(() => {
    void sellersApi.listReviews(seller.id).then(setReviews).catch(() => {});
  }, [seller.id]);

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;
    return {
      stars,
      pct: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });

  async function submitReview() {
    if (myRating < 1 || sending) return;
    setSending(true);
    setReviewMsg(null);
    try {
      await sellersApi.createReview(seller.id, {
        rating: myRating,
        text: reviewText.trim(),
      });
      setReviewText("");
      setMyRating(0);
      setReviewMsg("Avaliação enviada. Obrigado!");
      setReviews(await sellersApi.listReviews(seller.id));
    } catch {
      setReviewMsg("Não foi possível enviar a avaliação. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  // Multi-categoria: mostra todas as categorias da empresa, separadas por "·".
  const categoryLabel = full.categories?.length
    ? full.categories.map((c) => c.label).join(" · ")
    : (full.category?.label ?? "Empresa");

  function openWhatsapp() {
    const wa = (full.whatsapp ?? "").replace(/\D+/g, "");
    if (!wa) return;
    const msg = encodeURIComponent(
      "Olá! Encontrei vocês no Achadinhos do Condomínio.",
    );
    window.open(
      `https://wa.me/55${wa}?text=${msg}`,
      "_blank",
      "noopener,noreferrer",
    );
    onRecordContact({
      kind: "seller",
      targetId: full.id,
      name: full.name,
      avatar: full.name.charAt(0).toUpperCase(),
      logoUrl: full.logo_url,
      subtitle: full.category?.label ?? "Empresa",
      whatsapp: wa,
    });
  }

  function openSite() {
    if (full.link) {
      window.open(full.link, "_blank", "noopener,noreferrer");
    }
  }

  return {
    full,
    products,
    portfolio,
    reviews,
    avgRating,
    ratingDist,
    myRating,
    setMyRating,
    reviewText,
    setReviewText,
    sending,
    reviewMsg,
    submitReview,
    categoryLabel,
    openWhatsapp,
    openSite,
  };
}
