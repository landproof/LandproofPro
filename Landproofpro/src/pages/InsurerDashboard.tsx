import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileWarning, Search, BarChart, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import './VerifyDashboard.css';

const POLICIES = [
  { id: '1', property: 'Plot 14, Maitama', owner: 'Adewale J.', type: 'Title Insurance', risk: 'Low', premium: '₦250,000/yr', status: 'Active' },
  { id: '2', property: 'Lugbe Res. Phase 2', owner: 'Okoro L.', type: 'Construction Risk', risk: 'Medium', premium: '₦850,000/yr', status: 'Pending Review' },
];

export default function InsurerDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#0EA5E9' }}><Shield size={12} /> Underwriting & Insurance Portal</div>
          <h1 className="display-3">Risk Assessment & Policy Management</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Calculate premiums dynamically based on LandProof’s immutable property history, dispute records, and zoning compliance.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={24} style={{ color: '#0EA5E9', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>156</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Policies</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart size={24} style={{ color: 'var(--emerald)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₦42M</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Annual Premiums</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <FileWarning size={24} style={{ color: 'var(--warning)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>3</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pending Claims</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} style={{ color: 'var(--text-muted)' }} /> Recent Applications & Policies
               </h3>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {POLICIES.map(pol => (
                <div key={pol.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: pol.risk === 'Low' ? '4px solid var(--emerald)' : '4px solid var(--warning)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{pol.property}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <AlertCircle size={12} /> {pol.type} • Owner: {pol.owner}
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.75rem', color: pol.risk === 'Low' ? 'var(--emerald)' : 'var(--warning)', fontWeight: 600 }}>Insurance Risk Integration: {pol.risk}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pol.premium}</span>
                    <span className={`badge ${pol.status === 'Active' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{pol.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} style={{ color: '#0EA5E9' }}/> Property Risk Assessor
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Generate an instant underwriting risk profile using real-time registry and structural compliance data.
               </p>
               <input type="text" placeholder="Enter Registration/File No." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }} />
               <Link to="/riskscore" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', background: '#0EA5E9', color: '#FFF', textDecoration: 'none' }}>Generate Risk Profile</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} className="text-emerald"/> Claims Processing
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Claim #4002-A</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>Approved - Payout Triggered</div>
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
                  <Link to="/features/forensic-fingerprint" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Forensic Fingerprinting</Link>
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
