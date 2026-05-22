# Lektus — Constants & Types Reference

> **Last updated:** 2026-03-08  
> **Covers:** Where types live, appConstant.ts structure, permission strings, route paths, form naming  
> **Who should read it:** Every developer adding new features, types, or constants

---

## 1. Where Do Types Live?

This is the single most important rule for types. Getting it wrong causes circular import errors.

| Type category                                          | Where it lives                         | Import from                        |
| ------------------------------------------------------ | -------------------------------------- | ---------------------------------- |
| Platform-level entities (User, Company, Role, JWT)     | `packages/types/src/platform/`         | `@lektus/types`                    |
| Shared recruitment entities used across UI package     | `packages/types/src/recruitment/`      | `@lektus/types`                    |
| Domain model for one portal (JobItem, RequisitionItem) | `apps/[portal]/src/models/[Entity].ts` | `@/models`                         |
| Service payload/params shapes                          | `apps/[portal]/src/models/[Entity].ts` | `@/models`                         |
| Component Props interface                              | Same file as component                 | Direct import or from `@lektus/ui` |
| Auth context types                                     | `packages/auth/src/context/`           | `@lektus/auth` (internal)          |

### Decision Table: `@lektus/types` vs `apps/[portal]/src/models/`

| Question                                                                   | Answer → Put in `@lektus/types` | Answer → Put in `apps/[portal]/src/models/` |
| -------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------- |
| Is this type about a _user_, _company_, _portal_, _permission_, or _JWT_?  | Yes                             | No                                          |
| Is this type needed by more than one portal?                               | Yes                             | No                                          |
| Is this type needed by `packages/ui`, `packages/auth`, or another package? | Yes                             | No                                          |
| Is this a CRUD payload shape for one portal's feature?                     | No                              | Yes                                         |
| Is this a list params object (page, limit, search, filters)?               | No                              | Yes                                         |
| Is this an entity returned by one portal's REST endpoint?                  | No                              | Yes                                         |

---

## 2. @lektus/types — Complete Exported Types

### Platform Types (`platform/user.types.ts`)

```typescript
interface UserEntity {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profilePhoto: string | null;
  gender: string | null;
  address: string | null;
  company: UserCompany | null;
  role: UserRole;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  isActive: boolean;
  unreadNotifications?: boolean;
}

interface UserCompany {
  id: string;
  name: string;
  description: string | null;
  displayName: string;
  slug: string;
  logo: string | null;
  logoUrl?: string | null;
}

interface UserRole {
  id: number;
  name: string;
}
```

### Platform Types (`platform/company.types.ts`)

```typescript
interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string; // hex color string for tenant branding
  isActive: boolean;
}

interface CompanyBranding {
  logoUrl: string | null;
  primaryColor: string;
  companyName: string;
}
```

### Platform Types (`platform/portal.types.ts`)

```typescript
type PortalName = 'recruitment' | 'crm' | 'erp' | 'hrms' | 'projects' | 'admin';

interface PortalConfig {
  name: PortalName;
  displayName: string;
  basePath: string;
  icon: string;
}
```

### Platform Types (`platform/auth.types.ts`)

```typescript
interface JWTPayload {
  userId: string;
  companyId: string;
  companySlug: string;
  roleId: string;
  allowedPortals: PortalName[];
  isPlatformAdmin: boolean;
  iat: number; // issued at (Unix seconds)
  exp: number; // expires at (Unix seconds)
}
```

### Platform Types (`platform/permission.types.ts`)

```typescript
interface Permission {
  id: string;
  namespace: string;
  action: string;
  description: string;
}

interface PlatformRole {
  id: string;
  name: string;
  companyId: string;
  permissions: string[]; // array of permission strings
}
```

---

## 3. apps/recruitment/src/models — Domain Models

### Model Naming Convention

