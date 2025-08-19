import { useState } from 'react'
import api from '../../lib/api'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from '../../components/Toaster.jsx'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/auth/register', { name, email, password, role })
      localStorage.setItem('token', data.token)
      toast({ title: 'Welcome to PawHub!' })
      navigate('/')
    } catch (e) {
      toast({ title: 'Register failed', type: 'error' })
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border px-3 py-2 rounded-md" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded-md" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded-md" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border px-3 py-2 rounded-md">
          <option value="user">User</option>
          <option value="vet">Veterinarian</option>
        </select>
        <button className="w-full py-2 bg-pawGreen text-white rounded-md">Register</button>
        <div className="text-sm">Already have an account? <Link to="/login" className="text-pawGreen">Login</Link></div>
      </form>
    </div>
  )
}

