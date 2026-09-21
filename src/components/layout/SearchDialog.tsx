import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const suggestions = [
  { label: 'Pokémon / TCG', to: '/shop?category=pokemon' },
  { label: 'LEGO / Bricks', to: '/shop?category=lego' },
  { label: 'Accessories / deck boxes', to: '/shop?category=accessories' },
  { label: 'Events', to: '/events' },
  { label: 'About Pull Syndicate', to: '/about' },
]

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    const onOpen = () => setOpen(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('ps:open-search', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('ps:open-search', onOpen)
    }
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  if (!open) return null

  const matches = suggestions.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <div className="fixed inset-0 z-60 grid place-items-start bg-onyx/70 p-4 pt-[15vh]">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="mx-auto w-full max-w-xl rounded-xl border border-arctic/15 bg-onyx p-4 shadow-card"
      >
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          ref={inputRef}
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search pages and categories"
          className="min-h-11 w-full rounded-md border border-arctic/15 bg-transparent px-3"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && matches[0]) {
              navigate(matches[0].to)
              setOpen(false)
            }
          }}
        />
        <ul className="mt-3">
          {matches.map((item) => (
            <li key={item.to}>
              <button
                type="button"
                className="flex min-h-11 w-full items-center text-left hover:text-gold"
                onClick={() => {
                  navigate(item.to)
                  setOpen(false)
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="mt-3 text-sm text-arctic/60" onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
