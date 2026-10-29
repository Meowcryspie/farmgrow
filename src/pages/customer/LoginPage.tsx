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

  return (
    <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Top Header with Logo */}
        <div style={{ marginBottom: '24px' }}>
          <Logo />
        </div>

        {/* Hero Isometric Drawing */}
        <div
          style={{
            margin: '0 auto 28px auto',
            maxWidth: '320px',
            filter: 'drop-shadow(0 12px 24px rgba(20, 70, 45, 0.12))',
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
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            marginBottom: '26px',
          }}
        >
          Log in to see all your farms.
        </p>

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

          <div style={{ marginTop: '12px' }}>
            <button type="submit" className="btn-primary">
              Log in
            </button>
          </div>
        </form>
      </div>

      {/* Footer Link */}
      <div style={{ textAlign: 'center', marginTop: '36px', paddingBottom: '12px' }}>
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
