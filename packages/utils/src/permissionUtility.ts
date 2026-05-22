/**
 * Permission namespaces:
 * platform.*  -> Super Admin (SaaS level)
 * operator.*  -> Tour Operator (Company level)
 */

// import { PAGE_ADMIN_DASHBOARD } from '@/routes/paths';
// import { capitalize } from 'lodash';

export const PLATFORM_PERMISSIONS = {
  DASHBOARD_VIEW: 'platform.dashboard.view',

  OPERATORS_VIEW: 'platform.operators.view',
  OPERATORS_MANAGE: 'platform.operators.manage',

  PLANS_VIEW: 'platform.plans.view',
  PLANS_MANAGE: 'platform.plans.manage',

  COMPANY_VIEW: 'company.view',
  COMPANY_MANAGE: 'company.manage',

  SUBSCRIPTIONS_VIEW: 'platform.subscriptions.view',
  SUBSCRIPTIONS_MANAGE: 'platform.subscriptions.manage',

  FAQ_VIEW: 'platform.faq.view',
  FAQ_MANAGE: 'platform.faq.manage',

  REVIEWS_MANAGE: 'platform.reviews.manage',

  USERS_VIEW: 'platform.users.view',
  USERS_MANAGE: 'platform.users.manage',

  ROLES_MANAGE: 'platform.roles.manage',

  INTERVIEWS_VIEW: 'recruitment.interviews.view',
  INTERVIEWS_MANAGE: 'recruitment.interviews.manage',
  INTERVIEWS_VERIFY: 'recruitment.interviews.verify',
  INTERVIEW_VIEW_SELF: 'recruitment.interviews.view.self',
};

export const RECRUITMENT_PERMISSIONS = {
  PROFILE_VIEW: 'user.profile.view',
  PROFILE_MANAGE: 'user.profile.manage',

  // Roles
  ROLES_VIEW: 'recruitment.roles.view',
  ROLES_MANAGE: 'recruitment.roles.manage',

  // Users
  USERS_VIEW: 'recruitment.users.view',
  USERS_MANAGE: 'recruitment.users.manage',

  // Dashboard
  DASHBOARD_VIEW: 'recruitment.dashboard.view',

  // Departments
  DEPARTMENTS_VIEW: 'recruitment.departments.view',
  DEPARTMENTS_MANAGE: 'recruitment.departments.manage',

  // Teams
  TEAMS_VIEW: 'recruitment.teams.view',
  TEAMS_MANAGE: 'recruitment.teams.manage',

  // Requisitions
  REQUISITIONS_VIEW: 'recruitment.requisitions.view',
  REQUISITIONS_VIEW_SELF: 'recruitment.requisitions.view.self',
  REQUISITIONS_MANAGE: 'recruitment.requisitions.manage',
  REQUISITIONS_VERIFY: 'recruitment.requisitions.verify',

  // Jobs
  JOBS_VIEW: 'recruitment.jobs.view',
  JOBS_MANAGE: 'recruitment.jobs.manage',

  // Raw Applications (status = New)
  APPLICATIONS_RAW_VIEW: 'recruitment.raw.applications.view',
  APPLICATIONS_RAW_VIEW_SELF: 'recruitment.raw.applications.view.self',
  APPLICATIONS_RAW_MANAGE: 'recruitment.raw.applications.manage',
  APPLICATIONS_RAW_VIEW_LIMITED: 'recruitment.raw.applications.view.limited',
  // Screened Applications (status != New)
  APPLICATIONS_SCREENED_VIEW: 'recruitment.screened.applications.view',
  APPLICATIONS_SCREENED_VIEW_SELF:
    'recruitment.screened.applications.view.self',
  APPLICATIONS_SCREENED_MANAGE: 'recruitment.screened.applications.manage',
  APPLICATIONS_SCREENED_VIEW_LIMITED:
    'recruitment.screened.applications.view.limited',
  // Application Activity
  APPLICATIONS_ACTIVITY_VIEW: 'recruitment.screened.applications.activity.view',

  // Interviews
  INTERVIEWS_VIEW: 'recruitment.interviews.view',
  INTERVIEWS_VIEW_SELF: 'recruitment.interviews.view.self',
  INTERVIEWS_MANAGE: 'recruitment.interviews.manage',
  INTERVIEWS_VERIFY: 'recruitment.interviews.verify',
  INTERVIEWS_ASSESS: 'recruitment.interviews.assess',

  // Offers
  OFFERS_VIEW: 'recruitment.offers.view',
  OFFERS_MANAGE: 'recruitment.offers.manage',

  // Reports
  REPORTS_VIEW: 'recruitment.reports.view',

  // Documents
  DOCUMENTS_VIEW: 'recruitment.documents.view',
  DOCUMENTS_VIEW_SELF: 'recruitment.documents.view.self',
  DOCUMENTS_MANAGE: 'recruitment.documents.manage',

  // Candidate
  CANDIDATE_PROFILE_MANAGE: 'candidate.profile.manage',
  CANDIDATE_APPLICATION_VIEW: 'candidate.application.view',
  CANDIDATE_APPLICATION_MANAGE: 'candidate.application.manage',

  // Onboarding
  ONBOARDING_VIEW: 'recruitment.onboarding.view',
  ONBOARDING_MANAGE: 'recruitment.onboarding.manage',
} as const;

