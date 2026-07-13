import { NavLink } from 'react-router'
import { BookOpen } from 'lucide-react'

export function Nav() {
  return (
    <nav className="nav sticky top-0 z-10 bg-bg">
      <span className="nav-brand flex items-center gap-2">
        <BookOpen size={20} strokeWidth={1.8} className="text-accent" />
        Book Tracker
      </span>
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/library">Library</NavLink>
    </nav>
  )
}
