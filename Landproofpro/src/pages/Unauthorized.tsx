import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)', color: 'white', textAlign: 'center' }}>
      <ShieldAlert size={64} style={{ color: 'var(--danger)', marginBottom: '24px' }} />
      <h1 className="display-3" style={{ marginBottom: '16px' }}>Access Denied</h1>
      <p className="body-lg" style={{ color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '32px' }}>
        Your current role does not have permission to access this module or feature. 
        Please contact your administrator if you believe this is an error.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} /> Return to Dashboard
      </Link>
    </div>
  );
}