export const INTRANET_PERMISSIONS = {
  DASHBOARD_VIEW: 'intranet.dashboard.view',

  // Home
  HOME_VIEW: 'intranet.home.view',

  COMPANY_VIEW: 'intranet.company.view',
  COMPANY_POLICIES_VIEW: 'intranet.company.policies.view',
  COMPANY_POLICIES_MANAGE: 'intranet.company.policies.manage',

  COMMUNICATIONS_VIEW: 'intranet.communications.view',
  COMMUNICATIONS_MANAGE: 'intranet.communications.manage',
  COMMUNICATIONS_APPROVE: 'intranet.communications.approve',

  EVENTS_VIEW: 'intranet.events.view',
  EVENTS_MANAGE: 'intranet.events.manage',

  IDEAS_VIEW: 'intranet.ideas.view',
  IDEAS_MANAGE: 'intranet.ideas.manage',

  RECOGNITION_VIEW: 'intranet.recognition.view',
  RECOGNITION_MANAGE: 'intranet.recognition.manage',
  RECOGNITIONS_MANAGE: 'intranet.recognitions.manage',

  MERCHANDISE_VIEW: 'intranet.merchandise.view',
  MERCHANDISE_MANAGE: 'intranet.merchandise.manage',

  FEEDBACK_VIEW: 'intranet.feedback.view',
  FEEDBACK_MANAGE: 'intranet.feedback.manage',

  ATTENDANCE_VIEW: 'intranet.attendance.view',
  ATTENDANCE_MANAGE: 'intranet.attendance.manage',
  ATTENDANCE_TEAM_VIEW: 'intranet.team.attendance.view',

  SKILLS_VIEW: 'intranet.skills.view',
  SKILLS_MANAGE: 'intranet.skills.manage',

  ONBOARDING_VIEW: 'intranet.onboarding.view',
  ONBOARDING_MANAGE: 'intranet.onboarding.manage',

  LEAVES_VIEW: 'intranet.leaves.view',
  LEAVES_APPLY: 'intranet.leaves.apply',
  LEAVES_MANAGE: 'intranet.leaves.manage',
  LEAVES_APPROVE: 'intranet.leaves.approve',
  LEAVES_TEAM_VIEW: 'intranet.team.leaves.view',

  WFH_VIEW: 'intranet.wfh.view',
  WFH_MANAGE: 'intranet.wfh.manage',
  WFH_APPROVE: 'intranet.wfh.approve',
  WFH_TEAM_VIEW: 'intranet.team.wfh.view',

  IT_VIEW: 'intranet.it.view',
  IT_MANAGE: 'intranet.it.manage',

  REGULARISATION_VIEW: 'intranet.regularisation.view',
  REGULARISATION_MANAGE: 'intranet.regularisation.manage',
  REGULARISATION_APPROVE: 'intranet.regularisation.approve',
  TEAM_REGULARISATION_VIEW: 'intranet.team.regularisation.view',

  IT_TICKETS_VIEW: 'intranet.it.tickets.view',
  IT_TICKETS_MANAGE: 'intranet.it.tickets.manage',

  IT_ASSETS_VIEW: 'intranet.it.assets.view',
  IT_ASSETS_MANAGE: 'intranet.it.assets.manage',

  IT_COMPLIANCE_VIEW: 'intranet.it.compliance.view',
  IT_COMPLIANCE_MANAGE: 'intranet.it.compliance.manage',

  IT_POLICIES_VIEW: 'intranet.it.policies.view',
  IT_POLICIES_MANAGE: 'intranet.it.policies.manage',

  IT_ONBOARDING_VIEW: 'intranet.it.onboarding.view',
  IT_ONBOARDING_MANAGE: 'intranet.it.onboarding.manage',

  IT_SECURITY_VIEW: 'intranet.it.security.view',
  IT_SECURITY_MANAGE: 'intranet.it.security.manage',

  IT_SOFTWARE_VIEW: 'intranet.it.software.view',
  IT_SOFTWARE_MANAGE: 'intranet.it.software.manage',

  IT_REQUEST_VIEW: 'intranet.it.software.request.view',
  IT_REQUEST_MANAGE: 'intranet.it.software.request.manage',

  IT_REPORTS_VIEW: 'intranet.it.reports.view',

  TIMESHEETS_VIEW: 'intranet.timesheets.view',
  TIMESHEETS_MANAGE: 'intranet.timesheets.manage',

  CLAIMS_VIEW: 'intranet.claims.view',
  CLAIMS_VIEW_COMPANY: 'intranet.claims.view.company',
  CLAIMS_MANAGE: 'intranet.claims.manage',
  CLAIMS_VERIFY_MANAGER: 'intranet.claims.verify.manager',
  CLAIMS_VERIFY_FINANCE: 'intranet.claims.verify.finance',
  CLAIMS_CATEGORY_MANAGE: 'intranet.claims.category.manage',

  KRA_VIEW_SELF: 'intranet.kra.view.self',
  KRA_MANAGE_SELF: 'intranet.kra.manage.self',
  KRA_VIEW_TEAM: 'intranet.kra.view.team',
  KRA_VIEW_COMPANY: 'intranet.kra.view.company',
  KRA_MANAGE: 'intranet.kra.manage',
  KRA_VERIFY: 'intranet.kra.verify',
  KRA_CYCLE_MANAGE: 'intranet.kra.cycle.manage',
  // Deprecated aliases kept temporarily to avoid breaking older screens
  KRA_VIEW: 'intranet.kra.view.self',

  PROFILE_VIEW: 'intranet.profile.view',
  PROFILE_MANAGE: 'intranet.profile.manage',

  HELP_DESK_VIEW: 'intranet.helpdesk.view',
  HELP_DESK_MANAGE: 'intranet.helpdesk.manage',

  ADMIN_VIEW: 'intranet.admin.view',
  ADMIN_REPORTS: 'intranet.admin.reports',

  // Organization
  DEPARTMENTS_VIEW: 'intranet.departments.view',
  DEPARTMENTS_MANAGE: 'intranet.departments.manage',
  DESIGNATIONS_VIEW: 'intranet.designations.view',
  DESIGNATIONS_MANAGE: 'intranet.designations.manage',
  TEAMS_VIEW: 'intranet.teams.view',
  TEAMS_MANAGE: 'intranet.teams.manage',
  LOCATIONS_VIEW: 'intranet.locations.view',
  LOCATIONS_MANAGE: 'intranet.locations.manage',
  ROLES_VIEW: 'intranet.roles.view',
  ROLES_MANAGE: 'intranet.roles.manage',

  // Attendance Admin
  SHIFTS_VIEW: 'intranet.shifts.view',
  SHIFTS_MANAGE: 'intranet.shifts.manage',
  HOLIDAYS_VIEW: 'intranet.holidays.view',
  HOLIDAYS_MANAGE: 'intranet.holidays.manage',
  LEAVE_TYPES_MANAGE: 'intranet.leave-types.manage',

  // Employee Management
  EMPLOYEES_VIEW: 'intranet.employees.view',
  EMPLOYEES_MANAGE: 'intranet.employees.manage',
  EMPLOYEES_TEAM_VIEW: 'intranet.team.employees.view',

  // Documents
  DOCUMENTS_VIEW: 'intranet.documents.view',
  DOCUMENTS_MANAGE: 'intranet.documents.manage',

  // Timeline
  TIMELINE_VIEW: 'intranet.timeline.view',
  TIMELINE_MANAGE: 'intranet.timeline.manage',

  // Training
  TRAINING_VIEW_COMPANY: 'intranet.training.view.company',
  TRAINING_MANAGE: 'intranet.training.manage',

  // Company Info
  COMPANY_INFO_VIEW: 'intranet.company-info.view',
  COMPANY_INFO_MANAGE: 'intranet.company-info.manage',

  // HR Policies
  HR_POLICIES_VIEW: 'intranet.hr.policies.view',
  HR_POLICIES_MANAGE: 'intranet.hr.policies.manage',

  // POSH
  POSH_VIEW: 'intranet.posh.view',
  POSH_MANAGE: 'intranet.posh.manage',

  // Category Management
  REGULARISATION_TYPE_VIEW: 'intranet.regularisation_type.view',
  REGULARISATION_TYPE_MANAGE: 'intranet.regularisation_type.manage',
  DOCUMENT_CATEGORIES_VIEW: 'intranet.document_categories.view',
  DOCUMENT_CATEGORIES_MANAGE: 'intranet.document_categories.manage',
  HR_TICKET_CATEGORIES_VIEW: 'intranet.helpdesk.hr_category.view',
  HR_TICKET_CATEGORIES_MANAGE: 'intranet.helpdesk.hr_category.manage',
  IT_TICKET_CATEGORIES_VIEW: 'intranet.helpdesk.it_category.view',
  IT_TICKET_CATEGORIES_MANAGE: 'intranet.helpdesk.it_category.manage',
  POSH_CATEGORIES_VIEW: 'intranet.posh.categories.view',
  POSH_CATEGORIES_MANAGE: 'intranet.posh.categories.manage',
  COMMUNICATION_CATEGORIES_VIEW: 'intranet.communications.categories.view',
  COMMUNICATION_CATEGORIES_MANAGE: 'intranet.communications.categories.manage',
  EVENT_CATEGORIES_VIEW: 'intranet.events.categories.view',
  EVENT_CATEGORIES_MANAGE: 'intranet.events.categories.manage',
  IDEA_CATEGORIES_VIEW: 'intranet.ideas.categories.view',
  IDEA_CATEGORIES_MANAGE: 'intranet.ideas.categories.manage',
  FEEDBACK_TYPES_VIEW: 'intranet.feedback.types.view',
  FEEDBACK_TYPES_MANAGE: 'intranet.feedback.types.manage',
  MERCHANDISE_CATEGORIES_VIEW: 'intranet.merchandise.categories.view',
  MERCHANDISE_CATEGORIES_MANAGE: 'intranet.merchandise.categories.manage',
  HR_POLICY_CATEGORIES_VIEW: 'intranet.hr.policy-categories.view',
  HR_POLICY_CATEGORIES_MANAGE: 'intranet.hr.policy-categories.manage',
  ROLE_LEVELS_VIEW: 'intranet.role_levels.view',
  ROLE_LEVELS_MANAGE: 'intranet.role_levels.manage',
  IT_POLICY_CATEGORIES_VIEW: 'intranet.it.policy-categories.view',
  IT_POLICY_CATEGORIES_MANAGE: 'intranet.it.policy-categories.manage',
  COMMUNICATION_TEMPLATES_VIEW: 'intranet.communications.templates.view',
  COMMUNICATION_TEMPLATES_MANAGE: 'intranet.communications.templates.manage',
} as const;

