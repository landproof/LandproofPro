import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, MapPin, CheckCircle, FileText, Heart, Clock } from 'lucide-react';
import './VerifyDashboard.css';

const SAVED_PROPERTIES = [
  { id: '1', title: 'Plot 14, Maitama District', price: '₦150,000,000', status: 'Verified', tags: ['C of O', 'No Encumbrance'] },
  { id: '2', title: '4-Bed Duplex, Wuse II', price: '₦220,000,000', status: 'Pending Verification', tags: ['Deed of Assignment'] },
  { id: '3', title: 'Half Plot, Gwarinpa Phase 2', price: '₦45,000,000', status: 'Verified', tags: ['R of O'] },
];

const RECENT_SEARCHES = [
  'Asokoro Land', 'Jabi Commercial Plot', 'Lugbe Residential'
];

export default function BuyerDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--emerald-light)' }}><ShieldCheck size={12} /> Buyer Portal</div>
          <h1 className="display-3">Property Discovery & Verification</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Find, verify, and track properties with confidence. Your dashboard for secure land transactions and title authentication.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--emerald)', boxShadow: '0 0 15px rgba(0, 168, 107, 0.1)' }}>
              <Search size={20} style={{ color: 'var(--emerald)' }} />
              <input type="text" placeholder="Search by file number, location, or owner name..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none', fontSize: '1rem', width: '100%' }} />
              <Link to="/verify" className="btn btn-primary" style={{ padding: '8px 16px', textDecoration: 'none' }}>Verify</Link>
            </div>

            {/* Saved Properties */}
            <h3 className="heading-2" style={{ marginTop: '30px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} style={{ color: 'var(--text-muted)' }} /> Saved Listings
            </h3>
            
            <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {SAVED_PROPERTIES.map(prop => (
                <div key={prop.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{prop.title}</span>
                      {prop.status === 'Verified' && <CheckCircle size={14} style={{ color: 'var(--emerald)' }} />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={12} /> Abuja, FCT
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                      {prop.tags.map(tag => (
                        <span key={tag} className="badge badge-slate" style={{ fontSize: '0.7rem' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-light)' }}>{prop.price}</span>
                    <Link to="/vault" className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>View Details</Link>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} style={{ color: 'var(--emerald)' }}/> Verification Status
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    <span>C of O Verification</span>
                    <span style={{ color: 'var(--emerald)' }}>Completed</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Plot 14, Maitama</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                    <span>AGIS Registry Sync</span>
                    <span style={{ color: 'var(--gold)' }}>Pending</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>4-Bed Duplex, Wuse II</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} className="text-muted"/> Recent Searches
              </h3>
              <ul className="vd-info-list">
                {RECENT_SEARCHES.map(search => (
                  <li key={search} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}>
                    <Search size={12} style={{ color: 'var(--text-muted)' }} />
                    {search}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/chain-of-title" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Chain-of-Title Intelligence</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/dispute-warning" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Legal Dispute Warning</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/ask-landproof" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Natural Language Queries</Link>
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
