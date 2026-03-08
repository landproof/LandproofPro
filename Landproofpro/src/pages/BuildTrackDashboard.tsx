import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, Upload, FileText, CheckCircle, Clock, Circle,
  AlertTriangle, ArrowRight, ChevronRight, CreditCard, Send,
  Folder, User, Phone, Mail, Home, Layers
} from 'lucide-react';
import './BuildTrackDashboard.css';

type WizardStep = 0 | 1 | 2 | 3 | 4;

interface FormData {
  ownerName: string;
  phone: string;
  email: string;
  plotNumber: string;
  address: string;
  proposedUse: string;
  floors: string;
  gba: string;
}

const autoFillData: Record<string, Partial<FormData>> = {
  'PLT/FCT/MAIT/0042781': {
    ownerName: 'Oluwaseun Adebayo (Trustee)',
    address: 'Plot 42781, Cadastral Zone A05, Maitama',
    proposedUse: 'Residential',
  },
  'PLT/FCT/WUSE/0091220': {
    ownerName: 'Capital Developments Ltd.',
    address: 'Plot 91220, Cadastral Zone A02, Wuse II',
    proposedUse: 'Commercial',
  }
};

const steps = [
  { label: 'Project Info', icon: <Home size={16} /> },
  { label: 'Documents', icon: <Folder size={16} /> },
  { label: 'Review', icon: <FileText size={16} /> },
  { label: 'Payment', icon: <CreditCard size={16} /> },
  { label: 'Submitted', icon: <Send size={16} /> },
];

const requiredDocs = [
  { id: 'site-plan', label: 'Site Layout Plan', required: true },
  { id: 'arch', label: 'Architectural Drawings', required: true },
  { id: 'structural', label: 'Structural Drawings', required: true },
  { id: 'mep', label: 'MEP Drawings', required: false },
  { id: 'eiar', label: 'Environmental Impact Assessment', required: false },
  { id: 'soil', label: 'Soil Investigation Report', required: false },
  { id: 'license', label: 'Professional License (Architect)', required: true },
  { id: 'cofo', label: 'Certificate of Occupancy', required: true },
];

const approvalTimeline = [
  { status: 'done', label: 'Application Received', date: '7 Mar 2025, 10:42am', detail: 'Reference: BT/FCT/2025/04412' },
  { status: 'done', label: 'Document Verification', date: '7 Mar 2025, 11:15am', detail: 'All 8 documents validated' },
  { status: 'active', label: 'Technical Review', date: 'In Progress', detail: 'Engineering team reviewing structural plans' },
  { status: 'pending', label: 'Site Inspection', date: 'Scheduled: 14 Mar 2025', detail: 'FCT inspector assigned' },
  { status: 'pending', label: 'Director Approval', date: 'Estimated: 21 Mar 2025', detail: 'Final sign-off pending inspection' },
  { status: 'pending', label: 'Permit Issued', date: 'Estimated: 28 Mar 2025', detail: 'Digital certificate will be issued' },
];

const feeSchedule = [
  { label: 'Application Fee', amount: '₦25,000' },
  { label: 'Processing Fee (per floor)', amount: '₦15,000 × 3' },
  { label: 'Environmental Levy', amount: '₦10,000' },
  { label: 'Inspection Fee', amount: '₦20,000' },
];