export const ALL_RAW_APPLICATION_PERMISSIONS = [
  RECRUITMENT_PERMISSIONS.APPLICATIONS_RAW_VIEW,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_RAW_VIEW_SELF,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_RAW_VIEW_LIMITED,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_RAW_MANAGE,
] as const;

export const ALL_SCREENED_APPLICATION_PERMISSIONS = [
  RECRUITMENT_PERMISSIONS.APPLICATIONS_SCREENED_VIEW,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_SCREENED_VIEW_SELF,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_SCREENED_VIEW_LIMITED,
  RECRUITMENT_PERMISSIONS.APPLICATIONS_SCREENED_MANAGE,
] as const;

export const ALL_APPLICATION_PERMISSIONS = [
  ...ALL_RAW_APPLICATION_PERMISSIONS,
  ...ALL_SCREENED_APPLICATION_PERMISSIONS,
] as const;

export const ALL_JOB_VIEW_PERMISSIONS = [
  RECRUITMENT_PERMISSIONS.JOBS_VIEW,
] as const;

export const USER_PERMISSIONS = RECRUITMENT_PERMISSIONS;

export const isPlatformPermission = (permission: string) =>
  permission.startsWith('platform.');

export const isOperatorPermission = (permission: string) =>
  permission.startsWith('operator.');