| File                   | Entity prefix       | Example interface names                                             |
| ---------------------- | ------------------- | ------------------------------------------------------------------- |
| `Application.ts`       | `Application`       | `ApplicationItem`, `ListApplicationsParams`                         |
| `Document.ts`          | `Document`          | `DocumentItem`, `ListDocumentsParams`                               |
| `Job.ts`               | `Job`               | `JobItem`, `ListJobsParams`, `CreateJobPayload`, `UpdateJobPayload` |
| `Notification.ts`      | `Notification`      | `NotificationItem`                                                  |
| `Requisition.ts`       | `Requisition`       | `RequisitionItem`, `ListRequisitionsParams`                         |
| `Role.ts`              | `Role`              | `RoleItem`                                                          |
| `ScheduleInterview.ts` | `ScheduleInterview` | `ScheduleInterviewItem`, `ScheduleInterviewPayload`                 |
| `User.ts`              | `User`              | `UserItem`, `ListUsersParams`                                       |

### Standard Model Shape Pattern

```typescript
// apps/recruitment/src/models/Department.ts

// The shape returned by GET /departments/:id and GET /departments/ list items
export interface DepartmentItem {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}

// Params for GET /departments/ — all optional except page and limit
export interface ListDepartmentsParams {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: 'asc' | 'desc';
}

// Body for POST /departments/
export interface CreateDepartmentPayload {
  name: string;
}

// Body for PATCH /departments/:id — all fields optional
export interface UpdateDepartmentPayload {
  name?: string;
}
```

---

## 4. appConstant.ts — The `t` Object

**File location:** `apps/[portal]/src/constants/appConstant.ts`  
**Import as:** `import { t } from '@/constants/appConstant';`

### Actual Values in apps/recruitment

```typescript
export const t = {
  // Auth
  COOKIE_KEY: 'lektus-recruitment-key',
  REFRESH_COOKIE_KEY: 'lektus-recruitment-refresh-key',

  // Branding
  LOGO_SRC: '/assets/logos/logo.svg',
  LOGOUT_ICON_SRC: '/assets/icons/logout.svg',
  COPYRIGHT: '© 2026 Techechelons Infosolutions Pvt. Ltd.',

  // Layout
  SECTION_GAP: 3, // Used as spacing={t.SECTION_GAP} in Stack for vertical section gaps
};
```

### toastMessages Object

```typescript
export const toastMessages = {
  success: {
    auth: {
      otpSent: 'OTP sent to your email.',
      loggedOut: 'Logged out successfully.',
    },
    profile: {
      updated: 'Profile updated successfully.',
      passwordChanged: 'Password changed successfully.',
    },
    document: {
      uploaded: 'Document uploaded successfully.',
      deleted: 'Document deleted successfully.',
    },
    job: {
      created: 'Job opening created successfully.',
      updated: 'Job opening updated successfully.',
      deleted: 'Job opening deleted successfully.',
    },
    account: {
      updated: 'Account settings updated.',
    },
  },
  error: {
    auth: {
      invalidOtp: 'Invalid OTP. Please try again.',
      sessionExpired: 'Your session has expired. Please sign in again.',
    },
    generic: 'Something went wrong. Please try again.',
  },
};
```

### Adding New Toast Messages

```typescript
// Add to the appropriate nested section in toastMessages:
export const toastMessages = {
  success: {
    // ...existing...
    department: {
      created: 'Department created successfully.',
      updated: 'Department updated successfully.',
      deleted: 'Department deleted successfully.',
    },
  },
};

// Usage:
showSnackbar(toastMessages.success.department.created, 'success');
```

### Other Constants in appConstant.ts

```typescript
// Phone validation regex (used in Yup schemas)
export const phoneRegExp =
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

// Accepted image file types for upload validation
export const IMAGE_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
];

// International dialing codes (array of { label, value } objects)
export const internationalDialingCodes: Array<{
  label: string;
  value: string;
}> = [
  { label: '+91 (India)', value: '+91' },
  { label: '+1 (USA/Canada)', value: '+1' },
  // ... full list in the file
];
```

---

## 5. Permission Strings

### Never hardcode permission strings. Always import from `@lektus/utils`.

```typescript
// ❌ WRONG
const canView = hasPermission('recruitment.departments.view');

// ✅ CORRECT
import { RECRUITMENT_PERMISSIONS } from '@lektus/utils';
const canView = hasPermission(RECRUITMENT_PERMISSIONS.DEPARTMENTS_VIEW);
```

### RECRUITMENT_PERMISSIONS Reference

