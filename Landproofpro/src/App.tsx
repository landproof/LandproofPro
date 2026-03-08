import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Home from './pages/Home';
import VerifyDashboard from './pages/VerifyDashboard';
import ComplianceDashboard from './pages/ComplianceDashboard';
import BuildTrackDashboard from './pages/BuildTrackDashboard';
import ArchiveDashboard from './pages/ArchiveDashboard';
import RiskScoreDashboard from './pages/RiskScoreDashboard';
import VaultDashboard from './pages/VaultDashboard';
import RegistrySyncDashboard from './pages/RegistrySyncDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import Unauthorized from './pages/Unauthorized';

// Role Dashboards
import BuyerDashboard from './pages/BuyerDashboard';
import LandownerDashboard from './pages/LandownerDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import ArchitectEngineerDashboard from './pages/ArchitectEngineerDashboard';
import BankDashboard from './pages/BankDashboard';
import LawyerDashboard from './pages/LawyerDashboard';
import EstateAgentDashboard from './pages/EstateAgentDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import InsurerDashboard from './pages/InsurerDashboard';

// Feature Pages
import ChainOfTitle from './pages/features/ChainOfTitle';
import ForensicFingerprint from './pages/features/ForensicFingerprint';
import AISignatureIndex from './pages/features/AISignatureIndex';
import DisputeWarning from './pages/features/DisputeWarning';
import AutoFillApps from './pages/features/AutoFillApps';
import NaturalLanguage from './pages/features/NaturalLanguage';
import DigitalTwin from './pages/features/DigitalTwin';
import ApprovalSLA from './pages/features/ApprovalSLA';
import RegulatorySandbox from './pages/features/RegulatorySandbox';
import EscrowVerification from './pages/features/EscrowVerification';
import WhatsAppInterface from './pages/features/WhatsAppInterface';
import OfflineCapture from './pages/features/OfflineCapture';

// Premium Features
import PropertyTrustScore from './pages/features/PropertyTrustScore';
import CertifiedReports from './pages/features/CertifiedReports';
import ProfessionalNetwork from './pages/features/ProfessionalNetwork';
import CrossBorder from './pages/features/CrossBorder';
import ZeroLoss from './pages/features/ZeroLoss';
import PropertyTimeline from './pages/features/PropertyTimeline';

import { AuthProvider } from './context/AuthContext';
import './styles/global.css';

const P = ProtectedRoute;

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Application Dashboard Layout (Protected) */}
            <Route element={<P><DashboardLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} /></P>}>
              
              {/* Core Modules */}
              <Route path="/verify" element={<VerifyDashboard />} />
              <Route path="/compliance" element={<ComplianceDashboard />} />
              <Route path="/buildtrack" element={<BuildTrackDashboard />} />
              <Route path="/archive" element={<ArchiveDashboard />} />
              <Route path="/riskscore" element={<RiskScoreDashboard />} />
              <Route path="/vault" element={<VaultDashboard />} />
              <Route path="/registrysync" element={<RegistrySyncDashboard />} />

              {/* Role Dashboards */}
              <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
              <Route path="/dashboard/landowner" element={<LandownerDashboard />} />
              <Route path="/dashboard/developer" element={<DeveloperDashboard />} />
              <Route path="/dashboard/architect" element={<ArchitectEngineerDashboard />} />
              <Route path="/dashboard/bank" element={<BankDashboard />} />
              <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
              <Route path="/dashboard/agent" element={<EstateAgentDashboard />} />
              <Route path="/dashboard/government" element={<GovernmentDashboard />} />
              <Route path="/dashboard/insurer" element={<InsurerDashboard />} />

              {/* Feature Pages */}
              <Route path="/features/chain-of-title" element={<ChainOfTitle />} />
              <Route path="/features/forensic-fingerprint" element={<ForensicFingerprint />} />
              <Route path="/features/ai-signature" element={<AISignatureIndex />} />
              <Route path="/features/dispute-warning" element={<DisputeWarning />} />
              <Route path="/features/auto-fill" element={<AutoFillApps />} />
              <Route path="/features/ask-landproof" element={<NaturalLanguage />} />
              <Route path="/features/digital-twin" element={<DigitalTwin />} />
              <Route path="/features/approval-sla" element={<ApprovalSLA />} />
              <Route path="/features/regulatory-sandbox" element={<RegulatorySandbox />} />
              <Route path="/features/escrow" element={<EscrowVerification />} />
              <Route path="/features/whatsapp" element={<WhatsAppInterface />} />
              <Route path="/features/offline" element={<OfflineCapture />} />
              
              {/* Premium Features */}
              <Route path="/features/trust-score" element={<PropertyTrustScore />} />
              <Route path="/features/certified-reports" element={<CertifiedReports />} />
              <Route path="/features/professional-network" element={<ProfessionalNetwork />} />
              <Route path="/features/cross-border" element={<CrossBorder />} />
              <Route path="/features/zero-loss" element={<ZeroLoss />} />
              <Route path="/features/property-timeline" element={<PropertyTimeline />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
