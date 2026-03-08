import { useEffect, useState } from 'react';
import { FlaskConical, Play, BarChart, ArrowRight, CheckCircle } from 'lucide-react';
import '../VerifyDashboard.css';

const POLICIES = [
  { name: 'Mandatory CTI Report for all Sales above ₦50M', impact: { fraud: -42, approvalTime: +5, compliance: +18 }, risk: 'Low' },
  { name: 'Digital-Only Deed Processing (No paper deeds)', impact: { fraud: -31, approvalTime: -60, compliance: +22 }, risk: 'Medium' },
  { name: 'Mandatory Biometric Consent for Transfers', impact: { fraud: -67, approvalTime: +12, compliance: +35 }, risk: 'Medium' },
];

export default function RegulatorySandbox() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [selected, setSelected] = useState(0);
  const [simulated, setSimulated] = useState(false);
  const p = POLICIES[selected];

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#10B981' }}><FlaskConical size={12} /> Regulatory Sandbox Mode</div>
          <h1 className="display-3">Test Policies Before Enforcement</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Government agencies can simulate the real-world impact of new land policies before enforcing them — measuring projected outcomes on fraud, speed, and compliance. Extremely rare in Africa.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: '32px' }}>
              <h3 className="heading-2" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><BarChart size={18} style={{ color: '#10B981' }} /> Policy Simulator</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {POLICIES.map((pol, i) => (
                  <div key={i} onClick={() => { setSelected(i); setSimulated(false); }}
                    style={{ padding: '14px 18px', borderRadius: '10px', border: `1px solid ${i === selected ? 'var(--emerald)' : 'var(--border)'}`, background: i === selected ? 'rgba(0,168,107,0.05)' : 'transparent', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'var(--transition)' }}>
                    <span>{pol.name}</span>
                    <span className={`badge ${pol.risk === 'Low' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.7rem' }}>{pol.risk} Risk</span>
                  </div>
                ))}
              </div>

              {!simulated ? (
                <button onClick={() => setSimulated(true)} className="btn btn-primary" style={{ background: '#10B981', color: '#fff', padding: '12px 28px' }}>
                  <Play size={16} /> Run Simulation
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <CheckCircle size={18} style={{ color: '#10B981' }} />
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Simulation Complete — Projected Outcomes</span>
                  </div>
                  {[
                    { label: 'Fraud Reduction', val: `${p.impact.fraud}%`, good: p.impact.fraud < 0 },
                    { label: 'Approval Time Change', val: `${p.impact.approvalTime > 0 ? '+' : ''}${p.impact.approvalTime}%`, good: p.impact.approvalTime < 0 },
                    { label: 'Compliance Rate Lift', val: `+${p.impact.compliance}%`, good: true },
                  ].map(m => (
                    <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: `rgba(${m.good ? '0,168,107' : '239,68,68'},0.05)`, borderRadius: '8px', borderLeft: `3px solid ${m.good ? 'var(--emerald)' : 'var(--danger)'}` }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{m.label}</span>
                      <span style={{ fontWeight: 800, color: m.good ? 'var(--emerald-light)' : 'var(--danger)', fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem' }}>{m.val}</span>
                    </div>
                  ))}
                  <button onClick={() => setSimulated(false)} className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>Reset</button>
                </div>
              )}
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card" style={{ background: 'linear-gradient(145deg, rgba(16,185,129,0.05), var(--navy-2))' }}>
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>What Makes This Rare</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Most African governments enforce policies without data simulations, leading to unfair rollouts and public resistance. LandProof's Regulatory Sandbox lets agencies test and refine policy before it becomes law.
              </p>
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Access Requirements</h3>
              <ul className="vd-info-list">
                {['Government agency account required', 'Policy proposals reviewed by LandProof team', 'Sandbox results remain confidential', 'No public data is exposed during tests'].map(r => (
                  <li key={r} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.8rem' }}>
                    <ArrowRight size={12} style={{ color: '#10B981', flexShrink: 0 }} />{r}
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
