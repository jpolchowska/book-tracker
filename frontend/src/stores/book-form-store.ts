import { create } from 'zustand'

interface BookFormStoreState {
  isOpen: boolean
  editingId: number | null
  openForCreate: () => void
  openForEdit: (id: number) => void
  close: () => void
}

export const useBookFormStore = create<BookFormStoreState>((set) => ({
  isOpen: false,
  editingId: null,
  openForCreate: () => set({ isOpen: true, editingId: null }),
  openForEdit: (id) => set({ isOpen: true, editingId: id }),
  close: () => set({ isOpen: false, editingId: null }),
}))
