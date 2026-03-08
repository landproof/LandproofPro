import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

export default function DashboardLayout({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: (v: boolean) => void }) {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  return (
    <div className={`dashboard-layout ${isSidebarHidden ? 'sidebar-hidden' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isHiddenOnDesktop={isSidebarHidden} />
      
      <button 
        className="desktop-sidebar-toggle"
        onClick={() => setIsSidebarHidden(!isSidebarHidden)}
        title={isSidebarHidden ? "Show Sidebar" : "Hide Sidebar"}
      >
        {isSidebarHidden ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
}
