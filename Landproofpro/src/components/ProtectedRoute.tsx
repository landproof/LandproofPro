import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';
import { canAccessPath, PREMIUM_FEATURES } from '../utils/accessControl';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check RBAC
  if (!canAccessPath(user?.userType, location.pathname, user?.isPremium)) {
    const normalize = (p: string) => p.toLowerCase().trim();
    const isPremiumPath = PREMIUM_FEATURES.map(normalize).includes(normalize(location.pathname));
    
    if (isPremiumPath && !user?.isPremium) {
      return <Navigate to="/premium-upgrade" replace />;
    }
    
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
