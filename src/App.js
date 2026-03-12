import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import PList from './components/PList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './components/Checkout';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';

import laptopImg from './assets/laptop.jpg';
import phoneImg from './assets/mobile.avif';
import headphoneImg from './assets/headphone.jpg';
import watchImg from './assets/watch.jpg';

const PRODUCTS = [
  {
    id: 1,
    name: 'Laptop',
    price: 799,
    image: laptopImg,
    description: 'Powerful laptop with Intel i7, 16GB RAM and 512GB SSD — great for work and gaming.',
  },
  {
    id: 2,
    name: 'Phone',
    price: 699,
    image: phoneImg,
    description: 'Modern smartphone with 128GB storage, 6.5" display and excellent camera performance.',
  },
  {
    id: 3,
    name: 'Headphones',
    price: 199,
    image: headphoneImg,
    description: 'Over-ear noise-cancelling headphones with 30h battery life and crisp audio.',
  },
  {
    id: 4,
    name: 'Watch',
    price: 299,
    image: watchImg,
    description: 'Smartwatch with heart-rate monitoring, GPS and customizable watch faces.',
  },
];

export default function App() {
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
          <Route path="/" element={<PList products={PRODUCTS} onAddToCart={onAddToCart} />} />
          <Route path="/product/:id" element={<ProductDetails products={PRODUCTS} onAddToCart={onAddToCart} />} />
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
      </BrowserRouter>
    </AuthProvider>
    </div>
  );
}
