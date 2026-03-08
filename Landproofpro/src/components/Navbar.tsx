import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, ChevronDown, Landmark, Briefcase, Building2, HardHat, CircleDollarSign, Fingerprint, Activity, Map, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const modules = [
  { label: 'LandProof Verify', path: '/verify', description: 'Document & ownership verification', icon: <Fingerprint size={18} /> },
  { label: 'LandProof Compliance', path: '/compliance', description: 'Zoning & master plan checks', icon: <Map size={18} /> },
  { label: 'LandProof BuildTrack', path: '/buildtrack', description: 'Building approvals & tracking', icon: <HardHat size={18} /> },
  { label: 'LandProof Archive', path: '/archive', description: 'Digital archiving & disaster recovery', icon: <Activity size={18} /> },
  { label: 'LandProof RiskScore', path: '/riskscore', description: 'Fraud & compliance risk engine', icon: <ShieldCheck size={18} /> },
  { label: 'LandProof Vault', path: '/vault', description: 'Secure document storage', icon: <Landmark size={18} /> },
  { label: 'LandProof RegistrySync', path: '/registrysync', description: 'Government registry integration', icon: <CircleDollarSign size={18} /> },
];

const roleDashboards = [
  { label: 'Buyer Portal', path: '/dashboard/buyer', description: 'Property discovery & verification', icon: <Map size={18} /> },
  { label: 'Landowner Portal', path: '/dashboard/landowner', description: 'Portfolio management', icon: <Landmark size={18} /> },
  { label: 'Developer Portal', path: '/dashboard/developer', description: 'Project command center', icon: <Building2 size={18} /> },
  { label: 'Architect Portal', path: '/dashboard/architect', description: 'Design & compliance hub', icon: <HardHat size={18} /> },
  { label: 'Bank Portal', path: '/dashboard/bank', description: 'Mortgage & risk assessment', icon: <CircleDollarSign size={18} /> },
  { label: 'Lawyer Portal', path: '/dashboard/lawyer', description: 'Legal & conveyance center', icon: <Briefcase size={18} /> },
  { label: 'Agent Portal', path: '/dashboard/agent', description: 'Verified listings management', icon: <Briefcase size={18} /> },
  { label: 'Government Portal', path: '/dashboard/government', description: 'City-wide compliance', icon: <Landmark size={18} /> },
  { label: 'Insurer Portal', path: '/dashboard/insurer', description: 'Underwriting & policy management', icon: <Activity size={18} /> },
];

const features = [
  // Intelligence
  { label: 'Chain-of-Title Intelligence', path: '/features/chain-of-title', description: 'Full ownership history & fraud detection', category: 'Intelligence' },
  { label: 'Dispute Early Warning', path: '/features/dispute-warning', description: 'Hidden litigation detection', category: 'Intelligence' },
  { label: 'Approval SLA Intelligence', path: '/features/approval-sla', description: 'Agency processing transparency', category: 'Intelligence' },
  { label: 'Ask LandProof AI', path: '/features/ask-landproof', description: 'Natural language property queries', category: 'Intelligence' },
  
  // Security
  { label: 'Forensic Fingerprinting', path: '/features/forensic-fingerprint', description: 'Cryptographic document integrity', category: 'Security' },
  { label: 'AI Signature Index', path: '/features/ai-signature', description: 'Forgery detection engine', category: 'Security' },
  { label: 'Escrow-Linked Verification', path: '/features/escrow', description: 'Fraud-proof fund release', category: 'Security' },
  
  // Automation & Field
  { label: 'Auto-Fill Applications', path: '/features/auto-fill', description: 'Zero-error government forms', category: 'Automation' },
  { label: 'Digital Twin — Abuja', path: '/features/digital-twin', description: 'Living city compliance map', category: 'Automation' },
  { label: 'Regulatory Sandbox', path: '/features/regulatory-sandbox', description: 'Policy simulation', category: 'Automation' },
  { label: 'WhatsApp Interface', path: '/features/whatsapp', description: 'Verify via WhatsApp', category: 'Automation' },
  { label: 'Offline Capture Mode', path: '/features/offline', description: 'Field scanning without internet', category: 'Automation' },
  
  // Premium Features
  { label: 'Property Trust Score (PTS)', path: '/features/trust-score', description: 'The universal credit score for property', isPremium: true, category: 'Premium' },
  { label: 'Certified Reports', path: '/features/certified-reports', description: 'Tamper-proof, QR-verifiable PDFs for court', isPremium: true, category: 'Premium' },
  { label: 'Professional Network', path: '/features/professional-network', description: 'Verified architects, surveyors, and lawyers', isPremium: true, category: 'Premium' },
  { label: 'Cross-Border Framework', path: '/features/cross-border', description: 'Expansion to Ghana, Kenya & Rwanda', isPremium: true, category: 'Premium' },
  { label: 'Zero-Loss Guarantee', path: '/features/zero-loss', description: 'Multi-region disaster recovery backups', isPremium: true, category: 'Premium' },
  { label: 'Property Timeline', path: '/features/property-timeline', description: 'Time-stamped, immutable historical ledger', isPremium: true, category: 'Premium' },
];