export const isPermissionAllowed = (
  userPermissions: string[],
  ...permissions: string[]
) => permissions.some((permission) => userPermissions?.includes(permission));

// // Helper function to get the first available route
// export const getFirstAvailableRoute = (permissions: string[]): string => {

//     if (!permissions || permissions.length === 0) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.profile.absolutePath;
//     }

//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.DASHBOARD_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.root.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.TOURS_VIEW, OPERATOR_PERMISSIONS.TOURS_MANAGE)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.tours.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.BOOKINGS_VIEW, OPERATOR_PERMISSIONS.BOOKINGS_MANAGE)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.bookings.absolutePath;
//     }
//     // Check inventory sub-items
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.TOURS_MANAGE, OPERATOR_PERMISSIONS.TOURS_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.inventory.tours.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.DRIVERS_MANAGE, OPERATOR_PERMISSIONS.DRIVERS_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.inventory.drivers.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.GUIDES_MANAGE, OPERATOR_PERMISSIONS.GUIDES_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.inventory.tourGuides.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.VEHICLES_MANAGE, OPERATOR_PERMISSIONS.VEHICLES_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.inventory.vehicles.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.DIGITAL_GUIDES_MANAGE, OPERATOR_PERMISSIONS.DIGITAL_GUIDES_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.inventory.digitalGuides.absolutePath;
//     }
//     if (isPermissionAllowed(permissions, OPERATOR_PERMISSIONS.REVENUE_VIEW)) {
//         return PAGE_TOUR_OPERATOR_DASHBOARD.analytics.absolutePath;
//     }

