import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Star, Zap } from 'lucide-react'

function Home({ products, addToCart }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-vault text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Vault Key</h1>
          <p className="text-xl text-blue-100 mb-8">Clés USB Premium - Stockage Sécurisé & Fiable</p>
          <div className="flex justify-center gap-4">
            <a href="#products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
              Découvrir
            </a>
            <Link to="/cart" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Voir le panier
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Ultra-rapide</h3>
              <p className="text-gray-600">Transferts de données à très haute vitesse</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">Matériaux de haute qualité et durables</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="font-bold text-lg mb-2">Livraison rapide</h3>
              <p className="text-gray-600">Expédition en 24-48 heures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Nos Produits</h2>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun produit disponible pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="card-hover bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-8 text-center text-6xl min-h-48 flex items-center justify-center">
                    {product.image}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Rupture de stock'}
                      </span>
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-blue-600">{product.price}€</span>
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                          product.stock > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={18} />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à protéger vos données ?</h2>
          <p className="text-xl mb-8 text-blue-100">Commandez dès maintenant et bénéficiez d'une livraison express</p>
          <Link to="/cart" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Voir mon panier
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
