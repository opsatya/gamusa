# Lektus — API Integration Reference

> **Last updated:** 2026-03-08  
> **Covers:** Axios setup, interceptors, service functions, error handling, file uploads  
> **Who should read it:** Every developer writing service calls for any Lektus portal

---

## 1. Architecture Overview

Every portal uses exactly **one** Axios instance, created with `createApiClient()` from
`@lektus/api-client`. The instance is created once at startup and exported from
`src/config/axiosConfig.ts`. All service files import from this single export.

```
Portal App
  ├── src/config/config.ts         → reads VITE_API_BASE_URL
  ├── src/config/axiosConfig.ts    → calls createApiClient(), exports instance
  └── src/services/*.ts            → imports axiosInstance, defines typed service functions
```

**Rule:** Never create a new Axios instance anywhere else. Never call `axios.create()` or
`createApiClient()` inside a component, hook, or service — only in `axiosConfig.ts`.

---

## 2. createApiClient() Setup

### packages/api-client behavior

```typescript
import { createApiClient } from '@lektus/api-client';

// The factory:
// 1. Creates an Axios instance with baseURL set to `${options.baseURL}/api/v1`
// 2. Sets a 30-second global timeout
// 3. Attaches a request interceptor that injects Bearer token
// 4. Attaches a response interceptor that handles 401

function createApiClient(options: ApiClientOptions): AxiosInstance;

interface ApiClientOptions {
  baseURL: string; // e.g. 'https://api.lektus.com'
  getAccessToken: () => string | undefined; // reads JWT from cookie
  removeAccessToken: () => void; // deletes JWT cookie on 401
  onUnauthorized?: () => void; // optional callback after 401 cleanup
}
```

### Request Interceptor

```typescript
// Injected automatically by createApiClient — DO NOT replicate this:
config.headers.Authorization = `Bearer ${token}`;
// Only injected when getAccessToken() returns a non-empty string.
```

### Response Interceptor

```typescript
// On HTTP 401 Unauthorized:
// 1. options.removeAccessToken() is called
// 2. options.onUnauthorized?.() is called (e.g. redirect to sign-in)
// 3. The original request is rejected with the error

// All other errors are passed through as Axios errors to the caller.
```

---

## 3. Portal Axios Instance Setup

### src/config/config.ts

```typescript
// apps/[portal]/src/config/config.ts
export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
// Never hardcode the URL. Never use process.env.
// VITE_API_BASE_URL must be set in .env.local or production env vars.
```

### src/config/axiosConfig.ts

```typescript
// apps/[portal]/src/config/axiosConfig.ts
import { createApiClient } from '@lektus/api-client';
import { getAccessToken, removeAccessToken } from '@/helper/authHelper';
import { apiBaseUrl } from './config';

const axiosConfig = createApiClient({
  baseURL: apiBaseUrl,
  getAccessToken,
  removeAccessToken,
  // onUnauthorized is not set here because AuthProvider handles redirect on state change
});

export default axiosConfig;
```

### src/helper/authHelper.ts

```typescript
// apps/[portal]/src/helper/authHelper.ts
import { createCookieHelper } from '@lektus/auth';
import { t } from '@/constants/appConstant';

const { getAccessToken, setAccessToken, removeAccessToken, isValidToken } =
  createCookieHelper(t.COOKIE_KEY, t.REFRESH_COOKIE_KEY);

export { getAccessToken, setAccessToken, removeAccessToken, isValidToken };
```

---

## 4. Service File Patterns

### GET — paginated list with filters

```typescript
// src/services/departments.ts
import axiosInstance from '@/config/axiosConfig';
import { DepartmentItem, ListDepartmentsParams } from '@/models';

export const getDepartmentsListRequest = (
  params: ListDepartmentsParams
): Promise<any> =>
  axiosInstance.get('/departments/', { params }).then((r) => r.data);
```

### GET — single record by ID

```typescript
export const getDepartmentByIdRequest = (id: string): Promise<any> =>
  axiosInstance.get(`/departments/${id}`).then((r) => r.data);
```

