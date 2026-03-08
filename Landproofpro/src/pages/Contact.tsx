import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle, Scan, FileCheck, Building2, Clock } from 'lucide-react';
import './Contact.css';

const useCases = [
  { value: 'verify', icon: <Scan size={16} />, label: 'LandProof Verify', desc: 'Document verification & title check' },
  { value: 'compliance', icon: <FileCheck size={16} />, label: 'LandProof Compliance', desc: 'Zoning & master plan check' },
  { value: 'buildtrack', icon: <Building2 size={16} />, label: 'LandProof BuildTrack', desc: 'Building permit submission' },
  { value: 'partnership', icon: <Mail size={16} />, label: 'Partnership / Integration', desc: 'Banks, developers, government' },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUse, setSelectedUse] = useState('');
  const [form, setForm] = useState({ name: '', org: '', email: '', phone: '', message: '' });

  const setField = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  return (
    <div className="contact-page" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="contact-bg">
        <div className="contact-glow" />
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center contact-header">
            <div className="section-label" style={{ margin: '0 auto 20px' }}><Mail size={12} /> Get In Touch</div>
            <h1 className="display-3">Talk to the LandProof Team</h1>
            <p className="body-lg" style={{ maxWidth: 560, margin: '16px auto 0' }}>
              Whether you're a bank, developer, government agency, or a citizen wanting to verify a title — we're here to help.
            </p>
          </div>

          <div className="contact-grid">
            {/* Form */}
            <div className="card contact-form-card">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="heading-2" style={{ marginBottom: 24 }}>Send Us a Message</h3>

                  <div className="contact-use-select">
                    <p className="form-label" style={{ marginBottom: 10 }}>What are you interested in?</p>
                    <div className="contact-use-grid">
                      {useCases.map(u => (
                        <div
                          key={u.value}
                          className={`contact-use-btn ${selectedUse === u.value ? 'active' : ''}`}
                          onClick={() => setSelectedUse(u.value)}
                        >
                          <span className="contact-use-btn__icon">{u.icon}</span>
                          <span>
                            <div className="contact-use-btn__label">{u.label}</div>
                            <div className="contact-use-btn__desc">{u.desc}</div>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="contact-fields">
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="Your full name" required
                        value={form.name} onChange={e => setField('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Organisation</label>
                      <input className="form-input" placeholder="Company / Agency / Individual"
                        value={form.org} onChange={e => setField('org', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" placeholder="your@email.com" required
                        value={form.email} onChange={e => setField('email', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input className="form-input" placeholder="+234 xxx xxx xxxx"
                        value={form.phone} onChange={e => setField('phone', e.target.value)} />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                      <label className="form-label">Message</label>
                      <textarea className="form-input contact-textarea"
                        placeholder="Tell us about your use case, property, or question..."
                        value={form.message} onChange={e => setField('message', e.target.value)} />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
                    {loading
                      ? <><span className="contact-spinner" />Sending...</>
                      : <><Send size={16} /> Send Message</>
                    }
                  </button>
                </form>
              ) : (
                <div className="contact-success">
                  <div className="contact-success__icon">
                    <CheckCircle size={36} />
                  </div>
                  <h3 className="heading-2">Message Sent!</h3>
                  <p className="body-sm" style={{ marginTop: 8, textAlign: 'center' }}>
                    Thank you! Our team will get back to you within 24 hours.
                  </p>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 24 }} onClick={() => { setSubmitted(false); setForm({ name: '', org: '', email: '', phone: '', message: '' }); }}>
                    Send Another
                  </button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="contact-info">
              <div className="card contact-info-card">
                <div className="contact-info-icon"><MapPin size={18} /></div>
                <h4 style={{ margin: '10px 0 4px', fontSize: '1rem' }}>Headquarters</h4>
                <p className="body-sm">Plot 12, Adetokunbo Ademola Crescent, Wuse II, Abuja, FCT, Nigeria</p>
              </div>
              <div className="card contact-info-card">
                <div className="contact-info-icon"><Mail size={18} /></div>
                <h4 style={{ margin: '10px 0 4px', fontSize: '1rem' }}>Email</h4>
                <p className="body-sm">hello@landproof.io</p>
                <p className="body-sm">support@landproof.io</p>
                <p className="body-sm">partnerships@landproof.io</p>
              </div>
              <div className="card contact-info-card">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <h4 style={{ margin: '10px 0 4px', fontSize: '1rem' }}>Phone</h4>
                <p className="body-sm">09011966000</p>
              </div>
              <div className="card contact-info-card">
                <div className="contact-info-icon" style={{ color: 'var(--gold)' }}><Clock size={18} /></div>
                <h4 style={{ margin: '10px 0 4px', fontSize: '1rem' }}>Office Hours</h4>
                <p className="body-sm">Monday – Friday: 8am – 6pm WAT</p>
                <p className="body-sm">Saturdays: 9am – 1pm WAT</p>
                <p className="body-sm">Emergency: 24/7 AI portal support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
