import { DEFAULT_WHATSAPP_MESSAGE, serviceWhatsAppMessage, whatsappUrl } from '../utils/whatsapp'
import { CTAButton, type CTAButtonProps } from './CTAButton'
import { WhatsAppIcon } from './icons'

interface WhatsAppCTAProps extends Omit<CTAButtonProps, 'href' | 'external' | 'children' | 'icon'> {
  label: string
  /** Pre-fills the message with this service name. */
  service?: string
  message?: string
  showIcon?: boolean
}

/** Reusable booking button — every booking CTA on the site opens WhatsApp directly. */
export function WhatsAppCTA({ label, service, message, showIcon = false, ariaLabel, ...rest }: WhatsAppCTAProps) {
  const text = message ?? (service ? serviceWhatsAppMessage(service) : DEFAULT_WHATSAPP_MESSAGE)
  return (
    <CTAButton
      {...rest}
      href={whatsappUrl(text)}
      external
      icon={showIcon ? <WhatsAppIcon size={16} /> : undefined}
      ariaLabel={ariaLabel ?? `${label}${service ? ` – ${service}` : ''} (opens WhatsApp in a new tab)`}
    >
      {label}
    </CTAButton>
  )
}
