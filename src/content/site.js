export const businessUnits = [
  {
    slug: 'logistica',
    number: '01',
    label: 'Logística inteligente',
    short: 'Recebimento, armazenagem, retirada e distribuição regional.',
    title: 'Infraestrutura para sua operação avançar.',
    description: 'Recebimento, armazenagem, organização, retirada e distribuição de mercadorias.',
    tone: 'orange',
    scene: 'warehouse',
  },
  {
    slug: 'veiculos-eletricos',
    number: '02',
    label: 'Veículos elétricos',
    short: 'Bicicletas, veículos leves, peças, acessórios e suporte.',
    title: 'Mobilidade elétrica para trabalho.',
    description: 'Bicicletas e veículos leves para entregas, deslocamento profissional e formação de frotas.',
    tone: 'cyan',
    scene: 'mobility',
  },
  {
    slug: 'energia-solar',
    number: '03',
    label: 'Energia solar',
    short: 'Projetos para empresas, condomínios, residências e imóveis rurais.',
    title: 'Energia dimensionada para o consumo real.',
    description: 'Projetos para reduzir o custo de energia em empresas, condomínios e imóveis.',
    tone: 'gold',
    scene: 'solar',
  },
  {
    slug: 'carregadores',
    number: '04',
    label: 'Carregadores',
    short: 'Pontos de recarga para veículos e bicicletas elétricas.',
    title: 'Recarga no lugar certo.',
    description: 'Fornecimento e instalação de pontos de recarga para veículos e bicicletas elétricas.',
    tone: 'violet',
    scene: 'charging',
  },
]

