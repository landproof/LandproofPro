import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, FileCheck, MapPin, Activity, HardHat, FileText, Upload } from 'lucide-react';
import './VerifyDashboard.css';

const SUBMISSIONS = [
  { id: '1', name: 'Structural Plan - Plot 14', client: 'Sunrise Developments', status: 'Pending Review', dueDate: 'Oct 15, 2024' },
  { id: '2', name: 'Soil Test Report - Area F', client: 'Abuja Metro Corp', status: 'Approved', dueDate: 'Oct 10, 2024' },
];

export default function ArchitectEngineerDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(147, 51, 234, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#A855F7' }}><Ruler size={12} /> Architect & Engineer Portal</div>
          <h1 className="display-3">Design & Compliance Hub</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Submit blueprints, track structural integrity reviews, and coordinate seamlessly with Development Control.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <HardHat size={24} style={{ color: '#A855F7', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>12</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Projects</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <FileCheck size={24} style={{ color: 'var(--emerald)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>4</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Approvals This Month</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={24} style={{ color: 'var(--warning)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>2</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Revisions Needed</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--text-muted)' }} /> Recent Submissions
               </h3>
               <Link to="/vault" className="btn btn-primary" style={{ background: '#9333EA', color: '#fff', textDecoration: 'none' }}><Upload size={16}/> Upload Blueprint</Link>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {SUBMISSIONS.map(sub => (
                <div key={sub.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{sub.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <HardHat size={12} /> {sub.client}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span className={`badge ${sub.status === 'Approved' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{sub.status}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Due: {sub.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} style={{ color: '#A855F7' }}/> Site Inspection Hub
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Log your site visits directly to the LandProof immutable ledger for compliance verification.
               </p>
               <Link to="/compliance" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', borderColor: 'rgba(147, 51, 234, 0.3)', color: '#D8B4FE', textDecoration: 'none' }}>Log Site Visit</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={16} className="text-emerald"/> Guidelines Updates
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>New Setback Rules</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>FCDA updated zoning setbacks for Guzape District.</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/approval-sla" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Approval SLA Intelligence</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/ask-landproof" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Natural Language Queries</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/regulatory-sandbox" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Regulatory Sandbox</Link>
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
