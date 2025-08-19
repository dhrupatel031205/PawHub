import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from './components/Toaster.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import AnimalsPage from './pages/AnimalsPage.jsx'
import AnimalDetailsPage from './pages/AnimalDetailsPage.jsx'
import AdoptionPage from './pages/AdoptionPage.jsx'
import LostFoundPage from './pages/LostFoundPage.jsx'
import VetsPage from './pages/VetsPage.jsx'
import BlogsPage from './pages/BlogsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'

export default function App() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className={dark ? 'dark bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}>
      <Navbar onToggleDark={() => setDark((d) => !d)} />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/animals" element={<AnimalsPage />} />
          <Route path="/animals/:id" element={<AnimalDetailsPage />} />
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/lost-found" element={<LostFoundPage />} />
          <Route path="/vets" element={<VetsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
