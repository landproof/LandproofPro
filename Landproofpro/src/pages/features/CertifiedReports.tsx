import { FileKey, Download, QrCode, CheckCircle, ShieldCheck } from 'lucide-react';
import '../VerifyDashboard.css';

export default function CertifiedReports() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileKey style={{ color: 'var(--blue)' }} />
            Certified Verification Reports
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            Tamper-proof, QR-verifiable PDFs in court-admissible format.
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => alert('Generating Certified Master Report as PDF...')}>
          <Download size={16} /> Generate Master Report
        </button>
      </header>

      <div className="dashboard__content">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '24px' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ color: 'white', marginBottom: '8px', fontSize: '1.1rem' }}>Available Report Types</h3>
            
            <div style={{ padding: '16px', background: 'var(--slate)', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <CheckCircle size={18} style={{ color: 'var(--emerald)' }} />
                <span style={{ color: 'white', fontWeight: 500 }}>Full Title Verification</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Comprehensive history, C of O verification, and dispute checks.</p>
            </div>

            <div style={{ padding: '16px', background: 'transparent', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer', opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--text-muted)' }}></div>
                <span style={{ color: 'white', fontWeight: 500 }}>Encumbrance Certificate</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Strictly limits to mortgage, lien, and legal hold checks.</p>
            </div>

            <div style={{ padding: '16px', background: 'transparent', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer', opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid var(--text-muted)' }}></div>
                <span style={{ color: 'white', fontWeight: 500 }}>Zoning & Masterplan Clear</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Development control metrics and build-ability approvals.</p>
            </div>
          </div>

          <div className="card" style={{ background: '#f8fafc', padding: 0, overflow: 'hidden' }}>
            {/* PDF Mockup Header */}
            <div style={{ background: '#1e293b', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'white', fontSize: '0.9rem', fontFamily: 'monospace' }}>Report_WZ4_99A.pdf</span>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Pg 1/4</span>
              </div>
            </div>
            
            {/* Document Body */}
            <div style={{ padding: '40px', color: '#334155', minHeight: '600px', fontFamily: 'serif' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #cbd5e1', paddingBottom: '24px', marginBottom: '32px' }}>
                <div>
                  <ShieldCheck size={40} style={{ color: '#0f172a', marginBottom: '8px' }} />
                  <h2 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>LANDPROOF</h2>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>CERTIFIED VERIFICATION REPORT</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <QrCode size={64} style={{ color: '#0f172a' }} />
                  <p style={{ margin: '8px 0 0 0', fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>SCAN TO VERIFY<br/>TXN: a9f8-882c</p>
                </div>
              </div>

              <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: '32px', color: '#0f172a' }}>I. Property Identification</h3>
              <table style={{ width: '100%', fontSize: '0.9rem', borderCollapse: 'collapse', marginTop: '16px' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold', width: '30%' }}>Plot Number</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>PLOT-1A-992</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold' }}>District</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9' }}>Maitama, FCT Abuja</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontWeight: 'bold' }}>Coordinate Anchor</td>
                    <td style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontFamily: 'monospace' }}>9.0833° N, 7.4951° E</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginTop: '32px', color: '#0f172a' }}>II. Authenticity Declaration</h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                This document serves as a cryptographically verified dossier of the subject property as queried on the LandProof API. 
                The records contained herein are backed by our multi-region Zero-Loss ledger and are certified unaltered from the source 
                federal and municipal databases at the moment of generation.
              </p>
              
              <div style={{ marginTop: '48px', padding: '16px', border: '1px solid #cbd5e1', background: '#f1f5f9', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#0284c7', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} /> Mathematically Admissible in Competent Courts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
