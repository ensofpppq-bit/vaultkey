import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

function App() {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [adminAuth, setAdminAuth] = useState(false)

  useEffect(() => {
    // Charger les produits depuis localStorage
    const savedProducts = localStorage.getItem('vault_products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Produits par défaut
      const defaultProducts = [
        { id: 1, name: 'Clé USB 32GB', price: 19.99, image: '💾', stock: 10 },
        { id: 2, name: 'Clé USB 64GB', price: 34.99, image: '💾', stock: 8 },
        { id: 3, name: 'Clé USB 128GB', price: 59.99, image: '💾', stock: 5 }
      ]
      setProducts(defaultProducts)
      localStorage.setItem('vault_products', JSON.stringify(defaultProducts))
    }

    // Charger le panier
    const savedCart = localStorage.getItem('vault_cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }

    // Vérifier l'auth admin
    const adminToken = localStorage.getItem('admin_token')
    if (adminToken && adminToken === 'vault_admin_2024') {
      setAdminAuth(true)
    }
  }, [])

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    let newCart
    
    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }
    
    setCart(newCart)
    localStorage.setItem('vault_cart', JSON.stringify(newCart))
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId)
    setCart(newCart)
    localStorage.setItem('vault_cart', JSON.stringify(newCart))
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      const newCart = cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
      setCart(newCart)
      localStorage.setItem('vault_cart', JSON.stringify(newCart))
    }
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('vault_cart')
  }

  const updateProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('vault_products', JSON.stringify(newProducts))
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header cartCount={cart.length} adminAuth={adminAuth} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateCartQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
            <Route path="/admin" element={<Admin products={products} updateProducts={updateProducts} adminAuth={adminAuth} setAdminAuth={setAdminAuth} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
