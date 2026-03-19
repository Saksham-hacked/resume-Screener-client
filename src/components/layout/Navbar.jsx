import { NavLink } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-green-600 font-semibold border-b-2 border-green-600 pb-0.5'
      : 'text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <Leaf className="text-green-600" size={22} />
          <span className="text-lg font-bold text-gray-900">NutaScreener</span>
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/screening" className={linkClass}>Screen Candidates</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
        </nav>
      </div>
    </header>
  )
}
