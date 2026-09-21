import { cn } from '@/lib/cn'

export function PsMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <img
      src="/branding/logo-mark.jpg"
      alt=""
      className={cn('logo-on-black object-contain', className)}
      width={160}
      height={160}
    />
  )
}
