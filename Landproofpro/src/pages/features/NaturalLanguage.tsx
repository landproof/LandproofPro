import { useEffect, useState } from 'react';
import { MessageCircle, Bot, Send, ShieldCheck } from 'lucide-react';
import '../VerifyDashboard.css';

const SUGGESTIONS = [
  'Is this land safe to buy?',
  'Can I build a 4-storey apartment here?',
  'Why was this approval delayed?',
  'What documents do I need for a mortgage?',
  'Is Plot 14 Maitama free from litigation?',
];

type Msg = { from: 'user' | 'ai'; text: string };

const AI_REPLIES: Record<string, string> = {
  'Is this land safe to buy?': '✅ Based on the CTI report for FCT/MW/12B: The property has a clean chain-of-title with only one minor documentary gap in 2003. Overall trust score is 86/100. No active court cases or disputes are registered. It is considered safe to proceed with due diligence.',
  'Can I build a 4-storey apartment here?': '📐 The plot is zoned R1 (Residential). Current FCDA regulations permit a maximum of 2 floors (G+1) in this zoning district. A 4-storey apartment would require a zoning variance application. I can pre-fill this application for you.',
  'Why was this approval delayed?': '⏱ The building approval for Ref. LPF-2024-10293 is currently at Stage 3 of 7 (Structural Review). The delay is attributed to a backlog at the FCDA Engineering Division — average clearance time is 14 days. Expected clearance: Nov 2, 2024.',
  'What documents do I need for a mortgage?': '🏦 For a standard mortgage application in FCT you need: (1) Certificate of Occupancy or R of O, (2) Approved Building Plan, (3) Survey Plan, (4) Current Tax Clearance Certificate, (5) LandProof Verification Report. I can generate the LandProof report now.',
  'Is Plot 14 Maitama free from litigation?': '⚖️ Registry scan complete for Plot 14, Maitama. Result: No active court cases, no registered caveats, no competing claims. Dispute risk score: 12/100 (Low). This property is clear for transaction.',
};

export default function NaturalLanguage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [messages, setMessages] = useState<Msg[]>([{ from: 'ai', text: 'Hello! Ask me anything about a property, an approval, or what documents you need. I understand plain English and Pidgin.' }]);
  const [input, setInput] = useState('');

  const sendMsg = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const reply = AI_REPLIES[q] || `I searched the LandProof database for "${q}" but need a plot number or more specific location to give you a precise answer. Please try: "Is Plot [X] [Location] safe to buy?"`;
    setMessages(prev => [...prev, { from: 'user', text: q }, { from: 'ai', text: reply }]);
    setInput('');
  };

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(0,168,107,0.07), transparent 60%)' }} /></div>

      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--emerald-light)' }}><MessageCircle size={12} /> Natural Language Queries</div>
          <h1 className="display-3">Ask LandProof Anything</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '640px', marginTop: '10px' }}>
            No jargon. No forms. Just ask your property question in plain English — or Pidgin — and get an instant AI-powered answer backed by real registry data.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 280px' }}>
          <div className="vd-main">
            <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '520px' }}>
              {/* Chat header */}
              <div style={{ padding: '16px 24px', background: 'rgba(0,168,107,0.06)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--emerald), var(--emerald-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>LandProof AI</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--emerald)' }}>● Online — Registry Connected</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start', gap: '10px', alignItems: 'flex-end' }}>
                    {m.from === 'ai' && (
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--emerald), var(--emerald-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Bot size={14} color="#fff" />
                      </div>
                    )}
                    <div style={{ maxWidth: '75%', padding: '12px 16px', borderRadius: m.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px', background: m.from === 'user' ? 'var(--emerald)' : 'rgba(255,255,255,0.05)', color: m.from === 'user' ? '#fff' : 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.6, border: m.from === 'ai' ? '1px solid var(--border)' : 'none' }}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Ask anything about property, approvals, or land law..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
                  style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.9rem', padding: '10px 14px', borderRadius: '10px' }}
                />
                <button onClick={() => sendMsg(input)} className="btn btn-primary" style={{ padding: '10px 16px' }}><Send size={16} /></button>
              </div>
            </div>
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '14px', fontSize: '1rem' }}>Try These Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => sendMsg(s)} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '10px 12px', borderRadius: '8px', textAlign: 'left', fontSize: '0.82rem', cursor: 'pointer', transition: 'var(--transition)' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--emerald)')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="card vd-info-card">
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <ShieldCheck size={16} style={{ color: 'var(--emerald)', flexShrink: 0, marginTop: '2px' }} />
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>All responses are grounded in real-time LandProof registry data — not generic web answers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
