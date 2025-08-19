import { useEffect, useState } from 'react'
import api from '../lib/api'
import { toast } from '../components/Toaster.jsx'

export default function ProfilePage() {
  const [me, setMe] = useState(null)

  useEffect(() => {
    api.get('/api/users/me')
      .then((res) => setMe(res.data))
      .catch(() => toast({ title: 'Login required', type: 'error' }))
  }, [])

  if (!me) return <div className="max-w-4xl mx-auto px-4 py-10">Please log in to view your profile.</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Hello, {me.name} 🐾</h1>
      <div className="mt-4 text-sm">Role: {me.role}</div>
      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white shadow p-5">
          <div className="font-semibold mb-2">Saved Animals</div>
          <div className="text-gray-600 text-sm">Coming soon…</div>
        </div>
        <div className="rounded-2xl bg-white shadow p-5">
          <div className="font-semibold mb-2">Adoption History</div>
          <div className="text-gray-600 text-sm">Coming soon…</div>
        </div>
      </div>
    </div>
  )
}

