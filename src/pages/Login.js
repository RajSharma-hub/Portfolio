import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useForm } from 'react-hook-form';
 
export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
 
  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      await auth.login(data.username.trim(), data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <style>{authStyles}</style>
      <div className="auth-page">
        <div className="auth-glow" />
        <div className="auth-card">
          <div className="auth-brand">MyShop</div>
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Sign in to your account to continue</p>
 
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Username</label>
              <input
                className="field-input"
                placeholder="your username"
                autoComplete="username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' },
                })}
              />
              {errors.username && <span className="error-text">{errors.username.message}</span>}
            </div>
 
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <input
                type="password"
                className="field-input"
                placeholder="••••••••"
                autoComplete="current-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
              />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>
 
            {error && <div className="error-banner">{error}</div>}
 
            <button type="submit" className="btn-gold auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In'}
            </button>
          </form>
 
          <div className="auth-footer">
            Don't have an account?{' '}
            <Link to="/register" className="auth-footer-link">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}
 
const authStyles = `
  .auth-page {
    min-height: calc(100vh - 68px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 20px;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.4s ease both;
  }
  .auth-glow {
    position: absolute;
    top: 35%; left: 50%;
    transform: translate(-50%, -50%);
    width: 600px; height: 500px;
    background: radial-gradient(ellipse, rgba(232,168,56,0.065) 0%, transparent 68%);
    pointer-events: none;
    animation: glowPulse 5s ease-in-out infinite;
  }
  .auth-card {
    position: relative;
    width: 100%;
    max-width: 430px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 46px 42px;
    animation: fadeUp 0.48s ease both;
    box-shadow: 0 28px 72px rgba(0,0,0,0.55);
  }
  .auth-card::before {
    content: '';
    position: absolute;
    top: 0; left: 40px; right: 40px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--border-gold), transparent);
  }
  .auth-brand {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 30px;
    letter-spacing: 0.02em;
  }
  .auth-title {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 8px;
    line-height: 1.12;
  }
  .auth-sub { font-size: 14px; color: var(--text-3); margin-bottom: 34px; }
  .auth-form { display: flex; flex-direction: column; gap: 22px; }
  .auth-field { display: flex; flex-direction: column; gap: 8px; }
  .auth-label {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 700;
  }
  .auth-submit {
    width: 100%; padding: 16px; font-size: 15px;
    border-radius: var(--radius-sm); margin-top: 4px;
    justify-content: center; gap: 8px;
  }
  .auth-footer { margin-top: 26px; text-align: center; font-size: 14px; color: var(--text-3); }
  .auth-footer-link { color: var(--gold); font-weight: 600; text-decoration: none; transition: color 0.2s; }
  .auth-footer-link:hover { color: var(--gold-light); }
`;