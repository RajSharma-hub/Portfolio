import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import bgImage from './assets/bg.jpg';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import PList from './components/PList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './components/Checkout';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

 

const PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    price: 799,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    description: 'Powerful laptop with Intel i7, 16GB RAM and 512GB SSD — great for work and gaming.',
  },
  {
    id: 2,
    name: 'Phone',
    price: 699,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    description: 'Modern smartphone with 128GB storage, 6.5" display and excellent camera performance.',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    description: 'Over-ear noise-cancelling headphones with 30h battery life and crisp audio.',
  },
  {
    id: 4,
    name: 'Watch',
    price: 299,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    description: 'Smartwatch with heart-rate monitoring, GPS and customizable watch faces.',
  },
];
 
export default function App() {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundRepeat = 'no-repeat';
  }, []);
  
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
 
  useEffect(() => {
    try { localStorage.setItem('cart', JSON.stringify(cartItems)); } catch {}
  }, [cartItems]);

  
 
  const onAddToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };
 
  const removeFromCart = (productId) =>
    setCartItems(prev => prev.filter(p => p.id !== productId));
 
  const updateQuantity = (productId, quantity) =>
    setCartItems(prev =>
      prev.map(p => p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p)
    );
 
  const clearCart = () => {
    setCartItems([]);
    try { localStorage.removeItem('cart'); } catch {}
  };
 
  const cartCount = cartItems.reduce((s, it) => s + (it.quantity || 1), 0);
 
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <AuthProvider>
        <BrowserRouter>
          <Header cartCount={cartCount} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Marquee />
                  <PList products={PRODUCTS} onAddToCart={onAddToCart} />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetails products={PRODUCTS} onAddToCart={onAddToCart} />}
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart cartItems={cartItems} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout cartItems={cartItems} onPlaceOrder={clearCart} />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}