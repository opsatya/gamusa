# Plan A — Intranet UI / Validation / Non-Integration Fixes

> **Phase**: Frontend-only — no backend changes required.
> **Visual reference**: `apps/recruitment/src/pages/dashboard/ScreenedApplication/index.tsx` + `ApplicationActivityDrawer/index.tsx`
> **Last updated**: 2026-05-13

---

## 1. Table Typography Standardization

### 1.1 Reference Pattern (ScreenedApplication)

The recruitment screened-applications table is the approved visual baseline. Its conventions:

| Element               | Variant                                                                       | Notes                                |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| Body cell text        | `bodySRegular`                                                                | All data cells use this consistently |
| Header text           | Inherited from `DataTable` header defaults                                    | No custom overrides                  |
| Status chips          | `fontSize: '0.75rem'`, `fontWeight: 600`, `height: 24`, `borderRadius: '6px'` | Alpha-tinted background              |
| Meta / secondary text | `bodyXSRegular` with `color="text.secondary"`                                 | Used in activity drawer              |
| Action menu item text | `fontSize: '0.8125rem'`, `fontWeight: 500`                                    | Consistent across all menu items     |

### 1.2 Files to Audit & Fix

Every table in the following modules must be checked for typography variant divergence from the reference:

**IT Admin Dashboard** (`apps/intranet/src/pages/dashboard/it/`)

- `components/AdminDashboardTab` — incoming tickets table; align body text, chips, and action styling with the recruitment reference
- `components/AssetsTab` — asset inventory table
- `components/HelpdeskTab` — helpdesk tickets table
- `components/ComplianceTab` — compliance records table
- `components/SoftwareTab` — software requests table
- `components/SecurityTab` — security incidents table

**HRMS Admin** (`apps/intranet/src/pages/dashboard/admin/HRMS/`)

- `components/PortalUsers/index.tsx` — employee master table
- `components/PoshManagement/index.tsx` — POSH incidents + committee tables
- `components/FeedbackManagement/index.tsx` — feedback submissions table
- `components/IdeasManagement/index.tsx` — ideas table
- `components/MerchandiseManagement/index.tsx` — merchandise items table
- `components/PoliciesManagement/index.tsx` — HR policies table
- `components/ClaimCategories/index.tsx` — claim category/subcategory tables
- `components/Documents/index.tsx` — document management table (currently commented out in tabs)

**Admin Attendance** (`apps/intranet/src/pages/dashboard/admin/Attendance/`)

- `components/WorkShifts/index.tsx` — shifts table
- `components/HolidayCalendar/index.tsx` — holidays table
- `components/LeaveTypes/index.tsx` — leave types table
- `components/LeaveBalances/index.tsx` — leave balances table
- `components/LeaveApplications/index.tsx` — leave applications table
- `components/AttendanceOverview/index.tsx` — attendance records table

**HRMS Dashboard** (`apps/intranet/src/pages/dashboard/hrmsDashboard/`)

- `components/EmployeeMaster/index.tsx` — employee listing table
- `components/Approvals/components/LeaveRequests.tsx`
- `components/Approvals/components/WfhRequests.tsx`
- `components/Approvals/components/RegularizationRequests.tsx`
- `components/Approvals/components/ClaimRequests.tsx`

**Self-Service Claims** (`apps/intranet/src/pages/dashboard/claims/`)

- `index.tsx` — claims listing table
- `components/ViewDrawer/index.tsx` — claim detail drawer

**Self-Service Attendance** (`apps/intranet/src/pages/dashboard/attendance/`)

- `MyAttendance/` — attendance history table

**Profile** (`apps/intranet/src/pages/dashboard/profile/`)

- Document tables, nominee tables within profile tabs

**EditEmployeeFull** (`apps/intranet/src/pages/dashboard/hrmsDashboard/components/EditEmployeeFull/index.tsx`)

- Employee documents table (lines 548–628)
- Company documents table (lines 631–680)
- Document requests table (lines 683–728)
- Nominees table (lines 731–798)

### 1.3 Specific Fixes per File

For each file listed above:

