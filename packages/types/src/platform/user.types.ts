import type { PortalName } from './portal.types';

export type PlatformUserRole =
  | 'admin'
  | 'user'
  | 'candidate'
  | 'platform_admin';

export interface AuthUser {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  avatarUrl: string | null;
  role: PlatformUserRole;
  permissions: string[];
  companyId: string;
  companySlug: string;
  allowedPortals: PortalName[];
  isPlatformAdmin: boolean;
}
