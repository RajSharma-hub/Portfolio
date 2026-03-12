import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ cartItems = [], onPlaceOrder }) {
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((s, it) => s + it.price * (it.quantity || 1), 0);
  const itemCount = cartItems.reduce((s, it) => s + (it.quantity || 1), 0);

  const placeOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setPlaced(true);
    if (onPlaceOrder) onPlaceOrder();
  };

  if (placed) {
    return (
      <>
        <style>{checkoutStyles}</style>
        <div className="co-page">
          <div className="co-success">
            <div className="co-success-icon">✓</div>
            <h2 className="co-success-title">Order Placed!</h2>
            <p className="co-success-sub">Thank you for your purchase. You'll receive a confirmation shortly.</p>
            <button className="btn-gold" onClick={() => navigate('/')}>Continue Shopping</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{checkoutStyles}</style>
      <div className="co-page">
        <div className="co-inner">
          <div className="co-left">
            <div className="co-eyebrow">Step 2 of 2</div>
            <h1 className="co-title">Checkout</h1>

            {cartItems.length === 0 ? (
              <div style={{ color: 'var(--text-3)', marginTop: 24 }}>
                No items in cart.{' '}
                <span
                  style={{ color: 'var(--gold)', cursor: 'pointer' }}
                  onClick={() => navigate('/')}
                >
                  Go shop
                </span>
              </div>
            ) : (
              <>
                <div className="co-section-label">Order Summary</div>
                <div className="co-items">
                  {cartItems.map(it => (
                    <div key={it.id} className="co-item">
                      {it.image && <img src={it.image} alt={it.name} className="co-item-img" />}
                      <div className="co-item-info">
                        <span className="co-item-name">{it.name}</span>
                        <span className="co-item-qty">× {it.quantity || 1}</span>
                      </div>
                      <span className="co-item-subtotal">
                        ${(it.price * (it.quantity || 1)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="co-right">
              <div className="co-summary-box">
                <div className="co-summary-label">Payment Summary</div>
                <div className="co-summary-row">
                  <span>Items ({itemCount})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="co-summary-row">
                  <span>Shipping</span>
                  <span style={{ color: 'var(--green)' }}>Free</span>
                </div>
                <div className="co-summary-row">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="co-divider" />
                <div className="co-total-row">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="btn-gold co-place-btn"
                  onClick={placeOrder}
                  disabled={loading}
                >
                  {loading
                    ? <><span className="spinner" /> Processing…</>
                    : `Pay $${total.toFixed(2)}`}
                </button>

                <button className="btn-ghost co-back-btn" onClick={() => navigate(-1)}>
                  ← Back to Cart
                </button>

                <p className="co-secure-note">🔒 Secured checkout · Free returns</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const checkoutStyles = `
  .co-page {
    min-height: calc(100vh - 64px);
    padding: 48px 40px 80px;
    animation: fadeUp 0.4s ease both;
  }
  .co-inner {
    max-width: 1000px;
    margin: 0 auto;
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }
  .co-left { flex: 1; min-width: 0; }
  .co-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 8px;
  }
  .co-title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 48px);
    font-weight: 600;
    color: var(--text);
    margin-bottom: 32px;
  }
  .co-section-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 600;
    margin-bottom: 14px;
  }
  .co-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .co-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 18px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .co-item-img {
    width: 52px;
    height: 52px;
    border-radius: 8px;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--bg-raised);
  }
  .co-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .co-item-name {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 600;
    color: var(--text);
  }
  .co-item-qty {
    font-size: 13px;
    color: var(--text-3);
  }
  .co-item-subtotal {
    font-family: var(--font-display);
    font-size: 17px;
    font-weight: 600;
    color: var(--gold);
  }
  .co-right {
    width: 320px;
    flex-shrink: 0;
    position: sticky;
    top: 84px;
  }
  .co-summary-box {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
  }
  .co-summary-label {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 600;
    margin-bottom: 18px;
  }
  .co-summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--text-2);
    margin-bottom: 10px;
  }
  .co-divider {
    height: 1px;
    background: var(--border);
    margin: 16px 0;
  }
  .co-total-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 20px;
  }
  .co-total-row span:last-child { color: var(--gold); }
  .co-place-btn {
    width: 100%;
    padding: 15px;
    font-size: 15px;
    border-radius: var(--radius-sm);
    margin-bottom: 10px;
  }
  .co-back-btn {
    width: 100%;
    padding: 12px;
    border-radius: var(--radius-sm);
    margin-bottom: 18px;
    justify-content: center;
  }
  .co-secure-note {
    font-size: 12px;
    color: var(--text-3);
    text-align: center;
  }
  .co-success {
    max-width: 480px;
    margin: 80px auto 0;
    text-align: center;
    animation: fadeUp 0.5s ease both;
  }
  .co-success-icon {
    width: 72px;
    height: 72px;
    background: var(--green-dim);
    border: 1px solid rgba(76,175,120,0.25);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    color: var(--green);
    margin: 0 auto 24px;
  }
  .co-success-title {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 12px;
  }
  .co-success-sub {
    font-size: 15px;
    color: var(--text-2);
    margin-bottom: 32px;
    line-height: 1.6;
  }
  @media (max-width: 760px) {
    .co-page { padding: 32px 20px 60px; }
    .co-inner { flex-direction: column; }
    .co-right { width: 100%; position: static; }
  }
`;
