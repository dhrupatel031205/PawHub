import { useEffect, useState } from 'react'
import api from '../lib/api'
import Modal from '../components/Modal'
import BlogForm from '../components/forms/BlogForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [deletingBlog, setDeletingBlog] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadBlogs()
    loadUser()
  }, [])

  const loadBlogs = async () => {
    try {
      const res = await api.get('/api/blogs')
      setBlogs(res.data)
    } catch (err) {
      setBlogs([])
    }
  }

  const loadUser = async () => {
    try {
      const res = await api.get('/api/users/me')
      setUser(res.data)
    } catch (err) {
      setUser(null)
    }
  }

  const handleCreate = () => {
    setShowCreateModal(false)
    loadBlogs()
  }

  const handleEdit = () => {
    setEditingBlog(null)
    loadBlogs()
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/blogs/${deletingBlog._id}`)
      loadBlogs()
    } catch (err) {
      console.error('Failed to delete blog:', err)
    }
  }

  const canManageBlogs = user && (user.role === 'admin' || user.role === 'vet')

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blogs & Pet Care</h1>
        {canManageBlogs && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Write Blog
          </button>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.length === 0 && <div className="text-gray-500">No blogs available.</div>}
        {blogs.map((b) => (
          <article key={b._id} className="rounded-2xl bg-white shadow">
            <div className="p-5">
              <h3 className="font-semibold text-lg">{b.title}</h3>
              <div className="text-xs text-gray-500">{b.category || 'General'}</div>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">{b.content}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xs text-gray-400">
                  {new Date(b.createdAt).toLocaleDateString()}
                </div>
                {canManageBlogs && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingBlog(b)}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingBlog(b)}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Write New Blog"
      >
        <BlogForm
          onSuccess={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingBlog}
        onClose={() => setEditingBlog(null)}
        title="Edit Blog"
      >
        <BlogForm
          blog={editingBlog}
          onSuccess={handleEdit}
          onCancel={() => setEditingBlog(null)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingBlog}
        onClose={() => setDeletingBlog(null)}
        onConfirm={handleDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${deletingBlog?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}

