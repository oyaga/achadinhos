/* Achadinhos — Mock data compartilhado */

const CATEGORIES_FULL = [
  { id: 'destaque', label: 'Destaque do dia', short: 'Destaque\ndo dia', icon: 'CatHighlight', badge: 'TOP', count: 12, desc: 'Os melhores prestadores em destaque hoje' },
  { id: 'shopping', label: 'Shopping condomínio', short: 'Shopping\ncondomínio', icon: 'CatShopping', badge: 'NOVO', count: 124, desc: 'Produtos para o condomínio com link direto da revenda' },
  { id: 'parceiros', label: 'Parceiros homologados', short: 'Parceiros\nhomologados', icon: 'CatPartners', count: 48, desc: 'Empresas auditadas e aprovadas pela administração' },
  { id: 'seguranca', label: 'Segurança eletrônica', short: 'Segurança\neletrônica', icon: 'CatSecurity', count: 23, desc: 'CFTV, alarmes, controle de acesso e monitoramento' },
  { id: 'terceirizacao', label: 'Terceirização', short: 'Tercei-\nrização', icon: 'CatOutsource', count: 31, desc: 'Equipes terceirizadas: portaria, limpeza, manutenção' },
  { id: 'portaria', label: 'Portaria virtual', short: 'Portaria\nvirtual', icon: 'CatPortaria', count: 17, desc: 'Portaria remota 24h com economia de até 60%' },
  { id: 'facilities', label: 'Facilities', short: 'Facilities', icon: 'CatFacilities', count: 26, desc: 'Gestão integrada de serviços prediais' },
  { id: 'manutencao', label: 'Manutenção geral', short: 'Manutenção\ngeral', icon: 'CatMaintenance', count: 54, desc: 'Hidráulica, elétrica, pintura, marcenaria e mais' },
  { id: 'dedetizacao', label: 'Dedetizadora', short: 'Dedeti-\nzadora', icon: 'CatPest', count: 19, desc: 'Controle de pragas com certificado sanitário' },
  { id: 'armarios', label: 'Armário inteligente', short: 'Armário\ninteligente', icon: 'CatLocker', count: 8, desc: 'Lockers para entregas e correspondências' },
  { id: 'limpeza', label: 'Limpeza', short: 'Limpeza', icon: 'CatCleaning', count: 42, desc: 'Diaristas, faxina geral, pós-obra' },
  { id: 'hidraulica', label: 'Hidráulica', short: 'Hidráulica', icon: 'CatPlumbing', count: 28 },
  { id: 'eletrica', label: 'Elétrica', short: 'Elétrica', icon: 'CatElectric', count: 35 },
];

