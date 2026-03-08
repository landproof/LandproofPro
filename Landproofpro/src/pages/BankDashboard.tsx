import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Landmark, FileSignature, ShieldCheck, Activity, BarChart3, FileText, CheckCircle } from 'lucide-react';
import './VerifyDashboard.css';

const APPLICATIONS = [
  { id: '1', applicant: 'Adewale Johnson', property: 'Plot 14, Maitama District', amount: '₦120M', riskScore: 'A (Low Risk)', status: 'Approved for Funding' },
  { id: '2', applicant: 'Sunrise Developments', property: 'Lugbe Phase 1', amount: '₦500M', riskScore: 'C (High Risk)', status: 'Pending Title Verification' },
];

export default function BankDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(234, 179, 8, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#EAB308' }}><Landmark size={12} /> Bank & Mortgage Portal</div>
          <h1 className="display-3">Risk Assessment & Lending Hub</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Instantly verify property titles, assess fraud risks, and fast-track mortgage approvals using immutable LandProof data.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart3 size={24} style={{ color: '#EAB308', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₦3.2B</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Loans Disbursed</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={24} style={{ color: 'var(--emerald)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>45</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Properties Secured</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <FileSignature size={24} style={{ color: 'var(--blue)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>12</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Applications</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} style={{ color: 'var(--text-muted)' }} /> Mortgage Pipeline
               </h3>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {APPLICATIONS.map(app => (
                <div key={app.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: app.riskScore.includes('Low') ? '4px solid var(--emerald)' : '4px solid var(--danger)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{app.applicant}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <FileText size={12} /> {app.property}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: app.riskScore.includes('Low') ? 'var(--emerald)' : 'var(--danger)' }}>Mortgage Readiness Score: {app.riskScore}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{app.amount}</span>
                    <span className={`badge ${app.status.includes('Approved') ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{app.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} style={{ color: '#EAB308' }}/> Quick Title Check
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Verify property ownership instantly before proceeding with application underwriting.
               </p>
               <input type="text" placeholder="Enter File/CofO Number" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }} />
               <Link to="/riskscore" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', background: '#EAB308', color: '#1E293B', textDecoration: 'none' }}>Run Risk Analysis</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} className="text-emerald"/> Recent Approvals
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>T. Adebayo - ₦45M</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>Funds Disbursed</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/forensic-fingerprint" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Forensic Fingerprinting</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/chain-of-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Chain-of-Title Intelligence</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/escrow" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Escrow-Linked Verification</Link>
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
