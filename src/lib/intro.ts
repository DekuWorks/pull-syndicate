export const INTRO_STORAGE_KEY = 'ps.intro.seen'

export function shouldShowIntro(
  storedValue: string | null,
  prefersReducedMotion: boolean,
): boolean {
  if (prefersReducedMotion) return false
  return storedValue !== '1'
}

export function markIntroSeen(storage: Pick<Storage, 'setItem'> = localStorage) {
  storage.setItem(INTRO_STORAGE_KEY, '1')
}
