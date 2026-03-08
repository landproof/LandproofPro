import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Globe, Award, Target, Eye, Heart, Zap, ArrowRight } from 'lucide-react';
import './About.css';

const team = [
  { name: 'Emeka Okonkwo', role: 'CEO & Co-Founder', bg: 'EO', desc: 'Former FCTA Director, 15 years in urban planning' },
  { name: 'Fatima Aliyu', role: 'CTO & Co-Founder', bg: 'FA', desc: 'Ex-Google AI engineer, MSc Computer Science (MIT)' },
  { name: 'Babajide Adeyemi', role: 'Chief Compliance Officer', bg: 'BA', desc: 'Senior partner, Adeyemi & Partners Law Firm' },
  { name: 'Ngozi Eze', role: 'Head of Partnerships', bg: 'NE', desc: 'Former Head of Innovation, Access Bank' },
];

const values = [
  { icon: <Eye size={22} />, title: 'Radical Transparency', desc: 'Every verification is traceable, auditable, and explainable.' },
  { icon: <Heart size={22} />, title: 'Citizen-First', desc: 'We protect ordinary Nigerians from land fraud before anyone else.' },
  { icon: <Zap size={22} />, title: 'AI-Powered Speed', desc: 'What took weeks should take minutes. Technology closes the gap.' },
  { icon: <Award size={22} />, title: 'Uncompromising Trust', desc: 'Our reputation rests on every single verification we make.' },
];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="about-page" style={{ paddingTop: 'var(--nav-height)' }}>
      {/* Hero */}
      <section className="about-hero section">
        <div className="about-hero__bg">
          <div className="about-hero__glow" />
        </div>
        <div className="container">
          <div className="section-label">Our Mission</div>
          <h1 className="display-2" style={{ maxWidth: 700, marginBottom: 20 }}>
            Building the <span className="gradient-text">Trust Infrastructure</span> for African Property
          </h1>
          <p className="body-lg" style={{ maxWidth: 640 }}>
            LandProof exists to eliminate land fraud, prevent illegal development, and give every Nigerian
            the confidence to buy, sell, and build on land they can genuinely trust.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="about-story grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div className="section-label"><Target size={12} /> Our Story</div>
              <h2 className="display-3" style={{ marginBottom: 20 }}>Born from a Real Crisis</h2>
              <p className="body-lg" style={{ marginBottom: 16 }}>
                In 2021, our co-founder lost his family's life savings to a fraudulent land transaction
                in Abuja. The seller presented a convincing Certificate of Occupancy — later found to be
                a forgery. The authorities had no digital record. The land was sold to three different families.
              </p>
              <p className="body-lg" style={{ marginBottom: 16 }}>
                This isn't an isolated story. Millions of Nigerians face variants of this nightmare every year.
                LandProof was built to make it impossible.
              </p>
              <p className="body-lg">
                We combine AI document analysis, registry integration, and blockchain-anchored records
                to create a single, tamper-proof source of truth for every plot of land in Nigeria.
              </p>
            </div>
            <div className="about-stats-box">
              {[
                { val: '2022', label: 'Founded in Abuja, FCT' },
                { val: '₦2.1T', label: 'Property value protected' },
                { val: '47,000+', label: 'Titles verified' },
                { val: '9', label: 'States & territories covered' },
              ].map(s => (
                <div key={s.label} className="about-stat">
                  <div className="about-stat__val">{s.val}</div>
                  <div className="about-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 60 }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Heart size={12} /> Our Values</div>
            <h2 className="display-3">What Drives Us</h2>
          </div>
          <div className="grid-4">
            {values.map(v => (
              <div key={v.title} className="card">
                <div className="about-value__icon">{v.icon}</div>
                <h3 className="heading-2" style={{ margin: '16px 0 8px', fontSize: '1.1rem' }}>{v.title}</h3>
                <p className="body-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 60 }}>
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Users size={12} /> Leadership</div>
            <h2 className="display-3">The Team Behind LandProof</h2>
          </div>
          <div className="grid-4">
            {team.map(m => (
              <div key={m.name} className="card team-card">
                <div className="team-avatar">{m.bg}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: '14px 0 4px' }}>{m.name}</h3>
                <div className="badge badge-emerald" style={{ marginBottom: 10 }}>{m.role}</div>
                <p className="body-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="about-expansion">
            <div>
              <div className="section-label"><Globe size={12} /> Expansion</div>
              <h2 className="display-3" style={{ marginBottom: 20 }}>Nigeria First. Africa Next.</h2>
              <p className="body-lg" style={{ marginBottom: 24 }}>
                We're establishing the gold standard for property verification in Abuja, then replicating
                the model across Lagos, Kano, Port Harcourt, and beyond — then to Ghana, Kenya, and
                every African city with under-digitized land systems.
              </p>
              <div className="about-markets">
                {[
                  { label: '🇳🇬 Abuja', status: 'Live' },
                  { label: '🇳🇬 Lagos', status: 'Q3 2025' },
                  { label: '🇳🇬 Kano', status: 'Q4 2025' },
                  { label: '🇬🇭 Accra', status: '2026' },
                  { label: '🇰🇪 Nairobi', status: '2026' },
                  { label: '🌍 Pan-Africa', status: '2027+' },
                ].map(m => (
                  <div key={m.label} className="about-market">
                    <span>{m.label}</span>
                    <span className={`badge ${m.status === 'Live' ? 'badge-emerald' : 'badge-info'}`}>{m.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-cta card" style={{ background: 'linear-gradient(145deg, rgba(0,168,107,0.08), var(--slate))' }}>
              <ShieldCheck size={32} style={{ color: 'var(--emerald-light)', marginBottom: 16 }} />
              <h3 className="heading-1" style={{ marginBottom: 12 }}>Join Our Mission</h3>
              <p className="body-sm" style={{ marginBottom: 24 }}>
                We're partnering with governments, banks, and developers to build the trust rails for Africa's property market.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                Partner with LandProof <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
