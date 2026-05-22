# Plan B — Intranet Pending Integration / Existing API Adoption

> **Phase**: Frontend integration with already-available backend APIs — no backend changes planned.
> **Backend source of truth**: `/home/satya/Desktop/techechelons/Lektus/lektus-api/src/modules/intranet/`
> **Last updated**: 2026-05-12

---

## 1. Claims

### 1.1 Current State

| Item                            | Path                                                              | Status                               |
| ------------------------------- | ----------------------------------------------------------------- | ------------------------------------ |
| Claim listing + routed add/edit | `claims/index.tsx`, `claims/AddEditClaim/index.tsx`               | Active                               |
| Multi-item claim drawer         | `claims/components/AddDrawer/index.tsx`                           | Exists but separate UX               |
| View drawer                     | `claims/components/ViewDrawer/index.tsx`                          | Active                               |
| Claims service                  | `services/claims.service.ts`                                      | Full CRUD + attachments + categories |
| HRMS claim approvals            | `hrmsDashboard/components/Approvals/components/ClaimRequests.tsx` | Active                               |
| Admin claim categories          | `admin/HRMS/components/ClaimCategories/index.tsx`                 | Active                               |

### 1.2 Required Changes

- [ ] **Consolidate claim creation UX** — route the routed `AddEditClaim` page and the `AddDrawer` drawer so only one claim creation experience exists. Either merge drawer behavior into the routed page, or redirect the routed page to use the drawer.
- [ ] Each claim item must support: own attachments, amount, description, category/subcategory, draft/submit flow
- [ ] Claim listing "View" action must open `ViewDrawer` with proper itemized details and timeline
- [ ] Verify claim-category parent flow against existing `claims.service.ts` → `getClaimCategoriesRequest()` which already supports parent categories with subcategories
- [ ] Keep current parent-category support if it matches product intent

### 1.3 Service Coverage

All needed endpoints exist in `claims.service.ts`:

- `createClaimRequest`, `updateClaimRequest`, `cancelClaimRequest`, `submitClaimRequest`
- `addClaimAttachmentRequest`, `deleteClaimAttachmentRequest`
- `getClaimCategoriesRequest` (with subcategories)
- `getClaimDetailRequest`, `getClaimStatsRequest`

**No new service wrappers needed.**

---

## 2. Attendance & Leave Admin

### 2.1 Current State

| Item                          | Path                                  | Status                                                                                                                |
| ----------------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Admin Attendance page         | `admin/Attendance/index.tsx`          | 4 tabs: Shifts, Holidays, Leave Types, Leave Balances                                                                 |
| Leave balances service        | `adminAttendance.service.ts`          | `getLeaveBalancesRequest`, `createLeaveBalanceRequest`, `updateLeaveBalanceRequest`, `initializeLeaveBalancesRequest` |
| Attendance records service    | `adminAttendance.service.ts`          | `getAttendanceRecordsRequest`, stats, trend, department summary, today summary                                        |
| HRMS Approvals                | `hrmsDashboard/components/Approvals/` | Leave, WFH, Regularization, Claim request tabs                                                                        |
| Attendance management service | `attendanceManagement.service.ts`     | Duplicate of some admin attendance calls                                                                              |

### 2.2 Required Changes

- [ ] **Add employee list with leave info** — use `getLeaveBalancesRequest` with filters for department/team/employee. Build a filterable table in the Leave Balances tab showing per-employee leave data.
- [ ] **Add assign-multiple-leave-balances UI** — use `createLeaveBalanceRequest` to assign multiple leave types to one employee. Add a drawer/dialog with employee selector + leave type multi-select + balance inputs.
- [ ] **Add "apply one leave type to all employees" UI** — use `initializeLeaveBalancesRequest` with explicit overwrite handling. Add confirmation dialog: "This will overwrite existing balances for [leave type]. Continue?"
- [ ] Add department/team/employee dropdown filters using existing `dropdown.service.ts` → `getDepartmentsDropdown()`, `getTeamsDropdown()`, `getEmployeesDropdown()`

### 2.3 Service Coverage

All endpoints exist in `adminAttendance.service.ts`:

- `initializeLeaveBalancesRequest` — POST `/intranet/leaves/balances/initialize`
- `createLeaveBalanceRequest` — POST `/intranet/leaves/balances`
- `updateLeaveBalanceRequest` — PATCH `/intranet/leaves/balances/:id`
- `getLeaveBalancesRequest` — GET `/intranet/leaves/balances`

