import { useEffect, useState } from 'react';
import { Archive, UploadCloud, Search, FileText, Database, Shield, Lock, Clock, History, CheckCircle } from 'lucide-react';
import './VerifyDashboard.css'; // inherit shared dashboard styles

const RECENT_FILES = [
  { id: 'CofO-1998-FCT', name: 'Legacy CofO (1998) - Wuse Zone 4', status: 'Digitized & Indexed', hash: '0x9d...2f4a', date: '2 mins ago' },
  { id: 'TDP-2005-ABJ', name: 'Title Deed Plan - Maitama', status: 'Verifying Integrity', hash: 'Pending', date: '15 mins ago' },
  { id: 'SUR-1992-GWA', name: 'Survey Document - Gwarinpa', status: 'Archived', hash: '0x3a...8b9c', date: '1 hour ago' },
];

export default function ArchiveDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(0, 168, 107, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label"><Archive size={12} /> LandProof Archive</div>
          <h1 className="display-3">Digital Archiving & Disaster Recovery</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Prevent the loss of vital property records to fire, flood, or system failure. Protect legacy paper files with immutable, geo-redundant digital storage.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 320px' }}>
          <div className="vd-main">
            {/* Upload Area */}
            <div className={`vd-dropzone ${isUploading ? 'vd-dropzone--active' : ''}`} 
                 onClick={() => setIsUploading(true)}
                 style={{ padding: '40px 20px' }}>
              <div className="vd-dropzone__icon"><UploadCloud size={32} /></div>
              <h3 className="heading-2">Digitize Legacy Records</h3>
              <p className="body-sm" style={{ color: 'var(--text-muted)' }}>Drag and drop scanned paper files or archives</p>
              <div className="vd-dropzone__formats">
                <span className="badge">PDF</span>
                <span className="badge">JPEG</span>
                <span className="badge">TIFF</span>
              </div>
            </div>

            {/* Archive Search & List */}
            <div className="card" style={{ marginTop: '10px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 className="heading-2" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Database size={18} className="text-emerald" /> Indexed Archive</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <Search size={14} className="text-muted" />
                  <input type="text" placeholder="Search archive ID..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.85rem' }} />
                </div>
              </div>

              <div className="comp-checks__list">
                {RECENT_FILES.map(file => (
                  <div key={file.id} className="comp-check-row" style={{ padding: '16px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 2 }}>
                      <div className="vd-check__icon" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px' }}><FileText size={16} /></div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {file.id} · {file.date}</div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className={`badge ${file.status.includes('Pending') ? 'badge-warning' : 'badge-emerald'}`}>{file.status}</span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'right', fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      <Lock size={10} style={{ display: 'inline', marginRight: '4px' }}/> {file.hash}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Shield size={18} className="vd-info-card__icon"/> Disaster Recovery
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>LandProof maintains geo-redundant backups of all digitized records. A fire or flood in a physical registry will never erase ownership history again.</p>
              <ul className="vd-info-list pb-2">
                <li><CheckCircle size={14} /> Immutable blockchain hashes</li>
                <li><CheckCircle size={14} /> Distributed across 3 data centers</li>
                <li><CheckCircle size={14} /> 99.999% Durability guarantee</li>
              </ul>
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={18} className="vd-info-card__icon"/> System Stats
              </h3>
              <div className="vd-registry-list">
                <div className="vd-time-item"><span>Files Digitized</span><strong>1.2M+</strong></div>
                <div className="vd-time-item"><span>Total Storage</span><strong>4.8 TB</strong></div>
                <div className="vd-time-item"><span>Last Backup</span><strong>2 mins ago</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
