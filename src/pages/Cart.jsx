import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

function Cart({ cart, removeFromCart, updateQuantity }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const total = subtotal + shipping

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mon Panier</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg mb-4">Votre panier est vide</p>
          <Link to="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Continuer vos achats
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b font-bold text-gray-700 hidden md:grid grid-cols-4 gap-4">
                <div>Produit</div>
                <div className="text-center">Quantité</div>
                <div className="text-right">Prix</div>
                <div></div>
              </div>

              {cart.map(item => (
                <div key={item.id} className="p-4 border-b hover:bg-gray-50 transition">
                  <div className="flex gap-4 mb-4 md:mb-0 md:grid md:grid-cols-4 md:gap-4 md:items-center">
                    <div>
                      <div className="text-2xl mb-2 md:mb-0 md:hidden">{item.image}</div>
                      <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-blue-600 font-semibold md:hidden">{(item.price * item.quantity).toFixed(2)}€</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 md:justify-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <div className="md:text-right font-semibold text-gray-800 hidden md:block">
                      {(item.price * item.quantity).toFixed(2)}€
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/" className="inline-block mt-6 text-blue-600 hover:text-blue-700 font-semibold transition">
              ← Continuer les achats
            </Link>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Résumé</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Sous-total</span>
                <span className="font-semibold">{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Livraison</span>
                <span className="font-semibold">{shipping.toFixed(2)}€</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-blue-600">{total.toFixed(2)}€</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition text-center block"
            >
              Passer la commande
            </Link>

            <p className="text-sm text-gray-500 text-center mt-4">
              ✓ Paiement sécurisé avec PayPal
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
