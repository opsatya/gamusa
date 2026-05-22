# Lektus — System Architecture

> **Last updated:** 2026-03-08  
> **Covers:** Multi-tenant model, CSR SPA architecture, dependency graph, auth flow, env variables  
> **Who should read it:** All developers, DevOps, new team members

---

## 1. What Is Lektus?

Lektus is a **multi-tenant SaaS HR platform** delivered as a Turborepo monorepo. Each corporate
client gets its own subdomain (`acme.lektus.com`) that serves independently deployed CSR SPAs for
each portal the company has access to.

### Portal Map

| Portal      | Purpose                                                                  | App Package          | Port |
| ----------- | ------------------------------------------------------------------------ | -------------------- | ---- |
| Recruitment | End-to-end hiring — requisitions, job openings, applications, interviews | `recruitment`        | 5173 |
| Admin       | Platform-level company and user management                               | `admin`              | 5174 |
| CRM         | Customer relationship management                                         | `crm` (planned)      | 5175 |
| ERP         | Enterprise resource planning                                             | `erp` (planned)      | —    |
| HRMS        | HR management                                                            | `hrms` (planned)     | —    |
| Projects    | Project tracking                                                         | `projects` (planned) | —    |

---

## 2. Monorepo Structure

```
lektus-monorepo/
├── apps/
│   ├── recruitment/          # Recruitment portal SPA (port 5173)
│   └── admin/                # Platform admin SPA (port 5174)
├── packages/
│   ├── api-client/           # @lektus/api-client — Axios factory + interceptors
│   ├── auth/                 # @lektus/auth — AuthProvider, guards, cookies, subdomain util
│   ├── config/
│   │   ├── eslint/           # @lektus/eslint-config — shared ESLint rules
│   │   ├── tsconfig/         # @lektus/tsconfig — shared tsconfig bases
│   │   └── vite/             # @lektus/config-vite — shared Vite config factory
│   ├── constants/            # @lektus/constants — shared platform constants
│   ├── hooks/                # @lektus/hooks — useDebounce, usePagination, useSnackbarClose
│   ├── theme/                # @lektus/theme — createLaktusTheme(), Manrope font, palette
│   ├── types/                # @lektus/types — platform-level TypeScript types only
│   ├── ui/                   # @lektus/ui — all shared React components and layouts
│   └── utils/                # @lektus/utils — pure utility functions (no React)
├── turbo.json                # Turborepo pipeline definition
├── pnpm-workspace.yaml       # pnpm workspace + catalog of shared dependency versions
└── package.json              # Root scripts and devDependencies
```

---

## 3. Package Dependency Graph

```
apps/recruitment
  └── @lektus/auth
  └── @lektus/api-client
  └── @lektus/ui
  └── @lektus/theme
  └── @lektus/types
  └── @lektus/hooks
  └── @lektus/utils

packages/ui
  └── @lektus/utils
  └── @lektus/hooks
  └── @lektus/theme
  └── @lektus/types
  └── @lektus/auth

packages/auth
  └── @lektus/types

packages/hooks
  └── @lektus/utils

packages/theme
  └── @lektus/utils

packages/api-client  → (no @lektus/* imports)
packages/types       → (no @lektus/* imports)
packages/utils       → (no @lektus/* imports)
```

**Rules:**

- `packages/api-client`, `packages/types`, `packages/utils` have **zero** internal `@lektus/*` imports
- No circular dependencies — if `packages/ui` needs a type, it goes into `@lektus/types`
- Apps can import from any package, but packages cannot import from `apps/`

---

## 4. CSR SPA Architecture

All portals are **100% Client-Side Rendered** React SPAs. There is no Next.js, no SSR, no server
components. Each portal:

- Bootstraps with `ReactDOM.createRoot()`
- Uses `react-router-dom` v7 with `<BrowserRouter>`
- Resolves company branding before rendering the auth shell
- Loads routes lazily via `React.lazy()` and `<Suspense>`

### App Bootstrap Order

```
main.tsx
  └─ ReactDOM.createRoot()
       └─ <React.StrictMode>
            └─ <App>
                 └─ <HeadProvider>           (react-head for document title)
                      └─ <ThemeConfig>       (createLaktusTheme())
                           └─ <LocalizationProvider> (AdapterDayjs)
                                └─ <CompanyProvider>  (company slug → API → branding)
                                     └─ <AuthContextProvider> (JWT + profile fetch)
                                          └─ <NotistackProvider>
                                               └─ <BrowserRouter>
                                                    └─ <ScrollToTop>
                                                    └─ <Routing>
```

---

## 5. Multi-Tenant Resolution Flow

### Subdomain → Company → Branding

```
Browser visits: acme.lektus.com
      │
      ▼
getCompanySlug()              [packages/auth/src/utils/subdomain.ts]
  hostname.split('.')[0]
  → 'acme'
      │
      ▼
CompanyContextProvider        [apps/[portal]/src/context/CompanyContextProvider.tsx]
  GET /api/v1/companies/slug/acme
    → { id, slug, logoUrl, isActive }
      │
      ├─ isActive=false → redirect to main domain
      ├─ not found     → show not-found page
      └─ found         → setCompany(), setIsLoading(false)
            │
            ▼
      AuthContextProvider     [apps/[portal]/src/context/AuthContextProvider.tsx]
        check cookie (t.COOKIE_KEY)
          → valid JWT → fetchProfileRequest() → setUser(), setIsAuthenticated(true)
          → no/expired → setIsAuthenticated(false), render guest routes
```

### Local Development

For local development, set `VITE_DEV_COMPANY_SLUG` in `.env.local`:

```bash
# apps/recruitment/.env.local
VITE_API_BASE_URL=http://localhost:3000
VITE_DEV_COMPANY_SLUG=acme
```

