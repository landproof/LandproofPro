import { useEffect } from 'react';
import { BarChart2, Clock, AlertTriangle, TrendingDown, CheckCircle, ShieldAlert, AlertOctagon, ArrowUpRight, Activity } from 'lucide-react';
import '../VerifyDashboard.css';

const AGENCIES = [
  { name: 'AGIS (Land Administration)', avg: 8, sla: 5, bottleneck: 'Title search backlog', rejRate: 24, color: '#EAB308', sparkPoints: [3, 4, 3, 5, 7, 8] },
  { name: 'FCDA (Development Control)', avg: 21, sla: 10, bottleneck: 'Structural review queue', rejRate: 38, color: 'var(--danger)', sparkPoints: [10, 12, 11, 15, 18, 21] },
  { name: 'FCFB (Finance Board)', avg: 4, sla: 5, bottleneck: 'None significant', rejRate: 8, color: 'var(--emerald)', sparkPoints: [6, 5, 5, 4, 4, 4] },
  { name: 'FCT Minister Consent', avg: 45, sla: 30, bottleneck: 'Scheduling & capacity', rejRate: 12, color: 'var(--danger)', sparkPoints: [28, 30, 31, 35, 40, 45] },
];

export default function ApprovalSLA() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(59,130,246,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#60A5FA' }}><BarChart2 size={12} /> Approval SLA Intelligence</div>
          <h1 className="display-3">Processing Transparency Engine</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Track real-time processing times, bottlenecks, and rejection causes across all approving agencies — so developers can plan and agencies can improve.
          </p>
        </div>
        <div className="vd-main" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {AGENCIES.map((a, i) => {
            const overSLA = a.avg > a.sla;
            const bottleneckSeverity = a.rejRate >= 30 ? 'critical' : a.rejRate >= 15 ? 'warning' : 'clear';
            const bottleneckBg = bottleneckSeverity === 'critical' ? 'rgba(239, 68, 68, 0.15)' : bottleneckSeverity === 'warning' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(0, 168, 107, 0.15)';
            const bottleneckColor = bottleneckSeverity === 'critical' ? 'var(--danger)' : bottleneckSeverity === 'warning' ? 'var(--warning)' : 'var(--emerald)';
            const BottleneckIcon = bottleneckSeverity === 'critical' ? AlertOctagon : bottleneckSeverity === 'warning' ? ShieldAlert : CheckCircle;
            
            // Calculate sparkline points mapped to SVG coordinates
            const sparkMax = Math.max(...a.sparkPoints, a.sla * 1.5);
            const sparkPointsStr = a.sparkPoints.map((val, idx) => {
              const x = (idx / (a.sparkPoints.length - 1)) * 100; // 0 to 100
              const y = 30 - (val / sparkMax) * 30; // 0 to 30 (inverted for SVG)
              return `${x},${y}`;
            }).join(' ');

            return (
              <div key={i} className="card" style={{ padding: '24px', borderLeft: `4px solid ${overSLA ? 'var(--danger)' : 'var(--emerald)'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{a.name}</h3>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><Clock size={11} style={{ display: 'inline', marginRight: '4px' }} />Avg: <strong style={{ color: a.color }}>{a.avg} days</strong></span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>SLA Target: <strong style={{ color: 'var(--emerald)' }}>{a.sla} days</strong></span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rejection Rate: <strong style={{ color: a.rejRate > 25 ? 'var(--danger)' : 'var(--text-secondary)' }}>{a.rejRate}%</strong></span>
                    </div>
                  </div>
                  {overSLA ? <AlertTriangle size={24} style={{ color: 'var(--danger)', flexShrink: 0 }} /> : <CheckCircle size={24} style={{ color: 'var(--emerald)', flexShrink: 0 }} />}
                </div>

                <div style={{ marginBottom: '24px', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-primary)', marginBottom: '8px', fontWeight: 500 }}>
                    <span>Processing Time Velocity</span>
                    <span style={{ color: a.color }}>{Math.round((a.avg / a.sla) * 100)}% of Target</span>
                  </div>
                  
                  {/* SLA Midpoint Marker positioned above bar */}
                  <div style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    transform: 'translate(-50%, -24px)',
                    zIndex: 10
                  }}>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      background: 'rgba(255,255,255,0.1)', 
                      padding: '2px 8px', 
                      borderRadius: '100px', 
                      color: '#fff', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontWeight: 600
                    }}>
                      SLA Limit ({a.sla}d)
                    </span>
                  </div>

                  <div className="progress-bar" style={{ height: '12px', position: 'relative', overflow: 'hidden', borderRadius: '100px' }}>
                    <div className="progress-fill" style={{ width: `${Math.min((a.avg / (a.sla * 2)) * 100, 100)}%`, background: a.color, borderRadius: '100px' }} />
                    {/* Bold Dashed SLA Target Rule */}
                    <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '0px', borderLeft: '2px dashed #fff', zIndex: 5 }} />
                  </div>
                  
                  {/* Premium Feature: Predictive Sparkline */}
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '30px', position: 'relative' }}>
                      <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                        {/* SLA baseline */}
                        <line x1="0" y1={30 - (a.sla / sparkMax) * 30} x2="100" y2={30 - (a.sla / sparkMax) * 30} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="2,2" />
                        <polyline points={sparkPointsStr} fill="none" stroke={a.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        {/* Glow effect on end point */}
                        <circle cx="100" cy={30 - (a.avg / sparkMax) * 30} r="3" fill={a.color} />
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', width: '90px' }}>
                      <Activity size={12} /> 30-Day Trend
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      display: 'flex', alignItems: 'center', gap: '6px', 
                      background: bottleneckBg, color: bottleneckColor, 
                      padding: '4px 10px', borderRadius: '100px', 
                      fontSize: '0.75rem', fontWeight: 600, border: `1px solid ${bottleneckColor}40` 
                    }}>
                      <BottleneckIcon size={12} />
                      {bottleneckSeverity.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>Key Bottleneck</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{a.bottleneck}</div>
                    </div>
                  </div>
                  
                  <button className="btn btn-outline btn-sm" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                    Escalate to Agency <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
