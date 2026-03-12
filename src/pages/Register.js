import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { useForm } from 'react-hook-form';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
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
      await auth.register(data.username.trim(), data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <div className="auth-brand">Shop</div>
          <h2 className="auth-title">Create account</h2>
          <p className="auth-sub">Join us and start shopping today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="auth-field">
              <label className="auth-label">Username</label>
              <input
                className="field-input"
                placeholder="choose a username"
                autoComplete="username"
                {...register('username', {
                  required: 'Username is required',
                  minLength: { value: 3, message: 'Minimum 3 characters' }
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
                autoComplete="new-password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
                })}
              />
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            {error && <div className="error-banner">{error}</div>}

            <button type="submit" className="btn-gold auth-submit" disabled={loading}>
              {loading ? <><span className="spinner" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-footer-link">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}

const authStyles = `
  .auth-page {
    min-height: calc(100vh - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    position: relative;
    overflow: hidden;
    animation: fadeIn 0.4s ease both;
  }
  .auth-glow {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(232,168,56,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .auth-card {
    position: relative;
    width: 100%;
    max-width: 420px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 44px 40px;
    animation: fadeUp 0.45s ease both;
    box-shadow: 0 24px 64px rgba(0,0,0,0.5);
  }
  .auth-brand {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--gold);
    margin-bottom: 28px;
    letter-spacing: 0.02em;
  }
  .auth-title {
    font-family: var(--font-display);
    font-size: 34px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
    line-height: 1.15;
  }
  .auth-sub {
    font-size: 14px;
    color: var(--text-3);
    margin-bottom: 32px;
  }
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .auth-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .auth-label {
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
    font-weight: 600;
  }
  .auth-submit {
    width: 100%;
    padding: 15px;
    font-size: 15px;
    border-radius: var(--radius-sm);
    margin-top: 4px;
    justify-content: center;
    gap: 8px;
  }
  .auth-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 14px;
    color: var(--text-3);
  }
  .auth-footer-link {
    color: var(--gold);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;
  }
  .auth-footer-link:hover { color: var(--gold-light); }
`;