**No new service wrappers needed.**

---

## 3. Self-Service Attendance / Regularisation

### 3.1 Current State

| Item               | Path                                                          | Status                                                                         |
| ------------------ | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Attendance service | `attendance.service.ts`                                       | Full: dashboard, calendar, logs, regularisation CRUD, WFH CRUD, eligible dates |
| My Attendance page | `attendance/MyAttendance/`                                    | Active                                                                         |
| Eligible dates API | `attendance.service.ts` → `getEligibleDatesRequest(count=15)` | Exists                                                                         |

### 3.2 Required Changes

- [ ] **Integrate new history API/filter behavior** for WFH, regularisation, and leaves where current calls or filters are outdated
- [ ] **Use eligible regularisation dates API** — `getEligibleDatesRequest(15)` — restrict date selection in regularisation form to returned dates only (default `count: 15`)
- [ ] **Show available regularisation dates summary** before history — display count and date range of eligible dates above the history table
- [ ] Verify `getRegularisationsRequest`, `getWfhRequestsRequest` filter params match current backend expectations (status, search, pagination)

### 3.3 Service Coverage

All endpoints exist in `attendance.service.ts`:

- `getEligibleDatesRequest(count)` — GET `/intranet/me/regularisation/eligible-dates`
- `getRegularisationsRequest(params)` — GET `/intranet/me/regularisation/`
- `getWfhRequestsRequest(params)` — GET `/intranet/me/wfh/`

**No new service wrappers needed.**

---

## 4. Employee Management

### 4.1 Current State

| Item              | Path                                                  | Status                                             |
| ----------------- | ----------------------------------------------------- | -------------------------------------------------- |
| CreateEmployee    | `hrmsDashboard/components/CreateEmployee/index.tsx`   | Reduced field set (many commented out)             |
| EditEmployeeFull  | `hrmsDashboard/components/EditEmployeeFull/index.tsx` | Full field set + Documents + Nominees tabs         |
| PortalUsers admin | `admin/HRMS/components/PortalUsers/index.tsx`         | Employee listing with edit action                  |
| Employee service  | `hrms.service.ts`                                     | Full CRUD: list, get by ID, create, update, delete |

### 4.2 Required Changes

- [ ] **Verify admin entry points route to EditEmployeeFull** — check that PortalUsers "Edit" action navigates to `EditEmployeeFull`, not the reduced `CreateEmployee` in edit mode
- [ ] If admin still lands on reduced create/edit, **switch routes/navigation** so the full page is used consistently
- [ ] Keep employee documents, request-document, issue-document, verify/reject, and nominees in the admin employee flow — these are already implemented in `EditEmployeeFull` with:
  - `IssueDocForEmployeeDrawer.tsx`
  - `RequestDocForEmployeeDrawer.tsx`
  - Document verify/reject actions (lines 494–530)
  - Nominees tab (lines 426–448)

### 4.3 Route Verification

Check `routes/paths.ts` to ensure:

- [ ] HRMS dashboard edit route points to `EditEmployeeFull`
- [ ] Admin HRMS edit route points to `EditEmployeeFull`
- [ ] Both contexts share the same component, differentiated by `isAdminContext` flag

---

## 5. Communications

### 5.1 Current State

| Item                   | Path                                      | Status                                                          |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------- |
| Communications service | `communications.service.ts`               | Feed CRUD, reactions, comments, admin post create/update/delete |
| Backend routes         | `communications/communications.routes.ts` | Active                                                          |

### 5.2 Missing Features (Backend Audit)

The backend `communications.controller.ts` does **NOT** currently expose:

- ❌ Post reorder endpoint
- ❌ Pending approvals endpoint
- ❌ Communication templates

### 5.3 Required Changes

- [ ] **Add reorder service method** — only if backend supports it. Current audit shows no reorder/pending/approve/template endpoints in the communications controller. **Mark as blocked on backend confirmation.**
- [ ] **Add pending approvals UI** — blocked on backend. Need to confirm with Shashikant if `communications approve` permission and pending endpoint will be added.
- [ ] Gate approvals behind the new communication approve permission once available
- [ ] Build approval list/action screens using pending endpoint once available

### 5.4 Service Gaps

