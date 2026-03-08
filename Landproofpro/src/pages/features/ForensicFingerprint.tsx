import { useEffect, useState } from 'react';
import { Fingerprint, ShieldCheck, Upload, Lock, AlertCircle } from 'lucide-react';
import '../VerifyDashboard.css';

const DOCS = [
  { name: 'CofO_Maitama_Plot14.pdf', hash: 'a3f8c2d...e41b9', status: 'clean', size: '4.2 MB' },
  { name: 'Survey_Plan_FCT10293.pdf', hash: '9c1b77a...f2e08', status: 'altered', size: '1.8 MB' },
  { name: 'Deed_Assignment_2015.pdf', hash: 'b82de4f...0a117', status: 'clean', size: '0.9 MB' },
];

export default function ForensicFingerprint() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [selected, setSelected] = useState(0);
  const doc = DOCS[selected];

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 60%)' }} /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#60A5FA' }}><Fingerprint size={12} /> Forensic Document Fingerprinting</div>
          <h1 className="display-3">Cryptographic Integrity Assurance</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Every verified document receives a SHA-256 cryptographic fingerprint. Any alteration — even a single pixel change — is immediately detected and flagged.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 320px' }}>
          <div className="vd-main">
            {/* Document Selector */}
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
              {DOCS.map((d, i) => (
                <div key={i} className={`bt-doc-item ${i === selected ? 'uploaded' : ''}`} onClick={() => setSelected(i)}
                  style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '8px', cursor: 'pointer', borderLeft: `3px solid ${d.status === 'clean' ? 'var(--emerald)' : 'var(--danger)'}` }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{d.name}</span>
                  <span className={`badge ${d.status === 'clean' ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '0.7rem' }}>{d.status === 'clean' ? '✓ Intact' : '⚠ Altered'}</span>
                </div>
              ))}
            </div>

            {/* Fingerprint Display */}
            <div className="card" style={{ padding: '32px', background: 'linear-gradient(145deg, rgba(15,23,42,1), rgba(30,41,59,0.8))' }}>
              <h3 className="heading-2" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Fingerprint size={18} style={{ color: '#60A5FA' }} /> {doc.name}
              </h3>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '20px', fontFamily: 'monospace', fontSize: '0.8rem', color: doc.status === 'clean' ? 'var(--emerald-light)' : 'var(--danger)', border: `1px solid ${doc.status === 'clean' ? 'rgba(0,168,107,0.2)' : 'rgba(239,68,68,0.2)'}`, letterSpacing: '2px', wordBreak: 'break-all' }}>
                  SHA-256: {doc.hash}
                  {doc.status === 'altered' && <span style={{ display: 'block', marginTop: '8px', color: 'var(--danger)', fontSize: '0.75rem' }}>⚠ Hash mismatch detected vs. registry fingerprint</span>}
                </div>

                <div className="vd-result__info-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="vd-result__info-item">
                    <div className="vd-result__info-label"><Lock size={12} />Integrity Status</div>
                    <div className="vd-result__info-value" style={{ color: doc.status === 'clean' ? 'var(--emerald-light)' : 'var(--danger)' }}>{doc.status === 'clean' ? 'Verified Intact' : 'COMPROMISED'}</div>
                  </div>
                  <div className="vd-result__info-item">
                    <div className="vd-result__info-label"><Fingerprint size={12} />File Size</div>
                    <div className="vd-result__info-value">{doc.size}</div>
                  </div>
                  <div className="vd-result__info-item">
                    <div className="vd-result__info-label"><ShieldCheck size={12} />Registry Match</div>
                    <div className="vd-result__info-value" style={{ color: doc.status === 'clean' ? 'var(--emerald-light)' : 'var(--danger)' }}>{doc.status === 'clean' ? '100% Match' : 'MISMATCH'}</div>
                  </div>
                </div>

                {doc.status === 'altered' && (
                  <div className="vd-check vd-check--fail">
                    <AlertCircle size={18} className="vd-check__icon" />
                    <div>
                      <div className="vd-check__label">Document integrity failure</div>
                      <div className="vd-check__detail">The submitted document does not match the cryptographic fingerprint registered with LandProof on Oct 5, 2024. This document may have been forged or modified.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', gap: '8px', display: 'flex', alignItems: 'center' }}>
                <Upload size={18} style={{ color: '#60A5FA' }} /> Fingerprint New Doc
              </h3>
              <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>Upload a document for immediate cryptographic fingerprinting and registry comparison.</p>
              <div className="vd-dropzone" style={{ padding: '30px 20px' }}>
                <Upload size={24} style={{ color: '#60A5FA', marginBottom: '8px' }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Drop PDF, JPEG, or TIFF</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Max 25 MB</div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Use Cases</h3>
              <ul className="vd-info-list">
                {['Courts (evidence verification)', 'Banks (mortgage security)', 'Government archives', 'Legal due diligence'].map(u => (
                  <li key={u} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <ShieldCheck size={12} />{u}
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
