import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, MapPin, Phone, Twitter, Linkedin, Facebook } from 'lucide-react';
import './Footer.css';

const modules = [
  { label: 'LandProof Verify', path: '/verify' },
  { label: 'LandProof Compliance', path: '/compliance' },
  { label: 'LandProof BuildTrack', path: '/buildtrack' },
  { label: 'LandProof Archive', path: '/archive' },
  { label: 'LandProof RiskScore', path: '/riskscore' },
  { label: 'LandProof Vault', path: '/vault' },
  { label: 'LandProof RegistrySync', path: '/registrysync' },
];

const company = [
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Request a Demo', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              <span>Land<span>Proof</span></span>
            </Link>
            <p className="footer__tagline">
              AI-powered property trust operating system. Verifying land ownership, enforcing compliance, and preserving records across Nigeria and Africa.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn"><Linkedin size={16} /></a>
              <a href="#" className="footer__social-link" aria-label="Facebook"><Facebook size={16} /></a>
            </div>
          </div>

          {/* Modules */}
          <div>
            <p className="footer__col-label">Modules</p>
            <ul className="footer__links">
              {modules.map(m => (
                <li key={m.path}><Link to={m.path}>{m.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer__col-label">Company</p>
            <ul className="footer__links">
              {company.map(c => (
                <li key={c.path}><Link to={c.path}>{c.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer__col-label">Contact</p>
            <ul className="footer__contact-list">
              <li><MapPin size={14} /><span>Abuja, FCT, Nigeria</span></li>
              <li><Mail size={14} /><span>hello@landproof.io</span></li>
              <li><Phone size={14} /><span>09011966000</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2025 LandProof Technologies Ltd. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Data Protection</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
