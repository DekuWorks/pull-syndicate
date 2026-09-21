import { PsMark } from '@/components/ui/PsMark'

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3 sm:gap-3.5">
      <PsMark className={compact ? 'h-12 w-12 sm:h-[3.25rem] sm:w-[3.25rem]' : 'h-14 w-14'} />
      <img
        src="/branding/logo-wordmark.jpg"
        alt="Pull Syndicate"
        className={
          compact
            ? 'logo-on-black h-10 w-auto object-contain sm:h-11'
            : 'logo-on-black h-12 w-auto object-contain'
        }
        width={420}
        height={80}
      />
    </span>
  )
}
