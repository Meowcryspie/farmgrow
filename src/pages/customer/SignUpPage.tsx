import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/common/Logo';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Amir Hakim');
  const [email, setEmail] = useState('amir@greenleaf.example');
  const [password, setPassword] = useState('••••••••••••');
  const [farmName, setFarmName] = useState('GreenLeaf Agro Sdn. Bhd.');
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/pair/scan');
  };

  return (
    <div style={{ padding: '20px 20px', display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        {/* Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
          <button
            onClick={() => navigate('/login')}
            aria-label="Back to login"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <Logo showWordmark={true} />
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            letterSpacing: '-0.5px',
            marginBottom: '6px',
          }}
        >
          Create your account
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--color-text-muted)',
            marginBottom: '26px',
          }}
        >
          Next, you will connect your first EC Mini.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="field-group">
            <label className="field-label" htmlFor="name-input">
              Full name
            </label>
            <input
              id="name-input"
              type="text"
              className="field-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="email-signup">
              Email
            </label>
            <input
              id="email-signup"
              type="email"
              className="field-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="password-signup">
              Password
            </label>
            <input
              id="password-signup"
              type="password"
              className="field-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>

          <div className="field-group">
            <label className="field-label" htmlFor="farm-input">
              Farm or company name
            </label>
            <input
              id="farm-input"
              type="text"
              className="field-input"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />
          </div>

          {/* Terms checkbox */}
          <label
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              marginTop: '4px',
            }}
          >
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
                accentColor: 'var(--color-accent-green)',
                marginTop: '2px',
              }}
            />
            <span style={{ fontSize: '13.5px', color: 'var(--color-text-main)', lineHeight: 1.4 }}>
              I agree to the Terms of Use and the Privacy Policy.
            </span>
          </label>

          <div style={{ marginTop: '16px' }}>
            <button type="submit" className="btn-primary" disabled={!agreeTerms}>
              Create account
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: '36px', paddingBottom: '12px' }}>
        <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ fontWeight: 600, color: 'var(--color-accent-green)' }}
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};
