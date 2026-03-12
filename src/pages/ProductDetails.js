import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function ProductDetails({ products = [], onAddToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgZoomed, setImgZoomed] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  if (!product) {
    return (
      <div style={{ padding: '80px 40px', textAlign: 'center', color: 'var(--text-3)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        Product not found.{' '}
        <span
          style={{ color: 'var(--gold)', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Back to shop
        </span>
      </div>
    );
  }

  const handleAdd = () => {
    if (!auth.isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/product/${product.id}` } } });
      return;
    }
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <>
      <style>{`
        .pd-page {
          min-height: calc(100vh - 64px);
          padding: 48px 40px 80px;
          animation: fadeUp 0.4s ease both;
        }
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-3);
          cursor: pointer;
          margin-bottom: 36px;
          transition: color 0.2s;
          background: none;
          border: none;
          font-family: var(--font-body);
          padding: 0;
        }
        .pd-back:hover { color: var(--gold); }
        .pd-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 60px;
          align-items: flex-start;
        }
        .pd-img-col {
          width: 420px;
          flex-shrink: 0;
        }
        .pd-img-wrap {
          position: relative;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--bg-raised);
          cursor: zoom-in;
          aspect-ratio: 1;
        }
        .pd-img-wrap.zoomed { cursor: zoom-out; }
        .pd-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
          display: block;
        }
        .pd-img-wrap:hover .pd-img,
        .pd-img-wrap.zoomed .pd-img { transform: scale(1.08); }
        .pd-img-badge {
          position: absolute;
          top: 16px;
          left: 16px;
        }
        .pd-info {
          flex: 1;
          min-width: 0;
        }
        .pd-eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 12px;
        }
        .pd-name {
          font-family: var(--font-display);
          font-size: clamp(36px, 4vw, 52px);
          font-weight: 600;
          color: var(--text);
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .pd-price {
          font-family: var(--font-display);
          font-size: 34px;
          font-weight: 600;
          color: var(--gold);
          margin-bottom: 24px;
          letter-spacing: 0.01em;
        }
        .pd-desc {
          font-size: 15px;
          color: var(--text-2);
          line-height: 1.75;
          margin-bottom: 32px;
          border-left: 2px solid var(--gold-dim);
          padding-left: 16px;
        }
        .pd-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 28px;
        }
        .pd-qty-label {
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-3);
          font-weight: 600;
          margin-bottom: 10px;
        }
        .pd-qty-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
        }
        .pd-add-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 16px 28px;
          background: var(--gold);
          color: #0d0d12;
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }
        .pd-add-btn:hover {
          background: var(--gold-light);
          box-shadow: 0 6px 24px var(--gold-glow);
          transform: translateY(-1px);
        }
        .pd-add-btn.added {
          background: var(--green);
          color: #fff;
          box-shadow: 0 6px 24px var(--green-dim);
        }
        .pd-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }
        .pd-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: var(--text-3);
        }
        .pd-feature-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
        }
        @media (max-width: 860px) {
          .pd-page { padding: 32px 20px 60px; }
          .pd-inner { flex-direction: column; gap: 36px; }
          .pd-img-col { width: 100%; }
        }
      `}</style>

      <div className="pd-page">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <button className="pd-back" onClick={() => navigate(-1)}>← Back</button>
        </div>

        <div className="pd-inner">
          <div className="pd-img-col">
            <div
              className={`pd-img-wrap${imgZoomed ? ' zoomed' : ''}`}
              onClick={() => setImgZoomed(z => !z)}
            >
              <img src={product.image} alt={product.name} className="pd-img" />
              <div className="pd-img-badge">
                <span className="badge">Premium</span>
              </div>
            </div>
          </div>

          <div className="pd-info">
            <div className="pd-eyebrow">Product Details</div>
            <h1 className="pd-name">{product.name}</h1>
            <div className="pd-price">${product.price.toFixed(2)}</div>

            <p className="pd-desc">
              {product.description || 'No description available.'}
            </p>

            <div className="pd-divider" />

            <div className="pd-qty-label">Quantity</div>
            <div className="pd-qty-row">
              <div className="qty-control">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>
                Subtotal: <strong style={{ color: 'var(--gold)' }}>${(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>

            <button
              className={`pd-add-btn${added ? ' added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added to Cart' : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
            </button>

            <div className="pd-features">
              <div className="pd-feature"><span className="pd-feature-dot" /> Free shipping on all orders</div>
              <div className="pd-feature"><span className="pd-feature-dot" /> 30-day return policy</div>
              <div className="pd-feature"><span className="pd-feature-dot" /> 1-year manufacturer warranty</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
