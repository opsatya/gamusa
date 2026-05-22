export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string;
  isActive: boolean;
}

export interface CompanyBranding {
  logoUrl: string | null;
  primaryColor: string;
  companyName: string;
}
