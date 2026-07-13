import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  size?: number
}

export function StarRating({ rating, size = 13 }: StarRatingProps) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.5}
          className={cn(n <= rating ? 'fill-accent text-accent' : 'fill-divider text-divider')}
        />
      ))}
    </div>
  )
}
