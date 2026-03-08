import { Cloud, ServerCrash, ShieldAlert, CheckCircle, Database } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../VerifyDashboard.css';

export default function ZeroLoss() {
  const [status, setStatus] = useState('healthy');

  useEffect(() => {
    // Simulate a disaster recovery scenario for demo purposes
    const timer1 = setTimeout(() => setStatus('disaster'), 3000);
    const timer2 = setTimeout(() => setStatus('recovering'), 5000);
    const timer3 = setTimeout(() => setStatus('healthy'), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Cloud style={{ color: 'var(--blue)' }} />
            Zero-Loss Guarantee
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            After any fire or flood: "LandProof has the record."
          </p>
        </div>
        <button 
          className="btn btn-outline" 
          onClick={() => {
            setStatus('disaster');
            setTimeout(() => setStatus('recovering'), 2000);
            setTimeout(() => setStatus('healthy'), 5000);
          }}
        >
          <ServerCrash size={16} /> Simulate Server Fire
        </button>
      </header>

      <div className="dashboard__content">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '24px' }}>
          
          <div className="card" style={{ gridColumn: '1 / -1', background: 'var(--slate)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h3 style={{ color: 'white' }}>Multi-Region Disaster Recovery Network</h3>
              
              {status === 'healthy' && (
                <div style={{ padding: '6px 16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--emerald)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <CheckCircle size={14} /> ALL SYSTEMS OPERATIONAL
                </div>
              )}
              {status === 'disaster' && (
                <div style={{ padding: '6px 16px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600, animation: 'pulse 1s infinite' }}>
                  <ShieldAlert size={14} /> PRIMARY SERVER FAILURE DETECTED
                </div>
              )}
              {status === 'recovering' && (
                <div style={{ padding: '6px 16px', background: 'rgba(212, 175, 55, 0.1)', color: 'var(--gold)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Cloud size={14} className="spin" /> FAILOVER IN PROGRESS
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
              
              {/* Primary Node */}
              <div style={{ border: status === 'disaster' ? '2px solid var(--danger)' : '1px solid var(--border)', borderRadius: '8px', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}>
                <Database size={40} style={{ color: status === 'disaster' ? 'var(--danger)' : 'var(--blue)', marginBottom: '16px', opacity: status === 'disaster' ? 0.3 : 1 }} />
                <h4 style={{ color: status === 'disaster' ? 'var(--danger)' : 'white' }}>Node A: Abuja (Primary)</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px' }}>
                  {status === 'disaster' ? 'OFFLINE - FIRE DETECTED' : 'Syncing Live Transactions'}
                </p>
              </div>

              {/* Secondary Node */}
              <div style={{ border: status === 'recovering' ? '2px solid var(--gold)' : '1px solid var(--border)', borderRadius: '8px', padding: '24px', textAlign: 'center', transition: 'all 0.3s' }}>
                <Cloud size={40} style={{ color: status === 'disaster' ? 'var(--slate)' : status === 'recovering' ? 'var(--gold)' : 'var(--emerald)', marginBottom: '16px' }} />
                <h4 style={{ color: 'white' }}>Node B: AWS eu-west-1</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px' }}>
                  {status === 'recovering' ? 'ACTIVATING AS PRIMARY' : status === 'disaster' ? 'AWAITING FAILOVER' : 'Hot Standby (Real-time Mirror)'}
                </p>
              </div>

              {/* Cold Storage */}
              <div style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', textAlign: 'center', background: 'rgba(0, 0, 0, 0.2)' }}>
                <Database size={40} style={{ color: '#94a3b8', marginBottom: '16px' }} />
                <h4 style={{ color: '#e2e8f0' }}>Node C: Glacier Deep Vault</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
                  Immutable Cold Storage (Monthly Air-gapped Backup)
                </p>
              </div>

            </div>
          </div>

          <div className="card">
            <h3 style={{ color: 'white', marginBottom: '16px' }}>What this means for users:</h3>
            <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
              <li><strong>No physical dependency:</strong> Even if local paper archives burn down, the digital twin survives.</li>
              <li><strong>Court Guaranteed:</strong> Our logs prove that the backup exactly matches the state of the registry prior to any disaster incident.</li>
              <li><strong>Zero Downtime:</strong> Banks and legal teams can continue processing mortgages without waiting for registry physical reconstruction.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