- [ ] Replace any `bodySMedium` in **data cells** → `bodySRegular` (match reference)
- [ ] Ensure header cells do **not** have custom `fontWeight` or `fontSize` overrides unless matching the reference
- [ ] Ensure all status `Chip` components use the reference pattern: `height: 24`, `borderRadius: '6px'`, `fontWeight: 600`, `fontSize: '0.75rem'`, alpha-tinted background
- [ ] Ensure `noWrap` is applied to all body cell `Typography` to prevent overflow
- [ ] Remove any inline `sx={{ fontSize: ... }}` on table body cells — use variant only

---

## 2. Action Column Parity

### 2.1 Reference Pattern

The screened-applications reference uses a **`MoreVert` three-dot menu** via `ActionIconButton` + `Menu` for row actions (lines 833–857, 1149–1376).

Key conventions:

- `ActionIconButton` with `icon={<MoreVert />}` and `variant="primary"`
- `Stack direction="row" alignItems="center" justifyContent="center" gap={1.25}`
- Menu items: `py: 1`, `px: 1.5`, `borderRadius: '8px'`, icon `fontSize: 16`, text `fontSize: '0.8125rem'`, `fontWeight: 500`
- Hover: `alpha(theme.palette.primary.main, 0.08)` background
- Destructive items: `color: theme.palette.error.main`

### 2.2 Files to Align

- [ ] `EditEmployeeFull/index.tsx` — document action buttons (Verify/Reject) currently use `ActionIconButton` with `variant="success"/"error"/"info"` — acceptable for inline CRUD but should maintain icon size consistency (`fontSize: 16` or `"small"`)
- [ ] All IT admin tables — verify action columns use `ActionIconButton` from `@lektus/ui`, not raw `IconButton`
- [ ] All HRMS admin tables — same check
- [ ] Admin Attendance tables — WorkShifts uses inline edit; verify icon patterns are consistent
- [ ] Claims table action column — verify icon sizing and variant usage
- [ ] POSH Management — incident action column
- [ ] PortalUsers — edit/delete action column

### 2.3 Standardization Checklist

For every action column across intranet:

- [ ] Icons use `fontSize: 16` (or MUI `"small"`)
- [ ] `ActionIconButton` from `@lektus/ui` is used (not raw `IconButton` + `Tooltip`)
- [ ] Action cell uses `cellAlign: 'center'` + `headerAlign: 'center'`
- [ ] Minimum width ≥ 80px for single action, ≥ 120px for multiple
- [ ] Gap between action buttons is `0.5` to `1.25` (Stack spacing)

---

## 3. Table Wrapper / Control Layout Cleanup

### 3.1 Reference Pattern

The screened-applications `TableWrapper` uses a layout-based approach (lines 887–930):

```tsx
const controls = {
  search: {
    type: 'search',
    grid: 12,
    placeholder: 'Search screened applications...',
    onChange: setSearchText,
  },
  department: {
    type: 'dropdown',
    options: departmentOptions,
    value: departmentFilter,
    onChange: setDepartmentFilter,
    grid: { xs: 12, md: 4 },
  },
  status: {
    type: 'dropdown',
    options: statusOptions,
    value: statusFilter,
    onChange: setStatusFilter,
    grid: { xs: 12, md: 4 },
  },
};

const layout = {
  rows: [
    {
      left: ['search'],
      right: ['department', 'status'],
      leftSize: { xs: 12, md: 6 },
    },
  ],
};
```

**Key rules:**

- Search is **left-aligned**, sized `grid: 12` (fills its column)
- Dropdowns and buttons sit on the **right**
- **No extra labels or titles** above the table inside the wrapper
- The `title` control type exists but is **not used** in the wrapper for this table — the title comes from `MainLayout`

### 3.2 Files to Fix

Audit every intranet table wrapper for:

- [ ] **Remove `title` controls from `TableWrapper`** where the page/section already has a title from `MainLayout` or `SectionWrapper`. Tables should not have redundant titles inside the wrapper.
- [ ] **Search control** must be `left`-aligned using the `layout.rows[].left` array
- [ ] **Dropdowns and action buttons** must be `right`-aligned using `layout.rows[].right`
- [ ] All wrappers must use **MUI grid-based responsive** layouts via `TableWrapper` + `layout` prop
- [ ] Remove any manual `Box`/`Stack` layouts wrapping search + filters when `TableWrapper` can handle it natively

**Specific known issues:**

- IT admin tabs — some may have manual `Box` layouts for search/filters instead of `TableWrapper` layout
- Admin Attendance tabs — check if wrapper control includes extra titles
- HRMS PortalUsers — verify wrapper structure

---

