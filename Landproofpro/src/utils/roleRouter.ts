import type { UserType } from '../context/AuthContext';

export function getRoleDashboardPath(userType: UserType): string {
  switch (userType) {
    case 'Property Buyers':
      return '/dashboard/buyer';
    case 'Landowners':
      return '/dashboard/landowner';
    case 'Developers':
      return '/dashboard/developer';
    case 'Architects & Engineers':
      return '/dashboard/architect';
    case 'Banks & Mortgage Institutions':
      return '/dashboard/bank';
    case 'Lawyers':
      return '/dashboard/lawyer';
    case 'Estate Agents':
      return '/dashboard/agent';
    case 'Government Agencies (FCTA, Development Control)':
      return '/dashboard/government';
    case 'Insurers':
      return '/dashboard/insurer';
    default:
      return '/dashboard/buyer';
  }
}
