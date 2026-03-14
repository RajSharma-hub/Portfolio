import React from 'react';
 
const ITEMS = [
  'Free Shipping Worldwide',
  '30-Day Returns',
  'Premium Quality',
  'Secure Checkout',
  '1-Year Warranty',
  'Exclusive Collection',
];
 
export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
 
  return (
    <>
      <style>{`
        .marquee-strip {
          width: 100%;
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 14px 0;
          background: var(--gold-pale);
        }
        .marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 22s linear infinite;
        }
        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 0 24px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .marquee-dot {
          width: 4px; height: 4px;
          background: var(--gold);
          border-radius: 50%;
          opacity: 0.6;
        }
      `}</style>
 
      <div className="marquee-strip">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}