import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Map, ShieldAlert, BarChart3, Clock, AlertTriangle, Users } from 'lucide-react';
import './VerifyDashboard.css';

const ALERTS = [
  { id: '1', area: 'Guzape District', issue: 'Zoning Violation - Commercial dev in Residential zone', severity: 'High', date: 'Oct 12, 2024' },
  { id: '2', area: 'Lugbe Phase 1', issue: 'Unapproved Structure Extension', severity: 'Medium', date: 'Oct 10, 2024' },
];

export default function GovernmentDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(16, 185, 129, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#10B981' }}><Building2 size={12} /> Government & Regulatory Portal</div>
          <h1 className="display-3">City-wide Compliance & Registry Sync</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Monitor urban development, track zoning compliance in real-time, and synchronize with the decentralized land registry.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Map size={24} style={{ color: '#10B981', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>1,245</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Registered Parcels</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart3 size={24} style={{ color: 'var(--blue)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>342</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Construction Sites</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldAlert size={24} style={{ color: 'var(--danger)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>8</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Stop Work Orders</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={18} style={{ color: 'var(--danger)' }} /> Zoning & Compliance Alerts
               </h3>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {ALERTS.map(alert => (
                <div key={alert.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: alert.severity === 'High' ? '4px solid var(--danger)' : '4px solid var(--warning)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{alert.issue}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <Map size={12} /> {alert.area}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span className={`badge ${alert.severity === 'High' ? 'badge-danger' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{alert.severity} Priority</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Detected: {alert.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} style={{ color: '#10B981' }}/> Field Inspector Dispatch
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Assign inspectors to flagged sites based on real-time data from the compliance engine.
               </p>
               <Link to="/buildtrack" className="btn btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', background: '#10B981', color: '#FFF', textDecoration: 'none' }}>Dispatch Team</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} className="text-muted"/> Recent Registry Syncs
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>TDP Batch 402</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>Synced successfully across nodes</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/digital-twin" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Digital Twin Map</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/regulatory-sandbox" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Regulatory Sandbox</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/approval-sla" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Approval SLA Intelligence</Link>
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
