import { ShieldCheck, Activity, Target, TrendingUp, Search } from 'lucide-react';
import '../VerifyDashboard.css';

export default function PropertyTrustScore() {
  const currentScore = 842;
  const maxScore = 1000;
  
  // Calculate stroke dasharray for the gauge
  const circumference = 2 * Math.PI * 120;
  const strokeOffset = circumference - (currentScore / maxScore) * circumference;

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck style={{ color: 'var(--gold)' }} />
            Property Trust Score (PTS)
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            The universal credit score for real estate. Grade any property instantly.
          </p>
        </div>
      </header>

      <div className="dashboard__content">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
          
          {/* Gauge Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
            <div style={{ position: 'relative', width: '260px', height: '260px' }}>
              <svg width="260" height="260" viewBox="0 0 260 260">
                {/* Background Track */}
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="16"
                  strokeDasharray={`${circumference} ${circumference}`}
                />
                {/* Value Track */}
                <circle
                  cx="130"
                  cy="130"
                  r="120"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={strokeOffset}
                  transform="rotate(-90 130 130)"
                  style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '4rem', fontWeight: '800', color: 'white', lineHeight: 1 }}>
                  {currentScore}
                </div>
                <div style={{ color: 'var(--gold)', fontSize: '0.9rem', fontWeight: '600', letterSpacing: '0.05em' }}>
                  EXCELLENT
                </div>
              </div>
            </div>
            <p style={{ marginTop: '24px', color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.9rem' }}>
              Top 12% of properties in FCT Abuja based on historical data.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Search Input */}
            <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px 24px' }}>
              <Search size={20} style={{ color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Enter Plot ID or Coordinates e.g. PLOT-1A-992" 
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', outline: 'none' }}
                defaultValue="WZ-4-MAITAMA-99A"
              />
              <button className="btn btn-primary" style={{ background: 'var(--gold)', color: 'black' }} onClick={() => alert('Analyzing property trust score...')}>Analyze</button>
            </div>

            {/* Factors */}
            <div className="card" style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '24px', color: 'white', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} style={{ color: 'var(--gold)' }} />
                Score Breakdown
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white' }}>Title Cleanliness</span>
                    <span style={{ color: 'var(--emerald)' }}>+320 pts</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--slate)', borderRadius: '3px' }}>
                    <div style={{ width: '95%', height: '100%', background: 'var(--emerald)', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white' }}>Dispute History</span>
                    <span style={{ color: 'var(--emerald)' }}>+250 pts</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--slate)', borderRadius: '3px' }}>
                    <div style={{ width: '90%', height: '100%', background: 'var(--emerald)', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white' }}>Zoning Compliance</span>
                    <span style={{ color: 'var(--gold)' }}>+180 pts</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--slate)', borderRadius: '3px' }}>
                    <div style={{ width: '75%', height: '100%', background: 'var(--gold)', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: 'white' }}>Tax & Ground Rent</span>
                    <span style={{ color: 'var(--danger)' }}>+92 pts</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--slate)', borderRadius: '3px' }}>
                    <div style={{ width: '40%', height: '100%', background: 'var(--danger)', borderRadius: '3px' }}></div>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Penalty: Unpaid 2024 Ground Rent detected.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
