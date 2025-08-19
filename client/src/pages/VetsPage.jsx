import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function VetsPage() {
  const [vets, setVets] = useState([])
  const [q, setQ] = useState('')

  useEffect(() => {
    api.get('/api/vets').then((res) => setVets(res.data))
  }, [])

  const filtered = vets.filter((v) => `${v.name} ${v.city} ${v.pincode}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Find a Veterinarian</h1>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name/city/pincode" className="border px-3 py-2 rounded-md mt-4 w-full" />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.map((v) => (
          <div key={v._id} className="rounded-2xl overflow-hidden bg-white shadow p-4">
            <div className="font-semibold">{v.name}</div>
            <div className="text-sm text-gray-600">{v.address}</div>
            <div className="text-sm">{v.city} • {v.pincode}</div>
            <div className="text-sm mt-2">☎ {v.phone}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

