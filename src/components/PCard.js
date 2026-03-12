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
          width: 240px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
          animation: cardReveal 0.5s ease both;
          display: flex;
          flex-direction: column;
        }
        .pcard:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px var(--gold-dim);
          border-color: rgba(232,168,56,0.2);
        }
        .pcard-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: var(--bg-raised);
        }
        .pcard-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }
        .pcard:hover .pcard-img { transform: scale(1.07); }
        .pcard-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,13,18,0.85) 0%, transparent 55%);
        }
        .pcard-price-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: var(--bg);
          color: var(--gold);
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid var(--border-2);
          letter-spacing: 0.01em;
        }
        .pcard-body {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 8px;
        }
        .pcard-name {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.25;
          text-decoration: none;
          transition: color 0.2s;
        }
        .pcard-name:hover { color: var(--gold); }
        .pcard-desc {
          font-size: 13px;
          color: var(--text-2);
          line-height: 1.5;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pcard-actions {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }
        .pcard-atc {
          flex: 1;
          padding: 11px 14px;
          background: var(--gold);
          color: #0d0d12;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 600;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          letter-spacing: 0.02em;
        }
        .pcard-atc:hover {
          background: var(--gold-light);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px var(--gold-glow);
        }
        .pcard-atc--added {
          background: var(--green);
          color: #fff;
        }
        .pcard-atc--added:hover {
          background: var(--green);
          box-shadow: 0 4px 16px var(--green-dim);
        }
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
          border-color: var(--gold);
          background: var(--gold-dim);
        }
      `}</style>

      <div className="pcard" style={{ animationDelay: `${index * 80}ms` }}>
        <div className="pcard-img-wrap">
          <img src={product.image} alt={product.name} className="pcard-img" />
          <div className="pcard-overlay" />
          <span className="pcard-price-tag">${product.price}</span>
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
