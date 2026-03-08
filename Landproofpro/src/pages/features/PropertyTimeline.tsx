import { Clock, Key, FilePlus, RefreshCcw, Landmark, ShieldCheck } from 'lucide-react';
import '../VerifyDashboard.css';

const timelineEvents = [
  {
    date: '2025-10-14 14:32:01',
    type: 'Ownership Transfer',
    actor: 'Musa Abdullahi',
    hash: '0x8f3c...9b1a',
    icon: <RefreshCcw size={16} />,
    color: 'var(--blue)'
  },
  {
    date: '2024-03-21 09:12:44',
    type: 'Mortgage Lien Added',
    actor: 'Guaranty Trust Bank',
    hash: '0x1a2b...4c5d',
    icon: <Landmark size={16} />,
    color: 'var(--danger)'
  },
  {
    date: '2022-08-05 11:45:00',
    type: 'Building Plan Approved',
    actor: 'Development Control',
    hash: '0x9d8e...7f6a',
    icon: <FilePlus size={16} />,
    color: 'var(--emerald)'
  },
  {
    date: '2019-11-30 08:00:22',
    type: 'Initial C of O Issued',
    actor: 'FCTA Registry',
    hash: '0x5c4b...3a2f',
    icon: <Key size={16} />,
    color: 'var(--gold)'
  }
];

export default function PropertyTimeline() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock style={{ color: 'var(--gold)' }} />
            Time-Stamped Property Timeline
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            Every action logged. Immutable history. Court-ready evidence.
          </p>
        </div>
      </header>

      <div className="dashboard__content">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px' }}>
          
          <div className="card" style={{ background: 'var(--slate)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
               <h3 style={{ color: 'white' }}>Cryptographic Ledger: PLOT-1A-992</h3>
               <span style={{ fontSize: '0.8rem', color: 'var(--emerald)', border: '1px solid var(--emerald)', padding: '4px 12px', borderRadius: '12px' }}>VERIFIED IMMUTABLE</span>
            </div>

            <div style={{ position: 'relative', paddingLeft: '24px' }}>
              {/* Vertical line passing through nodes */}
              <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '2px', background: 'var(--navy)' }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {timelineEvents.map((event, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    {/* Timeline Node */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '-33px', 
                      top: '0', 
                      width: '20px', 
                      height: '20px', 
                      borderRadius: '50%', 
                      background: event.color, 
                      border: '4px solid var(--slate)' 
                    }}></div>
                    
                    <div style={{ background: 'var(--navy)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', fontWeight: 600 }}>
                          {event.icon}
                          {event.type}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                          {event.date}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                        <div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 4px 0' }}>Actor / Submitter</p>
                          <p style={{ color: 'white', margin: 0 }}>{event.actor}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 4px 0' }}>Txn Hash</p>
                          <p style={{ color: 'var(--emerald)', fontFamily: 'monospace', margin: 0, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                            {event.hash}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card">
              <ShieldCheck size={32} style={{ color: 'var(--blue)', marginBottom: '16px' }} />
              <h3 style={{ color: 'white', marginBottom: '12px' }}>Evidentiary Standard</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                In a court of law, disputes over "who bought what first" are immediately resolved by consulting the cryptographic timestamp. Retroactive document creation is mathematically impossible on this platform.
              </p>
            </div>
            
            <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
              <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '8px' }}>Anti-Tamper Lock</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Any attempt by a malicious database administrator to delete the 2024 Mortgage Lien from the SQL database would invalidate the hash chain, triggering an immediate security alert to all parties.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
