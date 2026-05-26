interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Achadinhos do Condomínio",
  alternateName: "Achadinhos",
  url: "https://achadinhoscondominio.com.br",
  logo: "https://achadinhoscondominio.com.br/icon-logo-achadinhos-do-condominio.png",
  description:
    "Marketplace que conecta síndicos a prestadores de serviço e fornecedores de produtos para condomínios.",
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Achadinhos do Condomínio",
  url: "https://achadinhoscondominio.com.br",
  inLanguage: "pt-BR",
};
