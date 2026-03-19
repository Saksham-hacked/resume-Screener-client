import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8">
        <Outlet />
      </main>
    </div>
  )
}
