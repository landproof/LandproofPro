import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_ACCESS, PREMIUM_FEATURES } from '../utils/accessControl';
import { LayoutDashboard, X, Star, Zap, ShieldCheck } from 'lucide-react';
import { getRoleDashboardPath } from '../utils/roleRouter';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isHiddenOnDesktop?: boolean;
}

export default function Sidebar({ isOpen, onClose, isHiddenOnDesktop }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const access = ROLE_ACCESS[user.userType];
  if (!access) return null;

  const dashboardUrl = getRoleDashboardPath(user.userType);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''} ${isHiddenOnDesktop ? 'hidden-desktop' : ''}`}>
        <div className="sidebar__header">
          <Link to="/" onClick={onClose} className="sidebar__logo">
            LandProof
          </Link>
          <button className="sidebar__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="sidebar__user">
          <div className="sidebar__user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar__user-info">
            <div className="sidebar__user-name">{user.name}</div>
            <div className="sidebar__user-role">{user.userType}</div>
          </div>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__section">
            <div className="sidebar__section-title">Overview</div>
            <Link 
              to={dashboardUrl} 
              className={`sidebar__link ${isActive(dashboardUrl) ? 'active' : ''}`}
              onClick={onClose}
            >
              <LayoutDashboard size={18} /> Role Dashboard
            </Link>
          </div>

          {access.modules.length > 0 && (
            <div className="sidebar__section">
              <div className="sidebar__section-title">Core Modules</div>
              {access.modules.map(mod => (
                <Link 
                  key={mod.path}
                  to={mod.path}
                  className={`sidebar__link ${isActive(mod.path) ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <Zap size={16} style={{ color: 'var(--emerald)' }} /> {mod.name}
                </Link>
              ))}
            </div>
          )}

          {access.features.length > 0 && (
            <div className="sidebar__section">
              <div className="sidebar__section-title">Advanced Features</div>
              {access.features.map(feat => {
                const isPremium = PREMIUM_FEATURES.includes(feat.path);
                return (
                  <Link 
                    key={feat.path}
                    to={feat.path}
                    className={`sidebar__link ${isActive(feat.path) ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <Star size={16} style={{ color: 'var(--gold)' }} /> 
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                      {feat.name}
                      {isPremium && <ShieldCheck size={12} style={{ color: 'var(--gold)', marginLeft: 'auto' }} />}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