// Prestadores por categoria (dados ricos)
const PROVIDERS_DB = [
  { id: 1, name: 'TurboElev Manutenção', cat: 'manutencao', catLabel: 'Manutenção · Elevadores', avatar: 'T', rating: 4.9, reviews: 128, badge: 'Ouro', verified: true, distance: '1,2km', price: 'R$ 180/visita', responseTime: '15min', desc: 'Especialistas em elevadores residenciais e comerciais. Atendimento 24h, peças originais e contrato de manutenção preventiva.', services: ['Manutenção preventiva', 'Emergência 24h', 'Modernização', 'Laudo técnico'], yearsActive: 12, jobsDone: 340, whatsapp: '11987654321', highlight: true },
  { id: 2, name: 'Alpha Elétrica 24h', cat: 'eletrica', catLabel: 'Elétrica · Atende agora', avatar: 'A', rating: 4.8, reviews: 96, badge: 'Verificado', verified: true, distance: '0,8km', price: 'R$ 120/h', responseTime: '20min', desc: 'Eletricistas certificados pelo CREA. Atendimento emergencial e instalações completas.', services: ['Instalação elétrica', 'Quadros e disjuntores', 'Para-raios', 'Geradores'], yearsActive: 8, jobsDone: 215, whatsapp: '11987654322' },
  { id: 3, name: 'Home Solutions Predial', cat: 'manutencao', catLabel: 'Manutenção geral', avatar: 'H', rating: 4.7, reviews: 214, badge: 'Top', verified: true, distance: '2,1km', price: 'Sob consulta', responseTime: '1h', desc: 'Time multidisciplinar para manutenção predial completa. Contratos mensais com SLA garantido.', services: ['Hidráulica', 'Elétrica', 'Pintura', 'Marcenaria'], yearsActive: 15, jobsDone: 580, whatsapp: '11987654323' },
  { id: 4, name: 'CleanPro Condomínios', cat: 'limpeza', catLabel: 'Limpeza · Diarista', avatar: 'C', rating: 4.9, reviews: 342, badge: 'Ouro', verified: true, distance: '0,5km', price: 'R$ 220/dia', responseTime: '10min', desc: 'Equipe própria treinada. Limpeza áreas comuns, pós-obra e jardinagem.', services: ['Áreas comuns', 'Pós-obra', 'Vidros', 'Jardinagem'], yearsActive: 10, jobsDone: 890, whatsapp: '11987654324', highlight: true },
  { id: 5, name: 'Guardião Segurança', cat: 'seguranca', catLabel: 'Portaria 24h · CFTV', avatar: 'G', rating: 4.6, reviews: 78, verified: false, distance: '3,4km', price: 'R$ 6.500/mês', responseTime: '30min', desc: 'Soluções integradas de segurança eletrônica e física para condomínios.', services: ['Câmeras 24h', 'Controle de acesso', 'Cercas elétricas', 'Alarmes'], yearsActive: 6, jobsDone: 142, whatsapp: '11987654325' },
  { id: 6, name: 'Visão CFTV', cat: 'seguranca', catLabel: 'Segurança eletrônica', avatar: 'V', rating: 4.8, reviews: 65, badge: 'Verificado', verified: true, distance: '4,1km', price: 'Sob consulta', responseTime: '45min', desc: 'Câmeras 4K com analytics IA, integração com aplicativo do morador.', services: ['CFTV 4K', 'Analytics IA', 'Backup nuvem', 'App do morador'], yearsActive: 5, jobsDone: 87, whatsapp: '11987654326' },
  { id: 7, name: 'Portaria Connect', cat: 'portaria', catLabel: 'Portaria virtual', avatar: 'P', rating: 4.7, reviews: 53, badge: 'Verificado', verified: true, distance: '5,2km', price: 'R$ 3.200/mês', responseTime: '1h', desc: 'Portaria remota 24h. Economize até 60% comparado à portaria física.', services: ['Atendimento 24h', 'Liberação remota', 'Reconhecimento facial', 'App integrado'], yearsActive: 4, jobsDone: 38, whatsapp: '11987654327' },
  { id: 8, name: 'PestZero', cat: 'dedetizacao', catLabel: 'Controle de pragas', avatar: 'P', rating: 4.9, reviews: 187, badge: 'Ouro', verified: true, distance: '2,8km', price: 'R$ 350/aplicação', responseTime: '2h', desc: 'Dedetização ecológica com produtos certificados. Garantia de 90 dias.', services: ['Baratas', 'Ratos', 'Cupins', 'Pombos'], yearsActive: 9, jobsDone: 420, whatsapp: '11987654328' },
  { id: 9, name: 'LockerSmart', cat: 'armarios', catLabel: 'Armário inteligente', avatar: 'L', rating: 4.7, reviews: 32, badge: 'Verificado', verified: true, distance: '6,3km', price: 'R$ 12.000/locker', responseTime: '24h', desc: 'Armários inteligentes para entregas. Integração com Mercado Livre, iFood, Correios.', services: ['Instalação', 'Manutenção', 'App próprio', 'Suporte 24h'], yearsActive: 3, jobsDone: 28, whatsapp: '11987654329' },
  { id: 10, name: 'FacilityMaster', cat: 'facilities', catLabel: 'Facilities · Gestão completa', avatar: 'F', rating: 4.8, reviews: 91, badge: 'Top', verified: true, distance: '3,1km', price: 'A partir de R$ 8k/mês', responseTime: '4h', desc: 'Gestão integrada de todos os serviços prediais. Um único contrato, um único contato.', services: ['Gestão integrada', 'SLA garantido', 'Relatórios mensais', 'BI próprio'], yearsActive: 11, jobsDone: 156, whatsapp: '11987654330', highlight: true },
  { id: 11, name: 'Equipe Total Terceirização', cat: 'terceirizacao', catLabel: 'Terceirização', avatar: 'E', rating: 4.6, reviews: 124, verified: true, distance: '4,5km', price: 'Sob consulta', responseTime: '4h', desc: 'Equipes próprias para portaria, limpeza e manutenção. CLT registrado.', services: ['Portaria', 'Limpeza', 'Manutenção', 'Jardinagem'], yearsActive: 14, jobsDone: 312, whatsapp: '11987654331' },
  { id: 12, name: 'BPS Condomínios', cat: 'parceiros', catLabel: 'Parceiro homologado', avatar: 'B', rating: 4.9, reviews: 264, badge: 'Ouro', verified: true, distance: '1,8km', price: 'Sob consulta', responseTime: '30min', desc: 'Empresa auditada e homologada. Acordos preferenciais negociados pela administradora.', services: ['Manutenção predial', 'Reformas', 'Pintura', 'Hidráulica'], yearsActive: 18, jobsDone: 740, whatsapp: '11987654332' },
];

