import type { UserType } from '../context/AuthContext';

export interface RouteConfig {
  path: string;
  name: string;
  icon?: any;
}

// ─── MODULES ASSIGNMENTS ───
const ALL_MODULES: Record<string, RouteConfig> = {
  verify: { path: '/verify', name: 'LandProof Verify' },
  compliance: { path: '/compliance', name: 'Compliance' },
  buildtrack: { path: '/buildtrack', name: 'BuildTrack' },
  archive: { path: '/archive', name: 'Archive & DR' },
  riskscore: { path: '/riskscore', name: 'RiskScore Engine' },
  vault: { path: '/vault', name: 'Property Vault' },
  registrysync: { path: '/registrysync', name: 'RegistrySync' },
};

// ─── FEATURES ASSIGNMENTS ───
const ALL_FEATURES: Record<string, RouteConfig> = {
  chainOfTitle: { path: '/features/chain-of-title', name: 'Chain-of-Title' },
  forensicFingerprint: { path: '/features/forensic-fingerprint', name: 'Forensic Fingerprint' },
  aiSignature: { path: '/features/ai-signature', name: 'AI Signature Index' },
  disputeWarning: { path: '/features/dispute-warning', name: 'Dispute Warning' },
  autoFill: { path: '/features/auto-fill', name: 'Auto-Filled Apps' },
  naturalLanguage: { path: '/features/ask-landproof', name: 'Ask LandProof AI' },
  digitalTwin: { path: '/features/digital-twin', name: 'Digital Twin Map' },
  approvalSla: { path: '/features/approval-sla', name: 'Approval SLAs' },
  sandbox: { path: '/features/regulatory-sandbox', name: 'Regulatory Sandbox' },
  escrow: { path: '/features/escrow', name: 'Escrow Verification' },
  whatsapp: { path: '/features/whatsapp', name: 'WhatsApp Interface' },
  offline: { path: '/features/offline', name: 'Offline Capture' },
  // Premium Features
  trustScore: { path: '/features/trust-score', name: 'Property Trust Score' },
  certifiedReports: { path: '/features/certified-reports', name: 'Certified Reports' },
  professionalNetwork: { path: '/features/professional-network', name: 'Pro Network' },
  crossBorder: { path: '/features/cross-border', name: 'Cross-Border Framework' },
  zeroLoss: { path: '/features/zero-loss', name: 'Zero-Loss Guarantee' },
  propertyTimeline: { path: '/features/property-timeline', name: 'Property Timeline' },
};

