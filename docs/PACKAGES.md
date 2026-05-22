# Lektus — Shared Packages Reference

> **Last updated:** 2026-03-08  
> **Covers:** All packages in `packages/` — purpose, public API, usage examples, boundaries  
> **Who should read it:** Any developer adding features or creating a new portal

---

## Package Overview

| Package                    | Import name             | Purpose                                              |
| -------------------------- | ----------------------- | ---------------------------------------------------- |
| `packages/api-client`      | `@lektus/api-client`    | Axios instance factory with auth interceptors        |
| `packages/auth`            | `@lektus/auth`          | Auth context, guards, cookie helpers, subdomain util |
| `packages/hooks`           | `@lektus/hooks`         | Shared React hooks                                   |
| `packages/theme`           | `@lektus/theme`         | MUI theme factory, palette, typography, overrides    |
| `packages/types`           | `@lektus/types`         | Platform-level TypeScript types                      |
| `packages/ui`              | `@lektus/ui`            | Shared React components and layouts                  |
| `packages/utils`           | `@lektus/utils`         | Pure utility functions                               |
| `packages/config/eslint`   | `@lektus/eslint-config` | Shared ESLint configuration                          |
| `packages/config/tsconfig` | `@lektus/tsconfig`      | Shared TypeScript config bases                       |
| `packages/config/vite`     | `@lektus/config-vite`   | Shared Vite configuration factory                    |

---

## @lektus/api-client

### Purpose

Creates a fully configured Axios instance for a specific portal. Handles authentication token
injection (request interceptor) and 401 error handling (response interceptor). Each portal calls
this exactly once in `src/config/axiosConfig.ts`.

### Public API

```typescript
import { createApiClient } from '@lektus/api-client';
import type { ApiClientOptions } from '@lektus/api-client';

interface ApiClientOptions {
  baseURL: string; // The API base URL. '/api/v1' is appended automatically.
  getAccessToken: () => string | undefined; // Reads JWT from cookie
  removeAccessToken: () => void; // Clears JWT cookie on 401
  onUnauthorized?: () => void; // Optional callback after 401 cleanup
}

function createApiClient(options: ApiClientOptions): AxiosInstance;
```

**What the returned instance does:**

- `baseURL` = `${options.baseURL}/api/v1`
- Timeout: 30 seconds
- Request interceptor: Reads `options.getAccessToken()`, injects `Authorization: Bearer <token>` if present
- Response interceptor: On HTTP 401 → calls `options.removeAccessToken()` then `options.onUnauthorized()`

### Usage (in apps/recruitment/src/config/axiosConfig.ts)

```typescript
import { createApiClient } from '@lektus/api-client';
import { getAccessToken, removeAccessToken } from '@/helper/authHelper';
import { apiBaseUrl } from './config';

const axiosConfig = createApiClient({
  baseURL: apiBaseUrl,
  getAccessToken,
  removeAccessToken,
});

export default axiosConfig;
```

### What NOT to put here

- Business logic
- Route-specific headers
- Portal-specific configuration

### Dependencies

- No internal `@lektus/*` imports

---

## @lektus/auth

### Purpose

Provides the entire authentication infrastructure: `AuthProvider` (JWT + profile management),
`useAuth()` hook, route guards, cookie token helpers, and the subdomain company slug resolver.

### Public API

```typescript
import {
  AuthProvider,
  useAuth,
  AuthGuard,
  GuestGuard,
  PermissionGuard,
  AdminGuard,
  createCookieHelper,
  getCompanySlug,
} from '@lektus/auth';
```

#### AuthProvider

```typescript
interface AuthProviderProps {
  children: React.ReactNode;
  cookieKey: string; // Cookie name for access token — use t.COOKIE_KEY
  refreshCookieKey?: string; // Cookie name for refresh token — use t.REFRESH_COOKIE_KEY
  fetchProfileRequest: () => Promise<any>; // Injected from portal's services/account.ts
  verifyOtpRequest: (
    email: string,
    otp: string,
    rememberMe: boolean
  ) => Promise<any>;
  onLoginSuccess?: () => void;
  loader?: React.ReactNode; // Shown while profile is loading — use <Loader />
}
```