// Reviews mock — vários prestadores, com tags
const REVIEWS = [
  { id: 1, providerId: 1, user: 'Carlos Mendes', condo: 'Edifício Aurora · Síndico', rating: 5, date: '12 abr', text: 'Atendimento impecável. Chegaram em 15 minutos e resolveram o problema do elevador. Recomendo!', verified: true, helpful: 12, tags: ['Pontual', 'Profissional', 'Resolve rápido'] },
  { id: 2, providerId: 1, user: 'Juliana Ferraz', condo: 'Condomínio Vila Nova · Síndica', rating: 5, date: '08 abr', text: 'Já é o terceiro contrato com eles. Sempre cumprem o prazo e o orçamento. Equipe muito educada.', verified: true, helpful: 8, tags: ['Preço justo', 'Atencioso'] },
  { id: 3, providerId: 1, user: 'Roberto Lima', condo: 'Residencial Park · Síndico', rating: 4, date: '02 abr', text: 'Bom atendimento, só achei o preço um pouco acima da média. Mas a qualidade compensa.', verified: true, helpful: 5, tags: ['Profissional'] },
  { id: 4, providerId: 1, user: 'Maria Souza', condo: 'Cond. Jardins · Síndica', rating: 5, date: '28 mar', text: 'Salvaram nosso elevador num domingo de manhã. Atendimento 24h é real mesmo.', verified: true, helpful: 18, tags: ['Pontual', 'Resolve rápido'] },
  { id: 5, providerId: 2, user: 'André Gomes', condo: 'Edif. Solar · Síndico', rating: 5, date: '10 abr', text: 'Resolveram um curto que tinha 3 meses. Muito técnicos e diretos.', verified: true, helpful: 9, tags: ['Profissional', 'Resolve rápido'] },
  { id: 6, providerId: 4, user: 'Fernanda Castro', condo: 'Cond. Atlântico · Síndica', rating: 5, date: '14 abr', text: 'Equipe pontual e caprichosa. Áreas comuns ficaram impecáveis após pós-obra.', verified: true, helpful: 22, tags: ['Limpo', 'Pontual'] },
];

// ===== SHOPPING — Produtos de condomínio =====
const SHOP_CATEGORIES = [
  { id: 'all', label: 'Tudo', count: 124 },
  { id: 'limpeza', label: 'Limpeza', count: 38 },
  { id: 'manutencao', label: 'Manutenção', count: 27 },
  { id: 'epi', label: 'EPI', count: 15 },
  { id: 'jardim', label: 'Jardim', count: 12 },
  { id: 'piscina', label: 'Piscina', count: 9 },
  { id: 'eletrica', label: 'Elétrica', count: 13 },
  { id: 'escritorio', label: 'Escritório', count: 10 },
];

