export const operations = [
  { key: 'receiving', title: 'Recebimento', text: 'Recebemos mercadorias, encomendas, lotes e volumes destinados à operação regional.' },
  { key: 'inspection', title: 'Conferência', text: 'Cada volume entra na operação com identificação, verificação e direcionamento.' },
  { key: 'temporaryStorage', title: 'Armazenagem temporária', text: 'Espaço de apoio para mercadorias que aguardam coleta, consolidação, rota ou expedição.' },
  { key: 'crossDocking', title: 'Cross docking', text: 'Mercadorias entram, são organizadas e seguem sem permanência desnecessária.' },
  { key: 'shipping', title: 'Expedição', text: 'Organizamos a saída para transportadoras, entregadores, clientes ou outras unidades.' },
]

export const audiences = [
  { id: 'transportadoras', label: 'Sou transportadora', title: 'Expansão regional com menor risco', text: 'Base operacional, cross docking, última milha e projetos-piloto.', target: 'transportadoras', detail: 'carrierRisk' },
  { id: 'lojistas', label: 'Sou lojista', title: 'Sua loja vende. A T&G organiza a saída.', text: 'Embalagem, preparação, armazenagem temporária e despacho.', target: 'lojistas', detail: 'merchantFlow' },
  { id: 'entregadores', label: 'Sou entregador', title: 'Estrutura para quem faz a última milha', text: 'Ponto de apoio, rotas, carregamento e mobilidade elétrica planejada.', target: 'entregadores', detail: 'courierBase' },
  { id: 'ecommerce', label: 'Sou empresa de e-commerce', title: 'Uma extensão operacional no Agreste', text: 'Recebimento, fulfillment planejado, expedição e operação regional.', target: 'servicos', detail: 'positioning' },
  { id: 'investidores', label: 'Sou investidor', title: 'Uma plataforma física com receitas complementares', text: 'Tese de crescimento, infraestrutura compartilhada e replicação.', target: 'investidores', detail: 'growth' },
  { id: 'fornecedores', label: 'Sou fornecedor', title: 'Integre o ecossistema em implantação', text: 'Bicicletas, energia, equipamentos, tecnologia e parcerias.', target: 'futuro', detail: 'electricProgram' },
]

export const futurePillars = [
  { key: 'electricMobility', eyebrow: 'Mobilidade elétrica', title: 'A última milha precisa ser mais econômica, acessível e sustentável.', text: 'Bicicletas, triciclos e, futuramente, motos elétricas integradas ao hub.' },
  { key: 'energy', eyebrow: 'Energia sustentável', title: 'A infraestrutura logística do futuro também precisa gerar sua energia.', text: 'Geração solar e carregamento fazem parte da evolução planejada.' },
  { key: 'technology', eyebrow: 'Tecnologia e dados', title: 'Estrutura física sem informação continua sendo apenas espaço.', text: 'Entradas, saídas, rotas, volumes e parceiros transformados em informação útil.' },
  { key: 'arapiraca', eyebrow: 'Localização', title: 'Arapiraca é um ponto de conexão regional.', text: 'Uma base urbana para operações locais e distribuição a municípios próximos.' },
]

export const transparency = [
  { status: 'Hoje', title: 'Estrutura existente', tone: 'current', items: ['Imóvel próprio', 'Endereço operacional', 'Espaço físico', 'Área para organização', 'Localização urbana', 'Possibilidade de adaptação', 'Base institucional da T&G'] },
  { status: 'Em curso', title: 'Estrutura em implantação', tone: 'building', items: ['Organização de estoque', 'Definição das áreas', 'Equipamentos e segurança', 'Tecnologia', 'Estrutura de carregamento', 'Parcerias logísticas'] },
  { status: 'Visão', title: 'Evolução futura', tone: 'future', items: ['Frota elétrica', 'Oficina', 'Geração solar ampliada', 'Sistemas avançados', 'Estações de recarga', 'Expansão regional'] },
]

export const useCases = [
  { number: '01', title: 'Transportadora entrando em Arapiraca', text: 'Testar a demanda regional usando o hub como ponto de apoio antes de abrir uma filial.', detail: 'caseCarrier' },
  { number: '02', title: 'Lojista de marketplace', text: 'Concentrar embalagem, organização e encaminhamento para voltar o foco às vendas.', detail: 'caseMerchant' },
  { number: '03', title: 'Entregador com bicicleta elétrica', text: 'Acessar futuramente equipamento, suporte, carregamento e rotas compatíveis.', detail: 'caseCourier' },
  { number: '04', title: 'Operação sazonal', text: 'Absorver um pico comercial sem criar uma estrutura temporária própria.', detail: 'caseSeasonal' },
]

export const growthPhases = [
  ['01', 'Estrutura mínima', 'Organização do imóvel, identidade visual, lojistas e serviços básicos.'],
  ['02', 'Operação regional', 'Transportadoras, cross docking, entregadores e crescimento do fluxo.'],
  ['03', 'Mobilidade elétrica', 'Bicicletas, assinaturas, manutenção e rotas elétricas.'],
  ['04', 'Energia e tecnologia', 'Energia solar, carregamento, gestão e indicadores.'],
  ['05', 'Replicação', 'Novos pontos, padronização, licenciamento e expansão regional.'],
]
