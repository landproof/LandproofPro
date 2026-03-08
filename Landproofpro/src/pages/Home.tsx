import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Scan, FileCheck, Building2, TrendingUp, AlertTriangle,
  ArrowRight, CheckCircle, ChevronRight, Star, Globe, Lock, Zap,
  Users, Award, BarChart3, MapPin, Archive, ShieldAlert, FolderLock, 
  Network, Fingerprint, Map, PieChart, Activity,
  Home as HomeIcon, Shield, PenTool, Landmark, Briefcase, Umbrella,
  MessageCircle, Smartphone, WifiOff, Crown, Cloud, Clock, FileKey
} from 'lucide-react';
import './Home.css';

const stats = [
  { value: '47,000+', label: 'Titles Verified', icon: <ShieldCheck size={20} /> },
  { value: '₦2.1T', label: 'Property Value Protected', icon: <Lock size={20} /> },
  { value: '3,200+', label: 'Fraud Cases Detected', icon: <AlertTriangle size={20} /> },
  { value: '98.6%', label: 'Verification Accuracy', icon: <TrendingUp size={20} /> },
];

const modules = [
  {
    id: 'verify',
    icon: <Scan size={28} />,
    label: 'LANDPROOF VERIFY',
    title: 'AI Document Verification',
    description: 'Authenticate land titles, CofO documents, survey plans and ownership chains in minutes — not months.',
    features: ['CofO & TDP Authentication', 'Forgery Detection AI', 'Duplicate Title Detection', 'Boundary Validation'],
    color: 'emerald',
    path: '/verify',
  },
  {
    id: 'compliance',
    icon: <FileCheck size={28} />,
    label: 'LANDPROOF COMPLIANCE',
    title: 'Master Plan Compliance',
    description: 'Verify zoning, land-use classification, and environmental constraints before investing a single Naira.',
    features: ['Abuja Master Plan Check', 'Floodplain Detection', 'Environmental Risk Score', 'Density Validation'],
    color: 'gold',
    path: '/compliance',
  },
  {
    id: 'buildtrack',
    icon: <Building2 size={28} />,
    label: 'LANDPROOF BUILDTRACK',
    title: 'Digital Building Approvals',
    description: 'Submit, track and receive building permits digitally — ending queues, opacity and corruption.',
    features: ['Online Plan Submission', 'Real-Time Approval Tracking', 'Fee Calculation', 'E-Certificate Issuance'],
    color: 'blue',
    path: '/buildtrack',
  },
  {
    id: 'archive',
    icon: <Archive size={28} />,
    label: 'LANDPROOF ARCHIVE',
    title: 'Digital Archiving & DR',
    description: 'Prevent loss of land and approval records due to fire, flood, or system failure with immutable backups.',
    features: ['Legacy File Digitization', 'Immutable Storage', 'Geo-redundant Backups', 'Emergency Retrieval'],
    color: 'emerald',
    path: '/archive',
  },
  {
    id: 'riskscore',
    icon: <ShieldAlert size={28} />,
    label: 'LANDPROOF RISKSCORE',
    title: 'Fraud & Compliance Risk Engine',
    description: 'Assign a trust rating and detect ownership conflicts, zoning risks, and litigation likelihoods in a click.',
    features: ['AI Fraud Probability Scoring', 'Ownership Conflict Risk', 'Zoning Compliance Risk', 'Red/Amber/Green Rating'],
    color: 'gold',
    path: '/riskscore',
  },
  {
    id: 'vault',
    icon: <FolderLock size={28} />,
    label: 'LANDPROOF VAULT',
    title: 'Secure Document Storage',
    description: 'A personal encrypted property vault with access control, time-bound sharing, and digital notarization.',
    features: ['Encrypted Storage', 'Access Control & Sharing', 'Bank & Lawyer Portals', 'Digital Notarization'],
    color: 'slate',
    path: '/vault',
  },
  {
    id: 'registrysync',
    icon: <Network size={28} />,
    label: 'REGISTRYSYNC',
    title: 'Government Tech Bridge',
    description: 'Bridge LandProof with official registries via read-only APIs for instant validation and change alerts.',
    features: ['API Integrations', 'Title & Survey Validation', 'Change Detection Alerts', 'Reconciliation Reports'],
    color: 'blue',
    path: '/registrysync',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Submit Document',
    description: 'Upload your land title, CofO, survey plan, or building plan securely through our encrypted portal.',
    icon: <FileCheck size={22} />,
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our AI engine cross-references registry databases, detects forgery indicators, and validates land boundaries.',
    icon: <Scan size={22} />,
  },
  {
    step: '03',
    title: 'Instant Trust Report',
    description: 'Receive a certified Trust Report with verification score, chain of ownership, and compliance status.',
    icon: <ShieldCheck size={22} />,
  },
];

