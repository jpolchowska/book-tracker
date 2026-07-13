import type { BookStatus } from '@/types/book'

const COVER_PALETTE = [
  'var(--color-accent-300)',
  'var(--color-accent-500)',
  'var(--color-accent-700)',
  'var(--color-neutral-400)',
  'var(--color-neutral-600)',
  'var(--color-accent-2-400)',
  'var(--color-accent-2-600)',
]

export function coverColorFor(id: number): string {
  return COVER_PALETTE[(id - 1) % COVER_PALETTE.length]
}

export function initialFor(title: string): string {
  return title.trim().charAt(0).toUpperCase()
}

export const STATUS_LABEL: Record<BookStatus, string> = {
  want: 'Want to Read',
  reading: 'Reading',
  finished: 'Finished',
}

export const STATUS_TAG_CLASS: Record<BookStatus, string> = {
  want: 'tag-neutral',
  reading: 'tag-outline',
  finished: 'tag-accent',
}

export function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