### POST — create

```typescript
export const createDepartmentRequest = (
  data: CreateDepartmentPayload
): Promise<any> =>
  axiosInstance.post('/departments/', data).then((r) => r.data);
```

### PATCH — partial update

```typescript
export const updateDepartmentRequest = (
  id: string,
  data: UpdateDepartmentPayload
): Promise<any> =>
  axiosInstance.patch(`/departments/${id}`, data).then((r) => r.data);
```

### DELETE

```typescript
export const deleteDepartmentRequest = (id: string): Promise<any> =>
  axiosInstance.delete(`/departments/${id}`).then((r) => r.data);
```

### PUT — full replace (use sparingly; prefer PATCH)

```typescript
export const replaceDepartmentRequest = (
  id: string,
  data: DepartmentPayload
): Promise<any> =>
  axiosInstance.put(`/departments/${id}`, data).then((r) => r.data);
```

### POST — file upload (FormData)

```typescript
export const uploadDocumentRequest = (
  candidateId: string,
  file: File
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  // Additional fields can be appended:
  // formData.append('documentType', type);
  return axiosInstance
    .post(`/candidates/${candidateId}/documents`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);
};
```

### GET — file download (Blob)

```typescript
export const downloadDocumentRequest = (documentId: string): Promise<Blob> =>
  axiosInstance
    .get(`/documents/${documentId}/download`, { responseType: 'blob' })
    .then((r) => r.data);
```

### POST — action endpoint (no body)

```typescript
export const activateCandidateRequest = (id: string): Promise<any> =>
  axiosInstance.post(`/candidates/${id}/activate`).then((r) => r.data);
```

### GET — with query params object (non-paginated)

```typescript
export const getRequisitionDropdownRequest = (jobId?: string): Promise<any> =>
  axiosInstance
    .get('/requisitions/dropdown', { params: { jobId } })
    .then((r) => r.data);
```

---

## 5. API Response Shape Convention

The backend returns consistent shapes. Normalize in the page, not in the service:

```typescript
// List response:
{
  success: true,
  data: {
    data: FeatureItem[],        // the array
    meta: {
      total: number,
      page: number,
      limit: number,
      totalPages: number,
    }
  }
}

// Single record response:
{
  success: true,
  data: {
    feature: FeatureItem        // or data: FeatureItem — normalize both in fetchPageData
  }
}

// Action response (create/update/delete):
{
  success: true,
  message: 'Created successfully.'
}

// Error response:
{
  success: false,
  message: 'Validation failed.',
  errors: [{ field: 'name', message: 'Name is required.' }]
}
```

### Normalizing List Data in Page Code

```typescript
const response = await getFeatureListRequest({
  page,
  limit: rowsPerPage,
  search,
});
if (response?.success && response?.data) {
  const dataArray = Array.isArray(response.data.data)
    ? response.data.data
    : Array.isArray(response.data)
      ? response.data
      : [];
  setItems(dataArray);
  setTotalRow(response.data.meta?.total ?? dataArray.length);
}
```

### Normalizing Single Record Data in Page Code

```typescript
const response = await getFeatureByIdRequest(id);
// API may nest under data.feature, data.item, or data directly
const data = response?.data?.feature ?? response?.data ?? response;
if (data?.id) {
  setInitialValues({ txtName: data.name ?? '' });
}
```

---

## 6. Error Handling

### In Listing Pages

```typescript
import { extractErrorMessage } from '@lektus/utils';
import { useSnackbarClose } from '@lektus/hooks';

const { showSnackbar } = useSnackbarClose();

const fetchItems = async () => {
  try {
    setIsTableLoading(true);
    const response = await getItemsRequest({ page, limit: rowsPerPage });
    // ... process response
  } catch (err) {
    console.error('fetchItems error', err);
    showSnackbar(extractErrorMessage(err), 'error');
  } finally {
    setIsTableLoading(false);
  }
};
```

### In Form Submit Handlers

