import { cn } from '@/lib/utils'
import { STATUS_LABEL, STATUS_TAG_CLASS } from '@/lib/book-utils'
import type { BookStatus } from '@/types/book'

interface StatusTagProps {
  status: BookStatus
  className?: string
}

export function StatusTag({ status, className }: StatusTagProps) {
  return (
    <span className={cn('tag', STATUS_TAG_CLASS[status], className)}>
      {STATUS_LABEL[status]}
    </span>
  )
}
