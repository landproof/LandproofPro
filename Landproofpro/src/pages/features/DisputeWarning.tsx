import { useEffect } from 'react';
import { TriangleAlert, Scale, Users, FileWarning, ShieldAlert } from 'lucide-react';
import '../VerifyDashboard.css';

const PROPERTIES = [
  { plot: 'Plot 8B, Asokoro Ext.', riskLevel: 'High', score: 87, flags: ['Multiple conflicting deed assignments filed 2019–2022', 'Subject of FCT High Court case (HC/CV/2020/441)', 'AGIS records show 2 claimants'] },
  { plot: 'Half Plot, Kado Estate', riskLevel: 'Medium', score: 52, flags: ['Unregistered family arrangement dispute flagged', 'One boundary encroachment complaint (2023)'] },
  { plot: 'Plot 14, Maitama District', riskLevel: 'Low', score: 12, flags: ['Clean — No active disputes in registry'] },
];

const RISK_COLOR: Record<string, string> = { High: 'var(--danger)', Medium: 'var(--warning)', Low: 'var(--emerald)' };

export default function DisputeWarning() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.07), transparent 60%)' }} /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--danger)' }}><TriangleAlert size={12} /> Legal Dispute Early-Warning System</div>
          <h1 className="display-3">Hidden Litigation Detection</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Pattern analysis across registry data, court records, and multiple claims activity surfaces properties likely to enter litigation — before you commit to a transaction.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PROPERTIES.map((p, i) => (
                <div key={i} className="card" style={{ padding: '24px', borderLeft: `4px solid ${RISK_COLOR[p.riskLevel]}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{p.plot}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className={`badge ${p.riskLevel === 'High' ? 'badge-danger' : p.riskLevel === 'Medium' ? 'badge-warning' : 'badge-success'}`} style={{ fontSize: '0.75rem' }}>{p.riskLevel} Risk</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Dispute Score: {p.score}/100</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `3px solid ${RISK_COLOR[p.riskLevel]}`, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: RISK_COLOR[p.riskLevel] }}>{p.score}</div>
                    </div>
                  </div>

                  <div className="progress-bar" style={{ marginBottom: '16px', height: '6px', background: 'rgba(255,255,255,0.05)' }}>
                    <div className="progress-fill" style={{ width: `${p.score}%`, background: RISK_COLOR[p.riskLevel] }} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {p.flags.map((flag, fi) => (
                      <div key={fi} className={`comp-issue ${p.riskLevel === 'High' ? 'comp-issue--error' : p.riskLevel === 'Medium' ? 'comp-issue--warning' : 'comp-issue--ok'}`}>
                        {p.riskLevel === 'Low' ? <ShieldAlert size={14} className="comp-issue__icon" style={{ color: 'var(--emerald)' }} /> : <FileWarning size={14} className="comp-issue__icon" />}
                        <span className="comp-issue__detail" style={{ fontSize: '0.83rem' }}>{flag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={18} style={{ color: 'var(--danger)' }} /> Detection Methods
              </h3>
              <ul className="vd-info-list" style={{ gap: '10px' }}>
                {[{ icon: <FileWarning size={14} />, label: 'Registry anomaly patterns' }, { icon: <Users size={14} />, label: 'Multiple claims activity' }, { icon: <Scale size={14} />, label: 'Court case cross-referencing' }, { icon: <TriangleAlert size={14} />, label: 'Family / customary disputes' }].map(m => (
                  <li key={m.label} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{m.icon}<span style={{ marginLeft: '8px' }}>{m.label}</span></li>
                ))}
              </ul>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Run Custom Check</h3>
              <input type="text" placeholder="Plot number or address..." style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }} />
              <button className="btn btn-primary" style={{ width: '100%', background: 'var(--danger)' }} onClick={() => alert('Running dispute scan... Please wait.')}>Run Dispute Scan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
