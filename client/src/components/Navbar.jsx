import { Link, NavLink } from 'react-router-dom'
import { FaPaw, FaMoon, FaSun } from 'react-icons/fa'

export default function Navbar({ onToggleDark }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <FaPaw className="text-pawGreen" /> PawHub
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/animals" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Animals</NavLink>
          <NavLink to="/adoption" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Adoption</NavLink>
          <NavLink to="/lost-found" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Lost & Found</NavLink>
          <NavLink to="/vets" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Vets</NavLink>
          <NavLink to="/blogs" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Blogs</NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? 'text-pawGreen font-semibold' : 'hover:text-pawGreen'}>Profile</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <button aria-label="Toggle theme" onClick={onToggleDark} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <FaMoon className="hidden dark:inline text-pawYellow" />
            <FaSun className="inline dark:hidden text-pawYellow" />
          </button>
          <Link to="/login" className="px-4 py-2 bg-pawGreen text-white rounded-full hover:shadow-md">Login</Link>
        </div>
      </div>
    </header>
  )
}