**Provider behavior:**

1. On mount: reads access token from cookie
2. If valid JWT: calls `fetchProfileRequest()` → sets `user`, `permissions`, `isAuthenticated=true`
3. If no/expired token: sets `isAuthenticated=false`, `isPageLoaded=true`
4. Exposes all state and actions via `useAuth()`

#### useAuth()

```typescript
const {
  isAuthenticated, // boolean — true after valid profile fetch
  authToken, // string | null — raw JWT string
  user, // UserEntity | null — full user object from profile API
  isPageLoaded, // boolean | null — true after initial auth check completes
  isLoadingProfile, // boolean — true while fetchProfileRequest is in flight
  hasPendingVerification, // boolean — true after OTP sent, before OTP verified
  role, // UserRole enum | null
  permissions, // string[] — array of permission strings like 'recruitment.jobs.view'
  hasPermission, // (permission: string | string[]) => boolean — checks ANY match
  hasAnyPermission, // (permissions: string[]) => boolean — explicit ANY check
  verifyOtp, // (email, otp, rememberMe) => Promise<any>
  logoutUser, // () => void — clears token + resets state
  setUser, // Dispatch<SetStateAction<UserEntity | null>>
  completeAuthentication, // () => void — triggers profile re-fetch after OTP verify
  updateUser, // (userData: Partial<UserEntity>) => void — partial user update
} = useAuth();
```

#### Guards

```typescript
// AuthGuard — blocks unauthenticated access, redirects to sign-in
interface AuthGuardProps {
  children: React.ReactElement;
  redirectTo?: string; // default: '/'
  loader?: React.ReactNode;
}

// GuestGuard — redirects authenticated users away from auth pages
interface GuestGuardProps {
  children: React.ReactElement;
  redirectPath: string; // where to redirect if already authenticated
  loader?: React.ReactNode;
}

// PermissionGuard — checks user has required permission(s)
interface PermissionGuardProps {
  children: React.ReactElement;
  permissions: string | string[];
  requireAll?: boolean; // default: false (ANY match passes)
  fallbackPath?: string; // default: '/not-allowed'
}

// AdminGuard — admin-only route wrapper
interface AdminGuardProps {
  children: React.ReactElement;
}
```

#### createCookieHelper

```typescript
const {
  getAccessToken,     // () => string | undefined
  setAccessToken,     // (token: string, isRememberMe: boolean) => void
  removeAccessToken,  // () => void
  isValidToken,       // (token: string | null) => boolean — checks JWT exp claim
  setRefreshToken,    // (token: string, isRememberMe: boolean) => void
  removeRefreshToken, // () => void
  getRefreshToken,    // () => string | undefined
} = createCookieHelper(cookieKey: string, refreshKey?: string);

// Cookie config: path='/', sameSite='strict', secure=true on HTTPS
// isRememberMe=true → expires in 30 days
// isRememberMe=false → expires in 1 day
```

#### getCompanySlug

```typescript
import { getCompanySlug } from '@lektus/auth';

// Resolution order:
//   localhost / 127.0.0.1  → returns VITE_DEV_COMPANY_SLUG env var (or null)
//   company.localhost       → returns 'company'
//   acme.lektus.com         → returns 'acme'
//   lektus.com (no subdomain) → returns null

const slug: string | null = getCompanySlug();
```

### What NOT to put here

- Business logic specific to any portal
- Service function calls other than profile/OTP

### Dependencies

- `@lektus/types` (for `UserEntity`)

---

## @lektus/hooks

### Purpose

Shared React hooks that are reusable across all portals. All hooks are pure React —
no side effects beyond what the hook contract specifies.

### Public API

#### useDebounce

