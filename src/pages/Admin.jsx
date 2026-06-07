import React, { useState } from 'react'
import { Plus, Trash2, Edit2, LogOut } from 'lucide-react'

function Admin({ products, updateProducts, adminAuth, setAdminAuth }) {
  const [password, setPassword] = useState('')
  const [showLogin, setShowLogin] = useState(!adminAuth)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    image: '💾'
  })
  const [successMessage, setSuccessMessage] = useState('')

  const ADMIN_PASSWORD = 'vault_admin_2024'

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_token', password)
      setAdminAuth(true)
      setShowLogin(false)
      setPassword('')
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    setAdminAuth(false)
    setShowLogin(true)
    setPassword('')
    setFormData({ name: '', price: '', stock: '', image: '💾' })
  }

  const handleAddProduct = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Veuillez remplir tous les champs')
      return
    }

    const newProduct = {
      id: editingId || Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image
    }

    let updatedProducts
    if (editingId) {
      updatedProducts = products.map(p => p.id === editingId ? newProduct : p)
      setSuccessMessage('Produit modifié avec succès !')
    } else {
      updatedProducts = [...products, newProduct]
      setSuccessMessage('Produit ajouté avec succès !')
    }

    updateProducts(updatedProducts)
    setFormData({ name: '', price: '', stock: '', image: '💾' })
    setEditingId(null)

    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      stock: product.stock.toString(),
      image: product.image
    })
    setEditingId(product.id)
  }

  const handleDelete = (id) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      updateProducts(products.filter(p => p.id !== id))
      setSuccessMessage('Produit supprimé avec succès !')
      setTimeout(() => setSuccessMessage(''), 3000)
    }
  }

  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-2 text-center">Administration</h1>
          <p className="text-gray-600 text-center mb-8">Vault Key - Gestion des produits</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Mot de passe Admin</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez le mot de passe"
                className="input-field"
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full"
            >
              Se connecter
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Note: Le mot de passe par défaut est "vault_admin_2024"
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Administration</h1>
          <p className="text-gray-600">Gestion des produits Vault Key</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          <LogOut size={20} />
          Déconnexion
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-8">
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add/Edit Product Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>

          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Nom du produit</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: Clé USB 32GB"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Prix (€)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ex: 19.99"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="Ex: 10"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Emoji/Icône</label>
              <input
                type="text"
                maxLength="2"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="💾"
                className="input-field text-center text-2xl"
              />
            </div>

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              {editingId ? 'Mettre à jour' : 'Ajouter le produit'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormData({ name: '', price: '', stock: '', image: '💾' })
                }}
                className="btn-secondary w-full"
              >
                Annuler
              </button>
            )}
          </form>
        </div>

        {/* Products List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 p-6 border-b">
              <h2 className="text-2xl font-bold">Produits ({products.length})</h2>
            </div>

            {products.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucun produit pour le moment
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Produit</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Prix</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{product.image}</span>
                            <div>
                              <p className="font-semibold text-gray-800">{product.name}</p>
                              <p className="text-sm text-gray-500">ID: {product.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-600">{product.price}€</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                              title="Modifier"
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Supprimer"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-2">Total des produits</p>
              <p className="text-3xl font-bold text-blue-600">{products.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 text-sm mb-2">Valeur du stock</p>
              <p className="text-3xl font-bold text-green-600">
                {products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
