import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function LostFoundPage() {
  const [items, setItems] = useState([])
  const [type, setType] = useState('')

  useEffect(() => {
    api.get('/api/lostfound', { params: { type } }).then((res) => setItems(res.data)).catch(() => setItems([]))
  }, [type])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lost & Found</h1>
        <select value={type} onChange={(e) => setType(e.target.value)} className="border px-3 py-2 rounded-md">
          <option value="">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {items.length === 0 && <div className="text-gray-500">No reports.</div>}
        {items.map((i) => (
          <div key={i._id} className="rounded-2xl overflow-hidden bg-white shadow">
            <img src={i.imageUrl || 'https://placehold.co/600x400'} alt={i.type} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="font-semibold capitalize">{i.type}</div>
              <div className="text-sm text-gray-600">{i.description}</div>
              <div className="text-xs text-gray-500 mt-1">{i.location || 'Unknown'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