```typescript
import { useDebounce } from '@lektus/hooks';

// Delays propagation of a string value by `delay` milliseconds.
// Used for search inputs to avoid firing API calls on every keystroke.
const debouncedSearch = useDebounce(value: string, delay: number): string;

// Standard usage in listing pages:
const [searchText, setSearchText] = useState('');
const debouncedSearch = useDebounce(searchText, 500);
useEffect(() => { fetchData(); }, [debouncedSearch]);
```

#### useSnackbarClose

```typescript
import { useSnackbarClose } from '@lektus/hooks';

// Wraps notistack's enqueueSnackbar with a close button action.
// Requires NotistackProvider to be mounted in the tree.
const { showSnackbar } = useSnackbarClose();

showSnackbar(message: string, variant: 'success' | 'error' | 'warning' | 'info'): void;

// Usage:
showSnackbar(toastMessages.success.job.deleted, 'success');
showSnackbar(extractErrorMessage(error), 'error');
```

#### usePagination

```typescript
import { usePagination } from '@lektus/hooks';

// Client-side pagination helper. Use only when the full dataset is available locally.
// For server-side paginated APIs, manage page/rowsPerPage state directly in the page.
const {
  currentPage,      // number
  itemsPerPage,     // number
  totalItemCount,   // number — data.length
  paginatedData,    // T[] — sliced for current page
  totalPages,       // number
  onPageChange,     // (page: number) => void — also exported as handler
  onItemsPerPageChange, // (value: string | number) => void — resets to page 1
} = usePagination({ data: T[], initialItemsPerPage?: number, initialPage?: number });
```

### What NOT to put here

- Hooks that make API calls (those belong in service files or page components)
- Hooks that import from `@lektus/ui` or `@lektus/auth`

### Dependencies

- `@lektus/utils` (indirectly, for any utility functions used)

---

## @lektus/theme

### Purpose

Provides the canonical MUI theme for all Lektus portals. Defines the Manrope font family,
custom color palette, custom typography variants, shadows, shape, breakpoints, and full
MUI component overrides. Portals call `createLaktusTheme()` exactly once.

### Public API

```typescript
import { createLaktusTheme } from '@lektus/theme';
// Also exported: palette, typography, breakpoints, shape, shadows, overrides

function createLaktusTheme(): Theme;
// Returns a fully configured MUI Theme with all overrides applied.
```

### Color Palette

| Token            | Value     | Usage                                        |
| ---------------- | --------- | -------------------------------------------- |
| `primary.main`   | `#AC73FF` | Brand purple, primary buttons, active states |
| `primary.dark`   | `#290066` | Hover states                                 |
| `primary.100`    | `#F5EEFF` | Backgrounds, chips                           |
| `secondary.main` | `#D37048` | Secondary actions                            |
| `success.main`   | `#0CAF60` | Active/approved status                       |
| `error.main`     | `#E03137` | Delete/rejected status                       |
| `warning.main`   | `#FFD023` | On-hold/pending status                       |
| `info.main`      | `#0066FF` | Edit actions, informational                  |
| `grey.100`       | `#F8F8F8` | Page backgrounds                             |
| `grey.300`       | `#E9EAEC` | Borders, dividers                            |
| `grey.600`       | `#687588` | Secondary text                               |
| `grey.700`       | `#323B49` | Primary text                                 |

### Typography Variants

All are part of the `Manrope` font family.

| Variant                  | Weight | Size (lg) | Use case                         |
| ------------------------ | ------ | --------- | -------------------------------- |
| `h4`                     | 700    | 24px      | Page titles in `MainLayout`      |
| `h5`                     | 700    | 20px      | Section titles                   |
| `h6`                     | 700    | 18px      | Card headings                    |
| `h7` (custom)            | 700    | 14px      | Badge-style small headings       |
| `subtitleL`              | 600    | 18px      | Large subtitles                  |
| `subtitle1`              | 600    | 16px      | Standard subtitles               |
| `subtitle2`              | 600    | 14px      | Small subtitles, labels          |
| `body1`                  | 400    | 16px      | Body copy                        |
| `body2`                  | 400    | 14px      | Secondary body copy              |
| `bodySMedium` (custom)   | 500    | ~14px     | Table cell text, field labels    |
| `bodySRegular` (custom)  | 400    | ~14px     | Table cell dates, secondary info |
| `bodyMMedium` (custom)   | 500    | ~16px     | Medium-weight card content       |
| `bodySBold` (custom)     | 700    | ~14px     | Emphasized small text            |
| `bodyLSemibold` (custom) | 600    | ~16px     | Large semibold text              |
| `bodyXSRegular` (custom) | 400    | ~12px     | Helper text, captions            |

