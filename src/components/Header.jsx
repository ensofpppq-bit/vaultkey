import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Lock, Settings } from 'lucide-react'

function Header({ cartCount, adminAuth }) {
  return (
    <header className="gradient-vault text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:opacity-90 transition">
          <Lock size={32} />
          <span>Vault Key</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="hover:opacity-80 transition font-medium">
            Accueil
          </Link>
          
          <Link to="/cart" className="flex items-center gap-2 hover:opacity-80 transition">
            <ShoppingCart size={20} />
            <span className="font-medium">{cartCount}</span>
          </Link>

          {adminAuth && (
            <Link to="/admin" className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition">
              <Settings size={18} />
              <span>Admin</span>
            </Link>
          )}

          {!adminAuth && (
            <Link to="/admin" className="text-white/60 text-sm hover:text-white transition">
              Admin
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
