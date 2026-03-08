import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, ShieldAlert, CheckCircle, XCircle,
  Map, Waves, TreeDeciduous, Building2, Ruler,
  ArrowRight, Activity, TrendingUp, FileCheck
} from 'lucide-react';
import './ComplianceDashboard.css';

interface ZoneResult {
  zone: string;
  use: string;
  density: string;
  maxHeight: string;
  setback: string;
  complianceScore: number;
  issues: { type: 'error' | 'warning' | 'ok'; title: string; detail: string }[];
  checks: { label: string; value: string; status: 'compliant' | 'violation' | 'warning' }[];
}

const mockZoneResults: Record<string, ZoneResult> = {
  'maitama': {
    zone: 'Residential Zone 1 (R1)', use: 'Low Density Residential', density: 'Max 8 units/hectare',
    maxHeight: '2 storeys (8m)', setback: 'Front: 10m | Side: 5m | Rear: 7.5m', complianceScore: 88,
    issues: [
      { type: 'ok', title: 'Zoning Compliant', detail: 'Proposed use aligns with R1 residential zoning' },
      { type: 'ok', title: 'Density Within Limits', detail: '6 units/ha — below maximum of 8' },
      { type: 'warning', title: 'Height Restriction Alert', detail: 'Proposed 3 storey exceeds 2 storey limit. Requires variance.' },
      { type: 'ok', title: 'Environmental Clear', detail: 'No floodplain, green area, or protected zone encroachment' },
    ],
    checks: [
      { label: 'Land Use', value: 'Residential — Permitted', status: 'compliant' },
      { label: 'Plot Density', value: '6 units/ha (max 8)', status: 'compliant' },
      { label: 'Building Height', value: '3 floors requested vs 2 allowed', status: 'violation' },
      { label: 'Front Setback', value: '10.5m (min 10m) — OK', status: 'compliant' },
      { label: 'Side Setback', value: '5.2m (min 5m) — OK', status: 'compliant' },
      { label: 'Plot Ratio (FAR)', value: '0.42 (max 0.5) — OK', status: 'compliant' },
      { label: 'Floodplain Risk', value: 'None detected', status: 'compliant' },
      { label: 'Green Area Overlap', value: 'None detected', status: 'compliant' },
      { label: 'Environmental Impact', value: 'Low risk — No EIAR required', status: 'compliant' },
      { label: 'Slope/Erosion Risk', value: 'Minor — engineering caution advised', status: 'warning' },
    ],
  },
  'wuse-2': {
    zone: 'Commercial Zone (C2)', use: 'General Commercial', density: 'Max 40% site coverage',
    maxHeight: '5 storeys (20m)', setback: 'Front: 6m | Side: 3m | Rear: 6m', complianceScore: 72,
    issues: [
      { type: 'ok', title: 'Commercial Use Permitted', detail: 'C2 allows retail, office, and mixed use' },
      { type: 'error', title: 'Site Coverage Violation', detail: 'Proposed footprint at 52% exceeds 40% maximum' },
      { type: 'warning', title: 'Partial Floodplain Overlap', detail: '12% of plot is within 100yr floodplain buffer' },
      { type: 'ok', title: 'Height Compliant', detail: '4 storeys proposed — within 5 storey limit' },
    ],
    checks: [
      { label: 'Land Use', value: 'Commercial — Permitted', status: 'compliant' },
      { label: 'Site Coverage', value: '52% vs max 40% — VIOLATION', status: 'violation' },
      { label: 'Building Height', value: '4 floors (max 5) — OK', status: 'compliant' },
      { label: 'Front Setback', value: '6.1m (min 6m) — OK', status: 'compliant' },
      { label: 'Floodplain', value: 'Partial overlap — mitigation required', status: 'warning' },
      { label: 'Green Area', value: 'None affected', status: 'compliant' },
      { label: 'Traffic Impact', value: 'High — TIA study required', status: 'warning' },
      { label: 'Parking Requirement', value: '42 spaces required, 38 provided', status: 'violation' },
      { label: 'Drainage Study', value: 'Required due to floodplain overlap', status: 'warning' },
      { label: 'Environmental Impact', value: 'Medium — EIAR required', status: 'warning' },
    ],
  },
  'garki': {
    zone: 'Mixed Use Zone (MU1)', use: 'Commercial + Residential', density: 'Max 60% site coverage',
    maxHeight: '8 storeys (32m)', setback: 'Front: 5m | Side: 3m | Rear: 5m', complianceScore: 95,
    issues: [
      { type: 'ok', title: 'Fully Compliant Zone', detail: 'All proposed uses permitted in MU1' },
      { type: 'ok', title: 'Height Within Limit', detail: '6 storeys — below 8 storey maximum' },
      { type: 'ok', title: 'Density Compliant', detail: '55% coverage — below 60% max' },
      { type: 'ok', title: 'Environmentally Clear', detail: 'No risks detected — fast-track eligible' },
    ],
    checks: [
      { label: 'Land Use', value: 'Mixed Use — Permitted', status: 'compliant' },
      { label: 'Site Coverage', value: '55% (max 60%) — OK', status: 'compliant' },
      { label: 'Building Height', value: '6 floors (max 8) — OK', status: 'compliant' },
      { label: 'Front Setback', value: '5.5m (min 5m) — OK', status: 'compliant' },
      { label: 'Floodplain', value: 'None detected', status: 'compliant' },
      { label: 'Green Area', value: 'None affected', status: 'compliant' },
      { label: 'Traffic Impact', value: 'Moderate — TIA recommended', status: 'warning' },
      { label: 'EIAR Required', value: 'No — low environmental impact', status: 'compliant' },
      { label: 'Parking', value: '60 spaces provided vs 55 required', status: 'compliant' },
      { label: 'Accessibility', value: 'Compliant with accessibility standards', status: 'compliant' },
    ],
  },
};

