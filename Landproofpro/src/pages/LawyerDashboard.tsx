import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, FileCheck, Search, Users, ShieldAlert, CheckCircle } from 'lucide-react';
import './VerifyDashboard.css';

const CASES = [
  { id: '1', client: 'Adebayo Family Trust', caseType: 'Title Perfection', status: 'Pending AGIS Sync', lastUpdated: 'Today, 10:00 AM' },
  { id: '2', client: 'Sunrise Developments', caseType: 'Deed of Assignment Review', status: 'Completed', lastUpdated: 'Oct 12, 2024' },
  { id: '3', client: 'Emeka O.', caseType: 'Boundary Dispute', status: 'In Court', lastUpdated: 'Oct 10, 2024' },
];

export default function LawyerDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(71, 85, 105, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#94A3B8' }}><Scale size={12} /> Legal Practitioner Portal</div>
          <h1 className="display-3">Legal & Conveyance Command Center</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Streamline property transactions, verify immutability of titles, and manage client escrows with absolute certainty.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} style={{ color: '#94A3B8', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>18</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Clients</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={24} style={{ color: 'var(--emerald)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>7</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Titles Perfected (YTD)</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldAlert size={24} style={{ color: 'var(--danger)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>2</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dispute Interventions</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--text-muted)' }} /> Active Cases & Transactions
               </h3>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {CASES.map(c => (
                <div key={c.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{c.client}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <Scale size={12} /> {c.caseType}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span className={`badge ${c.status === 'Completed' ? 'badge-success' : c.status === 'In Court' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{c.status}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated: {c.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} style={{ color: '#94A3B8' }}/> Encumbrance Search
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Instantly check the LandProof Ledger for any registered disputes, caveats, or liens.
               </p>
               <input type="text" placeholder="Owner Name or File Number" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }} />
               <Link to="/verify" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', background: '#475569', color: '#FFF', textDecoration: 'none' }}>Search Ledger</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} className="text-emerald"/> Escrow Payouts
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Sunrise Developments</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>Cleared on Title Perfection</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/dispute-warning" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Legal Dispute Warning</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/ai-signature" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>AI Signature Index</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/chain-of-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Chain-of-Title Intelligence</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
