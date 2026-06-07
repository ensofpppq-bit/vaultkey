import React from 'react'
import { Lock, Mail } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lock size={24} />
              <span className="font-bold text-xl">Vault Key</span>
            </div>
            <p className="text-gray-400">Clés USB premium et fiables pour tous vos besoins</p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Liens rapides</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white transition">Accueil</a></li>
              <li><a href="/cart" className="hover:text-white transition">Panier</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer">
              <Mail size={18} />
              <span>contact@vaultkey.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Vault Key. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
