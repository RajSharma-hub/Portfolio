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
    await new Promise(r => setTimeout(r, 950));
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
            <p className="co-success-sub">
              Thank you for your purchase. You'll receive a confirmation shortly.
            </p>
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
                  <span>Items ({itemCount})</span><span>${total.toFixed(2)}</span>
                </div>
                <div className="co-summary-row">
                  <span>Shipping</span><span style={{ color: 'var(--green)' }}>Free</span>
                </div>
                <div className="co-summary-row">
                  <span>Tax</span><span>$0.00</span>
                </div>
                <div className="co-divider" />
                <div className="co-total-row">
                  <span>Total</span><span>${total.toFixed(2)}</span>
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
    min-height: calc(100vh - 68px);
    padding: 52px 44px 100px;
    animation: fadeUp 0.4s ease both;
  }
  .co-inner {
    max-width: 1020px;
    margin: 0 auto;
    display: flex;
    gap: 44px;
    align-items: flex-start;
  }
  .co-left { flex: 1; min-width: 0; }
  .co-eyebrow {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 700;
    margin-bottom: 10px;
  }
  .co-title {
    font-family: var(--font-display);
    font-size: clamp(34px, 4vw, 50px);
    font-weight: 500;
    color: var(--text);
    margin-bottom: 36px;
  }
  .co-section-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 700;
    margin-bottom: 16px;
  }
  .co-items { display: flex; flex-direction: column; gap: 11px; }
  .co-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
  }
  .co-item-img {
    width: 54px; height: 54px;
    border-radius: 9px;
    object-fit: cover;
    flex-shrink: 0;
    background: var(--bg-raised);
  }
  .co-item-info { flex: 1; display: flex; flex-direction: column; gap: 3px; }
  .co-item-name { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--text); }
  .co-item-qty { font-size: 13px; color: var(--text-3); }
  .co-item-subtotal { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--gold); }
  .co-right {
    width: 330px;
    flex-shrink: 0;
    position: sticky;
    top: calc(68px + 20px);
  }
  .co-summary-box {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 30px;
    position: relative;
    overflow: hidden;
  }
  .co-summary-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.4;
  }
  .co-summary-label {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 700;
    margin-bottom: 20px;
  }
  .co-summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: var(--text-2);
    margin-bottom: 11px;
  }
  .co-divider { height: 1px; background: var(--border); margin: 18px 0; }
  .co-total-row {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 22px;
  }
  .co-total-row span:last-child { color: var(--gold); }
  .co-place-btn { width: 100%; padding: 16px; font-size: 15px; border-radius: var(--radius-sm); margin-bottom: 11px; }
  .co-back-btn { width: 100%; padding: 13px; border-radius: var(--radius-sm); margin-bottom: 20px; justify-content: center; }
  .co-secure-note { font-size: 12px; color: var(--text-3); text-align: center; }
  .co-success {
    max-width: 500px;
    margin: 90px auto 0;
    text-align: center;
    animation: fadeUp 0.5s ease both;
  }
  .co-success-icon {
    width: 80px; height: 80px;
    background: var(--green-dim);
    border: 1px solid rgba(76,175,120,0.28);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 32px; color: var(--green);
    margin: 0 auto 28px;
    animation: successPop 0.5s ease both;
  }
  .co-success-title {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 14px;
  }
  .co-success-sub { font-size: 15px; color: var(--text-2); margin-bottom: 36px; line-height: 1.7; }
  @media (max-width: 900px) {
    .co-inner { flex-direction: column; }
    .co-right { width: 100%; position: static; }
  }
  @media (max-width: 700px) {
    .co-page { padding: 32px 20px 72px; }
  }
`;