`getCompanySlug()` returns `import.meta.env.VITE_DEV_COMPANY_SLUG` when hostname is `localhost`.

---

## 6. Auth Flow (Detailed)

```
1. App loads → CompanyProvider fetches company by slug
2. CompanyProvider sets isLoading=false
3. AuthContextProvider mounts:
     a. createCookieHelper(t.COOKIE_KEY) — reads JWT from cookie
     b. isValidToken(token)?
          YES → setIsLoadingProfile(true)
                fetchProfileRequest() → GET /api/v1/account/profile
                  → setUser(data), setIsAuthenticated(true), setPermissions([...])
                  setIsLoadingProfile(false), setIsPageLoaded(true)
          NO  → setIsAuthenticated(false), setIsPageLoaded(true)
4. Routing renders:
     - isAuthenticated=true  → AuthGuard passes → UserDashboardLayout + page
     - isAuthenticated=false → GuestGuard protects → SignIn page
5. Sign-in page calls verifyOtpRequest(email, otp, rememberMe)
     → setAccessToken(token, rememberMe) via cookie helper
     → completeAuthentication() → triggers profile fetch above
```

### Token Lifecycle

| Action                          | Cookie behavior                                        |
| ------------------------------- | ------------------------------------------------------ |
| OTP verified (rememberMe=true)  | Cookie expires in 30 days                              |
| OTP verified (rememberMe=false) | Cookie expires in 1 day                                |
| 401 response from API           | `removeAccessToken()` called, `onUnauthorized()` fires |
| Logout                          | `removeAccessToken()` + `removeRefreshToken()`         |

---

## 7. Routing Architecture

Each portal has two route groups:

### Root Routes (rootRoutes.tsx)

Public + guest routes, not wrapped in AuthGuard:

- `/signin` — wrapped in `GuestGuard`
- `/verify-otp` — wrapped in `GuestGuard`
- `/forgot-password` — wrapped in `GuestGuard`
- `/not-found`, `/not-allowed`

### Dashboard Routes (userRoute.tsx)

All wrapped in `AuthGuard` > `UserDashboardLayout`:

```typescript
const getUserDashboardRoutes = (permissions: string[]) => [{
  path: 'user',
  element: (
    <AuthGuard>
      <UserDashboardLayout sidebarItems={sidebarConfig(permissions)} logoSrc={t.LOGO_SRC}>
        <Outlet />
      </UserDashboardLayout>
    </AuthGuard>
  ),
  children: [
    { path: 'departments',         element: <PermissionGuard permissions={RECRUITMENT_PERMISSIONS.DEPARTMENTS_VIEW}><DepartmentsPage /></PermissionGuard> },
    { path: 'departments/add-department', element: <PermissionGuard permissions={RECRUITMENT_PERMISSIONS.DEPARTMENTS_MANAGE}><AddDepartmentPage /></PermissionGuard> },
    // ...
  ],
}];
```

### Sidebar Filtering

`sidebarConfig(permissions)` filters `ALL_SIDEBAR_ITEMS` using the `permissions` array from `useAuth()`.
Items without a matching permission are hidden from the sidebar automatically.

---

## 8. Environment Variables Reference

### Per-Portal Variables

| Variable                | Required       | Example                  | Description                                                    |
| ----------------------- | -------------- | ------------------------ | -------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | ✅ Yes         | `https://api.lektus.com` | Backend API base. `/api/v1` is appended by `createApiClient()` |
| `VITE_DEV_COMPANY_SLUG` | Local dev only | `acme`                   | Overrides subdomain detection on localhost                     |

### Turbo Global Env

Both variables are declared in `turbo.json` under `globalEnv` / `build.env`:

```json
{
  "globalEnv": ["NODE_ENV"],
  "tasks": {
    "build": {
      "env": ["VITE_API_BASE_URL", "VITE_DEV_COMPANY_SLUG"]
    }
  }
}
```

---

## 9. Build & Dev Commands

```bash
# Root-level commands (via Turborepo)
pnpm dev:recruitment     # Start recruitment portal (port 5173)
pnpm dev:admin           # Start admin portal (port 5174)
pnpm dev:all             # Start all portals
pnpm build:recruitment   # Build recruitment
pnpm build:all           # Build all apps
pnpm lint                # Lint all packages
pnpm typecheck           # TypeScript check all packages
pnpm test                # Run all tests
pnpm format              # Prettier format all files
```

### Turborepo Pipeline

- `build` depends on `^typecheck` (builds after all dependency typechecks pass)
- `dev` is `cache: false, persistent: true`
- Output: `dist/**` per app

---

## 10. Nginx Routing Model (Production)

Each company subdomain resolves to the same Nginx server. Nginx routes by path prefix:

```nginx
# acme.lektus.com/
server_name *.lektus.com;

location / {
  # Serves recruitment SPA dist
  try_files $uri $uri/ /index.html;
}
```

Since all portals are CSR SPAs, the `index.html` catchall enables `react-router-dom` to
handle all client-side routing. Port assignments only matter in local development.

---

## 11. Inconsistencies to Be Aware Of

| Issue                                                         | Status | Guidance                                                                                                                   |
| ------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
| `packages/utils/src/formatDate.ts` uses `date-fns` internally | Legacy | Do NOT use `date-fns` for new code. Use `dayjs` directly or call `getDate()` from `@lektus/utils`                          |
| Some older pages read cookies directly with `Cookies.get()`   | Legacy | Always use `useAuth()` hook from `@lektus/auth`                                                                            |
| `auth.types.ts` has an `AuthUser` interface                   | Active | `AuthUser` from `platform/user.types.ts` IS the live interface used by `AuthContext`. Use `AuthUser` from `@lektus/types`. |
