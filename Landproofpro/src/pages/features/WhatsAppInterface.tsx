import { useEffect } from 'react';
import { Smartphone, CheckCircle, FileText, ShieldCheck, MessageSquare } from 'lucide-react';
import '../VerifyDashboard.css';

const CHAT = [
  { from: 'user', text: '🔍 I want to verify a land document' },
  { from: 'bot', text: '👋 Welcome to LandProof WhatsApp! Please send a clear photo of the document (CofO, Survey Plan, or Deed).' },
  { from: 'user', text: '[Photo of Certificate of Occupancy]' },
  { from: 'bot', text: '📸 Document received. Running verification...\n\n✅ *Verification Complete*\n📄 Document: CofO #FCT/MW/4421\n👤 Owner: Adewale Johnson\n🟢 Status: *VERIFIED — No Encumbrance*\n\nWould you like a full PDF report sent to your email?' },
  { from: 'user', text: 'Yes please' },
  { from: 'bot', text: '📧 Report sent! Reference: LPF-2024-10293. You can also view it at landproof.io/report/10293' },
];

export default function WhatsAppInterface() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(37,211,102,0.07), transparent 60%)' }} /></div>
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: '#25D366' }}><Smartphone size={12} /> WhatsApp-First Interface</div>
          <h1 className="display-3">Nigeria is WhatsApp-Native</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            Millions of Nigerians use WhatsApp daily. LandProof brings full document verification, status checks, and approval updates directly into WhatsApp — no apps to download.
          </p>
        </div>
        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 300px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: 0, overflow: 'hidden', maxWidth: '420px' }}>
              {/* WhatsApp header */}
              <div style={{ background: '#075E54', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ShieldCheck size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>LandProof Official</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>09011966000 · Verified Business</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ background: '#ECE5DD', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '360px' }}>
                {CHAT.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ maxWidth: '78%', padding: '10px 14px', borderRadius: m.from === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', background: m.from === 'user' ? '#DCF8C6' : '#FFF', color: '#1a1a1a', fontSize: '0.85rem', lineHeight: 1.5, boxShadow: '0 1px 2px rgba(0,0,0,0.1)', whiteSpace: 'pre-line' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div style={{ background: '#F0F0F0', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ flex: 1, background: '#FFF', borderRadius: '24px', padding: '10px 16px', fontSize: '0.85rem', color: '#aaa' }}>Type a message...</div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={18} color="#fff" />
                </div>
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', fontSize: '1rem' }}>What You Can Do on WhatsApp</h3>
              <ul className="vd-info-list" style={{ gap: '10px' }}>
                {[{ icon: <FileText size={12} />, text: 'Upload and verify documents' }, { icon: <CheckCircle size={12} />, text: 'Check verification status' }, { icon: <ShieldCheck size={12} />, text: 'Receive verification reports' }, { icon: <Smartphone size={12} />, text: 'Get approval stage updates' }].map(i => (
                  <li key={i.text} style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>{i.icon}{i.text}</li>
                ))}
              </ul>
            </div>
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '12px', fontSize: '1rem' }}>Why WhatsApp First?</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Over 90 million Nigerians use WhatsApp daily. Many rural landowners and buyers have no smartphone browser habit but check WhatsApp many times a day. Meeting users where they already are massively increases adoption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