const PRODUCTS_DB = [
  { id: 'p1', name: 'Saco de lixo reforçado 100L (caixa c/ 100)', cat: 'limpeza', price: 89.90, oldPrice: 119.90, rating: 4.8, reviews: 64, seller: 'Distribuidora Higicond', tag: 'Mais vendido', whatsapp: '11987654401', link: 'https://exemplo.com/p/saco100l', badge: 'OFERTA', stock: 'Em estoque' },
  { id: 'p2', name: 'Vassoura industrial 60cm com cabo', cat: 'limpeza', price: 38.50, rating: 4.6, reviews: 28, seller: 'CleanShop', whatsapp: '11987654402', link: 'https://exemplo.com/p/vassoura', stock: 'Em estoque' },
  { id: 'p3', name: 'Detergente neutro 5L (galão)', cat: 'limpeza', price: 24.90, oldPrice: 32.00, rating: 4.7, reviews: 92, seller: 'Distribuidora Higicond', whatsapp: '11987654401', link: 'https://exemplo.com/p/detergente5l', stock: 'Em estoque' },
  { id: 'p4', name: 'Caixa de fusíveis NH 100A', cat: 'eletrica', price: 245.00, rating: 4.9, reviews: 14, seller: 'EletroParts', tag: 'Profissional', whatsapp: '11987654403', link: 'https://exemplo.com/p/fusivel-nh', stock: 'Em estoque' },
  { id: 'p5', name: 'Capacete de segurança branco com jugular', cat: 'epi', price: 32.90, rating: 4.5, reviews: 41, seller: 'SegPro EPI', whatsapp: '11987654404', link: 'https://exemplo.com/p/capacete', stock: 'Em estoque' },
  { id: 'p6', name: 'Cloro multiação 10kg', cat: 'piscina', price: 189.00, oldPrice: 219.00, rating: 4.8, reviews: 38, seller: 'Aqualife', tag: 'Recomendado', whatsapp: '11987654405', link: 'https://exemplo.com/p/cloro10kg', badge: 'OFERTA', stock: 'Últimas unidades' },
  { id: 'p7', name: 'Adubo NPK 10-10-10 saco 25kg', cat: 'jardim', price: 78.00, rating: 4.6, reviews: 19, seller: 'Verde Vivo', whatsapp: '11987654406', link: 'https://exemplo.com/p/adubo', stock: 'Em estoque' },
  { id: 'p8', name: 'Kit ferramentas predial 132 peças', cat: 'manutencao', price: 489.90, oldPrice: 599.00, rating: 4.9, reviews: 56, seller: 'FerragensCond', tag: 'Mais vendido', whatsapp: '11987654407', link: 'https://exemplo.com/p/kit-ferramentas', badge: 'OFERTA', stock: 'Em estoque' },
  { id: 'p9', name: 'Luva nitrílica caixa c/ 100 unid.', cat: 'epi', price: 42.00, rating: 4.7, reviews: 73, seller: 'SegPro EPI', whatsapp: '11987654404', link: 'https://exemplo.com/p/luva-nitrilica', stock: 'Em estoque' },
  { id: 'p10', name: 'Mangueira flex 50m com esguicho', cat: 'jardim', price: 129.00, rating: 4.4, reviews: 22, seller: 'Verde Vivo', whatsapp: '11987654406', link: 'https://exemplo.com/p/mangueira', stock: 'Em estoque' },
  { id: 'p11', name: 'Kit limpeza piscina (peneira + escova)', cat: 'piscina', price: 145.00, rating: 4.6, reviews: 31, seller: 'Aqualife', whatsapp: '11987654405', link: 'https://exemplo.com/p/kit-piscina', stock: 'Em estoque' },
  { id: 'p12', name: 'Resma papel A4 75g (caixa 10x)', cat: 'escritorio', price: 159.90, rating: 4.5, reviews: 87, seller: 'PapelCond', whatsapp: '11987654408', link: 'https://exemplo.com/p/papel-a4', stock: 'Em estoque' },
];

window.CATEGORIES_FULL = CATEGORIES_FULL;
window.PROVIDERS_DB = PROVIDERS_DB;
window.REVIEWS = REVIEWS;
window.SHOP_CATEGORIES = SHOP_CATEGORIES;
window.PRODUCTS_DB = PRODUCTS_DB;
