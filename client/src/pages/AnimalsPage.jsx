import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/api/animals').then((res) => setAnimals(res.data))
  }, [])

  const filtered = animals.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Animal Encyclopedia</h1>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search animals..." className="border px-3 py-2 rounded-md" />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filtered.map((a) => (
          <Link key={a._id} to={`/animals/${a._id}`} className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white">
            <img src={a.images?.[0] || 'https://placehold.co/600x400'} alt={a.name} className="h-44 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm text-gray-600">{a.species} • {a.location || 'Unknown'}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

