import Link from "next/link";
import { Icon } from "../icons";

// Caminhos rápidos de cadastro no topo da home: cada botão leva direto ao
// formulário do perfil (síndico ou empresa/fornecedor), e os cadastros caem
// separados no painel admin (aba Leads).
export function LeadPaths() {
  return (
    <section className="section lead-paths" aria-label="Cadastre-se">
      <div className="lead-paths-grid">
        <Link href="/cadastro/sindico" className="lead-path">
          <span className="lead-path-icon">
            <Icon.User size={22} />
          </span>
          <span className="lead-path-body">
            <span className="lead-path-title">Sou Síndico</span>
            <span className="lead-path-desc">
              Cadastre seu condomínio e encontre os melhores fornecedores.
            </span>
          </span>
          <Icon.ChevRight size={18} className="lead-path-chev" />
        </Link>

        <Link href="/cadastro/afiliado" className="lead-path gold">
          <span className="lead-path-icon">
            <Icon.Building size={22} />
          </span>
          <span className="lead-path-body">
            <span className="lead-path-title">Quero ser Afiliado</span>
            <span className="lead-path-desc">
              Sua empresa no Achadinhos, vista pelos condomínios da região.
            </span>
          </span>
          <Icon.ChevRight size={18} className="lead-path-chev" />
        </Link>
      </div>
    </section>
  );
}