| Endpoint                  | Frontend Service | Backend      | Status                      |
| ------------------------- | ---------------- | ------------ | --------------------------- |
| Post reorder              | ❌ Missing       | ❌ Not found | **Blocked — needs backend** |
| Pending approvals         | ❌ Missing       | ❌ Not found | **Blocked — needs backend** |
| Post create/update/delete | ✅ Exists        | ✅ Exists    | Ready                       |
| Feed/reactions/comments   | ✅ Exists        | ✅ Exists    | Ready                       |

---

## 6. Communication Templates

> **Status: Pending Confirmation**

- [ ] Treat as a separate feature
- [ ] Add only after confirming the creation workflow with Shashikant — template usage rules are product-unclear
- [ ] Backend does not currently expose template endpoints
- [ ] **Do not implement until product confirmation is received**

---

## 7. POSH

### 7.1 Current State

| Item                             | Path                                             | Status                                              |
| -------------------------------- | ------------------------------------------------ | --------------------------------------------------- |
| POSH service                     | `posh.service.ts`                                | Full: committee CRUD, incidents CRUD, status update |
| POSH admin tab                   | `admin/HRMS/components/PoshManagement/index.tsx` | Active                                              |
| Self-service incident submission | Via `submitPoshIncidentRequest`                  | Available                                           |

### 7.2 Required Changes

- [ ] **Verify** current HRMS POSH management tab against backend coverage
- [ ] Check if the tab exposes: committee add/edit/delete, incident list/status update, committee role editing
- [ ] Only add missing committee-role actions if the current tab does **not** expose full CRUD already supported by `posh.service.ts`:
  - `addPoshCommitteeMemberRequest`
  - `updatePoshCommitteeMemberRequest`
  - `deletePoshCommitteeMemberRequest`
  - `updatePoshIncidentStatusRequest`

### 7.3 Service Coverage

All endpoints exist in `posh.service.ts`. **No new service wrappers needed.**

---

## 8. Workshift

### 8.1 Current State

| Item                 | Path                                               | Status                                         |
| -------------------- | -------------------------------------------------- | ---------------------------------------------- |
| WorkShifts admin tab | `admin/Attendance/components/WorkShifts/index.tsx` | Active — uses inline edit                      |
| Shift service        | `adminAttendance.service.ts`                       | CRUD: create, update, delete, list, get by ID  |
| Backend shift routes | `shift/shift.routes.ts`                            | Full CRUD + delete-block if employees assigned |

### 8.2 Required Changes

- [ ] **Replace weak inline-edit UX** with proper form controls/select inputs — use a drawer or dialog with proper `TextInput`/`SelectInput` fields instead of editing directly in table cells
- [ ] **Add employee shift assign/overwrite action** — use `updateEmployeeRequest` from `hrms.service.ts` to update `shiftId` on an employee. The employee update endpoint already accepts `shiftId`.
- [ ] **Permission-gate** the shift assignment action by `INTRANET_PERMISSIONS.EMPLOYEES_MANAGE`
- [ ] Backend already blocks shift deletion when employees are assigned (`shift.constants.ts`: `HAS_EMPLOYEES` error)

### 8.3 Service Coverage

- Shift CRUD: `adminAttendance.service.ts` — ✅
- Employee shift assignment: `hrms.service.ts` → `updateEmployeeRequest(id, { shiftId })` — ✅
- **No new service wrappers needed for shift assignment** — it's an employee update

---

## 9. HR Policy

### 9.1 Current State

| Item                | Path                                                                           | Status                                                  |
| ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------- |
| HR Policies service | `hrPolicies.service.ts`                                                        | Full: list, create, update, delete, acceptances, accept |
| Policies admin tab  | `admin/HRMS/components/PoliciesManagement/index.tsx`                           | Active                                                  |
| Policy drawer       | `admin/HRMS/components/PoliciesManagement/components/HRPolicyDrawer/index.tsx` | Active                                                  |

### 9.2 Required Changes

- [ ] **Update admin HR policy creation to support file upload** — current `CreateHRPolicyPayload` already has `fileUrl?: string | null`, so the backend accepts file-backed payloads via URL
- [ ] Add file upload input to `HRPolicyDrawer` using `uploadFilesRequest` from `upload.service.ts` to get a URL, then pass it as `fileUrl`
- [ ] Keep URL-only input as an alternative (user can paste URL or upload file)

### 9.3 Service Coverage

All endpoints exist. Upload service already exists at `services/upload.service.ts`. **No new service wrappers needed.**

---

## 10. HR Tickets / Merchandise / Unclear Business Items

### 10.1 Admin Raise HR Ticket

