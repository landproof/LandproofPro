import { Link } from 'react-router-dom';
import { Crown, ArrowLeft, ShieldCheck, FileKey, Globe, Cloud, Clock } from 'lucide-react';
import './PremiumUpgrade.css';

export default function PremiumUpgrade() {
  return (
    <div className="premium-page" style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflowY: 'auto', background: 'var(--slate)' }}>
      <div className="premium-hero">
        <Crown size={64} style={{ color: 'var(--gold)', marginBottom: '24px' }} />
        <h1 className="display-2" style={{ color: 'white', marginBottom: '16px' }}>Upgrade to LandProof Premium</h1>
        <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          You have discovered a Premium Defensibility feature. Upgrade your account to unlock government-grade disaster recovery, global expansion frameworks, and universal trust metrics.
        </p>
      </div>

      <div className="container" style={{ padding: '40px 20px', flex: 1 }}>
        <div className="premium-grid">
          
          <div className="premium-card">
            <ShieldCheck className="premium-card-icon" />
            <h3 className="premium-card-title">Property Trust Score (PTS)</h3>
            <p className="premium-card-desc">The universal "credit score" for property. Assess risk at a single glance before you buy or underwrite.</p>
          </div>

          <div className="premium-card">
            <FileKey className="premium-card-icon" />
            <h3 className="premium-card-title">Certified Verification Reports</h3>
            <p className="premium-card-desc">Generate tamper-proof, QR-verifiable PDFs formatted perfectly for legal admissibility in court.</p>
          </div>

          <div className="premium-card">
            <Globe className="premium-card-icon" />
            <h3 className="premium-card-title">Cross-Border Framework</h3>
            <p className="premium-card-desc">Instantly plug your operations into property ecosystems across Ghana, Kenya, and Rwanda.</p>
          </div>

          <div className="premium-card">
            <Cloud className="premium-card-icon" />
            <h3 className="premium-card-title">Zero-Loss Guarantee</h3>
            <p className="premium-card-desc">Military-grade cold storage backups and multi-region sync. Even after a fire or flood, your records survive.</p>
          </div>

          <div className="premium-card">
            <Clock className="premium-card-icon" />
            <h3 className="premium-card-title">Time-Stamped Timeline</h3>
            <p className="premium-card-desc">An immutable cryptographic ledger logging every action on a property—creating an undisputed history.</p>
          </div>

        </div>

        <div style={{ textAlign: 'center', marginTop: '64px', marginBottom: '64px' }}>
          <button className="btn btn-primary btn-lg" style={{ marginBottom: '24px' }} onClick={() => alert('Upgrade process initiated. Please check your email for the next steps.')}>
            Upgrade Now — Early Access
          </button>
          <div>
            <Link to="/" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} /> Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