```typescript
// packages/utils/src/permissionUtility.ts
export const RECRUITMENT_PERMISSIONS = {
  // Dashboard
  DASHBOARD_VIEW: 'recruitment.dashboard.view',

  // Departments
  DEPARTMENTS_VIEW: 'recruitment.departments.view',
  DEPARTMENTS_MANAGE: 'recruitment.departments.manage',

  // Job Openings
  JOBS_VIEW: 'recruitment.jobs.view',
  JOBS_MANAGE: 'recruitment.jobs.manage',

  // Requisitions
  REQUISITIONS_VIEW: 'recruitment.requisitions.view',
  REQUISITIONS_MANAGE: 'recruitment.requisitions.manage',
  REQUISITIONS_VERIFY: 'recruitment.requisitions.verify',

  // Applications
  APPLICATIONS_VIEW: 'recruitment.jobs.applications.view',
  APPLICATIONS_MANAGE: 'recruitment.jobs.applications.manage',

  // Interviews
  INTERVIEWS_VIEW: 'recruitment.interviews.view',
  INTERVIEWS_MANAGE: 'recruitment.interviews.manage',

  // Candidates
  CANDIDATES_VIEW: 'recruitment.candidates.view',
  CANDIDATES_MANAGE: 'recruitment.candidates.manage',

  // Users
  USERS_VIEW: 'users.view',
  USERS_MANAGE: 'users.manage',

  // Roles
  ROLES_VIEW: 'roles.view',
  ROLES_MANAGE: 'roles.manage',

  // Profile (own profile)
  PROFILE_VIEW: 'recruitment.profile.view',

  // Documents
  DOCUMENTS_VIEW: 'recruitment.documents.view',
  DOCUMENTS_MANAGE: 'recruitment.documents.manage',
};
```

### PLATFORM_PERMISSIONS Reference

```typescript
// packages/utils/src/permissionUtility.ts
export const PLATFORM_PERMISSIONS = {
  DASHBOARD_VIEW: 'platform.dashboard.view',
  OPERATORS_VIEW: 'platform.operators.view',
  OPERATORS_MANAGE: 'platform.operators.manage',
  PLANS_VIEW: 'platform.plans.view',
  PLANS_MANAGE: 'platform.plans.manage',
  USERS_VIEW: 'platform.users.view',
  USERS_MANAGE: 'platform.users.manage',
  COMPANIES_VIEW: 'platform.companies.view',
  COMPANIES_MANAGE: 'platform.companies.manage',
};
```

### Adding New Permission Strings

1. Add to `packages/utils/src/permissionUtility.ts` under the correct const object
2. Ensure the string matches exactly what the backend API returns in `user.permissions[]`
3. Use in pages via `hasPermission(RECRUITMENT_PERMISSIONS.NEW_PERMISSION_NAME)`
4. Use in `sidebarConfig.ts` via `permission: RECRUITMENT_PERMISSIONS.NEW_PERMISSION_NAME`

---

## 6. Route Paths — PAGE_ROOT and PAGE_USER_DASHBOARD

**File location:** `apps/[portal]/src/routes/paths.ts`

### Shape Convention

Every path entry has `{ relativePath, absolutePath }`:

- `relativePath` — used in the route definition (`path` prop on Route)
- `absolutePath` — used in navigation and links (`navigate()`, `href`)
- Parameterized paths use `:id` — replace at call site with `.replace(':id', row.id)`

### Actual paths.ts Structure (apps/recruitment)

