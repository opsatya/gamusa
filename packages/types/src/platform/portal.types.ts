export type PortalName =
  | 'recruitment'
  | 'crm'
  | 'erp'
  | 'hrms'
  | 'projects'
  | 'admin';

export interface PortalConfig {
  name: PortalName;
  displayName: string;
  basePath: string;
  icon: string;
}