- [ ] **Blocked** — add admin Raise HR Ticket list only after Shashikant provides the intended admin API
- [ ] Current `helpdesk.service.ts` exists for employee self-service tickets but admin listing/management endpoints are unconfirmed
- [ ] **Mark as pending confirmation in implementation**

### 10.2 Merchandise Points

- [ ] **Blocked** — merchandise points remains blocked on business rule clarification
- [ ] Current `merchandise.service.ts` exists and `MerchandiseManagementTab` is active
- [ ] Point allocation/redemption rules are product-unclear
- [ ] **Document as pending, not implementable yet**

---

## 11. Frontend Service Gaps Summary

| Missing Service Method              | Backend Endpoint                      | Action                               |
| ----------------------------------- | ------------------------------------- | ------------------------------------ |
| Communications reorder              | ❌ Not in backend                     | Blocked — needs backend API          |
| Communications pending approvals    | ❌ Not in backend                     | Blocked — needs backend API          |
| Communication templates             | ❌ Not in backend                     | Blocked — needs product confirmation |
| Shift assignment per employee       | ✅ Via `updateEmployeeRequest`        | No new wrapper needed                |
| Attendance history filter endpoints | ✅ Already in `attendance.service.ts` | Verify params match backend          |
| HR ticket admin list                | ❓ Unconfirmed                        | Blocked — needs API from Shashikant  |

---

## 12. Permission-Sensitive Actions

All permission-sensitive actions must be **hidden, not just disabled**, when permission is absent:

- [ ] Claim approve/reject buttons — hide if no claims-manage permission
- [ ] Shift assignment button — hide if no employee-manage permission
- [ ] Communication approvals — hide if no communication-approve permission (once available)
- [ ] POSH committee actions — hide if no POSH-manage permission
- [ ] HR Policy create/edit/delete — hide if no HR-policies-manage permission
- [ ] Employee edit/delete — hide if no employees-manage permission

Reference pattern from recruitment: conditional rendering with `canManage && (...)` (not `disabled={!canManage}`).

---

## 13. Test Plan

### 13.1 Claims E2E

- [ ] Create draft with multiple items
- [ ] Submit with required attachments
- [ ] View in drawer — verify itemized details + timeline
- [ ] Edit draft — verify fields are editable
- [ ] Verify/approve/reject via HRMS management flow

### 13.2 Attendance/Leave Admin

- [ ] Filter employees by department/team/employee
- [ ] Assign multiple leave types to one employee
- [ ] Initialize one leave type for all employees with `overwrite: false` — verify no existing balances are overwritten
- [ ] Initialize with `overwrite: true` — verify confirmation dialog + overwrite behavior

### 13.3 Regularisation

- [ ] Only eligible dates are selectable (from `getEligibleDatesRequest`)
- [ ] Default count of 15 dates
- [ ] History filters return correct list types (regularisation, WFH, leaves)

### 13.4 Communications

- [ ] Post create/update/delete works
- [ ] Reorder persistence — **skip if blocked on backend**
- [ ] Pending approvals fetch/action — **skip if blocked on backend**
- [ ] Permission guard for approvers — **skip if blocked on backend**

### 13.5 Workshift

- [ ] Create/edit shift via proper form (not inline)
- [ ] Assign shift to employee — verify employee update succeeds
- [ ] Permission-gated button visibility — hide for non-managers

### 13.6 Employee Admin

- [ ] Open edit from PortalUsers → lands on `EditEmployeeFull`
- [ ] Documents tab loads lazily, actions (verify/reject/issue/request) succeed
- [ ] Nominees tab loads lazily

### 13.7 Full E2E Regression

- [ ] No unnecessary API call bursts on tab switches
- [ ] No unnecessary API calls on drawer opens
- [ ] No unnecessary API calls on filter changes (debounce respected)

---

## 14. Assumptions & Defaults

1. **No backend changes** are planned unless a frontend blocker is discovered
2. Existing implemented items should be **audited first before rebuilding**:
   - Claim parent-category support already exists in `claims.service.ts`
   - Multi-item claim drawer already exists in `claims/components/AddDrawer/`
   - POSH management already exists in `admin/HRMS/components/PoshManagement/`
   - Full employee edit with documents/nominees already exists in `EditEmployeeFull`
3. **Communication templates**, **admin HR tickets**, and **merchandise-point rules** remain partially blocked by product/API clarification — explicitly marked as "pending confirmation"
4. All permission checks use `INTRANET_PERMISSIONS` constants from `@lektus/utils`
