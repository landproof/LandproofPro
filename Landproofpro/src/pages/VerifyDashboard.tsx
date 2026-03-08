import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Scan, Upload, FileText, CheckCircle, XCircle, AlertTriangle,
  ShieldCheck, Clock, ArrowRight, Download, Eye, RotateCcw,
  Building, User, MapPin, Calendar, Hash
} from 'lucide-react';
import './VerifyDashboard.css';

type ScanStage = 'idle' | 'uploading' | 'analyzing' | 'complete' | 'failed';

interface ScanResult {
  score: number;
  status: 'verified' | 'suspicious' | 'failed';
  checks: { label: string; status: 'pass' | 'fail' | 'warning'; detail: string }[];
  owner: string;
  plotNumber: string;
  location: string;
  issuedDate: string;
  expiry: string;
  titleRef: string;
}

const mockResult: ScanResult = {
  score: 94,
  status: 'verified',
  owner: 'Adaeze Nwosu',
  plotNumber: 'PLT/FCT/MAIT/0042781',
  location: 'Plot 14, Maitama District, Abuja, FCT',
  issuedDate: '12 March 2018',
  expiry: '12 March 2113 (99yr lease)',
  titleRef: 'CofO/AGIS/2018/00421',
  checks: [
    { label: 'Document Authenticity', status: 'pass', detail: 'Digital watermark & seal validated' },
    { label: 'Registry Cross-Check', status: 'pass', detail: 'Matched against AGIS central registry' },
    { label: 'Duplicate Title Detection', status: 'pass', detail: 'No duplicates found in national database' },
    { label: 'Boundary Validation', status: 'pass', detail: 'Plot boundaries verified via GIS data' },
    { label: 'Owner Identity Verification', status: 'pass', detail: 'NIN & CAC cross-reference passed' },
    { label: 'Signature & Stamp', status: 'pass', detail: 'Governor/Registrar signatures authenticated' },
    { label: 'Litigation Check', status: 'warning', detail: 'One resolved dispute — 2014, cleared' },
    { label: 'Encumbrance Check', status: 'pass', detail: 'No active liens or mortgages found' },
  ],
};

