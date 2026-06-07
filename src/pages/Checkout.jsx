import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, AlertCircle } from 'lucide-react'

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [paymentError, setPaymentError] = useState(null)
  const paypalContainerRef = useRef(null)
  const paypalScriptRef = useRef(false)

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 5.99
  const total = subtotal + shipping

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate('/')
      return
    }

    // Charger le script PayPal si disponible
    if (window.paypal && !paypalScriptRef.current && cart.length > 0) {
      paypalScriptRef.current = true
      renderPayPalButton()
    }
  }, [cart, navigate, orderPlaced])

  const renderPayPalButton = () => {
    if (!window.paypal || !paypalContainerRef.current) return

    paypalContainerRef.current.innerHTML = ''

    try {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'EUR',
                value: total.toFixed(2),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: subtotal.toFixed(2)
                  },
                  shipping: {
                    currency_code: 'EUR',
                    value: shipping.toFixed(2)
                  }
                }
              },
              items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity.toString(),
                unit_amount: {
                  currency_code: 'EUR',
                  value: item.price.toFixed(2)
                }
              }))
            }]
          })
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            setOrderPlaced(true)
            clearCart()
            // Sauvegarder la commande
            const order = {
              id: details.id,
              date: new Date().toLocaleDateString('fr-FR'),
              total: total.toFixed(2),
              items: cart,
              payerEmail: details.payer.email_address
            }
            const orders = JSON.parse(localStorage.getItem('vault_orders') || '[]')
            orders.push(order)
            localStorage.setItem('vault_orders', JSON.stringify(orders))
          })
        },
        onError: (err) => {
          console.error('Erreur PayPal:', err)
          setPaymentError('Une erreur est survenue lors du paiement. Veuillez réessayer.')
        }
      }).render(paypalContainerRef.current)
    } catch (error) {
      console.error('Erreur lors du chargement PayPal:', error)
      setPaymentError('PayPal est actuellement indisponible')
    }
  }

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-24 h-24 mx-auto text-green-600 mb-4" />
          <h1 className="text-3xl font-bold mb-4 text-gray-800">Commande confirmée !</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Merci pour votre achat. Un email de confirmation vous a été envoyé.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="font-bold text-lg mb-4">Détails de la commande</h2>
            {cart.map(item => (
              <div key={item.id} className="flex justify-between py-2 border-b">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
            <div className="flex justify-between py-4 font-bold text-lg">
              <span>Total</span>
              <span className="text-blue-600">{total.toFixed(2)}€</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Finaliser votre commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Résumé de la commande</h2>

            <div className="space-y-4 mb-8 pb-8 border-b">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">Quantité: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">{(item.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-700">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Livraison</span>
                <span>{shipping.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-blue-600 pt-4 border-t">
                <span>Total</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            {paymentError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-start gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-800">Erreur de paiement</p>
                  <p className="text-red-700 text-sm mt-1">{paymentError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-md p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Paiement</h2>
          
          <div ref={paypalContainerRef} className="mb-4">
            {!window.paypal && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                <p className="text-yellow-800">
                  Chargement du paiement PayPal...
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            Paiement sécurisé par PayPal
          </p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
