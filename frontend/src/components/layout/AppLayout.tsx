import { Outlet } from 'react-router'
import { Nav } from './Nav'
import { BookFormDialog } from '@/components/books/BookFormDialog'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="mx-auto w-full max-w-[1360px] flex-1 px-8 pt-6 pb-8">
        <Outlet />
      </div>
      <BookFormDialog />
    </div>
  )
}
