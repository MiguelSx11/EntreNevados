'use client'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { FormattedMessage } from 'react-intl'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const { user, setUser } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  const handleCategoriasClick = () => {
    if (typeof window !== 'undefined') {
      const catSection = document.getElementById('categorias')
      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' })
      else router.push('/#categorias')
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <div className="flex items-center space-x-2">
        <img src="/images/entrenevados.png" alt="logo" className="h-12 w-auto" />
      </div>
      <div className="flex items-center space-x-4">
        <a href="/" className="hover:text-green-600">
          <FormattedMessage id="home" defaultMessage="Home" />
        </a>
        <button
          className="hover:text-green-600 bg-transparent"
          style={{ border: 'none', background: 'none', cursor: 'pointer' }}
          onClick={handleCategoriasClick}
        >
          <FormattedMessage id="categories" defaultMessage="Categories" />
        </button>

        {!user ? (
          <>
            <a href="/login" className="hover:text-green-600">
              <FormattedMessage id="login" defaultMessage="Login" />
            </a>
            <a
              href="/login"
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              <FormattedMessage id="register" defaultMessage="Register" />
            </a>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="text-gray-700">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              <FormattedMessage id="logout" defaultMessage="Logout" />
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
