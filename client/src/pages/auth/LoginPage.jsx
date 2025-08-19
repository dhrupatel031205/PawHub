import { useState } from 'react'
import api from '../../lib/api'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from '../../components/Toaster.jsx'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@pawhub.dev')
  const [password, setPassword] = useState('password123')
  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      toast({ title: 'Welcome back!' })
      navigate('/')
    } catch (e) {
      toast({ title: 'Login failed', type: 'error' })
    }
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" className="w-full border px-3 py-2 rounded-md" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full border px-3 py-2 rounded-md" />
        <button className="w-full py-2 bg-pawGreen text-white rounded-md">Login</button>
        <div className="text-sm">No account? <Link to="/register" className="text-pawGreen">Register</Link></div>
      </form>
    </div>
  )
}

