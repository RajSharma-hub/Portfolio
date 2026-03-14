import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

function AddToCartButton({ product, onAddToCart }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [added, setAdded] = useState(false);

  const handle = () => {
    if (!auth.isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <button
      onClick={handle}
      className={`pcard-atc${added ? ' pcard-atc--added' : ''}`}
    >
      {added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}
export default function PCard({ product, onAddToCart, index = 0 }) {
  return (
    <>
      <style>{`
        .pcard {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s;
          animation: cardReveal 0.55s ease both;
        }
        .pcard:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.65), 0 0 0 1px var(--border-gold);
          border-color: rgba(232,168,56,0.18);
        }
        .pcard-img-wrap {
          position: relative;
          width: 100%;
          height: 210px;
          overflow: hidden;
          background: var(--bg-raised);
        }
        .pcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
          display: block;
        }
        .pcard:hover .pcard-img { transform: scale(1.08); }
        .pcard-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(12,12,16,0.88) 0%, transparent 52%);
        }
        .pcard-price-tag {
          position: absolute;
          top: 14px; right: 14px;
          background: rgba(12,12,16,0.78);
          color: var(--gold);
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 8px;
          border: 1px solid var(--border-gold);
          backdrop-filter: blur(8px);
          letter-spacing: 0.01em;
        }
        .pcard-premium-tag {
          position: absolute;
          top: 14px; left: 14px;
        }
        .pcard-body {
          padding: 20px 22px 22px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 9px;
        }
        .pcard-name {
          font-family: var(--font-display);
          font-size: 21px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pcard-name:hover { color: var(--gold); }
        .pcard-desc {
          font-size: 13px;
          color: var(--text-2);
          line-height: 1.6;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pcard-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .pcard-atc {
          flex: 1;
          padding: 11px 14px;
          background: var(--gold);
          color: #0c0c10;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 700;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.03em;
        }
        .pcard-atc:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 4px 18px var(--gold-glow);
        }
        .pcard-atc--added { background: var(--green); color: #fff; }
        .pcard-atc--added:hover { background: var(--green); box-shadow: 0 4px 16px var(--green-dim); }
        .pcard-more {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 11px 14px;
          background: transparent;
          color: var(--text-2);
          font-size: 13px;
          font-weight: 500;
          border: 1px solid var(--border-2);
          border-radius: var(--radius-sm);
          text-decoration: none;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .pcard-more:hover {
          color: var(--gold);
          border-color: var(--border-gold);
          background: var(--gold-dim);
        }
      `}</style>

      <div className="pcard" style={{ animationDelay: `${index * 75}ms` }}>
        <div className="pcard-img-wrap">
          <img src={product.image} alt={product.name} className="pcard-img" loading="lazy" />
          <div className="pcard-overlay" />
          <span className="pcard-price-tag">${product.price}</span>
          <div className="pcard-premium-tag"><span className="badge">Premium</span></div>
        </div>

        <div className="pcard-body">
          <Link to={`/product/${product.id}`} className="pcard-name">
            {product.name}
          </Link>
          {product.description && (
            <p className="pcard-desc">{product.description}</p>
          )}
          <div className="pcard-actions">
            <AddToCartButton product={product} onAddToCart={onAddToCart} />
            <Link to={`/product/${product.id}`} className="pcard-more">Info</Link>
          </div>
        </div>
      </div>
    </>
  );
}