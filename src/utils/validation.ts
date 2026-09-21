const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value.trim())
}

export function validateContactForm(input: {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}) {
  const errors: Record<string, string> = {}

  if (!input.name.trim()) errors.name = 'Enter your name.'
  if (!isValidEmail(input.email)) errors.email = 'Enter a valid email.'
  if (!input.subject.trim()) errors.subject = 'Enter a subject.'
  if (input.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }
  if (input.message.trim().length > 4000) {
    errors.message = 'Message is too long.'
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    isSpam: Boolean(input.company?.trim()),
  }
}