export default function BuildTrackDashboard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>(0);
  const [uploadedDocs, setUploadedDocs] = useState<Set<string>>(new Set());
  const [form, setForm] = useState<FormData>({
    ownerName: '', phone: '', email: '', plotNumber: '',
    address: '', proposedUse: '', floors: '', gba: '',
  });
  const [paymentDone, setPaymentDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  // AI Auto-Fill Engine
  const handlePlotNumberChange = (val: string) => {
    setField('plotNumber', val);
    
    // Simulate AI / Registry lookup based on exact match or pattern
    if (autoFillData[val]) {
      setIsAutoFilling(true);
      setTimeout(() => {
        setForm(prev => ({ ...prev, ...autoFillData[val] }));
        setIsAutoFilling(false);
      }, 1200);
    }
  };

  const setField = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const toggleDoc = (id: string) => {
    setUploadedDocs(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const requiredUploaded = requiredDocs.filter(d => d.required && uploadedDocs.has(d.id)).length;
  const totalRequired = requiredDocs.filter(d => d.required).length;

  const totalFee = 25000 + 15000 * (parseInt(form.floors) || 3) + 10000 + 20000;

  const handlePayment = () => {
    setSubmitting(true);
    setTimeout(() => {
      setPaymentDone(true);
      setSubmitting(false);
      setCurrentStep(4);
    }, 2000);
  };

  return (
    <div className="bt-dashboard">
      <div className="bt-dashboard__bg">
        <div className="bt-dashboard__glow" />
      </div>

      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: '80px' }}>
        {/* Header */}
        <div className="vd-header">
          <div className="section-label"><Building2 size={12} /> LandProof BuildTrack</div>
          <h1 className="display-3">Digital Building Approvals</h1>
          <p className="body-lg" style={{ maxWidth: '640px' }}>
            Submit your building plans, pay fees, and track your permit application — all in one transparent, digital process.
          </p>
        </div>

        {/* Sticky Wizard Steps */}
        <div className="bt-stepper-container">
          <div className="bt-stepper">
            {steps.map((step, i) => (
              <div key={step.label} className="bt-stepper__item">
                <div className={`bt-stepper__circle ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
                  {i < currentStep ? <CheckCircle size={16} /> : step.icon}
                </div>
                <span className={`bt-stepper__label ${i === currentStep ? 'active' : ''}`}>{step.label}</span>
                {i < steps.length - 1 && <div className={`bt-stepper__line ${i < currentStep ? 'done' : ''}`} />}
              </div>
            ))}
          </div>
        </div>

        <div className="vd-layout">
          <div className="vd-main">
            {/* Step 0 — Project Info */}
            {currentStep === 0 && (
              <div className="card bt-step-card animate-fade-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 className="heading-2">Project & Owner Information</h3>
                  {isAutoFilling && (
                    <div className="badge badge-emerald" style={{ animation: 'pulse 1.5s infinite' }}>
                      <CheckCircle size={12} /> Auto-Filling from Registry...
                    </div>
                  )}
                </div>
                <div className="bt-form-grid">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <label className="form-label">Plot Number (Try: PLT/FCT/MAIT/0042781)</label>
                    </div>
                    <div className="input-with-icon">
                      <Layers size={16} className="input-icon left text-muted" />
                      <input 
                        className={`form-input ${isAutoFilling ? 'auto-filling' : ''}`} 
                        placeholder="e.g. PLT/FCT/..." 
                        value={form.plotNumber} 
                        onChange={e => handlePlotNumberChange(e.target.value)} 
                        style={{ paddingLeft: '40px' }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Owner / Applicant Name</label>
                    <input className="form-input" placeholder="Full legal name" value={form.ownerName} onChange={e => setField('ownerName', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" placeholder="+234 xxx xxx xxxx" value={form.phone} onChange={e => setField('phone', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setField('email', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Site Address</label>
                    <input className="form-input" placeholder="Full site address" value={form.address} onChange={e => setField('address', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Proposed Use</label>
                    <select className="form-input form-select" value={form.proposedUse} onChange={e => setField('proposedUse', e.target.value)}>
                      <option value="">Select...</option>
                      <option>Residential</option><option>Commercial</option>
                      <option>Mixed Use</option><option>Industrial</option><option>Institutional</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Floors</label>
                    <input className="form-input" type="number" placeholder="e.g. 3" value={form.floors} onChange={e => setField('floors', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Gross Building Area (m²)</label>
                    <input className="form-input" type="number" placeholder="e.g. 450" value={form.gba} onChange={e => setField('gba', e.target.value)} />
                  </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '28px' }} onClick={() => setCurrentStep(1)}>
                  Next: Upload Documents <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 1 — Documents */}
            {currentStep === 1 && (
              <div className="card bt-step-card animate-fade-up">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 className="heading-2">Upload Required Documents</h3>
                  <div className="badge badge-info">{requiredUploaded}/{totalRequired} required</div>
                </div>
                <div className="bt-docs-grid">
                  {requiredDocs.map(doc => (
                    <div
                      key={doc.id}
                      className={`bt-doc-item ${uploadedDocs.has(doc.id) ? 'uploaded' : ''}`}
                      onClick={() => toggleDoc(doc.id)}
                    >
                      <div className="bt-doc-icon">
                        {uploadedDocs.has(doc.id) ? <CheckCircle size={20} /> : <Upload size={20} />}
                      </div>
                      <div className="bt-doc-label">{doc.label}</div>
                      {doc.required && <div className="badge badge-danger" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>Required</div>}
                      {!doc.required && <div className="badge badge-info" style={{ fontSize: '0.65rem', padding: '2px 7px' }}>Optional</div>}
                    </div>
                  ))}
                </div>
                <p className="body-sm" style={{ marginTop: '16px', color: 'var(--text-muted)' }}>
                  Click each document to simulate upload. All files are encrypted with AES-256.
                </p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setCurrentStep(0)}>Back</button>
                  <button className="btn btn-primary" onClick={() => setCurrentStep(2)} disabled={requiredUploaded < totalRequired}>
                    Review Application <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Review */}
            {currentStep === 2 && (
              <div className="card bt-step-card animate-fade-up">
                <h3 className="heading-2" style={{ marginBottom: '24px' }}>Review Application</h3>
                <div className="bt-review-grid">
                  <div className="bt-review-section">
                    <h4 className="bt-review-label">Project Details</h4>
                    {[
                      ['Owner', form.ownerName || 'Adaeze Nwosu'],
                      ['Plot', form.plotNumber || 'PLT/FCT/MAIT/0042781'],
                      ['Use', form.proposedUse || 'Residential'],
                      ['Floors', form.floors || '3'],
                      ['GBA', `${form.gba || '450'} m²`],
                    ].map(([k, v]) => (
                      <div key={k} className="bt-review-row">
                        <span>{k}</span><strong>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="bt-review-section">
                    <h4 className="bt-review-label">Documents</h4>
                    {requiredDocs.map(doc => (
                      <div key={doc.id} className="bt-review-row">
                        <span>{doc.label}</span>
                        {uploadedDocs.has(doc.id)
                          ? <span style={{ color: 'var(--emerald-light)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={12} /> Uploaded</span>
                          : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Not uploaded</span>
                        }
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button className="btn btn-ghost btn-sm" onClick={() => setCurrentStep(1)}>Back</button>
                  <button className="btn btn-primary" onClick={() => setCurrentStep(3)}>
                    Proceed to Payment <CreditCard size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 — Payment */}
            {currentStep === 3 && (
              <div className="card bt-step-card animate-fade-up">
                <h3 className="heading-2" style={{ marginBottom: '24px' }}>Fee Calculation & Payment</h3>
                <div className="bt-fee-table">
                  {feeSchedule.map(f => (
                    <div key={f.label} className="bt-fee-row">
                      <span>{f.label}</span>
                      <strong>{f.amount}</strong>
                    </div>
                  ))}
                  <div className="bt-fee-total">
                    <span>Total</span>
                    <strong style={{ color: 'var(--emerald-light)', fontSize: '1.2rem' }}>
                      ₦{totalFee.toLocaleString()}
                    </strong>
                  </div>
                </div>
                <div className="bt-payment-methods">
                  <p className="form-label" style={{ marginBottom: '12px' }}>Pay with</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {['Paystack', 'Remita (Government Portal)', 'Bank Transfer'].map(m => (
                      <button key={m} className="btn btn-ghost btn-sm" onClick={() => alert(`Selected payment method: ${m}`)}>{m}</button>
                    ))}
                  </div>
                </div>
                <button
                  className="btn btn-gold"
                  style={{ marginTop: '28px', width: '100%', justifyContent: 'center' }}
                  onClick={handlePayment}
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : `Pay ₦${totalFee.toLocaleString()} & Submit`} <Send size={16} />
                </button>
                <button className="btn btn-ghost btn-sm" style={{ marginTop: '10px' }} onClick={() => setCurrentStep(2)}>Back</button>
              </div>
            )}

            {/* Step 4 — Submitted */}
            {currentStep === 4 && (
              <div className="card bt-step-card bt-success animate-fade-up">
                <div className="bt-success__icon">
                  <CheckCircle size={40} />
                </div>
                <h3 className="heading-2" style={{ textAlign: 'center', marginBottom: '8px' }}>Application Submitted!</h3>
                <p className="body-sm" style={{ textAlign: 'center', marginBottom: '32px' }}>
                  Your building permit application has been received. Track your approval status below.
                </p>
                <div className="bt-ref-box">
                  <span>Reference Number</span>
                  <strong>BT/FCT/2025/04412</strong>
                </div>

                {/* Timeline */}
                <h4 className="heading-2" style={{ margin: '32px 0 20px' }}>Approval Timeline</h4>
                <div className="bt-timeline">
                  {approvalTimeline.map((item, i) => (
                    <div key={i} className={`bt-timeline__item bt-timeline__item--${item.status}`}>
                      <div className="bt-timeline__indicator">
                        <div className="bt-timeline__dot">
                          {item.status === 'done' ? <CheckCircle size={14} /> :
                           item.status === 'active' ? <Clock size={14} /> :
                           <Circle size={14} />}
                        </div>
                        {i < approvalTimeline.length - 1 && <div className="bt-timeline__line" />}
                      </div>
                      <div className="bt-timeline__content">
                        <div className={`bt-timeline__label ${item.status}`}>{item.label}</div>
                        <div className="bt-timeline__date">{item.date}</div>
                        <div className="bt-timeline__detail">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                  <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => { setCurrentStep(0); setUploadedDocs(new Set()); setForm({ ownerName: '', phone: '', email: '', plotNumber: '', address: '', proposedUse: '', floors: '', gba: '' }); }}>
                    New Application
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => alert('Downloading Receipt...')}>Download Receipt</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <AlertTriangle size={20} className="vd-info-card__icon" style={{ color: 'var(--gold)' }} />
              <h4 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>What You'll Need</h4>
              <ul className="vd-info-list" style={{ fontSize: '0.82rem' }}>
                <li key="site"><CheckCircle size={10} /> Site layout plan (1:500)</li>
                <li key="arch"><CheckCircle size={10} /> Architectural drawings</li>
                <li key="struct"><CheckCircle size={10} /> Structural calculations</li>
                <li key="license"><CheckCircle size={10} /> Professional license</li>
                <li key="cofo"><CheckCircle size={10} /> CofO or title document</li>
                {(!form.proposedUse || form.proposedUse === 'Commercial' || form.proposedUse === 'Mixed Use' || form.proposedUse === 'Industrial' || form.proposedUse === 'Institutional') && (
                  <li key="soil"><CheckCircle size={10} /> Soil investigation report</li>
                )}
                {(form.proposedUse === 'Commercial' || form.proposedUse === 'Mixed Use' || form.proposedUse === 'Industrial' || form.proposedUse === 'Institutional') && (
                  <>
                    <li key="mep"><CheckCircle size={10} /> MEP Drawings</li>
                    <li key="eiar"><CheckCircle size={10} /> EIAR Report</li>
                    <li key="traffic"><CheckCircle size={10} /> Traffic Impact Assessment</li>
                  </>
                )}
              </ul>
            </div>
            <div className="card vd-info-card">
              <Clock size={20} className="vd-info-card__icon" style={{ color: 'var(--info)' }} />
              <h4 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>Standard Timelines</h4>
              <div className="vd-time-item"><span>Residential (1–2 floors)</span><strong style={{ color: 'var(--emerald-light)' }}>14 days</strong></div>
              <div className="vd-time-item"><span>Residential (3+ floors)</span><strong style={{ color: 'var(--emerald)' }}>21 days</strong></div>
              <div className="vd-time-item"><span>Commercial</span><strong style={{ color: 'var(--warning)' }}>28 days</strong></div>
              <div className="vd-time-item"><span>Mixed Use / Major</span><strong style={{ color: 'var(--danger)' }}>45 days</strong></div>
            </div>
            <Link to="/compliance" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
              <ArrowRight size={14} /> Check Compliance First
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
