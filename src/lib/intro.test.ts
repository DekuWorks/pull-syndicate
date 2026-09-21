import { describe, expect, it } from 'vitest'
import { shouldShowIntro } from '@/lib/intro'

describe('shouldShowIntro', () => {
  it('shows on first visit when motion is allowed', () => {
    expect(shouldShowIntro(null, false)).toBe(true)
  })

  it('skips after the first visit', () => {
    expect(shouldShowIntro('1', false)).toBe(false)
  })

  it('skips when the user prefers reduced motion', () => {
    expect(shouldShowIntro(null, true)).toBe(false)
  })
})
