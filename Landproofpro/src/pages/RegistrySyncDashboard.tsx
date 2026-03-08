import { useEffect } from 'react';
import { Network, Database, CheckCircle, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';
import './VerifyDashboard.css';

const REGISTRIES = [
  { id: 'agis', name: 'AGIS (Abuja Geographic Info Systems)', status: 'Connected', ping: '12ms', lastSync: 'Just now', validated: '18,492', icon: 'A' },
  { id: 'fcta', name: 'FCTA Development Control', status: 'Connected', ping: '24ms', lastSync: '5 mins ago', validated: '4,103', icon: 'F' },
  { id: 'cac', name: 'Corporate Affairs Commission', status: 'Syncing', ping: '45ms', lastSync: '1 hour ago', validated: '8,991', icon: 'C' },
  { id: 'nlc', name: 'Nigerian Law Commission (Litigation)', status: 'Connected', ping: '18ms', lastSync: '12 mins ago', validated: '1,200', icon: 'N' },
];

export default function RegistrySyncDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(148, 163, 184, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#94a3b8' }}><Network size={12} /> RegistrySync</div>
          <h1 className="display-3">Government Tech Bridge</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '650px', marginTop: '10px' }}>
            LandProof bridges the gap with official government registries via read-only APIs. We do not replace registries; we synchronize, validate, and detect changes in real-time.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 340px' }}>
          <div className="vd-main">
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              {REGISTRIES.map(reg => (
                <div key={reg.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="testimonial-avatar" style={{ width: 44, height: 44, fontSize: '1.2rem', background: 'rgba(255,255,255,0.05)', color: '#cbd5e1' }}>{reg.icon}</div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reg.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Read-Only API Integration</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Connection Status</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, color: reg.status === 'Connected' ? 'var(--emerald-light)' : 'var(--gold)' }}>
                        {reg.status === 'Connected' ? <CheckCircle size={14} /> : <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '2s' }} />}
                        {reg.status}
                      </div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Titles Validated</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{reg.validated}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                    <span>Last Sync: {reg.lastSync}</span>
                    <span>Latency: {reg.ping}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card" style={{ marginTop: '4px', padding: '0' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 className="heading-2" style={{ fontSize: '1.1rem' }}>Recent Change Detection Alerts</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => alert('Opening full sync logs...')}>View All Logs</button>
              </div>
              <div className="comp-checks__list" style={{ padding: '0 24px' }}>
                <div className="comp-check-row" style={{ padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <AlertTriangle size={16} className="text-warning" style={{ marginTop: '2px' }} />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>CofO Modification Detected</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>AGIS Record for Plot 14, Maitama updated. Ownership name modified.</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>22 mins ago · Tracking ID: TRK-9921</div>
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }} onClick={() => alert('Reviewing change details for TRK-9921...')}>Review Change <ArrowRight size={12}/></button>
                </div>
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Database size={18} style={{ color: '#94a3b8' }}/> Sync Architecture
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>LandProof utilizes read-only state hooks. We never modify government data directly, preventing accidental corruption while ensuring our Truth Ledger matches the state registry.</p>
              <ul className="vd-info-list pb-2">
                <li><CheckCircle size={14} /> 100% Read-Only API</li>
                <li><CheckCircle size={14} /> Hourly Reconciliation</li>
                <li><CheckCircle size={14} /> Delta Change Detection</li>
                <li><CheckCircle size={14} /> Automated Alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
