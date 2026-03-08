import { useEffect } from 'react';
import { Map, ShieldCheck, AlertTriangle, Building2, Layers } from 'lucide-react';
import '../VerifyDashboard.css';

const ZONES = [
  { id: 'A1', name: 'Maitama', compliance: 92, status: 'good', developments: 124 },
  { id: 'A2', name: 'Asokoro', compliance: 88, status: 'good', developments: 98 },
  { id: 'B1', name: 'Gwarinpa', compliance: 74, status: 'medium', developments: 340 },
  { id: 'B2', name: 'Lugbe', compliance: 61, status: 'medium', developments: 210 },
  { id: 'C1', name: 'Kuje', compliance: 43, status: 'risk', developments: 88 },
  { id: 'C2', name: 'Kwali', compliance: 38, status: 'risk', developments: 54 },
];

const STATUS_COLORS: Record<string, string> = { good: 'var(--emerald)', medium: 'var(--warning)', risk: 'var(--danger)' };

export default function DigitalTwin() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#10B981' }}><Map size={12} /> Digital Twin of Abuja Land System</div>
          <h1 className="display-3">Living City Intelligence Map</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            A real-time digital replica of Abuja's land system — allocations, development status, compliance levels, and risk zones — empowering government with insights while protecting privacy.
          </p>
        </div>
        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: '32px' }}>
              <h3 className="heading-2" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><Layers size={18} style={{ color: '#10B981' }} /> FCT District Compliance Overview</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {ZONES.map(z => (
                  <div key={z.id} style={{ padding: '20px', background: `rgba(${z.status === 'good' ? '0,168,107' : z.status === 'medium' ? '245,158,11' : '239,68,68'}, 0.05)`, borderRadius: '12px', border: `1px solid ${STATUS_COLORS[z.status]}30` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>{z.name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{z.id}</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: STATUS_COLORS[z.status], fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>{z.compliance}%</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Compliance Rate</div>
                    <div className="progress-bar" style={{ height: '6px', marginBottom: '10px' }}>
                      <div className="progress-fill" style={{ width: `${z.compliance}%`, background: STATUS_COLORS[z.status] }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{z.developments} sites</span>
                      <span className={`badge ${z.status === 'good' ? 'badge-success' : z.status === 'medium' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.65rem' }}>{z.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', fontSize: '1rem', display: 'flex', gap: '8px', alignItems: 'center' }}><Building2 size={16} style={{ color: '#10B981' }} /> City Summary</h3>
              {[{ label: 'Total Parcels Monitored', val: '1,245' }, { label: 'Active Construction Sites', val: '342' }, { label: 'Compliance Violations', val: '41 Active' }, { label: 'Avg. FCT Compliance', val: '66%' }].map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{s.val}</span>
                </div>
              ))}
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem', display: 'flex', gap: '8px', alignItems: 'center' }}><AlertTriangle size={16} style={{ color: 'var(--warning)' }} /> Risk Zone Legend</h3>
              {[{ color: 'var(--emerald)', label: 'High Compliance (75%+)' }, { color: 'var(--warning)', label: 'Moderate Risk (50–74%)' }, { color: 'var(--danger)', label: 'High Risk (Below 50%)' }].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: l.color, flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