interface NavbarProps {
  onSidebarToggle?: () => void;
}

export default function Navbar({ onSidebarToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [hoveredPreview, setHoveredPreview] = useState<any>(null);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setModulesOpen(false);
    setRolesOpen(false);
    setFeaturesOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <span className="navbar__logo-text">Land<span>Proof</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar__links hide-mobile">
          {!isAuthenticated && (
            <>
              <div
                className="navbar__dropdown-trigger"
                onMouseEnter={() => setModulesOpen(true)}
                onMouseLeave={() => setModulesOpen(false)}
              >
                <span>Modules</span>
                <ChevronDown size={14} className={modulesOpen ? 'rotated' : ''} />
                {modulesOpen && (
                  <div className="navbar__dropdown mega-menu">
                    <div className="mega-menu__list grid-2">
                      {modules.map((m) => (
                        <Link 
                          key={m.path} 
                          to={m.path} 
                          className="navbar__dropdown-item"
                          onMouseEnter={() => setHoveredPreview(m)}
                        >
                          <div className="navbar__dropdown-item-content">
                            {m.icon && <span className="navbar__dropdown-icon">{m.icon}</span>}
                            <div className="flex-col">
                              <span className="navbar__dropdown-label">{m.label}</span>
                              <span className="navbar__dropdown-desc">{m.description}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Reusable Preview Panel */}
                    <div className="mega-menu__preview">
                      <div className="mega-menu__preview-card">
                        {hoveredPreview ? (
                          <div className="mega-menu__preview-content animate-fade-in">
                            <div className="mega-menu__preview-header">
                              <div className="mega-menu__preview-icon-large">
                                {hoveredPreview.icon || <ShieldCheck size={28} />}
                              </div>
                              <div className="mega-menu__preview-metric animate-slide-in-right">
                                <span className="metric-value">127</span>
                                <span className="metric-label">Verified Today</span>
                              </div>
                            </div>
                            
                            <h4 className="mega-menu__preview-title">{hoveredPreview.label}</h4>
                            
                            <div className="mega-menu__preview-mockup animate-slide-up-fade">
                              <div className="mockup-row"><div className="mockup-line w-3/4"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-full"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-5/6"></div></div>
                            </div>
                            
                            <div className="mega-menu__preview-cta">
                              Access Module <ArrowRight size={14} className="cta-arrow" />
                            </div>
                          </div>
                        ) : (
                          <div className="mega-menu__preview-empty">
                            <Fingerprint size={32} className="empty-icon" />
                            <p>Hover over a module to preview capabilities</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="navbar__dropdown-trigger"
                onMouseEnter={() => setRolesOpen(true)}
                onMouseLeave={() => { setRolesOpen(false); setHoveredPreview(null); }}
              >
                <span>Role Dashboards</span>
                <ChevronDown size={14} className={rolesOpen ? 'rotated' : ''} />
                {rolesOpen && (
                  <div className="navbar__dropdown mega-menu">
                    <div className="mega-menu__list grid-2">
                      {roleDashboards.map((r) => (
                        <Link 
                          key={r.path} 
                          to={r.path} 
                          className="navbar__dropdown-item"
                          onMouseEnter={() => setHoveredPreview(r)}
                        >
                          <div className="navbar__dropdown-item-content">
                            {r.icon && <span className="navbar__dropdown-icon">{r.icon}</span>}
                            <div className="flex-col">
                              <span className="navbar__dropdown-label">{r.label}</span>
                              <span className="navbar__dropdown-desc">{r.description}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mega-menu__preview">
                      <div className="mega-menu__preview-card">
                        {hoveredPreview ? (
                          <div className="mega-menu__preview-content animate-fade-in">
                            <div className="mega-menu__preview-header">
                              <div className="mega-menu__preview-icon-large">
                                {hoveredPreview.icon || <ShieldCheck size={28} />}
                              </div>
                              <div className="mega-menu__preview-metric animate-slide-in-right">
                                <span className="metric-value">Active</span>
                                <span className="metric-label">System Status</span>
                              </div>
                            </div>
                            
                            <h4 className="mega-menu__preview-title">{hoveredPreview.label}</h4>
                            
                            <div className="mega-menu__preview-mockup animate-slide-up-fade">
                              <div className="mockup-row"><div className="mockup-line w-3/4"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-full"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-1/2"></div></div>
                            </div>
                            
                            <div className="mega-menu__preview-cta">
                              Enter Portal <ArrowRight size={14} className="cta-arrow" />
                            </div>
                          </div>
                        ) : (
                          <div className="mega-menu__preview-empty">
                            <div className="illustration-grid" />
                            <Map size={32} className="empty-icon relative z-2" />
                            <p className="relative z-2">Hover over a portal to see capabilities</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="navbar__dropdown-trigger"
                onMouseEnter={() => setFeaturesOpen(true)}
                onMouseLeave={() => { setFeaturesOpen(false); setHoveredPreview(null); }}
              >
                <span>Features</span>
                <ChevronDown size={14} className={featuresOpen ? 'rotated' : ''} />
                {featuresOpen && (
                  <div className="navbar__dropdown mega-menu mega-menu--wide">
                    <div className="mega-menu__list grid-3" style={{ gap: '24px 16px' }}>
                      {['Intelligence', 'Security', 'Automation', 'Premium'].map(category => (
                        <div key={category} className={`mega-menu__category ${category === 'Premium' ? 'mega-menu__category--premium' : ''}`}>
                          <h6 className="mega-menu__category-title">
                            {category} {category === 'Premium' && <ShieldCheck size={12} style={{ color: 'var(--gold)', display: 'inline', marginLeft: '4px' }} />}
                          </h6>
                          <div className="mega-menu__category-items">
                            {features.filter(f => f.category === category).map((f) => (
                              <Link 
                                key={f.path} 
                                to={f.path} 
                                className={`navbar__dropdown-item ${f.isPremium ? 'premium-item' : ''}`}
                                onMouseEnter={() => setHoveredPreview(f)}
                              >
                                <div className="flex-col">
                                  <span className="navbar__dropdown-label">
                                    {f.label}
                                  </span>
                                  <span className="navbar__dropdown-desc">{f.description}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mega-menu__preview">
                      <div className="mega-menu__preview-card">
                         {hoveredPreview ? (
                          <div className="mega-menu__preview-content animate-fade-in">
                            <div className="mega-menu__preview-header">
                              <div className="mega-menu__preview-icon-large" style={{ color: hoveredPreview.isPremium ? 'var(--gold)' : 'var(--emerald)', background: hoveredPreview.isPremium ? 'rgba(212, 168, 67, 0.1)' : 'rgba(0, 168, 107, 0.1)', borderColor: hoveredPreview.isPremium ? 'rgba(212, 168, 67, 0.2)' : 'rgba(0, 168, 107, 0.2)' }}>
                                <ShieldCheck size={28} />
                              </div>
                              <div className="mega-menu__preview-metric animate-slide-in-right">
                                <span className="metric-value">99.9%</span>
                                <span className="metric-label">Accuracy</span>
                              </div>
                            </div>
                            
                            <h4 className="mega-menu__preview-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              {hoveredPreview.label}
                              {hoveredPreview.isPremium && <ShieldCheck size={14} style={{ color: 'var(--gold)' }} />}
                            </h4>
                            
                            <div className="mega-menu__preview-mockup animate-slide-up-fade">
                              <div className="mockup-row"><div className="mockup-line w-full"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-3/4"></div></div>
                              <div className="mockup-row"><div className="mockup-line w-5/6"></div></div>
                            </div>
                            
                            <div className="mega-menu__preview-cta" style={{ color: hoveredPreview.isPremium ? 'var(--gold)' : 'var(--emerald)' }}>
                              Learn More <ArrowRight size={14} className="cta-arrow" />
                            </div>
                          </div>
                        ) : (
                          <div className="mega-menu__preview-empty">
                            <Activity size={32} className="empty-icon" />
                            <p>Hover over a feature to preview</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          <Link to="/about" className={`navbar__link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link to="/contact" className={`navbar__link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
        </div>

        {/* CTA */}
        <div className="navbar__actions hide-mobile">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link to="/verify" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}>
                <span style={{ opacity: 0.7 }}>Welcome,</span> <strong>{user?.name}</strong>
              </Link>
              <button 
                onClick={() => { logout(); setMenuOpen(false); }} 
                className="btn btn-outline btn-sm" 
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm" style={{ borderColor: 'transparent', background: 'transparent' }}>Log In</Link>
              <Link to="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        {isAuthenticated && onSidebarToggle ? (
          <button className="navbar__mobile-toggle" onClick={onSidebarToggle}>
            <Menu size={22} />
          </button>
        ) : (
          <button className="navbar__mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && !isAuthenticated && (
        <div className="navbar__mobile-menu">
          <div className="container">
            {!isAuthenticated && (
              <>
                <p className="navbar__mobile-section-label">Modules</p>
                {modules.map((m) => (
                  <Link key={m.path} to={m.path} className="navbar__mobile-link">
                    <span>{m.label}</span>
                  </Link>
                ))}
                <hr className="divider" style={{ margin: '12px 0' }} />
                <p className="navbar__mobile-section-label">Role Dashboards</p>
                {roleDashboards.map((r) => (
                  <Link key={r.path} to={r.path} className="navbar__mobile-link">
                    <span>{r.label}</span>
                  </Link>
                ))}
                <hr className="divider" style={{ margin: '12px 0' }} />
                <p className="navbar__mobile-section-label">Features</p>
                {features.map((f) => (
                  <Link key={f.path} to={f.path} className="navbar__mobile-link">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {f.label}
                      {f.isPremium && <ShieldCheck size={12} style={{ color: 'var(--gold)' }} />}
                    </span>
                  </Link>
                ))}
                <hr className="divider" style={{ margin: '12px 0' }} />
              </>
            )}
            <Link to="/about" className="navbar__mobile-link">About</Link>
            <Link to="/contact" className="navbar__mobile-link">Contact</Link>
            
            {isAuthenticated ? (
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/verify" style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center', color: 'white', textDecoration: 'none' }}>
                   Welcome, <strong>{user?.name}</strong>
                </Link>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className="btn btn-outline btn-sm" 
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <Link to="/login" className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Log In</Link>
                <Link to="/signup" className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