### Usage in Portal Theme

```typescript
// apps/[portal]/src/theme/index.tsx
import { createLaktusTheme } from '@lektus/theme';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import componentsOverride from './overrides';

const ThemeConfig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = createLaktusTheme();
  // Merge app-level overrides (if any) on top of base theme overrides
  theme.components = { ...theme.components, ...componentsOverride(theme) };
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
```

### What NOT to put here

- Company-specific branding (primary color overrides per tenant — TO BE IMPLEMENTED)
- Portal-specific component overrides (those go in `apps/[portal]/src/theme/overrides/`)

### Dependencies

- `@lektus/utils` (for `pxToRem`)

---

## @lektus/types

### Purpose

The single source of truth for **platform-level** TypeScript types shared across packages and apps.
Domain models specific to one portal (e.g., `JobItem`, `RequisitionItem`) MUST stay in
`apps/[portal]/src/models/` — they must NOT be placed here.

### Public API

#### Platform Types

```typescript
// From platform/user.types.ts
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
  createdAt: string;
  updatedAt: string;
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

// From platform/company.types.ts
interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  primaryColor: string;
  isActive: boolean;
}
interface CompanyBranding {
  logoUrl: string | null;
  primaryColor: string;
  companyName: string;
}

// From platform/portal.types.ts
type PortalName = 'recruitment' | 'crm' | 'erp' | 'hrms' | 'projects' | 'admin';
interface PortalConfig {
  name: PortalName;
  displayName: string;
  basePath: string;
  icon: string;
}

// From platform/auth.types.ts
interface JWTPayload {
  userId: string;
  companyId: string;
  companySlug: string;
  roleId: string;
  allowedPortals: PortalName[];
  isPlatformAdmin: boolean;
  iat: number;
  exp: number;
}

// From platform/permission.types.ts
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
  permissions: string[];
}
```

#### Recruitment Domain Types (re-exported for cross-package use)

```typescript
// From recruitment/ — these are exported from @lektus/types for use in @lektus/ui
// (e.g., components that need to know about User/Application structures)
// UserEntity (above), Application, Role, Document, Requisition, Notification, ScheduleInterview
```

### What NOT to put here

- Domain models tied to a single portal's business logic (`DepartmentItem`, `JobItem`, `RequisitionItem`)
- Component prop types (those live in `@lektus/ui` alongside their component)
- Service response types (those live in the service file or `apps/[portal]/src/models/`)

### Dependencies

- None (no `@lektus/*` imports)

---

## @lektus/ui

### Purpose

All shared React components and layout wrappers used across every portal. The single source of
truth for Lektus visual language. Portals import components from here instead of building their own
implementations of common UI patterns.

### Components Index

#### Input Components

```typescript
// TextInput — ALWAYS use instead of raw MUI TextField or OutlinedInput
import { TextInput } from '@lektus/ui';
interface TextInputProps extends OutlinedInputProps {
  name: string;
  label?: string;
  size?: 'small' | 'medium' | 'large'; // default: 'large'
  required?: boolean;
  error?: boolean;
  helperText?: string; // displayed only when error=true
}

// SelectInput — ALWAYS use instead of raw MUI Select
import { SelectInput } from '@lektus/ui';
interface SelectInputProps extends BaseSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  size?: 'small' | 'medium' | 'large'; // default: 'large'
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children?: React.ReactNode; // MenuItem elements go here
}

// PasswordInput — text input with show/hide toggle
import { PasswordInput } from '@lektus/ui';

// RichTextInput — TipTap rich text editor wrapper
import { RichTextInput } from '@lektus/ui';

// CustomField — flexible custom form field wrapper
import { CustomField } from '@lektus/ui';
```