## 4. Responsive / Overflow Fixes

### 4.1 Viewport Targets

All fixes must be verified on:

- **13-inch** viewport (~1280px wide)
- **16-inch** viewport (~1536px wide)

### 4.2 Specific Checks

- [ ] All table body cells use `noWrap` + parent container allows text truncation
- [ ] Column `minWidth` is set appropriately (reference uses 40–150px range)
- [ ] Tables with many columns (>8) support horizontal scroll without layout break
- [ ] `colWidths` + `onColumnResize` pattern is used where tables have resizable columns
- [ ] Filter dropdowns don't overflow on 13-inch when 3+ filters are shown — `grid: { xs: 12, md: 4 }` ensures stacking on smaller viewports
- [ ] Drawers (`ViewDrawer`, `AddDrawer`, etc.) don't overflow horizontally on 13-inch

---

## 5. History / Activity Presentation Normalization

### 5.1 Reference Pattern (ApplicationActivityDrawer)

The recruitment activity drawer (741 lines) uses:

- `Timeline` from `@mui/lab` with date-grouped entries
- Typography hierarchy: `variant="subtitle2"` for event titles, `bodyXSRegular` for metadata key/value pairs, `body2` for errors/empty states
- Secondary text treatment: `color="text.secondary"` consistently
- Date badge: custom `dateGroupBadge` style with line separators

### 5.2 Files to Align

Any intranet history list/table/drawer should visually match the activity drawer language:

- [ ] Claims `ViewDrawer/index.tsx` — claim timeline presentation
- [ ] Profile timeline (`profile.service.ts` → `getProfileTimelineRequest`)
- [ ] Attendance history logs — if showing a detailed log view
- [ ] Regularisation request detail — status timeline

### 5.3 Specific Rules

- [ ] Use `bodyXSRegular` for metadata labels, `text.secondary` for values
- [ ] Status transitions should use the `→` arrow pattern from the reference
- [ ] Date grouping labels ("Today", "Yesterday", "N days ago") should follow the reference helper pattern
- [ ] No ad-hoc Typography variants (e.g., `bodyMSecondary` — this was already identified as invalid in past conversations)

---

## 6. Validation Gap Fixes

### 6.1 CreateEmployee Validation (`CreateEmployee/index.tsx`)

**Current state (lines 339–360):**

- Create mode: validates only `txtFirstName`, `txtLastName`, `txtEmail`
- Edit mode: **empty Yup schema** (`Yup.object({})`) — no validation at all

**Required fixes:**

- [ ] **Edit mode must NOT use an empty validation schema.** Apply the same base validation as create mode at minimum.
- [ ] Add `dtBirthDate` validation: **reject future dates**
  ```tsx
  dtBirthDate: Yup.string()
    .nullable()
    .test(
      'not-future',
      'Date of birth cannot be in the future',
      (value) => !value || dayjs(value).isBefore(dayjs())
    );
  ```
- [ ] Add `txtPhone` validation: numeric-only, 10-digit (Indian mobile) or international format
  ```tsx
  txtPhone: Yup.string().matches(/^\d{10,15}$/, 'Enter a valid phone number');
  ```
- [ ] Add `txtEmail` validation for edit mode (currently only create has it)
- [ ] Add `txtEmergencyPhone` validation: same as phone
- [ ] Add `txtCtcInr` validation: numeric-only, positive
  ```tsx
  txtCtcInr: Yup.string().matches(/^\d+$/, 'CTC must be numeric');
  ```
- [ ] Add `txtYearsOfExperience` validation: numeric, ≥ 0
- [ ] Add `txtNoticePeriodDays` validation: numeric, ≥ 0
- [ ] Add status-date coupling: if `ddlEmploymentStatus` is `'Separated'`, `dtSeparationDate` should be required; if `'Probation'`, `dtProbationEndDate` should be required

### 6.2 EditEmployeeFull Validation (`EditEmployeeFull/index.tsx`)

**Current state:** `Formik` explicitly receives `validationSchema={Yup.object({})}`, so validation is effectively disabled.

**Required fixes:**

- [ ] Replace the empty `validationSchema` with one matching the upgraded CreateEmployee edit-mode schema (above)
- [ ] All the same field-level validations apply

### 6.3 Profile Form Validation

**Profile About** (profile tab inline editing):

