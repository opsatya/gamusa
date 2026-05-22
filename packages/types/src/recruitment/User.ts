export interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  gender: string | null;
  birthDate: string | null;
  address: string | null;
  company: UserCompany | null;
  role: UserRole | null;
  isSystemAdmin?: boolean;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  unreadNotifications?: boolean;
  portalId?: string | null;
}

export interface UserCompany {
  id: string;
  name: string;
  description: string | null;
  displayName: string;
  slug: string;
  logo: string | null;
  logoUrl?: string | null;
}

export interface UserRole {
  id: number;
  name: string;
}
