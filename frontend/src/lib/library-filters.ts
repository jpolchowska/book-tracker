import type { Book } from '@/types/book'
import type { RatingFilter, SortBy, StatusFilter } from '@/stores/library-filters-store'

interface LibraryFilters {
  search: string
  author: string
  genre: string
  rating: RatingFilter
  status: StatusFilter
  sortBy: SortBy
}

export function filterAndSortBooks(books: Book[], filters: LibraryFilters): Book[] {
  const filtered = books.filter((book) => {
    if (filters.status !== 'all' && book.status !== filters.status) return false
    if (filters.genre !== 'all' && book.genre !== filters.genre) return false
    if (filters.author !== 'all' && book.author !== filters.author) return false
    if (filters.rating !== 'all' && book.rating < Number(filters.rating)) return false

    if (filters.search) {
      const query = filters.search.toLowerCase()
      const matchesTitle = book.title.toLowerCase().includes(query)
      const matchesAuthor = book.author.toLowerCase().includes(query)
      if (!matchesTitle && !matchesAuthor) return false
    }

    return true
  })

  return [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'author':
        return a.author.localeCompare(b.author)
      case 'dateAdded':
        return a.dateAdded < b.dateAdded ? 1 : -1
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })
}

export function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort()
}
