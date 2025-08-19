import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [vets, setVets] = useState([])

  useEffect(() => {
    api.get('/api/users').then((r) => setUsers(r.data)).catch(() => {})
    api.get('/api/vets').then((r) => setVets(r.data))
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="rounded-2xl bg-white shadow p-5">
          <div className="font-semibold mb-3">Users</div>
          <ul className="space-y-1 text-sm">
            {users.map((u) => (
              <li key={u._id} className="flex justify-between"><span>{u.name}</span><span className="uppercase text-gray-500">{u.role}</span></li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white shadow p-5">
          <div className="font-semibold mb-3">Vets</div>
          <ul className="space-y-1 text-sm">
            {vets.map((v) => (
              <li key={v._id} className="flex justify-between"><span>{v.name}</span><span className="text-gray-500">{v.city}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

