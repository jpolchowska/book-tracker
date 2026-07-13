import { useParams } from 'react-router'

export function BookDetailsPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Book details</h1>
      <p className="text-subtle">Book id: {id} — coming in a later step.</p>
    </div>
  )
}