const testimonials = [
  {
    name: 'Chukwuemeka Obi',
    role: 'Head of Risk, First Bank Nigeria',
    quote: 'LandProof has cut our property collateral verification from 3 weeks to under 2 hours. We now approve mortgages with confidence.',
    rating: 5,
    org: 'First Bank Nigeria',
  },
  {
    name: 'Amina Suleiman',
    role: 'Director, FCT Development Control',
    quote: 'BuildTrack has transformed how we process building permits. Transparency and accountability have improved dramatically.',
    rating: 5,
    org: 'FCTA',
  },
  {
    name: 'Adaeze Nwosu',
    role: 'Real Estate Developer, Lagos',
    quote: 'As a developer, I\'ve lost money to title fraud before. LandProof Verify gives me the confidence to invest and protect my assets.',
    rating: 5,
    org: 'Pinnacle Developments',
  },
];

const problems = [
  'Fake Certificates of Occupancy',
  'Forged survey plans & signatures',
  'Illegal land resale & speculation',
  'Loss of physical records (fire, flood)',
  'Manual, opaque approval processes',
  'Banks unable to trust collateral',
];

const advancedFeatures = [
  { group: 'Trust & Accuracy', items: [
    { title: 'Chain-of-Title Intelligence', path: '/features/chain-of-title', icon: <Scan size={16} /> },
    { title: 'Forensic Fingerprinting', path: '/features/forensic-fingerprint', icon: <Fingerprint size={16} /> },
    { title: 'AI Signature Index', path: '/features/ai-signature', icon: <PenTool size={16} /> },
    { title: 'Legal Dispute Warning', path: '/features/dispute-warning', icon: <AlertTriangle size={16} /> }
  ]},
  { group: 'Speed & Ease', items: [
    { title: '1-Minute Smart Verification', path: '/verify', icon: <Zap size={16} /> },
    { title: 'Auto-Filled Applications', path: '/features/auto-fill', icon: <FileCheck size={16} /> },
    { title: 'Natural Language Queries', path: '/features/ask-landproof', icon: <MessageCircle size={16} /> }
  ]},
  { group: 'Government-Grade', items: [
    { title: 'Digital Twin Map', path: '/features/digital-twin', icon: <Map size={16} /> },
    { title: 'Approval SLA Intelligence', path: '/features/approval-sla', icon: <BarChart3 size={16} /> },
    { title: 'Regulatory Sandbox', path: '/features/regulatory-sandbox', icon: <ShieldCheck size={16} /> }
  ]},
  { group: 'Finance & Usability', items: [
    { title: 'Mortgage Readiness Score', path: '/dashboard/bank', icon: <Landmark size={16} /> },
    { title: 'Insurance Risk Integration', path: '/dashboard/insurer', icon: <Umbrella size={16} /> },
    { title: 'Escrow-Linked Verification', path: '/features/escrow', icon: <Lock size={16} /> },
    { title: 'WhatsApp Interface', path: '/features/whatsapp', icon: <Smartphone size={16} /> },
    { title: 'Offline Capture Mode', path: '/features/offline', icon: <WifiOff size={16} /> }
  ]},
  { group: 'Defensibility & Moat (Premium)', items: [
    { title: 'Property Trust Score (PTS)', path: '/features/trust-score', icon: <Crown size={16} style={{ color: 'var(--gold)' }} /> },
    { title: 'Certified Reports', path: '/features/certified-reports', icon: <FileKey size={16} style={{ color: 'var(--gold)' }} /> },
    { title: 'Professional Network', path: '/features/professional-network', icon: <Users size={16} style={{ color: 'var(--gold)' }} /> },
    { title: 'Cross-Border Framework', path: '/features/cross-border', icon: <Globe size={16} style={{ color: 'var(--gold)' }} /> },
    { title: 'Zero-Loss Guarantee', path: '/features/zero-loss', icon: <Cloud size={16} style={{ color: 'var(--gold)' }} /> },
    { title: 'Time-Stamped Timeline', path: '/features/property-timeline', icon: <Clock size={16} style={{ color: 'var(--gold)' }} /> }
  ]}
];

