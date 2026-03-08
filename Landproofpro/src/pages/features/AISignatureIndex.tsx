import { useEffect, useState } from 'react';
import { ScanFace, ShieldAlert, CheckCircle, AlertTriangle, PenLine } from 'lucide-react';
import '../VerifyDashboard.css';

const SIGNATURES = [
  { title: "Certified True Copy — AGIS Director", submitted: "Submitted Stamp", registry: "Registered Seal", confidence: 97, status: 'pass' },
  { title: "Licensed Surveyor Endorsement — J. Okafor", submitted: "Submitted Endorsement", registry: "Registry Copy", confidence: 48, status: 'fail' },
  { title: "Development Control Officer Signature", submitted: "Submitted Sig.", registry: "Registered Sig.", confidence: 92, status: 'pass' },
];

function ConfidenceBar({ value, status }: { value: number; status: string }) {
  const color = status === 'pass' ? 'var(--emerald)' : value > 70 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
        <span>Authenticity Confidence</span><span style={{ color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div className="progress-bar" style={{ height: '8px', background: 'rgba(255,255,255,0.05)' }}>
        <div className="progress-fill" style={{ width: `${value}%`, background: color, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
}

export default function AISignatureIndex() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [active, setActive] = useState(0);
  const sig = SIGNATURES[active];

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(147,51,234,0.08), transparent 60%)' }} /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#A855F7' }}><ScanFace size={12} /> AI Signature & Stamp Authority Index</div>
          <h1 className="display-3">Forgery Detection Engine</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Our AI has learned the authentic signatures and official stamps of surveyors, registrars, and directors across the FCT. It catches "almost real" forgeries that humans miss.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 320px' }}>
          <div className="vd-main">
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
              {SIGNATURES.map((s, i) => (
                <div key={i} className={`bt-doc-item ${i === active ? 'uploaded' : ''}`} onClick={() => setActive(i)}
                  style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '8px', cursor: 'pointer', borderLeft: `3px solid ${s.status === 'pass' ? 'var(--emerald)' : 'var(--danger)'}` }}>
                  <PenLine size={20} style={{ color: s.status === 'pass' ? 'var(--emerald)' : 'var(--danger)' }} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.title}</span>
                  <span className={`badge ${s.status === 'pass' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>{s.status === 'pass' ? 'Authentic' : 'Flagged'}</span>
                </div>
              ))}
            </div>

            <div className="card" style={{ padding: '32px' }}>
              <h3 className="heading-2" style={{ marginBottom: '24px' }}>{sig.title}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {[{ label: 'Submitted', val: sig.submitted }, { label: 'Registry Reference', val: sig.registry }].map(item => (
                  <div key={item.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PenLine size={28} style={{ color: 'var(--text-muted)', opacity: 0.4 }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.val}</span>
                  </div>
                ))}
              </div>
              <ConfidenceBar value={sig.confidence} status={sig.status} />
              <div className={`vd-check ${sig.status === 'pass' ? 'vd-check--pass' : 'vd-check--fail'}`} style={{ marginTop: '16px' }}>
                {sig.status === 'pass' ? <CheckCircle size={18} className="vd-check__icon" /> : <AlertTriangle size={18} className="vd-check__icon" />}
                <div>
                  <div className="vd-check__label">{sig.status === 'pass' ? 'Signature authenticated' : 'Potential forgery detected'}</div>
                  <div className="vd-check__detail">{sig.status === 'pass' ? 'Pattern matches registered authority signature with high confidence.' : `Only ${sig.confidence}% match. This endorsement does not meet the authenticity threshold of 85%.`}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card" style={{ background: 'linear-gradient(145deg, rgba(147,51,234,0.05), var(--navy-2))' }}>
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert size={18} style={{ color: '#A855F7' }} /> Why This Matters
              </h3>
              <p className="body-sm" style={{ color: 'var(--text-muted)' }}>
                Most Nigerian land fraud does not use obvious fakes. It uses highly skilled forgeries of real officials' signatures on real documents. Standard verification cannot catch this — AI can.
              </p>
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Threshold Guide</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[{ range: '90–100%', label: 'Authentic', color: 'var(--emerald)' }, { range: '70–89%', label: 'Needs Review', color: 'var(--warning)' }, { range: '0–69%', label: 'Flagged — Forgery Risk', color: 'var(--danger)' }].map(t => (
                  <div key={t.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.82rem', borderLeft: `3px solid ${t.color}` }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{t.range}</span>
                    <span style={{ color: t.color, fontWeight: 600 }}>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
