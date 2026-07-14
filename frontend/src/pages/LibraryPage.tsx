import { Link, useNavigate } from 'react-router'
import { LayoutGrid, List, Plus, Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { BookCover } from '@/components/books/BookCover'
import { StatusTag } from '@/components/books/StatusTag'
import { StarRating } from '@/components/books/StarRating'
import { coverColorFor, initialFor, STATUS_LABEL } from '@/lib/book-utils'
import { filterAndSortBooks, uniqueSorted } from '@/lib/library-filters'
import { useBookStore } from '@/stores/book-store'
import { useBookFormStore } from '@/stores/book-form-store'
import {
  useLibraryFiltersStore,
  type RatingFilter,
  type SortBy,
  type StatusFilter,
} from '@/stores/library-filters-store'

const STATUS_FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want', label: STATUS_LABEL.want },
  { value: 'reading', label: STATUS_LABEL.reading },
  { value: 'finished', label: STATUS_LABEL.finished },
]

export function LibraryPage() {
  const navigate = useNavigate()
  const books = useBookStore((s) => s.books)
  const openForCreate = useBookFormStore((s) => s.openForCreate)

  const viewMode = useLibraryFiltersStore((s) => s.viewMode)
  const search = useLibraryFiltersStore((s) => s.search)
  const author = useLibraryFiltersStore((s) => s.author)
  const genre = useLibraryFiltersStore((s) => s.genre)
  const rating = useLibraryFiltersStore((s) => s.rating)
  const status = useLibraryFiltersStore((s) => s.status)
  const sortBy = useLibraryFiltersStore((s) => s.sortBy)
  const setViewMode = useLibraryFiltersStore((s) => s.setViewMode)
  const setSearch = useLibraryFiltersStore((s) => s.setSearch)
  const setAuthor = useLibraryFiltersStore((s) => s.setAuthor)
  const setGenre = useLibraryFiltersStore((s) => s.setGenre)
  const setRating = useLibraryFiltersStore((s) => s.setRating)
  const setStatus = useLibraryFiltersStore((s) => s.setStatus)
  const setSortBy = useLibraryFiltersStore((s) => s.setSortBy)

  const authorOptions = uniqueSorted(books.map((b) => b.author))
  const genreOptions = uniqueSorted(books.map((b) => b.genre))
  const filteredBooks = filterAndSortBooks(books, {
    search,
    author,
    genre,
    rating,
    status,
    sortBy,
  })

  return (
    <div>
      <PageHeader
        title="Library"
        subtitle={`${filteredBooks.length} of ${books.length} books`}
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
            <button type="button" className="btn btn-primary" onClick={openForCreate}>
              <Plus size={14} />
              Add book
            </button>
          </div>
        }
      />

      <div className="border-divider mb-6 flex flex-wrap items-end gap-3 rounded-md border p-4">
        <div className="field min-w-[200px] flex-1">
          <label>Search</label>
          <div className="relative">
            <Search
              size={15}
              className="absolute top-1/2 left-[9px] -translate-y-1/2 opacity-50"
            />
            <input
              className="input pl-[30px]"
              type="text"
              placeholder="Title or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="field min-w-[160px]">
          <label>Author</label>
          <select className="input" value={author} onChange={(e) => setAuthor(e.target.value)}>
            <option value="all">All</option>
            {authorOptions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div className="field min-w-[160px]">
          <label>Genre</label>
          <select className="input" value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="all">All</option>
            {genreOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className="field min-w-[140px]">
          <label>Rating</label>
          <select
            className="input"
            value={rating}
            onChange={(e) => setRating(e.target.value as RatingFilter)}
          >
            <option value="all">Any</option>
            <option value="5">5</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
        </div>
        <div className="field min-w-[160px]">
          <label>Sort by</label>
          <select
            className="input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="dateAdded">Date added</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="seg">
          {STATUS_FILTER_OPTIONS.map((opt) => (
            <label key={opt.value} className="seg-opt">
              <input
                type="radio"
                name="statusfilter"
                checked={status === opt.value}
                onChange={() => setStatus(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      {filteredBooks.length === 0 && (
        <p className="text-subtle py-6 text-center">No books match the selected filters.</p>
      )}

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredBooks.map((book) => (
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
        filteredBooks.length > 0 && (
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
              {filteredBooks.map((book) => (
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
        )
      )}
    </div>
  )
}