#### Data Display

```typescript
// DataTable — server-paginated data table
import { DataTable } from '@lektus/ui';
interface DataTableProps {
  columns: Array<{
    field: string;
    headerName: string;
    width?: number;
    hide?: boolean; // use to conditionally show/hide columns
    renderCell?: (row: any) => React.ReactNode;
  }>;
  rows: any[];
  totalRow: number; // total record count from server
  page?: number; // current page (1-indexed)
  itemsPerPage?: number; // default: 8; options: 8, 16, 24, 32
  showResults?: boolean; // default: true
  showRowPerPage?: boolean; // default: true
  isLoading?: boolean; // shows skeleton rows while true
  containerStyle?: object;
  handlePageChange?: (page: number) => void;
  handleItemsPerPageChange?: (itemsPerPage: number) => void;
  onRowClick?: (row: any) => void;
}

// TableWrapper — card container with configurable header controls
import { TableWrapper } from '@lektus/ui';
// See Section 5 in copilot-instructions.md for full TableWrapper API
```

#### Wrapper Components

```typescript
// CardWrapper — white bordered card with box shadow
import { CardWrapper } from '@lektus/ui';
interface CardWrapperProps {
  children: React.ReactNode;
  padding?: number;
  containerStyle?: SxProps<Theme>;
}

// SectionWrapper — titled section with divider + optional edit icon/action
import { SectionWrapper } from '@lektus/ui';
interface SectionWrapperProps {
  children: React.ReactNode;
  title?: string;
  hideDivider?: boolean;
  icon?: React.ComponentType; // defaults to EditIcon
  onIconClick?: () => void;
  action?: React.ReactNode; // custom node overrides icon button
  containerStyle?: object;
}

// ViewWrapper, ProfileWrapper — also available for detail and profile pages
```

#### Layouts

```typescript
// MainLayout — standard page shell
import { MainLayout } from '@lektus/ui';
// See copilot-instructions.md Section 3 for full props

// PageHeaderLayout — form page header with breadcrumbs + save/cancel
import { PageHeaderLayout } from '@lektus/ui';
// See copilot-instructions.md Section 3 for full props

// UserDashboardLayout — sidebar + header shell
import { UserDashboardLayout } from '@lektus/ui';
// See copilot-instructions.md Section 3 for full props
// NavItem interface:
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

// AuthLayout — layout for sign-in/verify-otp pages
import { AuthLayout } from '@lektus/ui';
```

#### Action Components

```typescript
// ActionIconButton — color-variant icon button (edit, delete, view actions in tables)
import { ActionIconButton } from '@lektus/ui';
interface ActionIconButtonProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info';
  onClick?: () => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
```

#### Dialogs

```typescript
import { ConfirmDialog, AlertDialog, FormDialog } from '@lektus/ui';

// ConfirmDialog — two-button confirmation modal
// Props: open, onClose, title, description, agreeText, disagreeText,
//        buttonColor, onAgreeAction, onDisAgreeAction
```

#### Feedback & Navigation

```typescript
import { Loader } from '@lektus/ui'; // Loading spinner
import { NotistackProvider } from '@lektus/ui'; // Wraps notistack SnackbarProvider
import { ScrollToTop } from '@lektus/ui'; // Scrolls to top on route change
import { Page } from '@lektus/ui'; // Sets document.title via react-head
import { BackButton } from '@lektus/ui'; // Styled back navigation button
```

#### Skeleton Loaders

```typescript
import { TableSkeleton, JobOpeningsSkeleton } from '@lektus/ui';
// Used during initial data fetch to show loading placeholder
```

#### Icons

All custom icons are exported from `@lektus/ui` directly. Never import from `@mui/icons-material`
for these:

```typescript
import {
  EditIcon,
  TrashIcon,
  SearchIcon,
  PlusIcon,
  DashboardIcon,
  CalenderIcon,
  UsersIcon,
  VectorIcon,
  UserIcon,
  BriefcaseIcon,
  TimerIcon,
  TrendUpIcon,
  MsgIcon,
  DocumentsIcon,
  RequisitionIcon,
  ReportsIcon,
  InterviewsIcon,
  LogoutIcon,
} from '@lektus/ui';
```

#### Data Visualization & Other

```typescript
import { DashboardSummaryCard } from '@lektus/ui';
import { HorizontalStatsCard } from '@lektus/ui';
import { ProgressCard } from '@lektus/ui';
import { ReportsCard } from '@lektus/ui';
import { JobOpeningCard } from '@lektus/ui';
import { QuickActions, type QuickAction } from '@lektus/ui';
import { TabSwitch } from '@lektus/ui';
import { ToggleSwitch } from '@lektus/ui';
import { MyAvatar } from '@lektus/ui';
import { WebsiteLogo } from '@lektus/ui';
import { MenuPopover } from '@lektus/ui';
import { Pagination } from '@lektus/ui';
import { Calendar } from '@lektus/ui';
import { UploadFile, type UploadedFile, FileStatus } from '@lektus/ui';
import { Accordian } from '@lektus/ui';
import { Iconify } from '@lektus/ui'; // Iconify icon renderer
import { Footer } from '@lektus/ui';
```

### What NOT to put here

- Domain-specific components (e.g., `ApplicationCard` for one portal — stay in app)
- Page-level components that are only used in one feature

### Dependencies

- `@lektus/utils`, `@lektus/hooks`, `@lektus/theme`, `@lektus/types`, `@lektus/auth`

---

## @lektus/utils

### Purpose

Pure utility functions with zero React dependencies. Everything here is framework-agnostic
and can be used in any package or app. The two most critical exports for app developers are
`extractErrorMessage` and `getDate`.

### Public API

#### Error Handling

```typescript
import { extractErrorMessage } from '@lektus/utils';

// Normalizes Axios error responses into a human-readable string.
// Checks: error.response.data.errors[].message → error.response.data.message → error.message → fallback
function extractErrorMessage(error: any): string;

// Usage in service catch blocks:
catch (error) {
  showSnackbar(extractErrorMessage(error), 'error');
}
```

#### Date Formatting

```typescript
import { getDate, formatDate } from '@lektus/utils';

// getDate — formats a date using date-fns format strings
function getDate(date: Date | string, dateFormat?: string): string | undefined;
// Standard usage: getDate(row.createdAt, 'dd MMM yyyy') → '06 Mar 2026'

// formatDate — returns DD/MM/YYYY format
function formatDate(isoDateString: string): string;
// Note: Both use date-fns internally (legacy). Do NOT add new date-fns usage.
```

#### Sorting

```typescript
import {
  getComparator,
  applySortFilter,
  descendingComparator,
} from '@lektus/utils';

// Used internally by DataTable component for client-side column sorting.
// You typically don't need to call these directly in page code.
function descendingComparator(a: any, b: any, orderBy: string): number;
function getComparator(
  order: string,
  orderBy: string
): (a: any, b: any) => number;
function applySortFilter(
  array: any[],
  comparator: (a: any, b: any) => number
): any[];
```

#### Permission Constants

