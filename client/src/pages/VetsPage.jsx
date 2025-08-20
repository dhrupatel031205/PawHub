import { useEffect, useState } from 'react'
import api from '../lib/api'
import Modal from '../components/Modal'
import VetForm from '../components/forms/VetForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function VetsPage() {
  const [vets, setVets] = useState([])
  const [q, setQ] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingVet, setEditingVet] = useState(null)
  const [deletingVet, setDeletingVet] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadVets()
    loadUser()
  }, [])

  const loadVets = async () => {
    try {
      const res = await api.get('/api/vets')
      setVets(res.data)
    } catch (err) {
      setVets([])
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
    loadVets()
  }

  const handleEdit = () => {
    setEditingVet(null)
    loadVets()
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/vets/${deletingVet._id}`)
      loadVets()
    } catch (err) {
      console.error('Failed to delete vet:', err)
    }
  }

  const canManageVets = user && user.role === 'admin'
  const filtered = vets.filter((v) => `${v.name} ${v.city} ${v.pincode}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Find a Veterinarian</h1>
        {canManageVets && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Vet
          </button>
        )}
      </div>
      
      <input 
        value={q} 
        onChange={(e) => setQ(e.target.value)} 
        placeholder="Search by name/city/pincode" 
        className="border px-3 py-2 rounded-md w-full" 
      />
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filtered.length === 0 && <div className="text-gray-500">No vets found.</div>}
        {filtered.map((v) => (
          <div key={v._id} className="rounded-2xl overflow-hidden bg-white shadow">
            <div className="p-4">
              <div className="font-semibold">{v.name}</div>
              <div className="text-sm text-gray-600">{v.specialization}</div>
              <div className="text-sm text-gray-600">{v.address}</div>
              <div className="text-sm">{v.city} • {v.pincode}</div>
              <div className="text-sm mt-2">☎ {v.phone}</div>
              {v.rating > 0 && (
                <div className="text-sm text-yellow-600 mt-1">★ {v.rating}/5</div>
              )}
            </div>
            {canManageVets && (
              <div className="px-4 pb-4 flex space-x-2">
                <button
                  onClick={() => setEditingVet(v)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingVet(v)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Veterinarian"
      >
        <VetForm
          onSuccess={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingVet}
        onClose={() => setEditingVet(null)}
        title="Edit Veterinarian"
      >
        <VetForm
          vet={editingVet}
          onSuccess={handleEdit}
          onCancel={() => setEditingVet(null)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingVet}
        onClose={() => setDeletingVet(null)}
        onConfirm={handleDelete}
        title="Delete Veterinarian"
        message={`Are you sure you want to delete Dr. ${deletingVet?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

