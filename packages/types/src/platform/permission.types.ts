export interface Permission {
  id: string;
  namespace: string;
  action: string;
  description: string;
}

export interface PlatformRole {
  id: string;
  name: string;
  companyId: string;
  permissions: string[];
}
