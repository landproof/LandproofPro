import { Users, Star, Award, Shield, CheckCircle } from 'lucide-react';
import '../VerifyDashboard.css';

const professionals = [
  { name: 'Arc. David Olayinka, FNIA', role: 'Registered Architect', rating: 4.9, verified: true, agency: 'ARCON', projects: 142 },
  { name: 'Surv. Ibrahim Musa, fnis', role: 'Registered Surveyor', rating: 5.0, verified: true, agency: 'SURCON', projects: 318 },
  { name: 'Engr. Chioma Eze, COREN', role: 'Structural Engineer', rating: 4.8, verified: true, agency: 'COREN', projects: 89 },
  { name: 'Barr. Tunde Afolayan', role: 'Real Estate Attorney', rating: 4.9, verified: true, agency: 'NBA', projects: 412 },
];

export default function ProfessionalNetwork() {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div>
          <h1 className="display-3" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users style={{ color: 'var(--blue-light)' }} />
            Professional Network
          </h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)' }}>
            Only API-verified, registered professionals can draft and submit plans on LandProof.
          </p>
        </div>
      </header>

      <div className="dashboard__content">
        
        {/* Banner */}
        <div className="card" style={{ background: 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0))', borderLeft: '4px solid var(--emerald)', marginBottom: '24px' }}>
          <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Shield size={20} style={{ color: 'var(--emerald)' }} />
            Endorsement-Gated Submissions
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Building plans and survey lodgements are automatically rejected unless cryptographically signed by an active member of ARCON, SURCON, or COREN in good standing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {professionals.map((pro, i) => (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--slate)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                    {pro.name.split(' ')[1].charAt(0)}
                  </div>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1.05rem', margin: 0 }}>{pro.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>{pro.role}</p>
                  </div>
                </div>
                {pro.verified && <CheckCircle size={20} style={{ color: 'var(--emerald)' }} />}
              </div>

              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={14} style={{ fill: 'var(--gold)', color: 'var(--gold)' }} />
                  <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>{pro.rating}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={14} style={{ color: 'var(--blue-light)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{pro.agency} API Active</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{pro.projects} Verified Projects</span>
                <button className="btn btn-outline btn-sm" onClick={() => alert(`Connection request sent to ${pro.name}.`)}>Connect</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
