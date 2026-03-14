import React from 'react';
import { Link } from 'react-router-dom';
 
export default function Footer() {
  return (
    <>
      <style>{`
        .footer {
          border-top: 1px solid var(--border);
          padding: 52px 44px 36px;
          display: flex;
          flex-direction: column;
          gap: 36px;
          margin-top: 60px;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 36px;
        }
        .footer-brand { display: flex; flex-direction: column; gap: 10px; }
        .footer-brand-sub {
          font-size: 8.5px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
        }
        .footer-brand-name {
          font-family: var(--font-display);
          font-size: 30px;
          font-weight: 600;
          color: var(--text);
        }
        .footer-brand-desc {
          font-size: 13px;
          color: var(--text-3);
          line-height: 1.65;
          max-width: 260px;
          margin-top: 4px;
        }
        .footer-links { display: flex; gap: 52px; flex-wrap: wrap; }
        .footer-col { display: flex; flex-direction: column; gap: 14px; }
        .footer-col-title {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
        }
        .footer-link {
          font-size: 13px;
          color: var(--text-3);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--text); }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
        }
        .footer-copy { font-size: 12px; color: var(--text-3); }
        .footer-badges { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 700px) {
          .footer { padding: 40px 20px 28px; }
          .footer-top { flex-direction: column; }
          .footer-links { gap: 32px; }
        }
      `}</style>
 
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-brand-sub">Premium</span>
            <span className="footer-brand-name">MyShop</span>
            <p className="footer-brand-desc">
              Curated premium technology for the discerning buyer. Quality, performance, elegance.
            </p>
          </div>
 
          <div className="footer-links">
            <div className="footer-col">
              <div className="footer-col-title">Shop</div>
              <Link to="/" className="footer-link">All Products</Link>
              <Link to="/" className="footer-link">Laptops</Link>
              <Link to="/" className="footer-link">Phones</Link>
              <Link to="/" className="footer-link">Accessories</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Account</div>
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/register" className="footer-link">Register</Link>
              <Link to="/cart" className="footer-link">Cart</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Info</div>
              <span className="footer-link" style={{ cursor: 'default' }}>Shipping Policy</span>
              <span className="footer-link" style={{ cursor: 'default' }}>Returns</span>
              <span className="footer-link" style={{ cursor: 'default' }}>Privacy</span>
            </div>
          </div>
        </div>
 
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} MyShop. All rights reserved.</span>
          <div className="footer-badges">
            <span className="badge">🔒 Secure</span>
            <span className="badge">🚚 Free Ship</span>
            <span className="badge">↩ 30-Day Returns</span>
          </div>
        </div>
      </footer>
    </>
  );
}