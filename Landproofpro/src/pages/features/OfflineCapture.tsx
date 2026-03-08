import { useEffect, useState } from 'react';
import { WifiOff, Wifi, Upload, FileText, Camera, CheckCircle, Clock } from 'lucide-react';
import '../VerifyDashboard.css';

const QUEUE = [
  { id: 'OFF-001', doc: 'Survey_Plan_Lugbe.jpg', captured: '14:22 — No network', synced: false },
  { id: 'OFF-002', doc: 'CofO_Gwagwalada.pdf', captured: '14:35 — No network', synced: false },
  { id: 'OFF-003', doc: 'Deed_Kuje_Plot8.jpg', captured: '09:12 — No network', synced: true },
];

export default function OfflineCapture() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [online, setOnline] = useState(false);
  const [synced, setSynced] = useState([true, false, false]);

  const simulateSync = () => {
    setOnline(true);
    setTimeout(() => setSynced([true, true, true]), 1200);
  };

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(100,116,139,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#94A3B8' }}><WifiOff size={12} /> Offline Capture Mode</div>
          <h1 className="display-3">Works Without Internet</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Field officers scan and capture documents in remote areas with no internet. Documents queue locally and sync automatically the moment a connection is restored. Critical for Africa.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            {/* Status banner */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: online ? 'rgba(0,168,107,0.06)' : 'rgba(100,116,139,0.06)', borderRadius: '12px', border: `1px solid ${online ? 'var(--emerald)' : 'rgba(100,116,139,0.3)'}`, marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {online ? <Wifi size={20} style={{ color: 'var(--emerald)' }} /> : <WifiOff size={20} style={{ color: '#94A3B8' }} />}
                <div>
                  <div style={{ fontWeight: 600, color: online ? 'var(--emerald-light)' : 'var(--text-secondary)', fontSize: '0.9rem' }}>{online ? 'Back Online — Syncing...' : 'Offline Mode Active'}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{online ? 'Documents being uploaded to LandProof server' : '3 documents pending sync'}</div>
                </div>
              </div>
              {!online && <button onClick={simulateSync} className="btn btn-primary" style={{ padding: '8px 16px', background: '#475569', fontSize: '0.82rem' }}>Simulate Sync</button>}
              {online && <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--emerald)' }}><CheckCircle size={16} /> All synced</div>}
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h3 className="heading-2" style={{ marginBottom: '20px', fontSize: '1.1rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <FileText size={18} style={{ color: '#94A3B8' }} /> Offline Document Queue
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {QUEUE.map((doc, i) => (
                  <div key={doc.id} className="bt-doc-item" style={{ padding: '16px 20px', justifyContent: 'space-between', borderLeft: `3px solid ${(doc.synced || synced[i]) ? 'var(--emerald)' : 'var(--border)'}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Camera size={18} style={{ color: (doc.synced || synced[i]) ? 'var(--emerald)' : '#94A3B8', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{doc.doc}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{doc.id} · Captured {doc.captured}</div>
                      </div>
                    </div>
                    {(doc.synced || synced[i]) ? (
                      <span className="badge badge-success" style={{ fontSize: '0.7rem' }}><CheckCircle size={10} style={{ marginRight: 4 }} />Synced</span>
                    ) : (
                      <span className="badge badge-slate" style={{ fontSize: '0.7rem' }}><Clock size={10} style={{ marginRight: 4 }} />Queued</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '14px', fontSize: '1rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Upload size={16} style={{ color: '#94A3B8' }} /> Field Officer Workflow
              </h3>
              {[{ n: '1', t: 'Open LandProof field app' }, { n: '2', t: 'Scan or photograph documents' }, { n: '3', t: 'Documents stored locally with metadata' }, { n: '4', t: 'Auto-sync when network restored' }, { n: '5', t: 'Verification begins on server immediately' }].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: '0.83rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8' }}>{s.n}</div>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>{s.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
