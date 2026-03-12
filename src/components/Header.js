import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Header({ cartCount }) {
  const auth = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const prevCount = React.useRef(cartCount);
  useEffect(() => {
    if (cartCount !== prevCount.current) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 400);
      prevCount.current = cartCount;
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  const navLinks = [
    { to: '/', label: 'Shop' },
    { to: '/cart', label: 'Cart' },
  ];

  return (
    <>
      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          height: 64px;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          transition: box-shadow 0.3s, background 0.3s;
        }
        .header.scrolled {
          background: rgba(13,13,18,0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 1px 0 var(--border), 0 4px 24px rgba(0,0,0,0.5);
        }
        .header-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .header-brand-sub {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 2px;
        }
        .header-brand-name {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.01em;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .nav-link {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-2);
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid transparent;
          transition: color 0.2s, border-color 0.2s;
        }
        .nav-link:hover,
        .nav-link.active { color: var(--text); border-color: var(--gold); }
        .header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cart-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-2);
          padding: 8px 16px;
          border: 1px solid var(--border-2);
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .cart-link:hover {
          color: var(--gold);
          border-color: var(--gold);
          background: var(--gold-dim);
        }
        .cart-icon { font-size: 15px; }
        .cart-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 5px;
          background: var(--gold);
          color: #0d0d12;
          font-size: 11px;
          font-weight: 700;
          border-radius: 10px;
          transition: transform 0.2s;
        }
        .cart-badge.bump { transform: scale(1.35); }
        .auth-btn-logout {
          padding: 8px 18px;
          background: transparent;
          color: var(--text-3);
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.03em;
        }
        .auth-btn-logout:hover {
          color: var(--red);
          border-color: rgba(232,80,80,0.3);
          background: var(--red-dim);
        }
        .auth-link-login {
          font-size: 13px;
          font-weight: 500;
          color: var(--text-2);
          text-decoration: none;
          padding: 8px 18px;
          border: 1px solid var(--border-2);
          border-radius: var(--radius-sm);
          transition: all 0.2s;
          letter-spacing: 0.03em;
        }
        .auth-link-login:hover {
          color: var(--text);
          border-color: var(--border-2);
        }
        .auth-link-register {
          font-size: 13px;
          font-weight: 600;
          color: #0d0d12;
          text-decoration: none;
          padding: 8px 18px;
          background: var(--gold);
          border-radius: var(--radius-sm);
          transition: background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.03em;
        }
        .auth-link-register:hover {
          background: var(--gold-light);
          box-shadow: var(--shadow-gold);
        }
        .user-greeting {
          font-size: 13px;
          color: var(--text-3);
          font-weight: 400;
        }
        .user-greeting span {
          color: var(--gold);
          font-weight: 600;
        }
      `}</style>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="header-brand">
          <span className="header-brand-sub">Premium</span>
          <span className="header-brand-name">MyShop</span>
        </Link>

        <nav className="header-nav">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link${location.pathname === to ? ' active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-right">
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && (
              <span className={`cart-badge${cartBump ? ' bump' : ''}`}>{cartCount}</span>
            )}
          </Link>

          {auth.isAuthenticated ? (
            <>
              <span className="user-greeting">Hi, <span>{auth.user?.username}</span></span>
              <button className="auth-btn-logout" onClick={auth.logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link-login">Login</Link>
              <Link to="/register" className="auth-link-register">Register</Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
