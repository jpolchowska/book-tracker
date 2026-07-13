export type BookStatus = 'want' | 'reading' | 'finished'

export interface Book {
  id: number
  title: string
  author: string
  genre: string
  pages: number
  year: number
  status: BookStatus
  rating: number
  dateAdded: string
  dateFinished: string | null
  description: string
}
