import { useEffect, useState, useRef } from 'react';
import { ShieldAlert, AlertTriangle, Activity, Search, Flag, BarChart2, ChevronDown } from 'lucide-react';
import './VerifyDashboard.css';

const MOCK_DISTRICTS = [
  'Maitama', 'Wuse II', 'Gwarinpa', 'Asokoro', 'Jabi', 'Utako', 'Garki', 'Guzape'
];

export default function RiskScoreDashboard() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [landId, setLandId] = useState('');
  
  // Custom Dropdown State
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  const filteredDistricts = MOCK_DISTRICTS.filter(d => d.toLowerCase().includes(districtSearch.toLowerCase()));

  // SVG Radar Constants
  const cx = 100, cy = 100, radius = 70;
  const numPoints = 5;
  const labels = ['Ownership', 'Litigation', 'Zoning', 'Developer', 'Documents'];
  const baseScores = [0.8, 0.9, 0.7, 0.85, 0.95]; // Normalized 0-1
  
  // Animate the scores if landId is > 5 chars (simulating a live fetch)
  const isRadarActive = landId.length > 5;
  const currentScores = isRadarActive ? baseScores : [0, 0, 0, 0, 0];

  const getCoordinatesForAngle = (angleOffset: number, value: number) => {
    const x = cx + radius * value * Math.cos(angleOffset - Math.PI / 2);
    const y = cy + radius * value * Math.sin(angleOffset - Math.PI / 2);
    return `${x},${y}`;
  };

  const drawPolygon = (scores: number[]) => {
    return scores.map((val, i) => getCoordinatesForAngle((Math.PI * 2 * i) / numPoints, val)).join(' ');
  };

  return (
    <div className="verify-dashboard" style={{ paddingTop: 'var(--nav-height)' }}>
      <div className="verify-dashboard__bg"><div className="verify-dashboard__glow" style={{ background: 'radial-gradient(ellipse, rgba(245, 158, 11, 0.08), transparent 60%)' }} /></div>
      
      <div className="container" style={{ padding: '40px 20px', position: 'relative', zIndex: 1 }}>
        <div className="vd-header">
          <div className="section-label" style={{ color: 'var(--warning)' }}><ShieldAlert size={12} /> LandProof RiskScore</div>
          <h1 className="display-3">Fraud & Compliance Risk Engine</h1>
          <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginTop: '10px' }}>
            Instantly assign a trust and risk rating to any property. We analyze ownership conflicts, developer history, and litigation likelihoods.
          </p>
        </div>

        <div className="vd-layout" style={{ gridTemplateColumns: '1fr 340px' }}>
          <div className="vd-main">
            {!showResult ? (
              <div className="card" style={{ padding: '32px', minHeight: '440px' }}>
                <h3 className="heading-2" style={{ marginBottom: '24px' }}>Run Risk Assessment</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 280px', gap: '40px', alignItems: 'start' }}>
                  <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">Property / Land ID</label>
                      <input 
                        className="form-input" 
                        placeholder="e.g. FCT/AGIS/10293" 
                        value={landId}
                        onChange={e => setLandId(e.target.value)}
                        required 
                      />
                    </div>
                    
                    <div className="form-group" ref={dropdownRef}>
                      <label className="form-label">Location District</label>
                      <div className="custom-dropdown">
                        <div 
                          className="custom-dropdown__trigger form-input" 
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                          <span style={{ color: selectedDistrict ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                            {selectedDistrict || 'Select district...'}
                          </span>
                          <ChevronDown size={16} className={`dropdown-chevron ${dropdownOpen ? 'open' : ''}`} />
                        </div>
                        
                        {dropdownOpen && (
                          <div className="custom-dropdown__menu animate-fade-in">
                            <input 
                              type="text" 
                              className="dropdown-search" 
                              placeholder="Search..." 
                              value={districtSearch}
                              onChange={e => setDistrictSearch(e.target.value)}
                              onClick={e => e.stopPropagation()}
                            />
                            <div className="dropdown-list">
                              {filteredDistricts.length > 0 ? filteredDistricts.map(d => (
                                <div 
                                  key={d} 
                                  className={`dropdown-item ${selectedDistrict === d ? 'selected' : ''}`}
                                  onClick={() => {
                                    setSelectedDistrict(d);
                                    setDropdownOpen(false);
                                    setDistrictSearch('');
                                  }}
                                >
                                  {d}
                                </div>
                              )) : (
                                <div className="dropdown-empty">No districts found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '12px', justifyContent: 'center' }} disabled={analyzing}>
                      {analyzing ? 'Analyzing Risk Vectors...' : <><Search size={16}/> Generate Risk Score</>}
                    </button>
                  </form>

                  {/* Premium Feature: Live Risk Radar SVG Chart */}
                  <div className="risk-radar-panel">
                    <h4 className="heading-2" style={{ fontSize: '0.9rem', marginBottom: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>Live Intelligence Radar</h4>
                    {!isRadarActive && <p className="body-sm" style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '16px' }}>Enter Land ID to stream metrics</p>}
                    
                    <div className="radar-container">
                      <svg width="200" height="200" viewBox="0 0 200 200" className={`radar-svg ${isRadarActive ? 'active' : ''}`}>
                        {/* Background Grids */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map(r => (
                          <polygon key={r} points={drawPolygon([r, r, r, r, r])} fill="none" stroke="currentColor" className="radar-grid" />
                        ))}
                        
                        {/* Axes */}
                        {[0, 1, 2, 3, 4].map(i => {
                          const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
                          const x2 = cx + radius * Math.cos(angle);
                          const y2 = cy + radius * Math.sin(angle);
                          return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} stroke="currentColor" className="radar-axis" />;
                        })}
                        
                        {/* Data Polygon */}
                        <polygon points={drawPolygon(currentScores)} fill="var(--emerald-glow)" stroke="var(--emerald-light)" strokeWidth="2" className="radar-data" />
                        
                        {/* Data Points */}
                        {isRadarActive && currentScores.map((val, i) => {
                          const pt = getCoordinatesForAngle((Math.PI * 2 * i) / numPoints, val).split(',');
                          return <circle key={i} cx={pt[0]} cy={pt[1]} r="4" fill="var(--emerald-light)" className="radar-dot" style={{ animationDelay: `${i * 0.1}s` }} />;
                        })}
                      </svg>
                      
                      {/* Labels - positioned around the svg */}
                      <div className="radar-labels">
                        <span style={{ top: '0', left: '50%', transform: 'translate(-50%, -100%)' }}>{labels[0]}</span>
                        <span style={{ top: '35%', right: '0', transform: 'translate(100%, -50%)' }}>{labels[1]}</span>
                        <span style={{ bottom: '0', right: '15%', transform: 'translate(50%, 100%)' }}>{labels[2]}</span>
                        <span style={{ bottom: '0', left: '15%', transform: 'translate(-50%, 100%)' }}>{labels[3]}</span>
                        <span style={{ top: '35%', left: '0', transform: 'translate(-100%, -50%)' }}>{labels[4]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div>
                    <h3 className="heading-2">Risk Assessment Profile</h3>
                    <p className="body-sm" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Property ID: FCT/AGIS/10293 · Maitama</p>
                  </div>
                  <button className="btn btn-ghost btn-sm" onClick={() => setShowResult(false)}>New Assessment</button>
                </div>

                <div className="vd-result__score" style={{ marginBottom: '32px', background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div className="vd-result__score-ring" style={{ color: 'var(--emerald)' }}>
                    <svg viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="85, 100" />
                    </svg>
                    <span style={{ color: 'var(--emerald-light)' }}>85</span>
                  </div>
                  <div>
                    <div className="vd-result__score-label">Overall Trust Rating</div>
                    <div className="heading-2" style={{ color: 'var(--emerald-light)' }}>Low Risk (Green)</div>
                    <p className="body-sm" style={{ color: 'var(--text-muted)', marginTop: '4px' }}>This property has a high probability of authenticity and low compliance friction.</p>
                  </div>
                </div>

                <div className="vd-checks__grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
                  <div className="vd-check vd-check--pass">
                    <div className="vd-check__icon"><ShieldAlert size={16} /></div>
                    <div>
                      <div className="vd-check__label">Ownership Conflict</div>
                      <div className="vd-check__detail">No duplicate claims detected. Chain of title is unbroken since 2005.</div>
                    </div>
                  </div>
                  <div className="vd-check vd-check--warning">
                    <div className="vd-check__icon"><AlertTriangle size={16} /></div>
                    <div>
                      <div className="vd-check__label">Zoning Compliance</div>
                      <div className="vd-check__detail">Minor deviation: Proposed use borders residential/commercial boundary.</div>
                    </div>
                  </div>
                  <div className="vd-check vd-check--pass">
                    <div className="vd-check__icon"><Flag size={16} /></div>
                    <div>
                      <div className="vd-check__label">Litigation History</div>
                      <div className="vd-check__detail">0 active court cases connected to this plot or immediate neighbors.</div>
                    </div>
                  </div>
                  <div className="vd-check vd-check--pass">
                    <div className="vd-check__icon"><Activity size={16} /></div>
                    <div>
                      <div className="vd-check__label">Developer Track Record</div>
                      <div className="vd-check__detail">Developer has 94% completion rate on previous registered projects.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="vd-sidebar">
            <div className="card vd-info-card">
              <h3 className="heading-2" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={18} className="vd-info-card__icon" style={{ color: 'var(--gold)' }}/> How We Score
              </h3>
              <p className="body-sm" style={{ marginBottom: '24px' }}>The RiskScore engine aggregates millions of data points from historical transactions, court records, and zoning overlays to predict fraud probability.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="tier-card tier-ok">
                  <div className="tier-card__score">80-100</div>
                  <div className="tier-card__content">
                    <strong>Safe to transact</strong>
                    <span>High probability of authenticity.</span>
                  </div>
                </div>
                
                <div className="tier-card tier-warning">
                  <div className="tier-card__score">50-79</div>
                  <div className="tier-card__content">
                    <strong>Due diligence required</strong>
                    <span>Moderate risk detected.</span>
                  </div>
                </div>
                
                <div className="tier-card tier-danger">
                  <div className="tier-card__score">&lt;50</div>
                  <div className="tier-card__content">
                    <strong>High risk</strong>
                    <span>Strong likelihood of fraud or litigation.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
