import { describe, expect, it } from 'vitest'
import { isValidEmail, validateContactForm } from '@/utils/validation'

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('desk@pullsyn.co')).toBe(true)
  })

  it('rejects empty or broken values', () => {
    expect(isValidEmail('')).toBe(false)
    expect(isValidEmail('not-an-email')).toBe(false)
  })
})

describe('validateContactForm', () => {
  it('requires the core fields', () => {
    const result = validateContactForm({
      name: '',
      email: 'bad',
      subject: '',
      message: 'short',
    })
    expect(result.ok).toBe(false)
    expect(result.errors.name).toBeTruthy()
    expect(result.errors.email).toBeTruthy()
  })

  it('flags honeypot spam without blocking the bot', () => {
    const result = validateContactForm({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Hello',
      message: 'This is a real looking message.',
      company: 'spam-co',
    })
    expect(result.isSpam).toBe(true)
  })

  it('accepts a valid enquiry', () => {
    const result = validateContactForm({
      name: 'Ada',
      email: 'ada@example.com',
      subject: 'Events',
      message: 'When is the next trade night?',
    })
    expect(result.ok).toBe(true)
    expect(result.isSpam).toBe(false)
  })
})
