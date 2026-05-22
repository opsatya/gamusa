export interface JWTPayload {
  id: string;
  email: string;
  isSystemAdmin: boolean;
  companyId: string | null;
  roleId: string | null;
  portalId: string | null;
  tokenType: string;
  iat: number;
  exp: number;
}
