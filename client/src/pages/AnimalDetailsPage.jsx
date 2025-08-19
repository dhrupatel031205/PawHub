import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'

export default function AnimalDetailsPage() {
  const { id } = useParams()
  const [animal, setAnimal] = useState(null)

  useEffect(() => {
    api.get(`/api/animals/${id}`).then((res) => setAnimal(res.data))
  }, [id])

  if (!animal) return <div className="max-w-4xl mx-auto px-4 py-10">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-6">
        <img src={animal.images?.[0] || 'https://placehold.co/600x400'} alt={animal.name} className="rounded-2xl shadow" />
        <div>
          <h1 className="text-3xl font-bold">{animal.name}</h1>
          <div className="mt-2 text-gray-600">{animal.species} {animal.breed ? `• ${animal.breed}` : ''}</div>
          <div className="mt-4">Habitat: {animal.habitat || 'N/A'}</div>
          <div>Diet: {animal.diet || 'N/A'}</div>
          <div>Lifespan: {animal.lifespan || 'N/A'}</div>
          <div className="mt-4">
            <div className="font-semibold">Fun facts</div>
            <ul className="list-disc list-inside text-sm text-gray-700">
              {(animal.funFacts || []).map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

