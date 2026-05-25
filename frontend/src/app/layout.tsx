import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { RegisterPWA } from "@/components/register-pwa";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetMono = JetBrains_Mono({
  variable: "--font-jet-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Achadinhos do Condomínio",
    template: "%s · Achadinhos do Condomínio",
  },
  description:
    "Marketplace que conecta síndicos a prestadores de serviço de condomínio. Orçamento em 1 toque, prestadores verificados, shopping com produtos para o condomínio.",
  applicationName: "Achadinhos do Condomínio",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Achadinhos",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-logo-achadinhos-do-condominio.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-logo-achadinhos-do-condominio-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-logo-achadinhos-do-condominio.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon-logo-achadinhos-do-condominio.ico",
  },
  openGraph: {
    title: "Achadinhos do Condomínio",
    description:
      "Marketplace que conecta síndicos a prestadores de serviço. Orçamento em 1 toque.",
    siteName: "Achadinhos do Condomínio",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1B3B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} ${jetMono.variable}`}
    >
      <body>
        <AuthProvider>
          <RegisterPWA />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
