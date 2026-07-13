import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Temporary smoke test to confirm Tailwind + shadcn/ui (Base UI) + Lucide
// are wired up correctly. Replaced with the real layout in the next step.
function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-semibold">Book Tracker</h1>
      <Button>
        <BookOpen />
        shadcn/ui is working
      </Button>
    </div>
  )
}

export default App
