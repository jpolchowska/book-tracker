import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { BookCover } from '@/components/books/BookCover'
import { StatusTag } from '@/components/books/StatusTag'
import { StarRating } from '@/components/books/StarRating'
import { MOCK_BOOKS } from '@/data/mock-books'
import { coverColorFor, initialFor } from '@/lib/book-utils'

type ViewMode = 'cards' | 'table'

export function LibraryPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('cards')
  const navigate = useNavigate()
  const books = MOCK_BOOKS

  return (
    <div>
      <PageHeader
        title="Library"
        subtitle={`${books.length} of ${books.length} books`}
        action={
          <div className="flex items-center gap-3">
            <div className="seg">
              <label className="seg-opt">
                <input
                  type="radio"
                  name="viewmode"
                  checked={viewMode === 'cards'}
                  onChange={() => setViewMode('cards')}
                />
                <LayoutGrid size={14} />
                Cards
              </label>
              <label className="seg-opt">
                <input
                  type="radio"
                  name="viewmode"
                  checked={viewMode === 'table'}
                  onChange={() => setViewMode('table')}
                />
                <List size={14} />
                Table
              </label>
            </div>
            <button type="button" className="btn btn-primary">
              <Plus size={14} />
              Add book
            </button>
          </div>
        }
      />

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-4 gap-4">
          {books.map((book) => (
            <Link
              key={book.id}
              to={`/library/${book.id}`}
              className="card elev-sm text-text no-underline"
            >
              <BookCover
                initial={initialFor(book.title)}
                color={coverColorFor(book.id)}
                className="mb-1 h-[150px] w-full"
                textClassName="text-5xl"
              />
              <StatusTag status={book.status} className="self-start" />
              <div className="card-title">{book.title}</div>
              <div className="card-meta">{book.author}</div>
              <div className="mt-auto flex items-center justify-between">
                <StarRating rating={book.rating} />
                <span className="card-meta">{book.pages} pages</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Pages</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr
                key={book.id}
                className="cursor-pointer"
                onClick={() => navigate(`/library/${book.id}`)}
              >
                <td>
                  <BookCover
                    initial={initialFor(book.title)}
                    color={coverColorFor(book.id)}
                    className="h-[44px] w-[30px]"
                    textClassName="text-[13px]"
                  />
                </td>
                <td className="font-heading font-semibold">{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <StatusTag status={book.status} />
                </td>
                <td>
                  <StarRating rating={book.rating} />
                </td>
                <td className="tabular-nums">{book.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
