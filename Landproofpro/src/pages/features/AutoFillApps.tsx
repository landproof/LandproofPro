import { useEffect, useState } from 'react';
import { FormInput, CheckCircle, AlertCircle, Zap, FileText } from 'lucide-react';
import '../VerifyDashboard.css';

const FORM_FIELDS = [
  { label: 'Plot/File Number', value: 'FCT/MW/12B', status: 'verified' },
  { label: 'Owner Name', value: 'Adewale Marcus Johnson', status: 'verified' },
  { label: 'Land Use Zone', value: 'Residential (R1)', status: 'verified' },
  { label: 'Plot Area', value: '1,200 sqm', status: 'verified' },
  { label: 'Ground Coverage Ratio', value: '35%', status: 'calculated' },
  { label: 'Development Control District', value: 'Maitama District Council', status: 'verified' },
  { label: 'Setback (Front)', value: '6m', status: 'calculated' },
  { label: 'Setback (Rear)', value: '3m', status: 'calculated' },
  { label: 'Submission Reference', value: 'LPF-2024-10293', status: 'generated' },
];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  verified: { label: 'Verified from Registry', color: 'var(--emerald)' },
  calculated: { label: 'Auto-Calculated', color: '#60A5FA' },
  generated: { label: 'System Generated', color: 'var(--gold)' },
};

export default function AutoFillApps() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 60%)' }} /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#60A5FA' }}><FormInput size={12} /> Auto-Filled Development Applications</div>
          <h1 className="display-3">Zero-Error Application Submission</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Once your land is verified, LandProof pre-fills all development application forms from registry data — eliminating data entry errors and cutting rejection rates by up to 80%.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            {!submitted ? (
              <div className="card" style={{ padding: '32px' }}>
                <h3 className="heading-2" style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} style={{ color: '#60A5FA' }} /> Development Application — Pre-Filled
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>All fields sourced from LandProof registry. Review before submission.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                  {FORM_FIELDS.map((f, i) => {
                    const s = STATUS_LABELS[f.status];
                    return (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{f.label}</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{f.value}</span>
                        <span style={{ fontSize: '0.7rem', color: s.color, fontWeight: 600, whiteSpace: 'nowrap' }}>{s.label}</span>
                      </div>
                    );
                  })}
                </div>

                <button onClick={() => setSubmitted(true)} className="btn btn-primary" style={{ background: '#2563EB', padding: '12px 28px' }}>
                  <Zap size={16} /> Submit to Development Control
                </button>
              </div>
            ) : (
              <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ width: '72px', height: '72px', background: 'var(--emerald)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--shadow-emerald)' }}>
                  <CheckCircle size={36} color="#fff" />
                </div>
                <h2 className="display-3" style={{ marginBottom: '12px' }}>Application Submitted!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Your error-free pre-filled application has been submitted to Development Control. Reference: <strong style={{ color: 'var(--emerald-light)' }}>LPF-2024-10293</strong></p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline btn-sm">Submit Another</button>
              </div>
            )}
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', fontSize: '1rem' }}>Impact Stats</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[{ val: '78%', label: 'Fewer rejections' }, { val: '3 days', label: 'Avg. processing time vs. 3 weeks' }, { val: '100%', label: 'Error-free submissions' }].map(s => (
                  <div key={s.label} style={{ padding: '12px 16px', background: 'rgba(37,99,235,0.06)', borderRadius: '8px', borderLeft: '3px solid #2563EB' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#60A5FA', fontFamily: "'Space Grotesk', sans-serif" }}>{s.val}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <AlertCircle size={16} style={{ color: 'var(--warning)' }} /> Common Rejection Causes
              </h3>
              <ul className="vd-info-list">
                {['Wrong land use classification', 'Missing setback calculations', 'Incorrect applicant name', 'Missing plot survey reference'].map(r => (
                  <li key={r} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.82rem' }}>
                    <AlertCircle size={12} style={{ color: 'var(--warning)', flexShrink: 0 }} />{r}
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
