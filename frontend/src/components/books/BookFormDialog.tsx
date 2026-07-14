import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useBookFormStore } from '@/stores/book-form-store'
import { useBookStore } from '@/stores/book-store'
import {
  bookFormSchema,
  DEFAULT_BOOK_FORM_VALUES,
  type BookFormValues,
} from '@/lib/book-form-schema'
import type { BookStatus } from '@/types/book'

const STATUS_OPTIONS: { value: BookStatus; label: string }[] = [
  { value: 'want', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
]

export function BookFormDialog() {
  const isOpen = useBookFormStore((s) => s.isOpen)
  const editingId = useBookFormStore((s) => s.editingId)
  const close = useBookFormStore((s) => s.close)

  if (!isOpen) return null

  return <BookFormDialogContent key={editingId ?? 'new'} editingId={editingId} onClose={close} />
}

interface BookFormDialogContentProps {
  editingId: number | null
  onClose: () => void
}

function BookFormDialogContent({ editingId, onClose }: BookFormDialogContentProps) {
  const books = useBookStore((s) => s.books)
  const addBook = useBookStore((s) => s.addBook)
  const updateBook = useBookStore((s) => s.updateBook)

  const editingBook = editingId != null ? books.find((b) => b.id === editingId) : undefined

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: editingBook
      ? {
          title: editingBook.title,
          author: editingBook.author,
          genre: editingBook.genre,
          pages: editingBook.pages ? String(editingBook.pages) : '',
          year: editingBook.year ? String(editingBook.year) : '',
          description: editingBook.description,
          status: editingBook.status,
          rating: editingBook.rating,
        }
      : DEFAULT_BOOK_FORM_VALUES,
  })

  const rating = watch('rating')

  const onSubmit = (values: BookFormValues) => {
    const input = {
      title: values.title,
      author: values.author,
      genre: values.genre,
      pages: values.pages ? Number(values.pages) : undefined,
      year: values.year ? Number(values.year) : undefined,
      description: values.description,
      status: values.status,
      rating: values.rating,
    }
    if (editingId != null) {
      updateBook(editingId, input)
    } else {
      addBook(input)
    }
    onClose()
  }

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog w-[92vw] max-w-[720px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-form-dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="book-form-dialog-title" className="dialog-title">
          {editingId != null ? 'Edit book' : 'Add a new book'}
        </div>
        <div className="dialog-body">
          <p className="text-subtle mt-0 mb-4">
            {editingId != null
              ? 'Update the details for this book.'
              : 'Fill in the basic details to add a book to your library.'}
          </p>
          <form id="book-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 gap-4">
              <div className="field col-span-3">
                <label>Title</label>
                <input className="input" placeholder="e.g. 1984" {...register('title')} />
                {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
              </div>
              <div className="field col-span-2">
                <label>Author</label>
                <input
                  className="input"
                  placeholder="e.g. George Orwell"
                  {...register('author')}
                />
                {errors.author && (
                  <p className="mt-1 text-xs text-red-600">{errors.author.message}</p>
                )}
              </div>
              <div className="field">
                <label>Genre</label>
                <input
                  className="input"
                  placeholder="e.g. Science Fiction"
                  {...register('genre')}
                />
              </div>
              <div className="field">
                <label>Pages</label>
                <input
                  className="input"
                  type="number"
                  min={1}
                  placeholder="328"
                  {...register('pages')}
                />
                {errors.pages && <p className="mt-1 text-xs text-red-600">{errors.pages.message}</p>}
              </div>
              <div className="field">
                <label>Publication year</label>
                <input
                  className="input"
                  type="number"
                  min={1}
                  placeholder="1949"
                  {...register('year')}
                />
                {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year.message}</p>}
              </div>
              <div className="field col-span-3">
                <label>Description</label>
                <textarea
                  className="input"
                  placeholder="A short description of the book…"
                  {...register('description')}
                />
              </div>
              <div className="field col-span-3">
                <label>Status</label>
                <div className="seg w-full">
                  {STATUS_OPTIONS.map((opt) => (
                    <label key={opt.value} className="seg-opt flex-1 justify-center">
                      <input type="radio" value={opt.value} {...register('status')} />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="field col-span-3">
                <label>Rating</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      className="btn-icon p-[2px]"
                      onClick={() => setValue('rating', n, { shouldValidate: true })}
                      aria-label={`${n} star`}
                    >
                      <Star
                        size={24}
                        strokeWidth={1.5}
                        className={cn(
                          'text-accent',
                          n <= rating ? 'fill-accent' : 'fill-none',
                        )}
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    className="btn btn-ghost px-2 text-xs"
                    onClick={() => setValue('rating', 0, { shouldValidate: true })}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="dialog-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" form="book-form" className="btn btn-primary">
            {editingId != null ? 'Save changes' : 'Add book'}
          </button>
        </div>
      </div>
    </div>
  )
}