- [ ] Date of birth: reject future dates
- [ ] Phone: numeric-only validation
- [ ] Emergency phone: numeric-only validation

**Profile Bank** (`profile.service.ts` → `createProfileBankRequest` / `updateProfileBankRequest`):

- [ ] Account number: numeric-only, exact length validation where business rules are known (typically 9–18 digits)
- [ ] IFSC code: uppercase alphanumeric, format `^[A-Z]{4}0[A-Z0-9]{6}$`
- [ ] Confirm account number: must match account number

**Profile Nominees** (`profile.service.ts` → `createProfileNomineeRequest`):

- [ ] Nominee date of birth: reject future dates
- [ ] PF share percent: 0–100 range, numeric-only

### 6.4 Claims Form Validation

Claims `AddEditClaim/index.tsx` and `AddDrawer/index.tsx`:

- [ ] Amount: numeric-only, positive, > 0
- [ ] Claim date: must not be a future date unless the product team explicitly allows future-dated claims
- [ ] Category/subcategory: required before submit

---

## 7. Employee Form Field Parity

### 7.1 Current Disparity

**CreateEmployee** (lines 662–786, many fields are **commented out**):

- Personal Information: only `firstName`, `middleName`, `lastName`, `email` are active
- Phone, Gender, Birth Date, Marital Status, Blood Group, Address — **commented out** (line 662)
- Employment Details: Platform Role, Employment Type, Joining Date — **commented out** (line 666)
- Compensation & Additional section — **wrapped in `{false && ...}`** (line 787)
- Emergency Contact section — **commented out** (line 786)

**EditEmployeeFull** (lines 800+):

- Renders **all fields** including Personal Info (phone, gender, DOB, marital status, blood group, address), Employment Details (role, type, joining date, probation/confirmation/separation dates), Organisation, Compensation & Additional, Emergency Contact
- Also has Documents tab and Nominees tab

### 7.2 Required Parity Restoration

`EditEmployeeFull` is the canonical employee-edit experience. `CreateEmployee` should expose the same field set where business rules allow:

- [ ] **Uncomment** Phone, Gender, Birth Date, Marital Status, Blood Group, Address fields in CreateEmployee Personal Information section
- [ ] **Uncomment** Platform Role, Employment Type, Joining Date fields in CreateEmployee Employment Details section
- [ ] **Uncomment** Location field in Organisation section (line 748)
- [ ] **Enable** Compensation & Additional section (change `{false && ...}` to `{true && ...}` or remove the guard)
- [ ] **Enable** Emergency Contact section
- [ ] Update `buildCreatePayload()` to include the restored fields (probation dates, CTC, experience, notice period, emergency contact, etc.) — currently only `buildUpdatePayload` sends these

### 7.3 Preserve Existing Behavior

- [ ] Keep employee code as auto-generated / read-only on create
- [ ] Keep email as **disabled** on edit mode (line 658)
- [ ] Preserve all dropdown data fetching from `dropdown.service.ts`

---

## 8. No-Extra-API-Call Discipline

### 8.1 Preserve Lazy Loading

The following already correctly use lazy loading — **do not regress**:

- `EditEmployeeFull` documents tab: loaded on tab switch via `fetchDocuments()` (guarded by `docsLoaded` flag)
- `EditEmployeeFull` nominees tab: loaded on tab switch via `fetchNominees()` (guarded by `nomineesLoaded` flag)
- Admin Attendance tab data: loaded per-tab via `fetchTabData(tabIndex)` with undefined-check guards

### 8.2 Remove Duplicate Fetch Triggers

Audit for:

- [ ] `useEffect` dependencies that include mutable state setters in their dep arrays (causes re-runs)
- [ ] Admin Attendance `fetchTabData` depends on `[holidays, leaveBalances, leaveTypes, shifts]` — each `handleUpdate` sets all to `undefined`, which triggers re-fetch of ALL tabs, not just the active one. This is correct but verify it doesn't cause cascade fetches.
- [ ] HRMS Dashboard `useHRMSDashboard.ts` — verify no parallel page-level loads occur when switching between Employee Master / Approvals / etc.
- [ ] Claims page `index.tsx` — verify debounced search + filter + pagination don't trigger overlapping API calls

### 8.3 Verification Checklist

