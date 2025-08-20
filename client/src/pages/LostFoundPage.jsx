import { useEffect, useState } from 'react'
import api from '../lib/api'
import Modal from '../components/Modal'
import LostFoundForm from '../components/forms/LostFoundForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function LostFoundPage() {
  const [items, setItems] = useState([])
  const [type, setType] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [deletingItem, setDeletingItem] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadItems()
    loadUser()
  }, [type])

  const loadItems = async () => {
    try {
      const res = await api.get('/api/lostfound', { params: { type } })
      setItems(res.data)
    } catch (err) {
      setItems([])
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
    loadItems()
  }

  const handleEdit = () => {
    setEditingItem(null)
    loadItems()
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/lostfound/${deletingItem._id}`)
      loadItems()
    } catch (err) {
      console.error('Failed to delete item:', err)
    }
  }

  const canEdit = (item) => {
    return user && (user.role === 'admin' || item.createdBy === user.id)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Lost & Found</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="border px-3 py-2 rounded-md"
          >
            <option value="">All</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
          {user && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Report Pet
            </button>
          )}
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.length === 0 && <div className="text-gray-500">No reports.</div>}
        {items.map((i) => (
          <div key={i._id} className="rounded-2xl overflow-hidden bg-white shadow">
            <img src={i.images?.[0] || 'https://placehold.co/600x400'} alt={i.type} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${i.type === 'Lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {i.type}
                  </div>
                  <div className="font-semibold">{i.petName || 'Unknown Pet'}</div>
                  <div className="text-sm text-gray-600">{i.species} • {i.lastSeenLocation}</div>
                  <div className="text-sm text-gray-700 mt-1">{i.description}</div>
                </div>
                {canEdit(i) && (
                  <div className="flex space-x-1 ml-2">
                    <button
                      onClick={() => setEditingItem(i)}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingItem(i)}
                      className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              {i.contactPhone && (
                <div className="text-sm text-blue-600 mt-2">
                  Contact: {i.contactPhone}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Report Lost or Found Pet"
      >
        <LostFoundForm
          onSuccess={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Report"
      >
        <LostFoundForm
          item={editingItem}
          onSuccess={handleEdit}
          onCancel={() => setEditingItem(null)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        title="Delete Report"
        message={`Are you sure you want to delete this ${deletingItem?.type?.toLowerCase()} pet report? This action cannot be undone.`}
      />
    </div>
  )
}

