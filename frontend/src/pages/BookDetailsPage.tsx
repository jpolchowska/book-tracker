import { Link, useParams } from 'react-router'
import { ChevronLeft, Pencil, Trash2 } from 'lucide-react'
import { BookCover } from '@/components/books/BookCover'
import { StatusTag } from '@/components/books/StatusTag'
import { StarRating } from '@/components/books/StarRating'
import { MOCK_BOOKS } from '@/data/mock-books'
import { coverColorFor, formatDate, initialFor } from '@/lib/book-utils'

export function BookDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const book = MOCK_BOOKS.find((b) => b.id === Number(id))

  if (!book) {
    return (
      <div>
        <p className="text-subtle">Book not found.</p>
        <Link to="/library" className="btn btn-ghost pl-0">
          <ChevronLeft size={15} />
          Back to library
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/library" className="btn btn-ghost mb-4 pl-0">
        <ChevronLeft size={15} />
        Back to library
      </Link>

      <div className="grid grid-cols-[220px_1fr] gap-8">
        <div>
          <BookCover
            initial={initialFor(book.title)}
            color={coverColorFor(book.id)}
            className="mb-4 aspect-2/3 w-full"
            textClassName="text-7xl"
          />
          <div className="flex flex-col gap-2">
            <button type="button" className="btn btn-primary btn-block">
              <Pencil size={14} />
              Edit
            </button>
            <button type="button" className="btn btn-secondary btn-block">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>

        <div>
          <StatusTag status={book.status} className="mb-2" />
          <h1 className="mb-1">{book.title}</h1>
          <p className="text-subtle mb-2 text-base">{book.author}</p>
          <div className="mb-4 flex items-center gap-4">
            <StarRating rating={book.rating} size={18} />
            <span className="text-subtle text-[13px]">
              {book.genre} · {book.pages} pages · {book.year}
            </span>
          </div>

          <hr className="hr" />
          <h5 className="text-subtle mb-2">Description</h5>
          <p className="max-w-[60ch] text-justify">{book.description}</p>

          <hr className="hr" />
          <h5 className="text-subtle mb-2">Notes</h5>
          <div className="card bg-surface border-dashed">
            <p className="card-body italic">
              No notes yet — add your thoughts while you read.
            </p>
          </div>

          <hr className="hr" />
          <div className="flex gap-8">
            <div>
              <h6 className="text-subtle">Date added</h6>
              <p className="m-0 tabular-nums">{formatDate(book.dateAdded)}</p>
            </div>
            <div>
              <h6 className="text-subtle">Date finished</h6>
              <p className="m-0 tabular-nums">{formatDate(book.dateFinished)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
