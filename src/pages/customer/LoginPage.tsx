import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';
import { FarmOneDrawing } from '../../components/graphics/FarmOneDrawing';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('amir@greenleaf.example');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/app');
  };

  const handleInstantDemo = () => {
    navigate('/app');
  };

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header with Logo */}
        <div style={{ marginBottom: '20px' }}>
          <Logo />
        </div>

        {/* Hero Isometric Drawing with Soft Shadow */}
        <div
          style={{
            margin: '0 auto 24px auto',
            maxWidth: '320px',
            filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.16))',
          }}
        >
          <FarmOneDrawing />
        </div>

        {/* Headings */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
            lineHeight: 1.15,
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: '14.5px',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
          }}
        >
          Log in to see all your farms.
        </p>

        {/* One-Click Quick Tour Pill */}
        <div
          style={{
            padding: '12px 14px',
            borderRadius: '14px',
            background: 'var(--color-accent-glow)',
            border: '1px solid var(--color-accent-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>🚀</span>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--color-text-main)', display: 'block' }}>
                First-time guest?
              </strong>
              <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                Pre-filled with simulated commercial farm data
              </span>
            </div>
          </div>
          <button
            onClick={handleInstantDemo}
            className="btn-primary"
            style={{ width: 'auto', height: '34px', padding: '0 12px', fontSize: '12.5px' }}
          >
            Instant Demo
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="field-group">
            <label className="field-label" htmlFor="email-input">
              Email
            </label>
            <input
              id="email-input"
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password-input">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ textAlign: 'right', marginTop: '-4px' }}>
            <span
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: 'var(--color-accent-green)',
                cursor: 'pointer',
              }}
            >
              Forgot password?
            </span>
          </div>

          <div style={{ marginTop: '10px' }}>
            <button type="submit" className="btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>

      {/* Footer Link */}
      <div style={{ textAlign: 'center', marginTop: '32px', paddingBottom: '12px' }}>
        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
          New to EC Link?{' '}
          <Link
            to="/signup"
            style={{ fontWeight: 600, color: 'var(--color-accent-green)' }}
          >
            Create an account
          </Link>
        </span>
      </div>
    </div>
  );
};
