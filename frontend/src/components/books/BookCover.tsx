import { cn } from '@/lib/utils'

interface BookCoverProps {
  initial: string
  color: string
  className?: string
  textClassName?: string
}

export function BookCover({ initial, color, className, textClassName }: BookCoverProps) {
  return (
    <div
      className={cn('plate flex items-center justify-center', className)}
      style={{ background: color }}
    >
      <span className={cn('font-heading font-semibold text-neutral-100', textClassName)}>
        {initial}
      </span>
    </div>
  )
}
