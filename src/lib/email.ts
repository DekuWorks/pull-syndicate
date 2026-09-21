export type EmailEvent =
  | 'account_verification'
  | 'order_confirmation'
  | 'shipping_confirmation'
  | 'password_reset'
  | 'contact_confirmation'

export type EmailPayload = {
  to: string
  event: EmailEvent
  data?: Record<string, string>
}

export type EmailProvider = {
  send: (payload: EmailPayload) => Promise<void>
}

const noop: EmailProvider = {
  send: async () => undefined,
}

let provider: EmailProvider = noop

export function setEmailProvider(next: EmailProvider) {
  provider = next
}

export function sendEmail(payload: EmailPayload) {
  return provider.send(payload)
}
