import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Scan, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { UserType } from '../context/AuthContext';
import { getRoleDashboardPath } from '../utils/roleRouter';
import './Auth.css';

const USER_TYPES: UserType[] = [
  "Property Buyers",
  "Landowners",
  "Developers",
  "Architects & Engineers",
  "Banks & Mortgage Institutions",
  "Lawyers",
  "Estate Agents",
  "Government Agencies (FCTA, Development Control)",
  "Insurers"
];

export default function Signup() {
  const [userType, setUserType] = useState<UserType>(USER_TYPES[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      signup(name, email, userType);
      // Redirect to the role-specific dashboard
      navigate(getRoleDashboardPath(userType), { replace: true });
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
            Join the Future of <span className="gradient-text">Property Trust</span>
          </h1>
          <p className="auth-brand__desc">
            Whether you are buying your first plot or managing a multi-billion Naira portfolio, LandProof secures your assets.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature__icon"><Scan size={24} /></div>
              <div>
                <div className="auth-feature__title">Instant Verification</div>
                <div className="auth-feature__desc">Authenticate CofOs, survey plans, and ownership histories in minutes.</div>
              </div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature__icon"><ShieldAlert size={24} /></div>
              <div>
                <div className="auth-feature__title">Fraud Prevention</div>
                <div className="auth-feature__desc">AI-powered conflict detection stops fraudulent transactions before they happen.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SIGNUP FORM SECTION */}
      <div className="auth-split auth-form-section">
        <div className="auth-card animate-fade-up delay-200">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Select your profile type to customize your experience.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="userType">I am joining as a:</label>
              <select 
                id="userType" 
                className="form-select"
                value={userType}
                onChange={(e) => setUserType(e.target.value as UserType)}
              >
                {USER_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name / Organization Name</label>
              <input 
                type="text" 
                id="fullName" 
                className="form-input" 
                placeholder="e.g. Chukwuemeka Obi"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                className="form-input" 
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                Must be at least 8 characters long.
              </p>
            </div>

            <button type="submit" className="btn btn-primary auth-btn premium-auth-btn">
              <span className="premium-auth-btn__text">Create Account</span>
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
            Already have an account? <Link to="/login">Log in here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
