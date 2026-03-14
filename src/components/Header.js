import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
 
export default function Header({ cartCount }) {
  const auth = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCount = useRef(cartCount);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  useEffect(() => {
    if (cartCount !== prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 400);
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
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 44px;
          height: var(--header-h, 68px);
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background 0.35s, border-color 0.35s, box-shadow 0.35s;
        }
        .header.scrolled {
          background: rgba(12, 12, 16, 0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom-color: var(--border);
          box-shadow: 0 1px 0 var(--border), 0 6px 28px rgba(0,0,0,0.55);
        }
        .header-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
          gap: 1px;
        }
        .header-brand-sub {
          font-family: var(--font-body);
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
        }
        .header-brand-name {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.01em;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: 36px;
        }
        .nav-link {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-2);
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 100%;
          height: 1px;
          background: var(--gold);
          transition: right 0.25s ease;
        }
        .nav-link:hover,
        .nav-link.active { color: var(--text); }
        .nav-link:hover::after,
        .nav-link.active::after { right: 0; }
 
        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cart-link {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-2);
          padding: 8px 16px;
          border: 1px solid var(--border-2);
          border-radius: var(--radius-sm);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: all 0.2s;
        }
        .cart-link:hover {
          color: var(--gold);
          border-color: var(--border-gold);
          background: var(--gold-dim);
        }
        .cart-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 5px;
          background: var(--gold);
          color: #0c0c10;
          font-size: 11px;
          font-weight: 700;
          border-radius: 10px;
        }
        .cart-badge.bump { animation: bump 0.35s ease; }
        .auth-btn-logout {
          padding: 8px 18px;
          background: transparent;
          color: var(--text-3);
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .auth-btn-logout:hover {
          color: var(--red);
          border-color: rgba(232,80,80,0.28);
          background: var(--red-dim);
        }
        .auth-link-login {
          font-size: 12px;
          font-weight: 500;
          color: var(--text-2);
          text-decoration: none;
          padding: 8px 18px;
          border: 1px solid var(--border-2);
          border-radius: var(--radius-sm);
          transition: all 0.2s;
          letter-spacing: 0.04em;
        }
        .auth-link-login:hover {
          color: var(--text);
          background: rgba(255,255,255,0.04);
        }
        .auth-link-register {
          font-size: 12px;
          font-weight: 600;
          color: #0c0c10;
          text-decoration: none;
          padding: 8px 18px;
          background: var(--gold);
          border-radius: var(--radius-sm);
          transition: background 0.2s, box-shadow 0.2s;
          letter-spacing: 0.04em;
        }
        .auth-link-register:hover {
          background: var(--gold-light);
          box-shadow: var(--shadow-gold);
        }
        .user-greeting { font-size: 13px; color: var(--text-3); }
        .user-greeting span { color: var(--gold); font-weight: 600; }
 
        @media (max-width: 700px) {
          .header { padding: 0 20px; }
          .header-nav { display: none; }
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
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className={`cart-badge${bump ? ' bump' : ''}`}>{cartCount}</span>
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