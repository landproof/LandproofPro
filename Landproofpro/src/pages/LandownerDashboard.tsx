import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, CheckCircle, Clock, MapPin, Search } from 'lucide-react';
import './VerifyDashboard.css';

const OWNED_PROPERTIES = [
  { id: '1', title: 'Plot 4, Asokoro Ext.', type: 'Residential Land', status: 'Title Perfected', value: '₦450,000,000', size: '1,200 sqm' },
  { id: '2', title: 'Block B, Jabi Commercial', type: 'Commercial Plot', status: 'C of O Pending', value: '₦120,000,000', size: '500 sqm' },
];

export default function LandownerDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(212, 175, 118, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--gold)' }}><Home size={12} /> Landowner Portal</div>
          <h1 className="display-3">Property Portfolio Management</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Manage your real estate assets securely. Track title perfection, view property values, and monitor compliance in one place.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

            {/* Portfolio Summary */}
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '30px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', background: 'linear-gradient(145deg, rgba(212, 175, 118, 0.05), rgba(15, 23, 42, 1))' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Portfolio Value</span>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold)', marginTop: '8px' }}>₦570,000,000</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '30px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Properties</span>
                  <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px' }}>2 Assets</span>
               </div>
            </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} style={{ color: 'var(--text-muted)' }} /> My Properties
               </h3>
               <Link to="/vault" className="btn btn-primary" style={{ background: 'var(--gold)', color: 'var(--navy-3)', textDecoration: 'none' }}>Add Property</Link>
             </div>

            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {OWNED_PROPERTIES.map(prop => (
                <div key={prop.id} className="bt-doc-item" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: prop.status === 'Title Perfected' ? '4px solid var(--emerald)' : '4px solid var(--gold)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{prop.title}</span>
                      {prop.status === 'Title Perfected' ? <CheckCircle size={16} className="text-emerald" /> : <Clock size={16} className="text-gold" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={12} /> {prop.type} • {prop.size}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      <span className={`badge ${prop.status === 'Title Perfected' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.75rem' }}>{prop.status}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{prop.value}</span>
                    <Link to="/vault" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>Manage Asset</Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} style={{ color: 'var(--gold)' }}/> Monitor Area Values
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Compare your property's value against recent transactions in the same district.
               </p>
               <Link to="/verify" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', textDecoration: 'none' }}>View Market Insights</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} className="text-muted"/> Pending Tasks
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    <span>Submit TDP</span>
                    <span style={{ color: 'var(--danger)' }}>Overdue</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Block B, Jabi Commercial</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/auto-fill" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Auto-Filled Applications</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/escrow" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Escrow-Linked Verification</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/whatsapp" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>WhatsApp-First Interface</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