function AnimatedCounter({ end, suffix = '' }: { end: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        setDisplay(end);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return <div ref={ref} className="stat-value">{display}</div>;
}

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="home">
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid" />
          <div className="hero__glow hero__glow--1" />
          <div className="hero__glow hero__glow--2" />
          <div className="hero__orbs">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`hero__orb hero__orb--${i + 1}`} />
            ))}
          </div>
        </div>

        <div className="container hero__content">
          <div className="hero__badge animate-fade-up">
            <span className="hero__badge-dot" />
            <MapPin size={12} /> Abuja, FCT, Nigeria · Expanding Across Africa
          </div>

          <h1 className="display-1 hero__headline animate-fade-up delay-100">
            The AI Property Trust<br />
            <span className="gradient-text">Operating System</span>
          </h1>

          <p className="hero__sub animate-fade-up delay-200">
            LandProof verifies land ownership, enforces development compliance, detects fraud,
            and preserves property records — creating a single source of truth for every
            land transaction in Nigeria.
          </p>

          <div className="hero__actions animate-fade-up delay-300">
            <Link to="/verify" className="btn btn-primary btn-lg">
              <Scan size={18} /> Verify a Title Now
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Request a Demo <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero__trust animate-fade-up delay-400">
            <div className="hero__trust-text">Trusted by:</div>
            {['FCTA', 'First Bank', 'GTB', 'NOUN', 'Pencom', 'Shell Nigeria'].map(p => (
              <div key={p} className="hero__trust-badge">{p}</div>
            ))}
          </div>
        </div>

        {/* Floating verification card */}
        <div className="hero__card-float animate-fade-up delay-500">
          <div className="hero__card glass">
            <div className="hero__card-header">
              <div className="hero__card-icon">
                <ShieldCheck size={16} />
              </div>
              <span>Verification Complete</span>
            </div>
            <div className="hero__card-title">Plot 14, Maitama District</div>
            <div className="hero__card-row">
              <span>Trust Score</span>
              <span className="hero__card-score">97 / 100</span>
            </div>
            <div className="progress-bar" style={{ margin: '8px 0 12px' }}>
              <div className="progress-fill" style={{ width: '97%' }} />
            </div>
            <div className="hero__card-checks">
              {['CofO Authentic', 'No Duplicate Found', 'Boundary Valid', 'Owner Verified'].map(c => (
                <div key={c} className="hero__card-check">
                  <CheckCircle size={12} /> {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="stats-section section-sm">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <div className="stat-icon">{s.icon}</div>
                <AnimatedCounter end={s.value} />
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="section">
        <div className="container">
          <div className="problem-grid">
            <div className="problem-text">
              <div className="section-label"><AlertTriangle size={12} /> The Crisis</div>
              <h2 className="display-3">Land fraud is destroying trust in Nigeria's property market</h2>
              <p className="body-lg" style={{ margin: '20px 0 32px' }}>
                Every year, Nigerians lose billions of Naira to fraudulent land transactions. Fake titles,
                duplicate CofOs, and opaque approval processes have made property investment a minefield.
              </p>
              <ul className="problem-list">
                {problems.map(p => (
                  <li key={p}>
                    <AlertTriangle size={14} className="problem-icon" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link to="/verify" className="btn btn-primary" style={{ marginTop: '32px' }}>
                See How LandProof Fixes This <ArrowRight size={16} />
              </Link>
            </div>
            <div className="problem-visual">
              <div className="problem-visual__inner">
                <div className="problem-visual__ring problem-visual__ring--1" />
                <div className="problem-visual__ring problem-visual__ring--2" />
                <div className="problem-visual__ring problem-visual__ring--3" />
                <div className="problem-visual__center">
                  <ShieldCheck size={40} className="problem-visual__icon" />
                  <span>LandProof AI</span>
                </div>
                {['CofO', 'Survey', 'TDP', 'Registry', 'Compliance', 'BuildTrack'].map((label, i) => {
                  const angle = (i / 6) * 360;
                  const r = 130;
                  const x = r * Math.cos((angle - 90) * (Math.PI / 180));
                  const y = r * Math.sin((angle - 90) * (Math.PI / 180));
                  return (
                    <div
                      key={label}
                      className="problem-visual__node"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULES ─── */}
      <section className="section modules-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Zap size={12} /> The Ecosystem</div>
            <h2 className="display-3">A Complete Trust Infrastructure</h2>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              LandProof brings together verification, compliance, approvals, archiving, and registry sync into one platform.
            </p>
          </div>

          <div className="modules-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {modules.map((mod) => (
              <div key={mod.id} className={`module-card module-card--${mod.color}`}>
                <div className={`module-card__icon module-card__icon--${mod.color}`}>{mod.icon}</div>
                <div className="module-card__label label">{mod.label}</div>
                <h3 className="heading-1 module-card__title">{mod.title}</h3>
                <p className="body-sm module-card__desc">{mod.description}</p>
                <ul className="module-card__features">
                  {mod.features.map(f => (
                    <li key={f}><CheckCircle size={13} /> {f}</li>
                  ))}
                </ul>
                <Link to={mod.path} className={`btn btn-ghost module-card__btn`}>
                  Explore Module <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 16 ADVANCED FEATURES ─── */}
      <section className="section features-section" style={{ background: 'var(--navy)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <div className="section-label" style={{ margin: '0 auto 20px', color: 'var(--gold-light)' }}><Star size={12} /> Platform Capabilities</div>
            <h2 className="display-3">16 Next-Generation Features</h2>
            <p className="body-lg" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              Built natively into the LandProof ecosystem to eliminate fraud and accelerate transactions natively.
            </p>
          </div>

          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {advancedFeatures.map((category) => (
              <div key={category.group} className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.02)' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  {category.group}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {category.items.map(item => (
                    <Link key={item.title} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-secondary)', transition: 'var(--transition)', fontSize: '0.9rem' }} 
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--emerald)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--emerald)' }}>{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section how-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><BarChart3 size={12} /> Process</div>
            <h2 className="display-3">Trust in 3 Simple Steps</h2>
          </div>
          <div className="how-grid">
            {howItWorks.map((step, idx) => (
              <div key={step.step} className="how-card">
                <div className="how-card__step">{step.step}</div>
                <div className="how-card__icon">{step.icon}</div>
                <h3 className="heading-2">{step.title}</h3>
                <p className="body-sm" style={{ marginTop: '10px' }}>{step.description}</p>
                {idx < howItWorks.length - 1 && <div className="how-card__arrow"><ArrowRight size={18} /></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Star size={12} /> Testimonials</div>
            <h2 className="display-3">Trusted Across the Sector</h2>
          </div>
          <div className="grid-3">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role} · {t.org}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY LANDPROOF ─── */}
      <section className="section why-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-text">
              <div className="section-label"><Globe size={12} /> Vision</div>
              <h2 className="display-3">Built for Nigeria. Ready for Africa.</h2>
              <p className="body-lg" style={{ margin: '20px 0 32px' }}>
                LandProof is designed from the ground up for emerging market challenges —
                offline resilience, multilingual support, and deep integration with Nigerian
                land registry systems.
              </p>
              <div className="why-points">
                {[
                  { icon: <Fingerprint size={18} />, title: 'Property Trust ID (PTID)', desc: 'Unique digital ID for every verified property across banks, buyers & govt.' },
                  { icon: <Map size={18} />, title: 'AI Boundary Intelligence', desc: 'Map-based conflict detection mapping overlaps or encroachments.' },
                  { icon: <Activity size={18} />, title: 'Approval SLA Monitoring', desc: 'Track processing timelines and improve transparency across boards.' },
                  { icon: <PieChart size={18} />, title: 'Development Heatmap', desc: 'Density visualization for compliance, fraud, and risk across Abuja.' },
                ].map(p => (
                  <div key={p.title} className="why-point">
                    <div className="why-point__icon">{p.icon}</div>
                    <div>
                      <div className="why-point__title">{p.title}</div>
                      <div className="why-point__desc">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="why-cta-card card">
              <div className="why-cta-card__badge badge badge-emerald">
                <span className="animate-ripple" style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                Live Platform
              </div>
              <h3 className="heading-1" style={{ margin: '16px 0 12px' }}>Ready to protect your property?</h3>
              <p className="body-sm" style={{ marginBottom: '28px' }}>
                Join thousands of Nigerians, banks, and developers who trust LandProof for secure, transparent, and AI-verified property transactions.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/verify" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  <Scan size={16} /> Verify a Property Title
                </Link>
                <Link to="/contact" className="btn btn-outline" style={{ justifyContent: 'center' }}>
                  Schedule a Demo <ArrowRight size={14} />
                </Link>
              </div>
              <div className="why-cta-meta">
                <CheckCircle size={13} /> Free first verification · No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ─── USER TYPES ─── */}
      <section className="section user-types-section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '50px' }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Users size={12} /> Who We Serve</div>
            <h2 className="display-3">Built for Every Stakeholder</h2>
          </div>
          <div className="user-types-grid">
            {[
              { icon: <HomeIcon size={24} />, title: 'Property Buyers', desc: 'Verify property authenticity and legal status before making a purchase.' },
              { icon: <Shield size={24} />, title: 'Landowners', desc: 'Secure titles in an encrypted digital vault against fraud and physical loss.' },
              { icon: <Building2 size={24} />, title: 'Developers', desc: 'Streamline building plan approvals and track masterplan compliance.' },
              { icon: <PenTool size={24} />, title: 'Architects & Engineers', desc: 'Submit designs digitally and monitor review stages in real-time.' },
              { icon: <Landmark size={24} />, title: 'Banks & Mortgage Institutions', desc: 'Instantly verify collateral and assess dynamic property risk scores.' },
              { icon: <Briefcase size={24} />, title: 'Lawyers', desc: 'Conduct rapid title searches and generate immutable property trust reports.' },
              { icon: <Users size={24} />, title: 'Estate Agents', desc: 'Prove listing legitimacy to clients with verified asset certificates.' },
              { icon: <ShieldCheck size={24} />, title: 'Government Agencies (FCTA, Development Control)', desc: 'Real-time compliance monitoring and secure read-only registry sync.' },
              { icon: <Umbrella size={24} />, title: 'Insurers', desc: 'Access comprehensive property risk scores for accurate underwriting.' }
            ].map(user => (
              <div key={user.title} className="user-type-card">
                <div className="user-type-card__icon">{user.icon}</div>
                <div className="user-type-card__title">{user.title}</div>
                <div className="user-type-card__desc">{user.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
