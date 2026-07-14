import { z } from 'zod'

const optionalPositiveIntString = z
  .string()
  .optional()
  .refine((value) => !value || /^\d+$/.test(value), {
    message: 'Must be a positive whole number',
  })

export const bookFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  author: z.string().trim().min(1, 'Author is required').max(200),
  genre: z.string().trim().max(100).optional(),
  pages: optionalPositiveIntString,
  year: optionalPositiveIntString,
  description: z.string().trim().max(2000).optional(),
  status: z.enum(['want', 'reading', 'finished']),
  rating: z.number().int().min(0).max(5),
})

export type BookFormValues = z.infer<typeof bookFormSchema>

export const DEFAULT_BOOK_FORM_VALUES: BookFormValues = {
  title: '',
  author: '',
  genre: '',
  pages: '',
  year: '',
  description: '',
  status: 'want',
  rating: 0,
}
