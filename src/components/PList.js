import React, { useState, useMemo } from 'react';
import PCard from './PCard';

export default function PList({ products, onAddToCart }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    ), [products, search]);

  return (
    <>
      <style>{`
        .plist-page {
          min-height: calc(100vh - 64px);
          padding: 48px 40px 80px;
          animation: fadeUp 0.4s ease both;
        }
        .plist-header {
          max-width: 1200px;
          margin: 0 auto 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
        }
        .plist-title-group {}
        .plist-eyebrow {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .plist-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 600;
          color: var(--text);
          line-height: 1.1;
        }
        .plist-count {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--text-3);
          margin-top: 8px;
          font-weight: 400;
        }
        .plist-search {
          padding: 12px 18px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          width: 260px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .plist-search::placeholder { color: var(--text-3); }
        .plist-search:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px var(--gold-dim);
        }
        .plist-divider {
          max-width: 1200px;
          margin: 0 auto 40px;
          height: 1px;
          background: var(--border);
        }
        .plist-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: flex-start;
        }
        .plist-empty {
          color: var(--text-3);
          font-size: 15px;
          padding: 48px 0;
          text-align: center;
          width: 100%;
        }
        @media (max-width: 700px) {
          .plist-page { padding: 32px 20px 60px; }
          .plist-grid { justify-content: center; }
          .plist-header { flex-direction: column; align-items: flex-start; }
          .plist-search { width: 100%; }
        }
      `}</style>

      <div className="plist-page">
        <div className="plist-header">
          <div className="plist-title-group">
            <div className="plist-eyebrow">Collection</div>
            <h1 className="plist-title">Our Products</h1>
            <p className="plist-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <input
            className="plist-search"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="plist-divider" />

        <div className="plist-grid">
          {filtered.length === 0
            ? <p className="plist-empty">No products match your search.</p>
            : filtered.map((product, i) => (
                <PCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  index={i}
                />
              ))
          }
        </div>
      </div>
    </>
  );
}
