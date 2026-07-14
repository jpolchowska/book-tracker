import { Book, BookOpen, Check, Star } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/layout/PageHeader'
import { BookCover } from '@/components/books/BookCover'
import { StatusTag } from '@/components/books/StatusTag'
import { coverColorFor, initialFor } from '@/lib/book-utils'
import { useBookStore } from '@/stores/book-store'

export function DashboardPage() {
  const books = useBookStore((s) => s.books)

  const total = books.length
  const reading = books.filter((b) => b.status === 'reading').length
  const finished = books.filter((b) => b.status === 'finished').length
  const ratedFinished = books.filter((b) => b.status === 'finished' && b.rating > 0)
  const avgRating = ratedFinished.length
    ? (ratedFinished.reduce((sum, b) => sum + b.rating, 0) / ratedFinished.length).toFixed(1)
    : '—'

  const currentlyReading = books.filter((b) => b.status === 'reading')

  const recentlyAdded = [...books].sort((a, b) => (a.dateAdded < b.dateAdded ? 1 : -1)).slice(0, 5)

  const genreCounts = new Map<string, number>()
  for (const book of books) {
    genreCounts.set(book.genre, (genreCounts.get(book.genre) ?? 0) + 1)
  }
  const genreDistribution = [...genreCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Your library"
        subtitle="An overview of your collection and reading progress."
      />

      <div className="mb-8 grid grid-cols-4 gap-4">
        <StatCard label="All books" value={total} icon={Book} />
        <StatCard label="Reading" value={reading} icon={BookOpen} />
        <StatCard label="Finished" value={finished} icon={Check} />
        <StatCard label="Average rating" value={avgRating} icon={Star} filled />
      </div>

      <h3 className="mb-3">Currently reading</h3>
      <div className="mb-8 grid grid-cols-2 gap-4">
        {currentlyReading.map((book) => (
          <Link
            key={book.id}
            to={`/library/${book.id}`}
            className="card elev-sm text-text cursor-pointer flex-row items-center gap-4 no-underline"
          >
            <BookCover
              initial={initialFor(book.title)}
              color={coverColorFor(book.id)}
              className="h-[78px] w-[52px] flex-none"
              textClassName="text-[22px]"
            />
            <div className="min-w-0">
              <div className="card-title overflow-hidden text-ellipsis whitespace-nowrap">
                {book.title}
              </div>
              <div className="card-meta">
                {book.author} · {book.pages} pages
              </div>
              <StatusTag status={book.status} className="mt-1.5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 items-start gap-8">
        <div>
          <h3 className="mb-3">Recently added</h3>
          <div className="flex flex-col">
            {recentlyAdded.map((book) => (
              <Link
                key={book.id}
                to={`/library/${book.id}`}
                className="border-divider text-text flex h-14 cursor-pointer items-center gap-3 border-b no-underline"
              >
                <BookCover
                  initial={initialFor(book.title)}
                  color={coverColorFor(book.id)}
                  className="h-10 w-[32px] flex-none"
                  textClassName="text-sm"
                />
                <div className="min-w-0 flex-1">
                  <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap">
                    {book.title}
                  </div>
                  <div className="text-subtle text-xs">{book.author}</div>
                </div>
                <StatusTag status={book.status} />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3">Genres in your collection</h3>
          <div className="flex flex-col">
            {genreDistribution.map(([genre, count]) => (
              <div
                key={genre}
                className="border-divider flex h-14 items-center justify-between border-b py-2"
              >
                <span className="text-sm">{genre}</span>
                <span className="font-heading text-lg font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number | string
  icon: typeof Book
  filled?: boolean
}

function StatCard({ label, value, icon: Icon, filled }: StatCardProps) {
  return (
    <div className="card elev-sm gap-2">
      <div className="flex items-center justify-between">
        <span className="card-kicker m-0">{label}</span>
        <Icon
          size={16}
          strokeWidth={filled ? 1.5 : 1.6}
          className={cn('text-accent', filled && 'fill-accent')}
        />
      </div>
      <span className="font-heading text-4xl font-semibold tabular-nums">{value}</span>
    </div>
  )
}
