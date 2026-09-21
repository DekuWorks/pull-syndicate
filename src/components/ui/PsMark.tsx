import { cn } from '@/lib/cn'

export function PsMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <img
      src="/branding/logo-mark.svg"
      alt=""
      className={cn('logo-on-black object-contain', className)}
      width={768}
      height={768}
    />
  )
}
