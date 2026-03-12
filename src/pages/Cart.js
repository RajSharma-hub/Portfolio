import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cartItems.reduce((s, it) => s + (it.quantity || 1), 0);

  return (
    <>
      <style>{`
        .cart-page {
          min-height: calc(100vh - 64px);
          padding: 48px 40px 80px;
          animation: fadeUp 0.4s ease both;
        }
        .cart-inner {
          max-width: 860px;
          margin: 0 auto;
        }
        .cart-eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .cart-title {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
        }
        .cart-subtitle {
          font-size: 14px;
          color: var(--text-3);
          margin-bottom: 36px;
        }
        .cart-empty {
          text-align: center;
          padding: 80px 0;
        }
        .cart-empty-icon {
          font-size: 48px;
          margin-bottom: 20px;
          opacity: 0.4;
        }
        .cart-empty-text {
          font-size: 17px;
          color: var(--text-3);
          margin-bottom: 24px;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          transition: border-color 0.2s;
          animation: fadeIn 0.3s ease both;
        }
        .cart-item:hover { border-color: var(--border-2); }
        .cart-item-img {
          width: 68px;
          height: 68px;
          border-radius: 10px;
          object-fit: cover;
          background: var(--bg-raised);
          flex-shrink: 0;
        }
        .cart-item-info {
          flex: 1;
          min-width: 0;
        }
        .cart-item-name {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cart-item-price {
          font-size: 13px;
          color: var(--text-3);
        }
        .cart-item-right {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-shrink: 0;
        }
        .cart-item-subtotal {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 600;
          color: var(--gold);
          min-width: 72px;
          text-align: right;
        }
        .cart-summary {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 32px;
        }
        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: var(--text-2);
          margin-bottom: 12px;
        }
        .cart-summary-row.total {
          font-size: 22px;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0;
          padding-top: 16px;
          border-top: 1px solid var(--border);
          margin-top: 8px;
        }
        .cart-summary-row.total span:last-child { color: var(--gold); }
        .cart-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        @media (max-width: 640px) {
          .cart-page { padding: 32px 20px 60px; }
          .cart-item { flex-wrap: wrap; }
          .cart-item-img { width: 56px; height: 56px; }
          .cart-actions { flex-direction: column; }
        }
      `}</style>

      <div className="cart-page">
        <div className="cart-inner">
          <div className="cart-eyebrow">Review</div>
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">
            {itemCount > 0 ? `${itemCount} item${itemCount !== 1 ? 's' : ''} selected` : 'Nothing here yet'}
          </p>

          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <p className="cart-empty-text">Your cart is empty</p>
              <Link to="/" className="btn-gold" style={{ textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
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
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="cart-summary-row">
                  <span>Shipping</span>
                  <span style={{ color: 'var(--green)' }}>Free</span>
                </div>
                <div className="cart-summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
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
