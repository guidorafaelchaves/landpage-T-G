export const contact = {
  email: 'contato@tginovations.com.br',
  whatsapp: '',
  address: 'Rua Manoel Martins Lemos, 580 · Primavera · Arapiraca/AL',
}

export function whatsappUrl(message) {
  if (!contact.whatsapp) return ''
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export const whatsappMessages = {
  Logística: 'Olá, gostaria de conversar sobre uma operação logística em Arapiraca.',
  'Veículos elétricos': 'Olá, gostaria de receber informações sobre bicicletas elétricas.',
  'Energia solar': 'Olá, gostaria de solicitar uma análise para energia solar.',
  Carregadores: 'Olá, gostaria de avaliar a instalação de um carregador.',
  Parcerias: 'Olá, gostaria de apresentar uma proposta de parceria para a T&G.',
  default: 'Olá, gostaria de falar com a T&G.',
}
