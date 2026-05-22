/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the status color functions.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 29/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Relative Imports */
// import { ActionIconButtonProps } from '@/components/ActionIconButton';
// import palette from '@/theme/palette';

/**
 * Get status color for applications
 * @param status - Status of the application
 * @returns  | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning' 
 */
export const getStatusColorForApplications = (
  status: string
):
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning' => {
  switch (status) {
    /* Success / Positive */
    case 'Joined':
    case 'Offered':
    case 'Selected':
    case 'Shortlisted':
      return 'success';

    /* Error / Negative */
    case 'Rejected':
    case 'Interviewer - Rejected':
    case 'Rejected - Higher CTC':
    case 'Rejected - Fitment':
    case 'Rejected - No Show':
    case 'No Show':
    case 'Blacklisted':
    case 'Backout - Interview Process':
    case 'Offer Declined':
    case 'Not Responding':
      return 'error';

    /* Warning / On Hold */
    case 'Interviewer - On Hold':
    case 'On Hold':
    case 'Delayed':
    case 'Talent Pool':
      return 'warning';

    /* Info / Interview & Process states */
    case 'New':
    case 'Interview Scheduled':
    case 'Interview Rescheduled':
    case 'Interview in Process':
    case 'Interview Completed':
    case 'Schedule VI':
    case 'Schedule F2F':
    case 'Interviewer - Schedule Final':
      return 'info';

    default:
      return 'primary';
  }
};
/**
 * Get status color for documents
 * @param status - Status of the document
 * @returns Color of the status
 */
export const getStatusColorByApproval = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'APPROVED':
    case 'ACCEPTED':
      return 'success';
    case 'REJECTED':
      return 'error';
    case 'PENDING':
      return 'warning';
    case 'SUBMITTED':
      return 'primary';
    case 'DRAFT':
      return 'secondary';
    case 'CANCELLED':
      return 'warning';
    default:
      return 'info';
  }
};

/**
 * Get background color based on variant
 *
 * @param {string} variant - Color variant
 * @returns {string} Background color string
 */
export const getBackgroundColorForIconButton = (
  variant: any['variant']
): string => {
  switch (variant) {
    case 'primary':
      return 'primary.main';
    case 'secondary':
      return 'info.main';
    case 'error':
      return 'error.main';
    case 'success':
      return 'success.main';
    case 'warning':
      return 'warning.main';
    case 'info':
      return 'info.main';
    default:
      return 'primary.main';
  }
};

/**
 * Get status color by priority
 * @param priority - Priority of the requisition
 * @returns Color of the priority
 */
export const getStatusColorByPriority = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'error';
    case 'MEDIUM':
      return 'warning';
    case 'LOW':
      return 'success';
    default:
      return 'primary';
  }
};

/**
 * Get background color based on notification type
 * @param type - Type of the notification
 * @returns Background color of the notification
 */
export const getNotificationColorByType = (type: string, palette: any) => {
  switch (type) {
    case 'APPLICATION_STATUS_UPDATED':
      return {
        background: palette.light.error.light,
        icon: palette.light.error.main,
      };
    case 'INTERVIEW_SCHEDULED':
      return {
        background: palette.light.info.light,
        icon: palette.light.grey[200],
      };
    case 'UNDER_REVIEW':
    case 'IN_REVIEW':
      return {
        background: palette.light.warning.light,
        icon: palette.light.warning.main,
      };
    case 'HIRED':
      return {
        background: palette.light.success.light,
        icon: palette.light.success.main,
      };
    case 'REJECTED':
      return {
        background: palette.light.error.light,
        icon: palette.light.error.main,
      };
    default:
      return {
        background: palette.light.error.light,
        icon: palette.light.error.main,
      };
  }
};

/**
 * Get status color by job status
 * @param status - Status of the job
 * @returns Color of the status
 */
export const getStatusColorByJobStatus = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'success';
    case 'closed':
      return 'error';
    case 'unactive':
      return 'warning';
    default:
      return 'primary';
  }
};

/**
 * Get status color for interviews
 * @param status - Status of the interview
 * @returns Color of the status
 */
export const getStatusColorForInterviews = (status: string) => {
  switch (status?.toUpperCase()) {
    case 'COMPLETED':
    case 'LOW':
      return 'success';
    case 'CANCELLED':
    case 'NO-SHOW':
    case 'NO SHOW':
      return 'error';
    case 'SCHEDULED':
      return 'warning';
    case 'RESCHEDULED':
      return 'secondary';
    default:
      return 'primary';
  }
};
/**
 * Returns theme-based color key for company active/inactive status.
 * Use with alpha(theme.palette[color].light, 0.2) for background.
 */
export const getCompanyStatusColors = (isActive: boolean) => ({
  bgColor: isActive ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.12)',
  textColor: isActive ? '#15803D' : '#B91C1C',
});

export const PORTAL_COLORS: Record<string, { bg: string; color: string }> = {
  Recruitment: { bg: 'rgba(99,102,241,0.12)', color: '#6366F1' },
  CRM: { bg: 'rgba(16,185,129,0.12)', color: '#10B981' },
  LMS: { bg: 'rgba(245,158,11,0.12)', color: '#F59E0B' },
  HRMS: { bg: 'rgba(239,68,68,0.12)', color: '#EF4444' },
  Candidate: { bg: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
  Default: { bg: 'rgba(107,114,128,0.12)', color: '#6B7280' },
};
