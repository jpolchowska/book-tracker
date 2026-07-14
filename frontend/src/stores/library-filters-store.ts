import { create } from 'zustand'
import type { BookStatus } from '@/types/book'

export type ViewMode = 'cards' | 'table'
export type RatingFilter = 'all' | '1' | '2' | '3' | '4' | '5'
export type StatusFilter = 'all' | BookStatus
export type SortBy = 'title' | 'author' | 'dateAdded' | 'rating'

interface LibraryFiltersState {
  viewMode: ViewMode
  search: string
  author: string
  genre: string
  rating: RatingFilter
  status: StatusFilter
  sortBy: SortBy
  setViewMode: (mode: ViewMode) => void
  setSearch: (value: string) => void
  setAuthor: (value: string) => void
  setGenre: (value: string) => void
  setRating: (value: RatingFilter) => void
  setStatus: (value: StatusFilter) => void
  setSortBy: (value: SortBy) => void
}

export const useLibraryFiltersStore = create<LibraryFiltersState>((set) => ({
  viewMode: 'cards',
  search: '',
  author: 'all',
  genre: 'all',
  rating: 'all',
  status: 'all',
  sortBy: 'title',

  setViewMode: (viewMode) => set({ viewMode }),
  setSearch: (search) => set({ search }),
  setAuthor: (author) => set({ author }),
  setGenre: (genre) => set({ genre }),
  setRating: (rating) => set({ rating }),
  setStatus: (status) => set({ status }),
  setSortBy: (sortBy) => set({ sortBy }),
}))