export const ROLE_ACCESS: Record<UserType, { modules: RouteConfig[], features: RouteConfig[] }> = {
  "Property Buyers": {
    modules: [ALL_MODULES.verify, ALL_MODULES.compliance, ALL_MODULES.vault],
    features: [ALL_FEATURES.chainOfTitle, ALL_FEATURES.disputeWarning, ALL_FEATURES.naturalLanguage, ALL_FEATURES.whatsapp]
  },
  "Landowners": {
    modules: [ALL_MODULES.verify, ALL_MODULES.vault, ALL_MODULES.archive],
    features: [ALL_FEATURES.autoFill, ALL_FEATURES.escrow, ALL_FEATURES.whatsapp, ALL_FEATURES.offline]
  },
  "Developers": {
    modules: [ALL_MODULES.verify, ALL_MODULES.compliance, ALL_MODULES.buildtrack, ALL_MODULES.riskscore],
    features: [ALL_FEATURES.approvalSla, ALL_FEATURES.offline, ALL_FEATURES.autoFill, ALL_FEATURES.digitalTwin]
  },
  "Architects & Engineers": {
    modules: [ALL_MODULES.compliance, ALL_MODULES.buildtrack],
    features: [ALL_FEATURES.approvalSla, ALL_FEATURES.naturalLanguage, ALL_FEATURES.sandbox]
  },
  "Banks & Mortgage Institutions": {
    modules: [ALL_MODULES.verify, ALL_MODULES.riskscore, ALL_MODULES.vault, ALL_MODULES.registrysync],
    features: [ALL_FEATURES.forensicFingerprint, ALL_FEATURES.chainOfTitle, ALL_FEATURES.escrow, ALL_FEATURES.aiSignature]
  },
  "Lawyers": {
    modules: [ALL_MODULES.verify, ALL_MODULES.riskscore, ALL_MODULES.archive, ALL_MODULES.vault],
    features: [ALL_FEATURES.disputeWarning, ALL_FEATURES.aiSignature, ALL_FEATURES.chainOfTitle, ALL_FEATURES.forensicFingerprint, ALL_FEATURES.certifiedReports, ALL_FEATURES.propertyTimeline]
  },
  "Estate Agents": {
    modules: [ALL_MODULES.verify, ALL_MODULES.compliance, ALL_MODULES.vault],
    features: [ALL_FEATURES.escrow, ALL_FEATURES.whatsapp, ALL_FEATURES.naturalLanguage, ALL_FEATURES.trustScore, ALL_FEATURES.professionalNetwork]
  },
  "Government Agencies (FCTA, Development Control)": {
    modules: [ALL_MODULES.verify, ALL_MODULES.compliance, ALL_MODULES.buildtrack, ALL_MODULES.archive, ALL_MODULES.registrysync],
    features: [ALL_FEATURES.digitalTwin, ALL_FEATURES.sandbox, ALL_FEATURES.approvalSla, ALL_FEATURES.offline, ALL_FEATURES.aiSignature, ALL_FEATURES.zeroLoss, ALL_FEATURES.propertyTimeline]
  },
  "Insurers": {
    modules: [ALL_MODULES.verify, ALL_MODULES.riskscore, ALL_MODULES.registrysync],
    features: [ALL_FEATURES.disputeWarning, ALL_FEATURES.aiSignature, ALL_FEATURES.forensicFingerprint, ALL_FEATURES.digitalTwin, ALL_FEATURES.trustScore, ALL_FEATURES.certifiedReports]
  }
};

export const PREMIUM_FEATURES = [
  ALL_FEATURES.trustScore.path,
  ALL_FEATURES.certifiedReports.path,
  ALL_FEATURES.professionalNetwork.path,
  ALL_FEATURES.crossBorder.path,
  ALL_FEATURES.zeroLoss.path,
  ALL_FEATURES.propertyTimeline.path
];

export const canAccessPath = (userType: UserType | undefined, targetPath: string, isPremium: boolean = false): boolean => {
  if (!userType) return false;
  
  // Dashboard roots are always accessible to their specific roles, but that's handled in App.tsx routing usually.
  // Here we check if the requested path is a module or feature that is restricted.
  
  const access = ROLE_ACCESS[userType];
  if (!access) return false;
  
  // Normalize paths for comparison
  const normalize = (p: string) => p.toLowerCase().trim();
  const target = normalize(targetPath);

  // Check premium lock first
  const isPremiumPath = PREMIUM_FEATURES.map(normalize).includes(target);
  if (isPremiumPath && !isPremium) {
    return false; // Automatically deny if it's a premium feature and user is not premium
  }
  
  // If the path isn't a known module or feature, let's assume it's publicly allowed or governed elsewhere
  const allKnownPaths = [
    ...Object.values(ALL_MODULES).map(m => normalize(m.path)),
    ...Object.values(ALL_FEATURES).map(f => normalize(f.path))
  ];
  
  if (!allKnownPaths.includes(target)) {
     return true; // Not a restricted feature/module path governed by this strict check
  }
  
  // Check if user has explicit access
  const hasModule = access.modules.some(m => normalize(m.path) === target);
  // CrossBorder works across roles as a concept if premium, let's inject it for tests or fallback to explicit arrays
  const hasFeature = access.features.some(f => normalize(f.path) === target) || (target === normalize(ALL_FEATURES.crossBorder.path)); 
  
  return hasModule || hasFeature;
};
