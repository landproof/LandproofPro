import { Globe, ArrowRight, Zap, Combine, Server } from 'lucide-react';
import '../VerifyDashboard.css';

export default function CrossBorder() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe style={{ color: 'var(--blue)' }} />
            Cross-Border Expansion Framework
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            A plug-and-play architecture for pan-African land administration.
          </p>
        </div>
      </header>

      <div className="dashboard__content">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '24px' }}>
          
          <div className="card" style={{ gridColumn: '1 / -1', padding: '40px', background: 'radial-gradient(circle at center, var(--slate) 0%, var(--navy) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <img src="https://flagcdn.com/w80/ng.png" alt="Nigeria" style={{ width: '40px', borderRadius: '4px' }} />
                </div>
                <div style={{ color: 'white', fontWeight: 600 }}>Core Engine</div>
                <div style={{ color: 'var(--emerald)', fontSize: '0.8rem' }}>Active (FCT)</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-muted)' }}>
                <Combine size={24} style={{ marginBottom: '8px', color: 'var(--blue-light)' }} />
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue-light)', opacity: 0.5 }}></div>)}
                </div>
                <span style={{ fontSize: '0.75rem', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>API Gateway</span>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <img src="https://flagcdn.com/w80/gh.png" alt="Ghana" style={{ width: '32px', borderRadius: '4px', filter: 'grayscale(0.5)' }} />
                  </div>
                  <div style={{ color: 'white', fontSize: '0.9rem' }}>Ghana</div>
                </div>
                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <img src="https://flagcdn.com/w80/rw.png" alt="Rwanda" style={{ width: '32px', borderRadius: '4px', filter: 'grayscale(0.5)' }} />
                  </div>
                  <div style={{ color: 'white', fontSize: '0.9rem' }}>Rwanda</div>
                </div>
                <div style={{ textAlign: 'center', opacity: 0.6 }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    <img src="https://flagcdn.com/w80/ke.png" alt="Kenya" style={{ width: '32px', borderRadius: '4px', filter: 'grayscale(0.5)' }} />
                  </div>
                  <div style={{ color: 'white', fontSize: '0.9rem' }}>Kenya</div>
                </div>
              </div>

            </div>
          </div>

          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px' }}>
              <Zap size={18} style={{ color: 'var(--gold)' }} />
              Pluggable Architecture
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              The LandProof core logic (verification, trust scoring, and blockchain ledgers) is decoupled from local regulatory specifics. 
              Entering a new country simply requires mapping the local title registry API to our standard gateway schema.
            </p>
            <button className="btn btn-outline" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => alert('Opening API Documentation...')}>
              View API Documentation <ArrowRight size={16} />
            </button>
          </div>

          <div className="card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', marginBottom: '16px' }}>
              <Server size={18} style={{ color: 'var(--blue)' }} />
              Data Sovereignty
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Complies strictly with NDPR and international data residency laws. When deployed in Rwanda, the user data and 
              geospatial records remain physically hosted on servers governed by Rwandan jurisdiction, while leveraging the global trust scoring engine.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
