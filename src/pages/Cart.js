import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
 
export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cartItems.reduce((s, it) => s + (it.quantity || 1), 0);
 
  return (
    <>
      <style>{`
        .cart-page {
          min-height: calc(100vh - 68px);
          padding: 52px 44px 100px;
          animation: fadeUp 0.4s ease both;
        }
        .cart-inner { max-width: 880px; margin: 0 auto; }
        .cart-eyebrow {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: 10px;
        }
        .cart-title {
          font-family: var(--font-display);
          font-size: clamp(34px, 4vw, 50px);
          font-weight: 500;
          color: var(--text);
          margin-bottom: 6px;
        }
        .cart-subtitle { font-size: 14px; color: var(--text-3); margin-bottom: 40px; }
        .cart-empty { text-align: center; padding: 100px 0; }
        .cart-empty-icon { font-size: 52px; margin-bottom: 22px; opacity: 0.35; }
        .cart-empty-text { font-size: 17px; color: var(--text-3); margin-bottom: 28px; }
        .cart-items { display: flex; flex-direction: column; gap: 14px; margin-bottom: 34px; }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 22px 26px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: border-color 0.2s;
          animation: fadeIn 0.3s ease both;
        }
        .cart-item:hover { border-color: var(--border-2); }
        .cart-item-img {
          width: 72px; height: 72px;
          border-radius: 10px;
          object-fit: cover;
          background: var(--bg-raised);
          flex-shrink: 0;
        }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-name {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-item-price { font-size: 13px; color: var(--text-3); }
        .cart-item-right { display: flex; align-items: center; gap: 18px; flex-shrink: 0; }
        .cart-item-subtotal {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          color: var(--gold);
          min-width: 76px;
          text-align: right;
        }
        .cart-summary {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 30px 34px;
          position: relative;
          overflow: hidden;
        }
        .cart-summary::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0.4;
        }
        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--text-2);
          margin-bottom: 13px;
        }
        .cart-summary-row.total {
          font-size: 23px;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0;
          padding-top: 18px;
          border-top: 1px solid var(--border);
          margin-top: 8px;
        }
        .cart-summary-row.total span:last-child { color: var(--gold); }
        .cart-actions { display: flex; gap: 12px; margin-top: 26px; }
        @media (max-width: 700px) {
          .cart-page { padding: 32px 20px 72px; }
          .cart-item { flex-wrap: wrap; }
          .cart-item-img { width: 58px; height: 58px; }
          .cart-actions { flex-direction: column; }
        }
      `}</style>
 
      <div className="cart-page">
        <div className="cart-inner">
          <div className="cart-eyebrow">Review</div>
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">
            {itemCount > 0
              ? `${itemCount} item${itemCount !== 1 ? 's' : ''} selected`
              : 'Nothing here yet'}
          </p>
 
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty</p>
              <Link to="/" className="btn-gold" style={{ textDecoration: 'none' }}>
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                    )}
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-price">${item.price.toFixed(2)} each</div>
                    </div>
                    <div className="cart-item-right">
                      <div className="qty-control">
                        <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}>−</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}>+</button>
                      </div>
                      <span className="cart-item-subtotal">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </span>
                      <button className="btn-danger" onClick={() => onRemove(item.id)}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
 
              <div className="cart-summary">
                <div className="cart-summary-row">
                  <span>Subtotal</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span><span style={{ color: 'var(--green)' }}>Free</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-actions">
                  <button className="btn-ghost" onClick={() => navigate(-1)}>← Continue Shopping</button>
                  <button
                    className="btn-gold"
                    style={{ flex: 1 }}
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}