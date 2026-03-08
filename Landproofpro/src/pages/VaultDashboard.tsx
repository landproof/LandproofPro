import { useEffect, useRef } from 'react';
import { FolderLock, Folder, FileText, Share2, Search, Plus, ShieldCheck, LockKeyhole, Key } from 'lucide-react';
import './VerifyDashboard.css';

const FOLDERS = [
  { id: '1', name: 'Verified Titles', items: 4, size: '24 MB' },
  { id: '2', name: 'Survey Documents', items: 2, size: '12 MB' },
  { id: '3', name: 'Shared with GTBank', items: 1, size: '5 MB', shared: true },
];

const FILES = [
  { id: 'f1', name: 'CofO_Maitama_Plot14.pdf', date: 'Oct 12, 2024', size: '4.2 MB', access: 'Private' },
  { id: 'f2', name: 'TDP_Gwarinpa_Phase2.pdf', date: 'Nov 05, 2024', size: '1.8 MB', access: 'Shared (Read-Only)' },
  { id: 'f3', name: 'Approved_Building_Plan_A1.pdf', date: 'Jan 22, 2025', size: '15.4 MB', access: 'Private' },
  { id: 'f4', name: 'Trust_Report_FCT-10293.pdf', date: 'Feb 10, 2025', size: '0.8 MB', access: 'Private' },
];

export default function VaultDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Simulating secure upload for ${e.target.files[0].name}...`);
    }
  };

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="section-label" style={{ color: '#60A5FA' }}><FolderLock size={12} /> LandProof Vault</div>
            <h1 className="display-3">Secure Document Storage</h1>
            <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
              Your personal encrypted property vault. Store verified titles, share time-bound access with banks or lawyers, and maintain total control over your data.
            </p>
          </div>
          <button className="btn btn-primary" style={{ background: '#2563EB', color: '#fff' }} onClick={handleUploadClick}>
            <Plus size={16}/> Upload Document
          </button>
          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
              <Search size={18} className="text-muted" />
              <input type="text" placeholder="Search Vault documents..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '0.95rem', width: '100%' }} />
            </div>

            {/* Folders */}
            <h3 className="heading-2" style={{ marginTop: '20px', fontSize: '1.1rem' }}>My Folders</h3>
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {FOLDERS.map(f => (
                <div key={f.id} className="bt-doc-item" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '20px', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <FolderLock size={24} style={{ color: f.shared ? 'var(--gold)' : '#60A5FA' }} />
                    {f.shared && <Share2 size={14} className="text-muted" />}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '8px' }}>{f.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.items} files · {f.size}</div>
                </div>
              ))}
            </div>

            {/* Files List */}
            <h3 className="heading-2" style={{ marginTop: '20px', fontSize: '1.1rem' }}>All Documents</h3>
            <div className="card" style={{ padding: '0' }}>
              {FILES.map((file, i) => (
                <div key={file.id} className="comp-check-row" style={{ padding: '16px 24px', borderBottom: i === FILES.length - 1 ? 'none' : '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 2 }}>
                    <FileText size={18} style={{ color: '#94a3b8' }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{file.name}</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{file.date}</div>
                  <div style={{ flex: 1, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{file.size}</div>
                  <div style={{ flex: 1, textAlign: 'right' }}>
                    <span className={`badge ${file.access === 'Private' ? 'badge-slate' : 'badge-info'}`} style={{ fontSize: '0.7rem' }}>
                      {file.access.includes('Shared') ? <Share2 size={10} style={{marginRight: 4, display:'inline'}}/> : <LockKeyhole size={10} style={{marginRight: 4, display:'inline'}}/>}
                      {file.access}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card" style={{ background: 'linear-gradient(145deg, rgba(37, 99, 235, 0.05), rgba(15, 23, 42, 1))', borderColor: 'rgba(37, 99, 235, 0.2)' }}>
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} style={{ color: '#60A5FA' }}/> Encryption Status
              </h3>
              <p className="body-sm" style={{ marginBottom: '16px' }}>All files are encrypted at rest using AES-256. Only you hold the decryption keys.</p>
              <div className="progress-bar" style={{ height: '6px', marginBottom: '8px' }}>
                <div className="progress-fill" style={{ width: '42%', background: '#60A5FA' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>42 MB Used</span>
                <span>1 GB Total</span>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} className="text-gold"/> Active Access Links
              </h3>
              <div className="vd-registry-list" style={{ gap: '16px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>GTBank Mortgage Dept</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Expires in 3 days · View Only</div>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', marginTop: '8px', fontSize: '0.7rem' }} onClick={() => alert('Access revoked for GTBank Mortgage Dept.')}>Revoke Access</button>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Adegboyega Legal Partners</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Never expires · Download</div>
                  <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', marginTop: '8px', fontSize: '0.7rem' }} onClick={() => alert('Access revoked for Adegboyega Legal Partners.')}>Revoke Access</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
