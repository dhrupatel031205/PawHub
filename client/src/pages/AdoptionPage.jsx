import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function AdoptionPage() {
  const [adoptions, setAdoptions] = useState([])

  useEffect(() => {
    api.get('/api/adoptions').then((res) => setAdoptions(res.data)).catch(() => setAdoptions([]))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Adoption Center</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {adoptions.length === 0 && <div className="text-gray-500">No adoption listings.</div>}
        {adoptions.map((a) => (
          <div key={a._id} className="rounded-2xl overflow-hidden bg-white shadow">
            <img src={a.animalId?.images?.[0] || 'https://placehold.co/600x400'} alt={a.animalId?.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold">{a.animalId?.name}</div>
              <div className="text-sm text-gray-600 capitalize">Status: {a.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