```typescript
const handleSubmit = async (
  values: FormValues,
  actions: FormikHelpers<FormValues>
) => {
  try {
    await createFeatureRequest(payload);
    showSnackbar('Created successfully.', 'success');
    navigate(PAGE_USER_DASHBOARD.feature.absolutePath);
  } catch (error) {
    console.error('handleSubmit error', error);
    showSnackbar(extractErrorMessage(error), 'error');
  } finally {
    // ALWAYS in finally — never skip this
    actions.setSubmitting(false);
  }
};
```

### extractErrorMessage internals

`extractErrorMessage(error: any)` checks in this order:

1. `error.response.data.errors[0].message` — first validation error from array
2. `error.response.data.message` — top-level API error message
3. `error.message` — Axios/network error message
4. `'Something went wrong. Please try again.'` — final fallback

---

## 7. Environment Variables

```bash
# .env.local (local development)
VITE_API_BASE_URL=http://localhost:8000
VITE_DEV_COMPANY_SLUG=acme

# Production (.env.production or platform env vars)
VITE_API_BASE_URL=https://api.lektus.com
# VITE_DEV_COMPANY_SLUG is NOT set in production (slug comes from subdomain)
```

**Important:**

- `VITE_API_BASE_URL` does NOT include `/api/v1` — `createApiClient()` appends that automatically
- All `VITE_*` variables must be declared in `apps/[portal]/env.d.ts` for TypeScript:

```typescript
// apps/[portal]/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_DEV_COMPANY_SLUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

---

## 8. Authentication Flow

### Login sequence

```
1. User enters email on SignIn page
2. POST /auth/send-otp { email, portal: getPortalCode() }
3. hasPendingVerification = true → redirect to verify-otp page
4. User enters 6-digit OTP
5. verifyOtp(email, otp, rememberMe) → POST /auth/verify-otp
6. Response: { accessToken, refreshToken }
7. setAccessToken(accessToken, rememberMe) — stored in cookie
8. setRefreshToken(refreshToken, rememberMe)
9. completeAuthentication() → triggers fetchProfileRequest()
10. fetchProfileRequest() → GET /account/profile
11. Response: UserEntity
12. isAuthenticated = true, user = UserEntity
13. Router redirects to dashboard
```

### Token storage

```typescript
// isRememberMe=true  → cookie expires in 30 days
// isRememberMe=false → cookie expires in 1 day
// Cookie settings: path='/', sameSite='strict', secure=true (on HTTPS)
```

### 401 handling

```typescript
// When a request returns 401:
// 1. removeAccessToken() is called by the Axios response interceptor
// 2. The AuthProvider's fetchProfileRequest fails
// 3. isAuthenticated becomes false, user becomes null
// 4. AuthGuard detects isAuthenticated=false → redirects to sign-in
// No manual redirect needed in service files
```

---

## 9. Multi-tenant Request Headers

The Axios interceptor injects `Authorization: Bearer <token>`. The backend extracts
`companyId` and `companySlug` from the JWT payload to scope data per tenant. The portal
does NOT set explicit company headers — it's encoded in the token.

For requests that need the company slug explicitly (e.g., initial company lookup before auth):

```typescript
// In CompanyContextProvider — no axiosInstance (not authenticated yet)
// Use a direct axios call without createApiClient:
import axios from 'axios';
import { apiBaseUrl } from '@/config/config';

const response = await axios.get(
  `${apiBaseUrl}/api/v1/company/${slug}/branding`
);
```

---

## 10. Service File Checklist

When creating a new service file:

- [ ] File location: `apps/[portal]/src/services/[featureName].ts`
- [ ] Import: `import axiosInstance from '@/config/axiosConfig'` (always this path)
- [ ] Import types from: `@/models` (domain models)
- [ ] All functions return: `Promise<any>` (minimum) or typed `Promise<ApiResponse<FeatureItem>>`
- [ ] All functions unwrap `.data`: `.then((r) => r.data)`
- [ ] No `try/catch` in service files — let errors propagate to the page
- [ ] No `navigate()` calls in service files
- [ ] No React imports in service files
- [ ] Named exports only — no default export from service files