```typescript
export const PAGE_ROOT = {
  signIn: { relativePath: '/sign-in', absolutePath: '/sign-in' },
  adminSignIn: {
    relativePath: '/admin/sign-in',
    absolutePath: '/admin/sign-in',
  },
  verifyOtp: { relativePath: '/verify-otp', absolutePath: '/verify-otp' },
  verifyOtpSuccess: {
    relativePath: '/verify-otp-success',
    absolutePath: '/verify-otp-success',
  },
  forgotPassword: {
    relativePath: '/forgot-password',
    absolutePath: '/forgot-password',
  },
  notFound: { relativePath: '/404', absolutePath: '/404' },
  notAllowed: { relativePath: '/403', absolutePath: '/403' },
};

export const PAGE_USER_DASHBOARD = {
  root: { relativePath: '/user', absolutePath: '/user' },

  dashboard: {
    relativePath: 'dashboard',
    absolutePath: '/user/dashboard',
  },

  departments: {
    relativePath: 'departments',
    absolutePath: '/user/departments',
    addDepartment: {
      relativePath: 'departments/add',
      absolutePath: '/user/departments/add',
    },
    editDepartment: {
      relativePath: 'departments/edit/:id',
      absolutePath: '/user/departments/edit/:id',
    },
  },

  jobs: {
    relativePath: 'jobs',
    absolutePath: '/user/jobs',
    addJob: {
      relativePath: 'jobs/add',
      absolutePath: '/user/jobs/add',
    },
    editJob: {
      relativePath: 'jobs/edit/:id',
      absolutePath: '/user/jobs/edit/:id',
    },
    jobDetail: {
      relativePath: 'jobs/:id',
      absolutePath: '/user/jobs/:id',
    },
    jobApplications: {
      relativePath: 'jobs/:id/applications',
      absolutePath: '/user/jobs/:id/applications',
    },
  },
  // ... other sections follow same pattern
};
```

### Usage Examples

```typescript
// Navigate to listing page
navigate(PAGE_USER_DASHBOARD.departments.absolutePath);

// Navigate to add page
navigate(PAGE_USER_DASHBOARD.departments.addDepartment.absolutePath);

// Navigate to edit page (replace :id with actual id)
navigate(PAGE_USER_DASHBOARD.departments.editDepartment.absolutePath.replace(':id', row.id));

// Use relativePath in route definitions
{ path: PAGE_USER_DASHBOARD.departments.relativePath, element: <DepartmentsPage /> }

// Use absolutePath in breadcrumbs
breadcrumbs={[{ label: 'Departments', href: PAGE_USER_DASHBOARD.departments.absolutePath }]}
```

---

## 7. Form Field Naming Convention

Form value interfaces use prefixes that identify the input type. This is enforced throughout
the codebase.

| Prefix | Input type                           | Example field name | Example label |
| ------ | ------------------------------------ | ------------------ | ------------- |
| `txt`  | Text, number, textarea, date as text | `txtName`          | "Name"        |
| `ddl`  | Select / dropdown                    | `ddlStatus`        | "Status"      |
| `txt`  | Date (text representation)           | `txtStartDate`     | "Start Date"  |
| `txt`  | Number input                         | `txtSalary`        | "Salary"      |
| `txt`  | Rich text (WYSIWYG)                  | `txtDescription`   | "Description" |

### Example: Complex Form Values Interface

```typescript
// Real pattern from JobOpening form (apps/recruitment):
interface JobFormValues {
  txtJobTitle: string; // text input
  ddlDepartment: string; // select — department ID
  ddlRequisition: string; // select — requisition ID
  ddlJobType: string; // select — full-time/part-time/contract
  ddlWorkMode: string; // select — remote/hybrid/onsite
  txtVacancies: string; // number as string
  txtMinSalary: string; // number as string
  txtMaxSalary: string; // number as string
  txtLocation: string; // text input
  txtApplicationDeadline: string; // ISO date string
  txtJobDescription: string; // RichTextInput
  txtJobRequirements: string; // RichTextInput
}
```

---

## 8. TypeScript Rules Quick Reference

```typescript
// ✅ strict mode is always on — tsconfig extends @lektus/tsconfig/react-app.json

// ✅ Component props always have explicit interface
interface MyComponentProps {
  label: string;
  onAction: () => void;
  disabled?: boolean;
}
const MyComponent: React.FC<MyComponentProps> = ({
  label,
  onAction,
  disabled = false,
}) => {};

// ❌ FC without typed props
const MyComponent: React.FC = ({ label }) => {};

// ✅ Type narrowing for unknown values
function handleError(err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
}

// ❌ any cast — only acceptable when third-party library forces it (add justification comment)
const data = (response as any).weirdShape;

// ✅ Enum-style constants use as const
const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;
type Status = (typeof STATUS)[keyof typeof STATUS];

// ❌ TypeScript enum (not used in this project)
enum Status {
  Active = 'active',
  Inactive = 'inactive',
}

// ✅ Optional chaining and nullish coalescing for API data
const name = response?.data?.user?.firstName ?? 'Unknown';

// ✅ Non-null assertion only when you are certain from context
const id = params.id!; // acceptable after: if (!params.id) return;
```
