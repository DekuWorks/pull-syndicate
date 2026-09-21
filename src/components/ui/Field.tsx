import { cn } from '@/lib/cn'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type Shared = {
  id: string
  label: string
  error?: string
}

export function TextField({
  id,
  label,
  error,
  className,
  ...props
}: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-arctic/80">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'min-h-11 rounded-md border border-arctic/15 bg-onyx px-3 text-arctic',
          error && 'border-purple',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-purple">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function TextAreaField({
  id,
  label,
  error,
  className,
  ...props
}: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm text-arctic/80">
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          'min-h-32 rounded-md border border-arctic/15 bg-onyx px-3 py-2 text-arctic',
          error && 'border-purple',
          className,
        )}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-purple">
          {error}
        </p>
      ) : null}
    </div>
  )
}
