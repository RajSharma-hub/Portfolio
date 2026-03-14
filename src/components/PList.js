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
          padding: 0 44px 100px;
          animation: fadeIn 0.4s ease both;
        }
        .plist-header {
          max-width: 1200px;
          margin: 0 auto 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          padding-top: 16px;
        }
        .plist-eyebrow {
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: 8px;
        }
        .plist-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 5vw, 54px);
          font-weight: 500;
          color: var(--text);
          line-height: 1.1;
        }
        .plist-count {
          font-size: 13px;
          color: var(--text-3);
          margin-top: 6px;
        }
        .plist-search-wrap { position: relative; }
        .plist-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-3);
          pointer-events: none;
        }
        .plist-search {
          padding: 12px 18px 12px 40px;
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          width: 280px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .plist-search::placeholder { color: var(--text-3); }
        .plist-search:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px var(--gold-dim);
        }
        .plist-divider {
          max-width: 1200px;
          margin: 0 auto 44px;
          height: 1px;
          background: var(--border);
        }
        .plist-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .plist-empty {
          color: var(--text-3);
          font-size: 15px;
          padding: 64px 0;
          text-align: center;
          grid-column: 1 / -1;
        }
        @media (max-width: 700px) {
          .plist-page { padding: 0 20px 72px; }
          .plist-header { flex-direction: column; align-items: flex-start; }
          .plist-search { width: 100%; }
        }
      `}</style>
 
      <div className="plist-page" id="collection">
        <div className="plist-header">
          <div className="plist-title-group">
            <div className="plist-eyebrow">Collection</div>
            <h1 className="plist-title">Our Products</h1>
            <p className="plist-count">{filtered.length} item{filtered.length !== 1 ? 's' : ''}</p>
          </div>
 
          <div className="plist-search-wrap">
            <svg className="plist-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="plist-search"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
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