```typescript
import { RECRUITMENT_PERMISSIONS, PLATFORM_PERMISSIONS } from '@lektus/utils';

// ALWAYS use these constants instead of hardcoded strings
RECRUITMENT_PERMISSIONS.DEPARTMENTS_VIEW; // 'recruitment.departments.view'
RECRUITMENT_PERMISSIONS.DEPARTMENTS_MANAGE; // 'recruitment.departments.manage'
RECRUITMENT_PERMISSIONS.JOBS_VIEW; // 'recruitment.jobs.view'
RECRUITMENT_PERMISSIONS.JOBS_MANAGE; // 'recruitment.jobs.manage'
RECRUITMENT_PERMISSIONS.REQUISITIONS_VIEW; // 'recruitment.requisitions.view'
RECRUITMENT_PERMISSIONS.REQUISITIONS_MANAGE; // 'recruitment.requisitions.manage'
RECRUITMENT_PERMISSIONS.REQUISITIONS_VERIFY; // 'recruitment.requisitions.verify'
RECRUITMENT_PERMISSIONS.APPLICATIONS_VIEW; // 'recruitment.jobs.applications.view'
RECRUITMENT_PERMISSIONS.APPLICATIONS_MANAGE; // 'recruitment.jobs.applications.manage'
RECRUITMENT_PERMISSIONS.INTERVIEWS_VIEW; // 'recruitment.interviews.view'
RECRUITMENT_PERMISSIONS.INTERVIEWS_MANAGE; // 'recruitment.interviews.manage'
RECRUITMENT_PERMISSIONS.USERS_VIEW; // 'users.view'
RECRUITMENT_PERMISSIONS.USERS_MANAGE; // 'users.manage'
RECRUITMENT_PERMISSIONS.ROLES_VIEW; // 'roles.view'
RECRUITMENT_PERMISSIONS.ROLES_MANAGE; // 'roles.manage'
RECRUITMENT_PERMISSIONS.DASHBOARD_VIEW; // 'recruitment.dashboard.view'

PLATFORM_PERMISSIONS.OPERATORS_VIEW; // 'platform.operators.view'
PLATFORM_PERMISSIONS.OPERATORS_MANAGE; // 'platform.operators.manage'
PLATFORM_PERMISSIONS.USERS_VIEW; // 'platform.users.view'
// ... (full list in packages/utils/src/permissionUtility.ts)
```

#### Portal Code

```typescript
import { getPortalCode } from '@lektus/utils';

// Derives portal code from URL pathname.
// '/user/...' → 'recruitment' (default fallback)
// Checks first path segment against ['recruitment', 'crm']
function getPortalCode(): 'recruitment' | 'crm';

// Used in AuthContextProvider to identify which portal is sending the OTP request:
const verifyOtpRequest = (email, otp, rememberMe) =>
  verifyOtpService({ email, otp, rememberMe, portal: getPortalCode() });
```

#### Status Colors

```typescript
import { getStatusColorForApplications, getStatusColorByApproval } from '@lektus/utils';

// Returns MUI Chip color variant string
function getStatusColorForApplications(status: string):
  'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

function getStatusColorByApproval(status: string):
  'default' | 'error' | 'success' | 'warning' | 'info';

// Usage:
<Chip label={row.status} color={getStatusColorForApplications(row.status)} size="small" />
```

#### Other Utilities

```typescript
import { pxToRem } from '@lektus/utils'; // (px: number) => '1rem'
import { maskEmail } from '@lektus/utils'; // 'john@example.com' → 'j***@example.com'
import { isHtml } from '@lektus/utils'; // (str: string) => boolean
import { generateAvatarColor } from '@lektus/utils'; // (name: string) => hex color string
// Also: formatArray, formatFontSize, formatNumber, formatString,
//       getYears, pagination, companyUtility, fileUtility, profileUtility
```

### What NOT to put here

- React hooks (go in `@lektus/hooks`)
- Components (go in `@lektus/ui`)
- Any `import React` statements

### Dependencies

- None (no `@lektus/*` imports)

---

## @lektus/eslint-config, @lektus/tsconfig, @lektus/config-vite

### Purpose

Configuration packages. Not imported in application code — referenced only in config files.

```typescript
// tsconfig.json in any app or package:
{ "extends": "@lektus/tsconfig/react-app.json" }

// vite.config.ts (if using the shared factory — TO BE IMPLEMENTED per portal):
// import { defineConfig } from '@lektus/config-vite';

// .eslintrc.cjs
module.exports = { extends: ['@lektus/eslint-config'] };
```