const locations = [
  { value: 'maitama', label: 'Maitama District' },
  { value: 'wuse-2', label: 'Wuse II' },
  { value: 'garki', label: 'Garki Area' },
];

export default function ComplianceDashboard() {
  const [location, setLocation] = useState('');
  const [useType, setUseType] = useState('');
  const [floors, setFloors] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [accessRoad, setAccessRoad] = useState('');
  const [basement, setBasement] = useState('');
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<ZoneResult | null>(null);

  const handleCheck = () => {
    if (!location) return;
    const r = mockZoneResults[location];
    setResult(r);
    setChecked(true);
  };

  const scoreColor = (score: number) => score >= 90 ? 'var(--emerald-light)' : score >= 70 ? 'var(--warning)' : 'var(--danger)';
  const scoreLabel = (score: number) => score >= 90 ? 'Excellent' : score >= 70 ? 'Moderate' : 'Poor';

  return (
    <div className="comp-dashboard">
      <div className="comp-dashboard__bg">
        <div className="comp-dashboard__glow" />
      </div>

      <div className="container" style={{ paddingTop: 'calc(var(--nav-height) + 40px)', paddingBottom: '80px' }}>
        {/* Header */}
        <div className="vd-header">
          <div className="section-label"><FileCheck size={12} /> LandProof Compliance</div>
          <h1 className="display-3">Master Plan & Compliance Check</h1>
          <p className="body-lg" style={{ maxWidth: '640px' }}>
            Verify your land or development against the Abuja Master Plan, FCT zoning regulations,
            and environmental constraints before breaking ground.
          </p>
        </div>

        <div className="vd-layout">
          {/* Left */}
          <div className="vd-main">
            {/* Input Form */}
            <div className="comp-form card">
              <h3 className="heading-2" style={{ marginBottom: '24px' }}>Enter Plot Details</h3>
              <div className="comp-form__grid">
                {/* Always Visible Fields */}
                <div className="form-group">
                  <label className="form-label">Location / District</label>
                  <select
                    className="form-input form-select"
                    value={location}
                    onChange={e => { setLocation(e.target.value); setChecked(false); }}
                  >
                    <option value="">Select location...</option>
                    {locations.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Plot Number</label>
                  <input className="form-input" placeholder="e.g. PLT/FCT/MAIT/0042781" />
                </div>
                <div className="form-group">
                  <label className="form-label">Proposed Use</label>
                  <select
                    className="form-input form-select"
                    value={useType}
                    onChange={e => setUseType(e.target.value)}
                  >
                    <option value="">Select use type...</option>
                    <option>Residential (Low Density)</option>
                    <option>Residential (High Density)</option>
                    <option>Commercial (Retail)</option>
                    <option>Commercial (Office)</option>
                    <option>Mixed Use</option>
                    <option>Industrial</option>
                    <option>Institutional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Proposed Floors</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="e.g. 3"
                    value={floors}
                    onChange={e => setFloors(e.target.value)}
                    min="1" max="50"
                  />
                </div>
              </div>

              {/* Progressively Revealed Fields */}
              <div className={`comp-advanced-fields ${location ? 'open' : ''}`}>
                <div className="form-group">
                  <label className="form-label">Plot Size (sqm)</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="e.g. 1200"
                    value={plotSize}
                    onChange={e => setPlotSize(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Primary Access Road Type</label>
                  <select
                    className="form-input form-select"
                    value={accessRoad}
                    onChange={e => setAccessRoad(e.target.value)}
                  >
                    <option value="">Select road type...</option>
                    <option>Expressway / Arterial</option>
                    <option>Collector Road</option>
                    <option>Local Street</option>
                    <option>Cul-de-sac</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Basement Levels</label>
                  <input
                    className="form-input"
                    type="number"
                    placeholder="e.g. 1"
                    value={basement}
                    onChange={e => setBasement(e.target.value)}
                    min="0" max="5"
                  />
                </div>
                 <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end' }}>
                   <span style={{ fontSize: '0.75rem', color: 'var(--emerald-light)', background: 'rgba(0,168,107,0.1)', padding: '6px 12px', borderRadius: '4px', border: '1px solid rgba(0,168,107,0.3)', width: '100%', textAlign: 'center' }}>Pro Fields Unlocked</span>
                 </div>
              </div>

              <button
                className="btn btn-primary"
                style={{ marginTop: '24px', width: '100%', justifyContent: 'center' }}
                onClick={handleCheck}
                disabled={!location}
              >
                <Activity size={18} /> Run Deep Compliance Check
              </button>
            </div>

            {/* Results */}
            {checked && result && (
              <div className="comp-results animate-fade-up">
                {/* Score */}
                <div className="comp-score-bar card">
                  <div className="comp-score-bar__left">
                    <div className="comp-score-circle" style={{ '--score-color': scoreColor(result.complianceScore) } as React.CSSProperties}>
                      <svg viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                        <circle
                          cx="40" cy="40" r="34" fill="none"
                          stroke={scoreColor(result.complianceScore)}
                          strokeWidth="7" strokeLinecap="round"
                          strokeDasharray={`${(result.complianceScore / 100) * 213.6} 213.6`}
                          transform="rotate(-90 40 40)"
                          style={{ transition: 'stroke-dasharray 1.2s ease' }}
                        />
                      </svg>
                      <span>{result.complianceScore}</span>
                    </div>
                    <div>
                      <div className="comp-score-bar__label">Compliance Score</div>
                      <div className="comp-score-bar__rating" style={{ color: scoreColor(result.complianceScore) }}>
                        {scoreLabel(result.complianceScore)}
                      </div>
                    </div>
                  </div>
                  <div className="comp-zone-info">
                    <div className="comp-zone-info__item"><Map size={14} /> <span>{result.zone}</span></div>
                    <div className="comp-zone-info__item"><Building2 size={14} /> <span>Max: {result.maxHeight}</span></div>
                    <div className="comp-zone-info__item"><Ruler size={14} /> <span>{result.setback}</span></div>
                    <div className="comp-zone-info__item"><TrendingUp size={14} /> <span>{result.density}</span></div>
                  </div>
                </div>

                {/* Issues */}
                <div className="comp-issues">
                  {result.issues.map(issue => (
                    <div key={issue.title} className={`comp-issue comp-issue--${issue.type}`}>
                      <div className="comp-issue__icon">
                        {issue.type === 'ok' ? <CheckCircle size={16} /> :
                         issue.type === 'error' ? <XCircle size={16} /> :
                         <ShieldAlert size={16} />}
                      </div>
                      <div>
                        <div className="comp-issue__title">{issue.title}</div>
                        <div className="comp-issue__detail">{issue.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detailed checks table */}
                <div className="comp-checks card">
                  <h4 className="heading-2" style={{ marginBottom: '16px' }}>Detailed Compliance Matrix</h4>
                  <div className="comp-checks__list">
                    {result.checks.map(c => (
                      <div key={c.label} className={`comp-check-row comp-check-row--${c.status}`}>
                        <span className="comp-check-row__label">{c.label}</span>
                        <span className="comp-check-row__value">{c.value}</span>
                        <div className={`comp-check-row__status badge ${c.status === 'compliant' ? 'badge-emerald' : c.status === 'violation' ? 'badge-danger' : 'badge-gold'}`}>
                          {c.status === 'compliant' ? <CheckCircle size={10} /> : c.status === 'violation' ? <XCircle size={10} /> : <ShieldAlert size={10} />}
                          {c.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="vd-sidebar">
            {/* Live Compliance Heatmap UI */}
            <div className="comp-heatmap">
              <div className="comp-heatmap__grid" />
              <div className="comp-heatmap__map" />

              {/* Dynamic overlays based on location selection */}
              <div className={`comp-heatmap__overlay ${location === 'maitama' || location === 'garki' ? 'active ok' : location === 'wuse-2' ? 'active warning' : ''}`} />
              <div className={`comp-heatmap__flood ${location === 'wuse-2' ? 'active' : ''}`} />
              <div className={`comp-heatmap__pin ${location ? 'active' : ''}`} />

              {!location && (
                <div className="comp-heatmap__empty">
                  <Map size={48} style={{ opacity: 0.3 }} />
                  <div>
                    <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '4px' }}>Live Map Overlay</strong>
                    Select a district to initialize<br />spatial compliance heatmap
                  </div>
                </div>
              )}
              {location && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 20 }}>
                  <span className={`badge ${location === 'wuse-2' ? 'badge-warning' : 'badge-emerald'}`} style={{ backdropFilter: 'blur(10px)', background: 'rgba(0,0,0,0.6)' }}>
                    <Activity size={10} className="animate-pulse" /> Live Analysis
                  </span>
                </div>
              )}
            </div>

            <div className="card vd-info-card" style={{ marginTop: 'auto' }}>
              <ShieldAlert size={20} className="vd-info-card__icon" style={{ color: 'var(--warning)' }} />
              <h4 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>Environmental Checks</h4>
              <ul className="vd-info-list">
                {[
                  { icon: <Waves size={14} />, label: 'Floodplain Detection' },
                  { icon: <TreeDeciduous size={14} />, label: 'Green Area Overlap' },
                  { icon: <ShieldAlert size={14} />, label: 'Slope & Erosion Risk' },
                ].map(e => (
                  <li key={e.label}>{e.icon} {e.label}</li>
                ))}
              </ul>
            </div>
            
            <Link to="/buildtrack" className="btn btn-outline" style={{ width: '100%', justifySelf: 'end', justifyContent: 'center' }}>
              Submit Building Plans <ArrowRight size={14} />
            </Link>
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <MapPin size={14} /> Request Site Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