export const servicePages = {
  logistica: {
    eyebrow: 'T&G Logística',
    title: 'Sua operação no Agreste, sem começar do zero.',
    summary: 'Infraestrutura regional para transportadoras, e-commerces, distribuidores e negócios que precisam testar, apoiar ou ampliar sua presença em Arapiraca.',
    statement: 'Um endereço para receber. Uma estrutura para operar.',
    benefits: [
      ['Menor barreira de entrada', 'Comece com uma estrutura de apoio antes de assumir o custo integral de uma unidade própria.'],
      ['Fluxo mais organizado', 'Recebimento, conferência, separação, transição e expedição dentro de uma jornada compreensível.'],
      ['Escala progressiva', 'Capacidade e formato podem evoluir conforme volume, demanda, acordos e maturidade operacional.'],
    ],
    services: ['Recebimento e conferência', 'Armazenagem temporária', 'Cross docking', 'Fulfillment sob projeto', 'Expedição regional', 'Operações B2B', 'Apoio sazonal', 'Ponto de coleta'],
    scenes: [
      ['Entrada controlada', 'Volumes identificados e direcionados desde a chegada.'],
      ['Núcleo operacional', 'Mercadorias organizadas conforme operação, rota ou parceiro.'],
      ['Saída coordenada', 'Expedição para transportadoras, entregadores, clientes ou outras unidades.'],
    ],
    faq: [
      ['A T&G substitui uma filial completa?', 'A proposta é oferecer uma base flexível de apoio e expansão. O escopo final depende da operação contratada.'],
      ['É possível começar com um projeto-piloto?', 'Sim. Projetos-piloto ajudam a validar demanda, processo, volume e responsabilidades antes da expansão.'],
      ['Quais empresas podem utilizar a estrutura?', 'Transportadoras, distribuidores, marketplaces, e-commerces, lojistas e operações B2B, mediante análise de aderência.'],
    ],
  },
  galpao: {
    eyebrow: 'T&G Hub',
    title: 'Um espaço físico preparado para gerar capacidade operacional.',
    summary: 'O galpão da T&G em Arapiraca é a base de um ecossistema que conecta logística, distribuição, mobilidade e energia.',
    statement: 'Infraestrutura compartilhada. Crescimento individual.',
    benefits: [
      ['Localização regional', 'Base física em Arapiraca, ponto estratégico para conexões no Agreste alagoano.'],
      ['Uso flexível', 'Possibilidade de áreas de transição, apoio, armazenagem temporária e projetos dedicados.'],
      ['Ecossistema conectado', 'Uma mesma plataforma física pode aproximar operadores, lojistas, entregadores e fornecedores.'],
    ],
    services: ['Locação sob análise', 'Área operacional', 'Recebimento', 'Apoio a rotas', 'Ponto de transição', 'Projetos dedicados', 'Base para parceiros', 'Operações temporárias'],
    scenes: [
      ['Base real', 'Rua Manoel Martins Lemos, 580, Primavera, Arapiraca/AL.'],
      ['Configuração por projeto', 'Layout, capacidade e responsabilidades definidos conforme cada acordo.'],
      ['Evolução transparente', 'Separação clara entre estrutura existente, implantação e visão futura.'],
    ],
    faq: [
      ['O galpão está disponível para locação integral?', 'Modelos de uso e disponibilidade são avaliados caso a caso.'],
      ['A estrutura atende operações temporárias?', 'Projetos sazonais e operações-piloto estão entre os formatos possíveis, sujeitos à capacidade.'],
      ['Posso visitar a estrutura?', 'Sim. Solicite uma conversa para alinharmos objetivo, perfil da operação e agenda.'],
    ],
  },
  'e-bikes': {
    eyebrow: 'T&G E-Bikes',
    title: 'Mobilidade elétrica para quem faz a cidade acontecer.',
    summary: 'Uma frente em desenvolvimento para conectar bicicletas elétricas, suporte, peças, acessórios e modelos de acesso voltados a pessoas e empresas.',
    statement: 'Menos emissão. Mais alcance. Uma nova lógica urbana.',
    benefits: [
      ['Eficiência urbana', 'A assistência elétrica amplia alcance e reduz esforço em trajetos cotidianos.'],
      ['Aplicação profissional', 'Soluções com potencial para entregadores, equipes de campo, condomínios e operações corporativas.'],
      ['Ecossistema de suporte', 'Visão de peças, acessórios, manutenção, orientação e infraestrutura de recarga.'],
    ],
    services: ['Bicicletas elétricas', 'Modelos para empresas', 'Soluções para entregadores', 'Peças e acessórios', 'Assistência sob implantação', 'Frotas-piloto', 'Condomínios', 'Projetos especiais'],
    scenes: [
      ['Escolha orientada', 'Uso, autonomia, carga e terreno precisam fazer parte da decisão.'],
      ['Operação conectada', 'Mobilidade integrada à base logística e aos pontos de recarga.'],
      ['Suporte progressivo', 'Serviços liberados conforme parceiros, equipe e capacidade técnica.'],
    ],
    faq: [
      ['A T&G já comercializa todos os modelos?', 'O portfólio e os modelos comerciais estão em estruturação e dependem de disponibilidade e parcerias.'],
      ['Existem soluções para frotas?', 'Projetos-piloto corporativos fazem parte da visão da unidade de mobilidade elétrica.'],
      ['Haverá assistência técnica?', 'A assistência é uma capacidade planejada e será comunicada conforme implantação.'],
    ],
  },
  'energia-solar': {
    eyebrow: 'T&G Energia',
    title: 'Energia solar para reduzir custos e ampliar autonomia.',
    summary: 'Projetos dimensionados para residências, empresas e operações que desejam transformar consumo em uma decisão estratégica de longo prazo.',
    statement: 'Produzir melhor. Consumir com inteligência.',
    benefits: [
      ['Projeto sob medida', 'Dimensionamento baseado em perfil de consumo, estrutura disponível e objetivo do cliente.'],
      ['Economia potencial', 'A geração própria pode reduzir a exposição ao custo da energia, conforme projeto e regulamentação.'],
      ['Integração elétrica', 'Energia solar pode preparar o caminho para mobilidade, recarga e operações mais sustentáveis.'],
    ],
    services: ['Kits residenciais', 'Kits empresariais', 'Microgeração', 'Dimensionamento', 'Projeto', 'Instalação por parceiros', 'Monitoramento', 'Integração com recarga'],
    scenes: [
      ['Diagnóstico', 'Leitura do consumo e das condições técnicas do local.'],
      ['Engenharia', 'Definição de potência, componentes e estratégia de implantação.'],
      ['Geração', 'Acompanhamento da produção e da economia potencial do sistema.'],
    ],
    faq: [
      ['Todo imóvel pode receber painéis?', 'É necessário avaliar área, orientação, sombreamento, estrutura, rede elétrica e regras aplicáveis.'],
      ['A economia é garantida?', 'Não. A projeção depende de consumo, irradiação, tarifas, dimensionamento, desempenho e regulamentação.'],
      ['A T&G realiza a instalação?', 'O modelo pode envolver parceiros técnicos habilitados, conforme local e escopo do projeto.'],
    ],
  },
  carregadores: {
    eyebrow: 'T&G Charge',
    title: 'Infraestrutura de recarga para a próxima geração de mobilidade.',
    summary: 'Wallboxes, totens e estações pensadas para residências, condomínios, empresas e espaços que desejam participar da transição elétrica.',
    statement: 'A mobilidade muda quando a energia está onde ela é necessária.',
    benefits: [
      ['Recarga no destino', 'Transforme o tempo de permanência em conveniência para moradores, clientes, equipes e frotas.'],
      ['Projeto seguro', 'Potência, proteção, demanda, uso e crescimento precisam ser avaliados antes da implantação.'],
      ['Novos serviços', 'A recarga pode fortalecer empreendimentos, atrair público e apoiar estratégias de sustentabilidade.'],
    ],
    services: ['Wallbox residencial', 'Condomínios', 'Totens corporativos', 'Estações públicas', 'Shopping centers', 'Postos', 'Frotas', 'Integração solar'],
    scenes: [
      ['Análise elétrica', 'Capacidade disponível, demanda e perfil de uso orientam o projeto.'],
      ['Ponto de recarga', 'Equipamento, proteção, comunicação e acesso definidos em conjunto.'],
      ['Operação preparada', 'Monitoramento e expansão considerados desde a primeira fase.'],
    ],
    faq: [
      ['Qual carregador é ideal?', 'Depende do veículo, potência disponível, tempo de permanência e modelo de uso do local.'],
      ['Condomínios podem instalar wallbox?', 'Sim, mediante avaliação elétrica, definição de regras internas e atendimento às normas aplicáveis.'],
      ['É possível integrar energia solar?', 'Sim, desde que a solução seja dimensionada de forma coordenada e tecnicamente viável.'],
    ],
  },
}

export const ecosystemMetrics = [
  ['04', 'frentes conectadas'],
  ['01', 'hub regional'],
  ['360°', 'visão de ecossistema'],
  ['AL', 'base em Arapiraca'],
]

export const partnerTypes = ['Transportadoras', 'E-commerces', 'Lojistas', 'Entregadores', 'Condomínios', 'Empresas', 'Investidores', 'Fornecedores']