export default function VerifyDashboard() {
  const [stage, setStage] = useState<ScanStage>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const runScan = (name: string) => {
    setFileName(name);
    setStage('uploading');
    setProgress(0);

    const steps = [
      { delay: 600, p: 30, stage: 'uploading' as ScanStage },
      { delay: 1200, p: 60, stage: 'analyzing' as ScanStage },
      { delay: 2000, p: 80, stage: 'analyzing' as ScanStage },
      { delay: 2800, p: 95, stage: 'analyzing' as ScanStage },
      { delay: 3400, p: 100, stage: 'complete' as ScanStage },
    ];

    steps.forEach(({ delay, p, stage: s }) => {
      setTimeout(() => {
        setProgress(p);
        setStage(s);
        if (s === 'complete') setResult(mockResult);
      }, delay);
    });
  };

  const handleFile = (file: File) => runScan(file.name);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setStage('idle');
    setProgress(0);
    setFileName('');
    setResult(null);
  };

  return (
    <div className="verify-dashboard">
      <div className="verify-dashboard__bg">
        <div className="verify-dashboard__glow" />
      </div>

      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: '80px' }}>
        {/* Header */}
        <div className="vd-header">
          <div className="section-label"><Scan size={12} /> LandProof Verify</div>
          <h1 className="display-3">1-Minute Smart Verification</h1>
          <p className="body-lg" style={{ maxWidth: '600px' }}>
            Upload a land title, Certificate of Occupancy, or Survey Plan. Our AI will authenticate,
            cross-reference registries, and detect fraud in seconds.
          </p>
        </div>

        <div className="vd-layout">
          {/* Left — Upload & Scanner */}
          <div className="vd-main">
            {stage === 'idle' ? (
              <div
                className={`vd-dropzone ${dragOver ? 'vd-dropzone--active' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                />
                <div className="vd-dropzone__icon">
                  <Scan size={36} />
                </div>
                <h3 className="heading-2" style={{ marginBottom: '8px' }}>Upload Document</h3>
                <p className="body-sm" style={{ textAlign: 'center', marginBottom: '16px' }}>
                  Drag & drop your CofO, TDP, or Survey Plan here<br />or click to browse
                </p>
                <div className="vd-dropzone__formats" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '24px' }}>
                  PDF / JPG / PNG
                </div>
                <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
                  <Upload size={16} /> Select File
                </button>

                {/* Demo shortcut */}
                <div className="vd-dropzone__demo">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Try a demo:</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button className="vd-dropzone__demo-btn" onClick={(e) => { e.stopPropagation(); runScan('CofO_Maitama.pdf'); }}>
                      <FileText size={14} style={{ color: '#EF4444' }} /> CofO_Maitama.pdf
                    </button>
                    <button className="vd-dropzone__demo-btn" onClick={(e) => { e.stopPropagation(); runScan('Survey_Wuse.pdf'); }}>
                      <Scan size={14} style={{ color: '#3B82F6' }} /> Survey_Wuse.pdf
                    </button>
                    <button className="vd-dropzone__demo-btn" onClick={(e) => { e.stopPropagation(); runScan('TDP_Garki.pdf'); }}>
                      <FileText size={14} style={{ color: '#F59E0B' }} /> TDP_Garki.pdf
                    </button>
                  </div>
                </div>
              </div>
            ) : stage === 'uploading' || stage === 'analyzing' ? (
              <div className="vd-live-scan">
                <div className="vd-live-scan__header">
                  <div className="vd-live-scan__info">
                    <Scan size={24} className="animate-pulse" style={{ color: 'var(--emerald)' }} />
                    <div>
                      <h3 className="heading-2" style={{ fontSize: '1.1rem', marginBottom: '2px' }}>
                        {stage === 'uploading' ? 'Uploading Document securely...' : 'AI Analysis in Progress...'}
                      </h3>
                      <p className="body-sm" style={{ fontSize: '0.8rem' }}>
                        {stage === 'uploading' ? `Encrypting ${fileName}` : `Running forensic checks on ${fileName}`}
                      </p>
                    </div>
                  </div>
                  <div className="vd-live-scan__progress">{progress}%</div>
                </div>

                <div className="progress-bar" style={{ marginBottom: '32px' }}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <div className="vd-live-scan__arena">
                  {/* Left: Document Thumbnail with Scanning Beam */}
                  <div className="vd-live-scan__doc">
                    <div className="vd-live-scan__doc-inner">
                      <FileText size={48} style={{ color: 'var(--border)', opacity: 0.5 }} />
                      <div className="vd-live-scan__beam" style={{ display: progress > 10 && progress < 100 ? 'block' : 'none' }} />
                    </div>
                  </div>

                  {/* Right: Registry Nodes & Live Results */}
                  <div className="vd-live-scan__nodes">
                    <div className={`registry-node ${progress > 20 ? 'active' : ''}`}>
                      <div className="registry-node__icon">
                        {progress > 20 ? <CheckCircle size={14} /> : <div className="registry-node__dot" />}
                      </div>
                      <div className="registry-node__label">AGIS Land Registry</div>
                    </div>
                    
                    <div className={`registry-node ${progress > 40 ? 'active' : ''}`}>
                      <div className="registry-node__icon">
                        {progress > 40 ? <CheckCircle size={14} /> : <div className="registry-node__dot" />}
                      </div>
                      <div className="registry-node__label">Identity & Signatures</div>
                    </div>

                    <div className={`registry-node ${progress > 60 ? 'active' : ''}`}>
                      <div className="registry-node__icon">
                        {progress > 60 ? <CheckCircle size={14} /> : <div className="registry-node__dot" />}
                      </div>
                      <div className="registry-node__label">Litigation Databanks</div>
                    </div>

                    {/* Preliminary Match Hint */}
                    <div className={`vd-live-scan__prelim ${progress >= 60 && progress < 100 ? 'visible' : ''}`}>
                      <div className="vd-live-scan__prelim-bg" />
                      <div style={{ position: 'relative', zIndex: 2 }}>
                        <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>Preliminary Match</span>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>Title Deed Detected</p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Maitama District, FCT — Pending Final Validation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : result ? (
              <div className="vd-result">
                <div className="vd-result__header">
                  <div className={`vd-result__score vd-result__score--${result.status === 'verified' ? 'success' : 'fail'}`}>
                    <div className="vd-result__score-ring">
                      <svg viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                        <circle
                          cx="40" cy="40" r="34" fill="none"
                          stroke={result.score > 80 ? 'var(--emerald-light)' : 'var(--warning)'}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(result.score / 100) * 213.6} 213.6`}
                          transform="rotate(-90 40 40)"
                          style={{ transition: 'stroke-dasharray 1s ease' }}
                        />
                      </svg>
                      <span>{result.score}</span>
                    </div>
                    <div>
                      <div className="vd-result__score-label">Trust Score</div>
                      <div className={`badge ${result.status === 'verified' ? 'badge-emerald' : 'badge-danger'}`}>
                        {result.status === 'verified' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                        {result.status === 'verified' ? 'Verified' : 'Suspicious'}
                      </div>
                    </div>
                  </div>
                  <div className="vd-result__actions">
                    <button className="btn btn-primary btn-sm" onClick={() => alert(`Downloading report for ${fileName}...`)}><Download size={14} /> Download Report</button>
                    <button className="btn btn-ghost btn-sm" onClick={reset}><RotateCcw size={14} /> New Scan</button>
                  </div>
                </div>

                {/* Property Info */}
                <div className="vd-result__info card" style={{ padding: '24px', marginBottom: '20px' }}>
                  <h4 className="heading-2" style={{ marginBottom: '16px' }}>Property Details</h4>
                  <div className="vd-result__info-grid">
                    {[
                      { icon: <User size={14} />, label: 'Registered Owner', value: result.owner },
                      { icon: <Hash size={14} />, label: 'Plot Number', value: result.plotNumber },
                      { icon: <MapPin size={14} />, label: 'Location', value: result.location },
                      { icon: <Calendar size={14} />, label: 'Issue Date', value: result.issuedDate },
                      { icon: <Clock size={14} />, label: 'Lease Term', value: result.expiry },
                      { icon: <FileText size={14} />, label: 'Title Reference', value: result.titleRef },
                    ].map(item => (
                      <div key={item.label} className="vd-result__info-item">
                        <div className="vd-result__info-label">{item.icon} {item.label}</div>
                        <div className="vd-result__info-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checks */}
                <div className="vd-checks">
                  <h4 className="heading-2" style={{ marginBottom: '16px' }}>Verification Checks</h4>
                  <div className="vd-checks__grid">
                    {result.checks.map(c => (
                      <div key={c.label} className={`vd-check vd-check--${c.status}`}>
                        <div className="vd-check__icon">
                          {c.status === 'pass' ? <CheckCircle size={14} /> :
                           c.status === 'fail' ? <XCircle size={14} /> :
                           <AlertTriangle size={14} />}
                        </div>
                        <div>
                          <div className="vd-check__label">{c.label}</div>
                          <div className="vd-check__detail">{c.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card vd-turnaround-anchor">
              <Clock size={24} style={{ color: 'var(--emerald)', marginBottom: '16px' }} />
              <h4 style={{ margin: '0 0 16px', fontSize: '1.25rem' }}>Turnaround Time</h4>
              
              <div className="vd-time-item vd-time-item--highlight">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="live-dot" />
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Smart Verification</span>
                </div>
                <strong style={{ fontSize: '1.1rem' }}>60 secs</strong>
              </div>
              
              <div className="vd-time-item">
                <span>Deep Registry Check</span><strong>15 mins</strong>
              </div>
              <div className="vd-time-item">
                <span>Full Due Diligence</span><strong>24 hrs</strong>
              </div>
            </div>

            <div className="card vd-info-card">
              <ShieldCheck size={20} className="vd-info-card__icon" />
              <h4 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>What We Verify</h4>
              <ul className="vd-info-list">
                {[
                  'Certificate of Occupancy (CofO)',
                  'Title Deeds & TDP',
                  'Survey Plans',
                  'Deed of Assignment',
                  'Governor\'s Consent',
                  'Probate Titles',
                ].map(item => (
                  <li key={item}><CheckCircle size={12} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="card vd-info-card">
              <Building size={20} className="vd-info-card__icon" style={{ color: 'var(--info)' }} />
              <h4 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>Registry Integrations</h4>
              <div className="vd-registry-list">
                {['AGIS (Abuja)', 'Lagos LSRS', 'Rivers RIMA', 'Kano Registry', 'NILANDS'].map(r => (
                  <div key={r} className="badge badge-info" style={{ marginBottom: '6px' }}>{r}</div>
                ))}
              </div>
            </div>

            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Eye size={15} /> Need API Access?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
