import { useEffect } from 'react';
import { BadgeDollarSign, CheckCircle, Lock, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import '../VerifyDashboard.css';

const STEPS = [
  { step: 'Buyer deposits funds to LandProof Escrow', status: 'done', date: 'Oct 1, 2024' },
  { step: 'LandProof runs title & chain-of-title verification', status: 'done', date: 'Oct 2, 2024' },
  { step: 'Seller confirms receiving verified transfer notice', status: 'done', date: 'Oct 3, 2024' },
  { step: 'Registry ownership transfer confirmed & recorded', status: 'active', date: 'In Progress' },
  { step: 'Funds released to seller automatically', status: 'pending', date: 'Awaiting Step 4' },
];

const TRANSACTIONS = [
  { id: 'ESC-2024-0081', property: 'Plot 14, Maitama', amount: '₦150,000,000', stage: 'Transfer Pending', buyer: 'A. Johnson', seller: 'Sunrise Properties' },
  { id: 'ESC-2024-0072', property: 'Duplex, Wuse II', amount: '₦98,000,000', stage: 'Funds Released', buyer: 'K. Okeke', seller: 'Fidson Ltd' },
];

export default function EscrowVerification() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(212,168,67,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--gold)' }}><BadgeDollarSign size={12} /> Escrow-Linked Verification</div>
          <h1 className="display-3">Fraud-Proof Fund Release</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Funds only release when land passes verification and ownership transfer is confirmed on the LandProof registry. This single feature kills most real estate scams.
          </p>
        </div>
        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: '32px', marginBottom: '20px' }}>
              <h3 className="heading-2" style={{ marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}><BadgeDollarSign size={18} style={{ color: 'var(--gold)' }} /> Escrow Flow — ESC-2024-0081</h3>
              <div className="bt-timeline">
                {STEPS.map((s, i) => (
                  <div key={i} className={`bt-timeline__item ${s.status === 'done' ? 'bt-timeline__item--done' : ''}`}>
                    <div className="bt-timeline__indicator">
                      <div className="bt-timeline__dot" style={{ borderColor: s.status === 'done' ? 'var(--emerald)' : s.status === 'active' ? 'var(--gold)' : 'var(--border)', background: s.status === 'done' ? 'var(--emerald)' : 'transparent', color: s.status === 'done' ? '#fff' : s.status === 'active' ? 'var(--gold)' : 'var(--text-muted)' }}>
                        {s.status === 'done' ? <CheckCircle size={14} /> : s.status === 'active' ? <Clock size={14} /> : <Lock size={14} />}
                      </div>
                      {i < STEPS.length - 1 && <div className="bt-timeline__line" style={{ background: s.status === 'done' ? 'var(--emerald)' : 'var(--border)' }} />}
                    </div>
                    <div className="bt-timeline__content" style={{ paddingBottom: '20px' }}>
                      <div className={`bt-timeline__label ${s.status}`} style={{ color: s.status === 'done' ? 'var(--emerald-light)' : s.status === 'active' ? 'var(--gold-light)' : 'var(--text-muted)' }}>{s.step}</div>
                      <div className="bt-timeline__date" style={{ marginTop: '4px' }}>{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 className="heading-2" style={{ marginBottom: '16px', fontSize: '1rem' }}>Active Escrow Transactions</h3>
              {TRANSACTIONS.map(t => (
                <div key={t.id} className="comp-check-row" style={{ padding: '14px 0', gap: '16px' }}>
                  <div style={{ flex: 2 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.property}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.id} · {t.buyer} → {t.seller}</div>
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', flex: 1 }}>{t.amount}</div>
                  <span className={`badge ${t.stage === 'Funds Released' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{t.stage}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="vd-sidebar">
            <div className="card vd-info-card" style={{ background: 'linear-gradient(145deg, rgba(212,168,67,0.05), var(--navy-2))', borderColor: 'rgba(212,168,67,0.2)' }}>
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize:'1rem', display:'flex', gap:'8px', alignItems:'center' }}><ShieldCheck size={16} style={{ color: 'var(--gold)' }} /> Why It Works</h3>
              <ul className="vd-info-list">
                {['Funds held in trust — not with seller', 'Release only on verified transfer', 'No manual overrides possible', 'Kills advance-fee and impersonation scams'].map(w => (
                  <li key={w} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem' }}>
                    <ArrowRight size={12} style={{ color: 'var(--gold)', flexShrink: 0 }} />{w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
