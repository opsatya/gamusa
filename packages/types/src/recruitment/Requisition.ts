export interface Requisition {
  id: number;
  jobRole: string;
  department: string;
  requisitionId: string;
  date: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  comments?: string;
  mdDecision: 'APPROVED' | 'REJECTED' | 'PENDING';
}
