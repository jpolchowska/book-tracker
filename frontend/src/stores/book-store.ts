import { create } from 'zustand'
import { MOCK_BOOKS } from '@/data/mock-books'
import type { Book, BookStatus } from '@/types/book'

export interface BookFormInput {
  title: string
  author: string
  genre?: string
  pages?: number
  year?: number
  description?: string
  status: BookStatus
  rating: number
}

interface BookStoreState {
  books: Book[]
  addBook: (input: BookFormInput) => void
  updateBook: (id: number, input: BookFormInput) => void
  deleteBook: (id: number) => void
}

export const useBookStore = create<BookStoreState>((set) => ({
  books: MOCK_BOOKS,

  addBook: (input) =>
    set((state) => {
      const nextId = state.books.length ? Math.max(...state.books.map((b) => b.id)) + 1 : 1
      const newBook: Book = {
        id: nextId,
        title: input.title,
        author: input.author,
        genre: input.genre?.trim() || 'Unsorted',
        pages: input.pages ?? 0,
        year: input.year ?? new Date().getFullYear(),
        description: input.description ?? '',
        status: input.status,
        rating: input.rating,
        dateAdded: new Date().toISOString().slice(0, 10),
        dateFinished: null,
      }
      return { books: [...state.books, newBook] }
    }),

  updateBook: (id, input) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id
          ? {
              ...book,
              title: input.title,
              author: input.author,
              genre: input.genre?.trim() || 'Unsorted',
              pages: input.pages ?? 0,
              year: input.year ?? book.year,
              description: input.description ?? '',
              status: input.status,
              rating: input.rating,
            }
          : book,
      ),
    })),

  deleteBook: (id) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
}))
