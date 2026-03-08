import { useEffect, useState } from 'react';
import { Link2, Shield, AlertTriangle, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import '../VerifyDashboard.css';

const OWNERSHIP_CHAIN = [
  { date: '1972', owner: 'Federal Government of Nigeria', type: 'Original Grant', status: 'verified', doc: 'Crown Grant #1972-FCT-044' },
  { date: '1985', owner: 'FCDA Board of Trustees', type: 'Government Transfer', status: 'verified', doc: 'G. Gazette Vol. 22, p.17' },
  { date: '1994', owner: 'Late Chief Emeka Okafor', type: 'Statutory Right of Occupancy', status: 'verified', doc: 'R of O #FCT/94/17823' },
  { date: '2003', owner: 'Okafor Family Estate', type: 'Inheritance', status: 'warning', doc: 'Probate No. FCT/HC/PRO/2003 — Missing stamp' },
  { date: '2015', owner: 'Sunrise Properties Ltd', type: 'Deed of Assignment', status: 'verified', doc: 'Deed Reg. #ABJ-2015-44B' },
  { date: '2024', owner: 'Current Buyer (Pending)', type: 'Proposed Transfer', status: 'pending', doc: 'Awaiting registry confirmation' },
];

const FLAGS = [
  { type: 'pass', label: 'No double allocation detected', detail: 'Registry scan shows single unique parcel ID' },
  { type: 'warning', label: 'Gap in probate documentation (2003)', detail: 'Document stamp from Probate Registry appears unregistered' },
  { type: 'pass', label: 'No illegal reversions detected', detail: 'All transfers follow statutory chain without voids' },
  { type: 'pass', label: 'No retroactive document creation', detail: 'Metadata timestamps consistent with filing dates' },
];

export default function ChainOfTitle() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--emerald-light)' }}><Link2 size={12} /> Chain-of-Title Intelligence</div>
          <h1 className="display-3">Complete Ownership History</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            CTI reconstructs every transfer, approval, and allocation from the original government grant to the present owner — detecting gaps and anomalies that standard checks miss.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 320px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
              <h3 className="heading-2" style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link2 size={18} style={{ color: 'var(--emerald)' }} /> Ownership Chain — Plot FCT/MW/12B, Maitama
              </h3>

              <div className="bt-timeline">
                {OWNERSHIP_CHAIN.map((node, i) => (
                  <div key={i} className={`bt-timeline__item ${node.status === 'verified' ? 'bt-timeline__item--done' : ''}`}
                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                    style={{ cursor: 'pointer' }}>
                    <div className="bt-timeline__indicator">
                      <div className="bt-timeline__dot" style={{
                        borderColor: node.status === 'verified' ? 'var(--emerald)' : node.status === 'warning' ? 'var(--warning)' : 'var(--border)',
                        background: node.status === 'verified' ? 'var(--emerald)' : node.status === 'pending' ? 'transparent' : 'rgba(245,158,11,0.2)',
                        color: node.status === 'verified' ? '#fff' : node.status === 'warning' ? 'var(--warning)' : 'var(--text-muted)'
                      }}>
                        {node.status === 'verified' ? <CheckCircle size={14} /> : node.status === 'warning' ? <AlertTriangle size={14} /> : <Clock size={14} />}
                      </div>
                      {i < OWNERSHIP_CHAIN.length - 1 && <div className="bt-timeline__line" style={{ background: node.status === 'verified' ? 'var(--emerald)' : 'var(--border)' }} />}
                    </div>
                    <div className="bt-timeline__content" style={{ paddingBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <span className="bt-timeline__date">{node.date}</span>
                        <span className={`badge ${node.status === 'verified' ? 'badge-success' : node.status === 'warning' ? 'badge-warning' : 'badge-slate'}`} style={{ fontSize: '0.7rem' }}>{node.status}</span>
                      </div>
                      <div className={`bt-timeline__label ${node.status}`} style={{ fontSize: '1rem', color: node.status === 'warning' ? 'var(--gold-light)' : 'var(--text-primary)' }}>{node.owner}</div>
                      <div className="bt-timeline__detail">{node.type}</div>
                      {activeNode === i && (
                        <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          <strong>Document:</strong> {node.doc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card" style={{ background: 'linear-gradient(145deg, rgba(0,168,107,0.05), var(--navy-2))', borderColor: 'rgba(0,168,107,0.2)' }}>
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} style={{ color: 'var(--emerald)' }} /> CTI Analysis
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {FLAGS.map((f, i) => (
                  <div key={i} className={`vd-check ${f.type === 'pass' ? 'vd-check--pass' : 'vd-check--warning'}`}>
                    <div className="vd-check__icon">
                      {f.type === 'pass' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    </div>
                    <div>
                      <div className="vd-check__label">{f.label}</div>
                      <div className="vd-check__detail">{f.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Overall CTI Score</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'conic-gradient(var(--gold) 0deg 50deg, rgba(255,255,255,0.05) 50deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: '56px', height: '56px', background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, color: 'var(--gold)', fontSize: '1.1rem' }}>86</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Trust Score</div>
                  <div style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '1rem' }}>Mostly Clear</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>1 issue needs resolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
