import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building, CheckCircle, Search, TrendingUp, Users, MapPin, ShieldCheck } from 'lucide-react';
import './VerifyDashboard.css';

const LISTINGS = [
  { id: '1', title: 'Plot 14, Maitama District', price: '₦150,000,000', status: 'Active Listing', views: 450, inquiries: 12 },
  { id: '2', title: '4-Bed Duplex, Wuse II', price: '₦220,000,000', status: 'Offer Pending', views: 890, inquiries: 34 },
];

export default function EstateAgentDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(236, 72, 153, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#F472B6' }}><Briefcase size={12} /> Estate Agent Portal</div>
          <h1 className="display-3">Verified Listings & Client Portfolios</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            List properties with confidence. Leverage LandProof’s verification badge to close deals faster and build trust with buyers.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '30px' }}>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={24} style={{ color: '#F472B6', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>14</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Listings</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={24} style={{ color: 'var(--emerald)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>₦840M</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sales Volume (YTD)</span>
               </div>
               <div className="bt-doc-item" style={{ padding: '20px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={24} style={{ color: 'var(--blue)', marginBottom: '8px' }} />
                  <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>28</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Buyers</span>
               </div>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h3 className="heading-2" style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={18} style={{ color: 'var(--emerald)' }} /> LandProof Verified Listings
               </h3>
               <Link to="/vault" className="btn btn-primary" style={{ background: '#DB2777', color: '#FFF', textDecoration: 'none' }}>List New Property</Link>
             </div>

             <div className="bt-docs-grid" style={{ gridTemplateColumns: 'repeat(1, 1fr)' }}>
              {LISTINGS.map(listing => (
                <div key={listing.id} className="bt-doc-item" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)' }}>{listing.title}</span>
                      <ShieldCheck size={14} style={{ color: 'var(--emerald)' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={12} /> Abuja, FCT
                    </div>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{listing.views} Views</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{listing.inquiries} Inquiries</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--emerald-light)' }}>{listing.price}</span>
                    <span className={`badge ${listing.status === 'Offer Pending' ? 'badge-warning' : 'badge-slate'}`} style={{ fontSize: '0.75rem' }}>{listing.status}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={18} style={{ color: '#F472B6' }}/> Buyer Match
              </h3>
               <p className="body-sm" style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>
                 Find matching verified properties for your clients' specific criteria instantly.
               </p>
               <input type="text" placeholder="Location, Budget, Property Type" style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }} />
               <Link to="/verify" className="btn btn-outline" style={{ display: 'inline-flex', justifyContent: 'center', width: '100%', borderColor: '#DB2777', color: '#FBCFE8', textDecoration: 'none' }}>Find Matches</Link>
            </div>

            <div className="card vd-info-card">
               <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={16} className="text-emerald"/> Recent Transactions
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Jabi Lake Villa</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', marginTop: '4px' }}>Closed - ₦350M</div>
                </div>
              </div>
            </div>

            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ margin: '0 0 16px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--blue)' }}>Available Features</span>
              </h3>
              <div className="vd-registry-list" style={{ gap: '12px' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/escrow" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>Escrow-Linked Verification</Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: '4px' }}>Access Feature &rarr;</div>
                </div>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <Link to="/features/whatsapp" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block' }}>WhatsApp-First Interface</Link>
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