- [ ] No extra API request on tab switch (only new tab data loads)
- [ ] No extra API request on drawer open/close
- [ ] Search debounce is 500ms (reference pattern: `useDebounce(searchText, 500)`)
- [ ] Pagination changes cancel/supersede in-flight requests
- [ ] Filter changes reset page to 1 (reference: `handleItemsPerPageChange` sets `setPage(1)`)

---

## 9. Test Plan

### 9.1 Visual Verification

| Viewport         | Tables to check                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| 13-inch (1280px) | All IT admin subtabs, Attendance admin tabs, HRMS PortalUsers, Claims listing, POSH management, EditEmployeeFull sub-tables |
| 16-inch (1536px) | Same list — verify no excess whitespace or misaligned columns                                                               |

For each table:

- [ ] Typography variants are uniform (`bodySRegular` body, consistent headers)
- [ ] Action column icons are properly sized and aligned
- [ ] Search bar is left, filters are right, no extra labels
- [ ] Status chips use standard alpha-tinted pattern
- [ ] `noWrap` truncation works without layout break

### 9.2 Validation Flows

| Flow                 | Test Cases                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create Employee      | Required fields (first name, last name, email) ● Invalid email ● Future DOB ● Non-numeric phone ● Non-numeric CTC ● Status set to "Separated" without separation date |
| Edit Employee (Full) | Same validations apply ● Schema is NOT empty ● Email is disabled                                                                                                      |
| Profile About edit   | Future DOB rejected ● Invalid phone rejected                                                                                                                          |
| Profile Bank edit    | Non-numeric account number ● Invalid IFSC ● Mismatched confirm account                                                                                                |
| Profile Nominee edit | Future DOB rejected ● PF share > 100 rejected                                                                                                                         |
| Claim create/edit    | Amount ≤ 0 rejected ● Missing category rejected                                                                                                                       |

### 9.3 API Call Discipline

- [ ] Open IT admin → switch all subtabs → verify only one fetch per tab
- [ ] Open Attendance admin → switch tabs → verify lazy loading
- [ ] Open EditEmployeeFull → switch to Documents tab → verify single fetch
- [ ] Search in any table → verify debounce (no burst requests)
- [ ] Change pagination → verify page reset + single request
- [ ] Open/close drawers → verify no re-fetch of parent table

---

## 10. Assumptions & Defaults

1. **Backend APIs are already sufficient** for all Plan A changes; no new endpoints should be needed
2. **Recruitment screened-applications** is the approved visual baseline for all tables
3. **`EditEmployeeFull`** is the canonical employee-edit experience and drives parity restoration
4. Table fixes are **broad and cross-module**, but claims flow rewiring and new admin features belong to Plan B
5. Typography variants used must be from the Lektus theme — no custom `fontSize`/`fontWeight` in body cells
6. All validation should stay aligned with backend constraints already present in employee/profile management flows

---

## Appendix: File Index

| Module                    | Key Files                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| Recruitment Reference     | `apps/recruitment/src/pages/dashboard/ScreenedApplication/index.tsx`                                      |
| Activity Drawer Reference | `apps/recruitment/src/pages/dashboard/ScreenedApplication/components/ApplicationActivityDrawer/index.tsx` |
| IT Dashboard              | `apps/intranet/src/pages/dashboard/it/index.tsx` + `components/`                                          |
| HRMS Admin                | `apps/intranet/src/pages/dashboard/admin/HRMS/index.tsx` + `components/`                                  |
| Admin Attendance          | `apps/intranet/src/pages/dashboard/admin/Attendance/index.tsx` + `components/`                            |
| HRMS Dashboard            | `apps/intranet/src/pages/dashboard/hrmsDashboard/index.tsx` + `components/`                               |
| CreateEmployee            | `apps/intranet/src/pages/dashboard/hrmsDashboard/components/CreateEmployee/index.tsx`                     |
| EditEmployeeFull          | `apps/intranet/src/pages/dashboard/hrmsDashboard/components/EditEmployeeFull/index.tsx`                   |
| Claims                    | `apps/intranet/src/pages/dashboard/claims/index.tsx` + `AddEditClaim/` + `components/`                    |
| Profile                   | `apps/intranet/src/pages/dashboard/profile/index.tsx` + `components/`                                     |
| Profile Service           | `apps/intranet/src/services/profile.service.ts`                                                           |
| Employee Service          | `apps/intranet/src/services/employee.service.ts`                                                          |
| HRMS Service              | `apps/intranet/src/services/hrms.service.ts`                                                              |
