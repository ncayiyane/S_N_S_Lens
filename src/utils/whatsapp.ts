import { business } from '../data/business'

export const WHATSAPP_BASE_URL = `https://wa.me/${business.whatsapp.number}`

export const DEFAULT_WHATSAPP_MESSAGE = `Hi SnS_Lenses! 👋

I'm interested in booking a photography session.

I'd love to know more about your photography packages, pricing and availability.

Please let me know how we can proceed.

Thank you!`

const withArticle = (word: string) => `${/^[aeiou]/i.test(word) ? 'an' : 'a'} ${word}`

export function serviceWhatsAppMessage(service: string) {
  const session = /session/i.test(service) ? service : `${service} session`
  return `Hi SnS_Lenses! I'm interested in booking ${withArticle(session)}. Could you please share more information about availability and pricing?`
}

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
}
