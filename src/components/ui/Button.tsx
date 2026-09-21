import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'gold' | 'ghost' | 'cyan'
  children: ReactNode
}

export function Button({ variant = 'gold', className, children, ...props }: Props) {
  const styles = {
    gold: 'bg-gold text-onyx hover:bg-gold-dim',
    ghost: 'border border-arctic/20 bg-transparent text-arctic hover:border-gold hover:text-gold',
    cyan: 'bg-cyan text-onyx hover:opacity-90',
  } as const

  return (
    <button
      className={cn(
        'inline-flex min-h-11 items-center justify-center rounded-md px-5 py-2.5 font-medium transition-colors',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