//     // Fallback to profile (always accessible)
//     return PAGE_TOUR_OPERATOR_DASHBOARD.profile.absolutePath;
// };

// /**
//  * Get the first available route for admin based on permissions
//  * @param permissions - Array of permission strings
//  * @returns First available route path
//  */
// export const getFirstAvailableAdminRoute = (permissions: string[]): string => {

//     if (!permissions || permissions.length === 0) {
//         return PAGE_ADMIN_DASHBOARD.profile.absolutePath;
//     }

//     // Dashboard
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.DASHBOARD_VIEW)) {
//         return PAGE_ADMIN_DASHBOARD.root.absolutePath;
//     }

//     // Tour Operators
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.OPERATORS_VIEW, PLATFORM_PERMISSIONS.OPERATORS_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.tourOperators.absolutePath;
//     }

//     // Tours
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.OPERATORS_VIEW, PLATFORM_PERMISSIONS.OPERATORS_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.tours.absolutePath;
//     }

//     // Billing
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.SUBSCRIPTIONS_VIEW, PLATFORM_PERMISSIONS.SUBSCRIPTIONS_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.billing.absolutePath;
//     }

//     // Analytics
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.DASHBOARD_VIEW)) {
//         return PAGE_ADMIN_DASHBOARD.analytics.absolutePath;
//     }

//     // Settings - Check sub-items
//     // Subscription Plans
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.PLANS_VIEW, PLATFORM_PERMISSIONS.PLANS_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.settings.subscriptionPlans.absolutePath;
//     }

//     // Help Center
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.FAQ_VIEW, PLATFORM_PERMISSIONS.FAQ_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.settings.helpCenter.absolutePath;
//     }

//     // Team and Access
//     if (isPermissionAllowed(permissions, PLATFORM_PERMISSIONS.USERS_VIEW, PLATFORM_PERMISSIONS.USERS_MANAGE, PLATFORM_PERMISSIONS.ROLES_MANAGE)) {
//         return PAGE_ADMIN_DASHBOARD.settings.teamAndAccess.absolutePath;
//     }

//     // Fallback to profile (always accessible)
//     return PAGE_ADMIN_DASHBOARD.profile.absolutePath;
// };

// export const formatPermissionName = (permission: string) => {
//     if (!permission) return "";

//     const permissionName = permission?.split(".")?.map((word) => capitalize(word))?.join(" ");

//     return permissionName;
// }
