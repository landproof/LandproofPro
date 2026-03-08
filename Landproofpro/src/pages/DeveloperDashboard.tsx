import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, ArrowRight, HardHat, FileText, CheckCircle, Clock } from 'lucide-react';
import './VerifyDashboard.css';

const PROJECTS = [
  { id: '1', name: 'Sunrise Apartments Phase 1', location: 'Lugbe, FCT', progress: 75, status: 'Active Construction', nextMilestone: 'Roofing Completion', riskScore: 98, currentPhase: 3 },
  { id: '2', name: 'Emerald Office Park', location: 'Central Business District', progress: 15, status: 'Foundation Laying', nextMilestone: 'First Floor Slab', riskScore: 85, currentPhase: 1 },
];

const PHASES = ['Foundation', 'Framing', 'Roofing', 'Interior', 'Handover'];

export default function DeveloperDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(59, 130, 246, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label"><Building2 size={12} /> Developer Portal</div>
          <h1 className="display-3">Project Command Center</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Drive your developments from land acquisition to final handover. Track approvals, manage resources, and monitor real-time site compliance.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HardHat size={18} style={{ color: 'var(--text-muted)' }} /> Active Projects
               </h3>
               <Link to="/buildtrack" className="btn btn-primary"><Plus size={16}/> New Development</Link>
             </div>

            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {PROJECTS.map(proj => (
                <div key={proj.id} className="bt-doc-item" style={{ padding: '24px', flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                     <div>
                       <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>{proj.name}</span>
                       <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{proj.location}</span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div className="risk-pulse" style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>
                         <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: proj.riskScore > 90 ? 'var(--emerald)' : 'var(--warning)', boxShadow: proj.riskScore > 90 ? '0 0 10px var(--emerald)' : '0 0 10px var(--warning)', animation: 'pulse 2s infinite' }} />
                         <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>{proj.riskScore}/100 Health</span>
                       </div>
                       <span className={`badge ${proj.progress > 50 ? 'badge-emerald' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{proj.status}</span>
                     </div>
                  </div>

                  {/* Segmented Timeline */}
                  <div style={{ marginBottom: '24px', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 500 }}>
                        <span>Construction Timeline</span>
                        <span style={{ color: 'var(--emerald)' }}>{proj.progress}% Complete</span>
                     </div>
                     
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
                       {/* Connecting Line Track */}
                       <div style={{ position: 'absolute', top: '50%', left: '10px', right: '10px', height: '2px', background: 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)', zIndex: 1 }} />
                       {/* Active Connecting Line */}
                       <div style={{ position: 'absolute', top: '50%', left: '10px', width: `calc(${(proj.currentPhase / (PHASES.length - 1)) * 100}% - 20px)`, height: '2px', background: 'var(--emerald)', transform: 'translateY(-50%)', zIndex: 1, transition: 'width 1s ease' }} />
                       
                       {/* Timeline Nodes */}
                       {PHASES.map((phase, index) => {
                         const isCompleted = index <= proj.currentPhase;
                         const isCurrent = index === proj.currentPhase;
                         
                         return (
                           <div key={phase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', position: 'relative', zIndex: 2 }}>
                             <div style={{ 
                               width: '16px', height: '16px', borderRadius: '50%', 
                               background: isCompleted ? 'var(--emerald)' : 'var(--navy)', 
                               border: `2px solid ${isCompleted ? 'var(--emerald)' : 'rgba(255,255,255,0.2)'}`,
                               boxShadow: isCurrent ? '0 0 0 4px rgba(0, 168, 107, 0.2)' : 'none',
                               transition: 'all 0.3s ease'
                             }} />
                             <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: isCompleted ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isCompleted ? 600 : 400 }}>
                               {phase}
                             </span>
                           </div>
                         );
                       })}
                     </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                     <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Next Milestone</span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{proj.nextMilestone}</span>
                     </div>
                     <Link to="/buildtrack" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', textDecoration: 'none' }}>Manage <ArrowRight size={14} style={{ marginLeft: '4px' }}/></Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--emerald)' }}/> Approval Tracker
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Setting Out Approval</span>
                    <span className="badge badge-emerald" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>Granted</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Sunrise Phase 1</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Electrical Layout Review</span>
                    <span className="badge badge-warning" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>Under Review</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Emerald Park</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={16} className="text-emerald"/> Site Inspections
              </h3>
               <Link to="/compliance" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', marginBottom: '12px', textDecoration: 'none' }}>Schedule Inspection</Link>
               <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>Next scheduled: Oct 14th (Sunrise Ph.1)</div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <HardHat size={16} className="text-emerald"/> Available Features
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/approval-sla" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Approval SLA Intelligence</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-light)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>Access Feature <ArrowRight size={10} /></div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/offline" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Offline Capture Mode</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-light)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>Access Feature <ArrowRight size={10} /></div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/auto-fill" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Auto-Filled Applications</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald-light)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>Access Feature <ArrowRight size={10} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
