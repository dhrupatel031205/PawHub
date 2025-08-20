import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'
import Modal from '../components/Modal'
import AnimalForm from '../components/forms/AnimalForm'
import ConfirmDialog from '../components/ConfirmDialog'

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([])
  const [q, setQ] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)
  const [deletingAnimal, setDeletingAnimal] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadAnimals()
    loadUser()
  }, [])

  const loadAnimals = async () => {
    try {
      const res = await api.get('/api/animals')
      setAnimals(res.data)
    } catch (err) {
      setAnimals([])
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
    loadAnimals()
  }

  const handleEdit = () => {
    setEditingAnimal(null)
    loadAnimals()
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/api/animals/${deletingAnimal._id}`)
      loadAnimals()
    } catch (err) {
      console.error('Failed to delete animal:', err)
    }
  }

  const canManageAnimals = user && (user.role === 'admin' || user.role === 'vet')
  const filtered = animals.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Animal Encyclopedia</h1>
        <div className="flex items-center space-x-4">
          <input 
            value={q} 
            onChange={(e) => setQ(e.target.value)} 
            placeholder="Search animals..." 
            className="border px-3 py-2 rounded-md" 
          />
          {canManageAnimals && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Animal
            </button>
          )}
        </div>
      </div>
      
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-500">No animals to display.</div>
        )}
        {filtered.map((a) => (
          <div key={a._id} className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white">
            <Link to={`/animals/${a._id}`}>
              <img src={a.images?.[0] || 'https://placehold.co/600x400'} alt={a.name} className="h-44 w-full object-cover" />
              <div className="p-4">
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-gray-600">{a.species} • {a.location || 'Unknown'}</div>
              </div>
            </Link>
            {canManageAnimals && (
              <div className="px-4 pb-4 flex space-x-2">
                <button
                  onClick={() => setEditingAnimal(a)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingAnimal(a)}
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
        title="Add New Animal"
      >
        <AnimalForm
          onSuccess={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!editingAnimal}
        onClose={() => setEditingAnimal(null)}
        title="Edit Animal"
      >
        <AnimalForm
          animal={editingAnimal}
          onSuccess={handleEdit}
          onCancel={() => setEditingAnimal(null)}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingAnimal}
        onClose={() => setDeletingAnimal(null)}
        onConfirm={handleDelete}
        title="Delete Animal"
        message={`Are you sure you want to delete ${deletingAnimal?.name}? This action cannot be undone.`}
      />
    </div>
  )
}

