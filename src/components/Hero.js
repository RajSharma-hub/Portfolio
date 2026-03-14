import React from 'react';
 
export default function Hero() {
  const scrollToCollection = () => {
    document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
  };
 
  return (
    <>
      <style>{`
        .hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 40px 80px;
          overflow: hidden;
        }
        .hero-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 400px;
          background: radial-gradient(ellipse, rgba(232,168,56,0.09) 0%, transparent 68%);
          pointer-events: none;
          animation: glowPulse 4s ease-in-out infinite;
        }
        .hero-eyebrow {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          font-weight: 700;
          margin-bottom: 20px;
          animation: fadeIn 0.6s ease both;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 300;
          line-height: 1.04;
          color: var(--text);
          margin-bottom: 24px;
          animation: fadeUp 0.7s ease both 0.1s;
          letter-spacing: -0.01em;
        }
        .hero-title em {
          font-style: italic;
          color: var(--gold);
          font-weight: 400;
        }
        .hero-sub {
          font-size: 16px;
          color: var(--text-2);
          line-height: 1.7;
          max-width: 520px;
          margin-bottom: 40px;
          animation: fadeUp 0.7s ease both 0.2s;
        }
        .hero-cta {
          display: flex;
          gap: 14px;
          justify-content: center;
          animation: fadeUp 0.7s ease both 0.3s;
        }
        .hero-stats {
          display: flex;
          gap: 48px;
          justify-content: center;
          margin-top: 52px;
          animation: fadeUp 0.7s ease both 0.4s;
        }
        .hero-stat { text-align: center; }
        .hero-stat-num {
          font-family: var(--font-display);
          font-size: 32px;
          font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.02em;
        }
        .hero-stat-label {
          font-size: 10px;
          color: var(--text-3);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 3px;
        }
        .hero-line {
          width: 1px;
          height: 64px;
          background: linear-gradient(to bottom, transparent, var(--border-gold), transparent);
          margin: 44px auto 0;
          animation: fadeIn 1s ease both 0.6s;
        }
        @media (max-width: 700px) {
          .hero { padding: 72px 24px 56px; }
          .hero-stats { gap: 28px; }
          .hero-cta { flex-direction: column; align-items: center; }
        }
      `}</style>
 
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">2025 Premium Collection</div>
        <h1 className="hero-title">
          Crafted for<br /><em>the Exceptional</em>
        </h1>
        <p className="hero-sub">
          Discover our curated lineup of premium tech — engineered for performance, designed for elegance.
        </p>
        <div className="hero-cta">
          <button className="btn-gold" onClick={scrollToCollection}>
            Explore Collection
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">4</div>
            <div className="hero-stat-label">Products</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">∞</div>
            <div className="hero-stat-label">Possibilities</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-num">★ 4.9</div>
            <div className="hero-stat-label">Rated</div>
          </div>
        </div>
        <div className="hero-line" />
      </section>
    </>
  );
}