import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Fingerprint } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getRoleDashboardPath } from '../utils/roleRouter';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      // After login, the user object updates — redirect to role dashboard or original destination
      // We use a tiny timeout to let state settle, then navigate
      setTimeout(() => {
        const storedUserStr = localStorage.getItem('landproof_user');
        const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
        const destination = from || (storedUser ? getRoleDashboardPath(storedUser.userType) : '/dashboard/buyer');
        navigate(destination, { replace: true });
      }, 0);
    }
  };

  return (
    <div className="auth-page">
      {/* BRANDING SECTION */}
      <div className="auth-split auth-brand">
        <Link to="/" className="navbar__logo" style={{ alignSelf: 'flex-start' }}>
          <div className="navbar__logo-icon">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <span className="navbar__logo-text">Land<span>Proof</span></span>
        </Link>

        <div className="auth-brand__content animate-fade-up">
          <h1 className="auth-brand__title">
            Welcome back to the <span className="gradient-text">Trust Network</span>
          </h1>
          <p className="auth-brand__desc">
            Access your secure vault, monitor compliance, and verify property assets instantly.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature__icon"><Lock size={24} /></div>
              <div>
                <div className="auth-feature__title">Military-Grade Encryption</div>
                <div className="auth-feature__desc">Your documents and identity data are cryptographically secured.</div>
              </div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature__icon"><Fingerprint size={24} /></div>
              <div>
                <div className="auth-feature__title">Strictly Verified Network</div>
                <div className="auth-feature__desc">Join thousands of verified stakeholders across Nigeria.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOGIN FORM SECTION */}
      <div className="auth-split auth-form-section">
        <div className="auth-card animate-fade-up delay-200">
          <div className="auth-header">
            <h1>Log In</h1>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="form-input" 
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--emerald)', textDecoration: 'none' }}>Forgot?</Link>
              </div>
              <input 
                type="password" 
                id="password" 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-btn premium-auth-btn">
              <span className="premium-auth-btn__text">Log In</span>
              <div className="premium-auth-btn__icon-wrapper">
                <svg className="premium-auth-btn__parcel-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 8L12 4L20 8L16 20L8 20L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4 8L20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <ArrowRight size={18} className="premium-auth-btn__arrow-icon" />
              </div>
            </button>
          </form>

          <div className="auth-links">
            Don't have an account? <Link to="/signup">Create one here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
