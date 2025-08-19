import { useEffect, useState } from 'react'
import api from '../lib/api'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    api.get('/api/blogs').then((res) => setBlogs(res.data))
  }, [])
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">Blogs & Pet Care</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {blogs.map((b) => (
          <article key={b._id} className="rounded-2xl bg-white shadow p-5">
            <h3 className="font-semibold text-lg">{b.title}</h3>
            <div className="text-xs text-gray-500">{b.category || 'General'}</div>
            <p className="mt-2 text-sm text-gray-700">{b.content}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

