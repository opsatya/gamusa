# QA Report — Tanishak / Intranet Dashboard

**Reporter:** Tanishak
**Build under test:** `te-tanishak-intranet-homepage`
**Date raised:** 18 May 2026
**Reference bar:** Stripe / Linear / Notion-grade polish per [CLAUDE.md](../CLAUDE.md)

> ⚠️ **Cross-cutting blockers** flagged in this report (read first):
>
> - **API contract failure** in HRMS Category Management (POST → `subcategories not found`) — blocks all subcategory creation.
> - **Date / time validation gaps** across WFH, Leave, Regularisation forms — past dates accepted; Out Time can precede In Time (data-integrity risk).
> - **Leave-balance overflow** — users can apply more leaves than allotted (18/12 days) — business-rule breach.
> - **Permission-gating audit** required on calendar/leave/WFH approval flows — stale "pending" approvals for past dates suggest backend-state mismatch.

---

## 1. HRMS › Category Management

**File:** [apps/intranet/src/pages/dashboard/admin/HRMS/components/CategoryManagement/](../apps/intranet/src/pages/dashboard/admin/HRMS/components/CategoryManagement/)
Related: [SubcategoryDrawer.tsx](../apps/intranet/src/pages/dashboard/hrmsDashboard/components/Approvals/components/SubcategoryDrawer.tsx), [CategoryFormDrawer.tsx](../apps/intranet/src/pages/dashboard/admin/HRMS/components/CategoryManagement/CategoryFormDrawer.tsx)

| #   | Severity          | Issue                                                                                                                                 | Recommended Fix                                                                                                                                                                    | Acceptance Criteria                                                                                                |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1.1 | **Bug — Blocker** | `POST /api/v1/intranet/claims-management/categories/{id}/subcategories` returns `Route … not found`. User cannot add any subcategory. | Verify backend route registration (controller mount path, plural vs. singular, trailing slash). On the frontend, confirm the mutation URL matches the API spec — _verify in docs_. | Adding a subcategory under any parent category succeeds (200) and the new row appears in the list without refresh. |

---

## 2. Attendance & Leaves — Self Service

**File:** [apps/intranet/src/pages/dashboard/attendance/MyAttendance/](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/)

| #    | Severity                 | Issue                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Recommended Fix                                                                                                                                                                                                                                                          | Acceptance Criteria                                                                                                                                |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1  | **Bug**                  | Date picker in WFH, Apply Leave, Regularisation does not match project standard `DatePicker` component. Past dates are accepted. Validations on all three forms are incorrect. See [WFHRequestDialog/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/WFHRequestDialog/index.tsx), [ApplyLeaveDialog/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/ApplyLeaveDialog/index.tsx), [RegularisationDialog/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/RegularisationDialog/index.tsx). | Replace local date inputs with shared `DatePicker` from `packages/ui`. Add `minDate={today}` for WFH + Leave (future-only). Regularisation keeps past dates but block future. Re-audit Zod schemas: required fields, date range (From ≤ To), reason min-length.          | Past dates rejected on WFH/Leave with inline error. Schema-level validation matches `'Please…'` standard. All three forms use the same DatePicker. |
| 2.2  | **UX / UI**              | History tab — **Reason** column renders a wall of text in a single line, breaking the row layout. See [AttendanceHistory/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/AttendanceHistory/index.tsx).                                                                                                                                                                                                                                                                                                                                                        | Apply `line-clamp: 2` with tooltip on hover; ellipsis + "View more" expand affordance for full text. Constrain column `maxWidth` via theme spacing tokens.                                                                                                               | Long reasons truncate at 2 lines; full text visible on tooltip / expand. No horizontal table overflow.                                             |
| 2.3  | **Bug**                  | HRMS Dashboard › WFH tab still lists WFH requests as **Pending** even though the requested dates (e.g. 13/05–15/05) are already in the past (today = 18/05). See [WfhManagementList/index.tsx](../apps/intranet/src/pages/dashboard/hrmsDashboard/components/WfhManagementList/index.tsx) and [WfhRequests.tsx](../apps/intranet/src/pages/dashboard/hrmsDashboard/components/Approvals/components/WfhRequests.tsx).                                                                                                                                                                             | Add backend cron / on-read filter to auto-expire pending requests whose `toDate < today` → status `Lapsed`. On the frontend, filter out lapsed entries from the default Pending list and surface a "Lapsed" tab. _Verify auto-expiry policy with PM._                    | No request with `toDate < today` appears under Pending. Lapsed entries are visible under a separate filter.                                        |
| 2.4  | **UX / UI**              | "Search requests" field uses non-standard styling (border + custom height).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Replace with shared `SearchInput` from `packages/ui` (used in other admin tables).                                                                                                                                                                                       | Search field visually identical to Employee Master and Claims search.                                                                              |
| 2.5  | **Feature Gap**          | Self Service › Attendance & Leaves currently exposes only **Dashboard** and **History** tabs; spec calls for **Mark Attendance, Apply Leave, Regularisation** to also be tabs (per reference build). See [MyAttendance/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/index.tsx).                                                                                                                                                                                                                                                                                       | Add three additional tabs that mount existing `MarkAttendance`, `ApplyLeave`, `Regularisation` components (currently used as drawers / dialogs). Confirm IA with PM before unifying drawer + tab flows.                                                                  | All five tabs visible in the order: Dashboard · Mark Attendance · Apply Leave · Regularisation · History.                                          |
| 2.6  | **Bug**                  | Approved WFH (e.g. 30 May–03 Jun) does **not** render on the Dashboard calendar in advance. Approved leaves also missing on the calendar.                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Calendar data source must include approved WFH/Leave entries with `date ≥ today`. Render with primary-dark token for WFH, leave-token for leaves. See [AttendanceCalendar/index.tsx](../apps/intranet/src/pages/dashboard/home/components/AttendanceCalendar/index.tsx). | Future approved WFH days highlighted in primary-dark; future approved leaves in leave color; legend updated.                                       |
| 2.7  | **UX / UI**              | "Supporting Document (Optional)" upload field on Apply Leave drawer does not match project file-upload component standard. See [ApplyLeaveDialog/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/ApplyLeaveDialog/index.tsx).                                                                                                                                                                                                                                                                                                                                 | Swap to shared `FileUpload` (drag-drop + format hint + size cap). Specify allowed types: `pdf, jpg, png, docx`. Add client-side MIME + size validation.                                                                                                                  | Upload UI identical to Documents/POSH upload. Wrong type → inline error. >5 MB → inline error.                                                     |
| 2.8  | **Bug — Data integrity** | Regularisation Request: **Correct Out Time** can be set earlier than **Correct In Time**; both can be in the past. See [RegularisationDialog/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/RegularisationDialog/index.tsx).                                                                                                                                                                                                                                                                                                                                 | Zod refine: `outTime > inTime`. Also enforce `inTime` within working-hours window for the selected date. Add inline error messages.                                                                                                                                      | Submitting Out < In is blocked with error "Out Time must be after In Time".                                                                        |
| 2.9  | **UX / UI**              | Dashboard calendar does not paint **Holiday** dates, even though the Attendance & Leaves tab calendar does.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Reuse the same holiday-fetch hook used in Attendance & Leaves calendar inside [AttendanceCalendar/index.tsx](../apps/intranet/src/pages/dashboard/home/components/AttendanceCalendar/index.tsx). Ensure legend "Holiday" key is visible.                                 | Public holidays painted with consistent token + legend matches Attendance & Leaves tab.                                                            |
| 2.10 | **Bug — Business rule**  | Leave Balance shows **18/12 days** — user has consumed/applied more than allotted. No cap on Apply Leave.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Backend: enforce balance check on submit (`requested ≤ remaining`). Frontend: disable Submit when computed days > balance and show inline error. Reconcile current overage with HR.                                                                                      | Apply Leave blocks submission once balance reaches 0; UI shows live `remaining = total − consumed` math.                                           |

---

## 3. My Claims

**File:** [apps/intranet/src/pages/dashboard/claims/](../apps/intranet/src/pages/dashboard/claims/)

| #   | Severity    | Issue                                                                                                                                                                                                                                                                                                      | Recommended Fix                                                                                                                                               | Acceptance Criteria                                                |
| --- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 3.1 | **UX / UI** | "How Claims Work" stepper — the dotted connector between **You Submit** → **MD Approval** has a white gap cutting through the badges. See [claims/index.tsx](../apps/intranet/src/pages/dashboard/claims/index.tsx) + [claims/index.style.ts](../apps/intranet/src/pages/dashboard/claims/index.style.ts). | Stepper connector `background` should sit _behind_ step badges (`z-index: 0` on connector, `z-index: 1` on badges). Use solid `divider` token, not white gap. | Connector renders as continuous line behind all four step circles. |
| 3.2 | **UX / UI** | "Search claims…" input is not the standard `SearchInput`.                                                                                                                                                                                                                                                  | Replace with shared `SearchInput`; remove ad-hoc border styling.                                                                                              | Field is pixel-identical to other admin search fields.             |

---

## 4. My Profile › About

**File:** [apps/intranet/src/pages/dashboard/profile/components/AboutTab/](../apps/intranet/src/pages/dashboard/profile/components/AboutTab/)

| #   | Severity    | Issue                                                                                                                                                                                                                                                                                             | Recommended Fix                                                                                                                                          | Acceptance Criteria                                                                                            |
| --- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 4.1 | **Bug**     | Edit drawer has **no form validation**. See [AboutEditDrawer.tsx](../apps/intranet/src/pages/dashboard/profile/components/AboutTab/AboutEditDrawer.tsx).                                                                                                                                          | Add Zod schema covering About / Interests & Hobbies / Skills. Error messages must use `Please…` format.                                                  | Empty required field → inline error; invalid submit blocked.                                                   |
| 4.2 | **Bug**     | Text areas have **no character limit**; large blobs of text break the read view layout.                                                                                                                                                                                                           | Apply `maxLength` per field (suggest: About 500, Interests & Hobbies 300). Show live `count/max` counter under each textarea. Trim whitespace on submit. | Counter visible; typing past `max` is blocked; long content wraps cleanly in read view.                        |
| 4.3 | **UX / UI** | Required fields missing the `*` asterisk indicator.                                                                                                                                                                                                                                               | Pass `required` prop to `TextInput` label OR add `*` suffix in label per design tokens.                                                                  | Every mandatory field shows `*` in the label.                                                                  |
| 4.4 | **UX / UI** | Typography in read view does not match design system (raw text, no hierarchy). See [AboutTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/AboutTab/index.tsx) + [AboutTab/index.style.ts](../apps/intranet/src/pages/dashboard/profile/components/AboutTab/index.style.ts). | Use theme typography variants only (`bodySMedium` for primary, `bodySRegular` + `textSecondary` for body). Group sections via `SectionWrapper`.          | About / Interests & Hobbies render with proper heading variants and spacing tokens — no manual font overrides. |

---

## 5. My Profile › Helpdesk

**File:** [apps/intranet/src/pages/dashboard/profile/components/HelpdeskTab/](../apps/intranet/src/pages/dashboard/profile/components/HelpdeskTab/)

| #   | Severity | Issue                                                                          | Recommended Fix                                                                                                                                                                                                                                  | Acceptance Criteria                                                       |
| --- | -------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| 5.1 | **Bug**  | **Category** column renders as empty cell when the underlying value is `null`. | Add fallback render `value ?? '-'` (or shared `EmptyCellPlaceholder`). Apply consistently across all columns where null is possible. See [HelpdeskTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/HelpdeskTab/index.tsx). | Null/empty category renders as `-`. No empty cells anywhere in the table. |

---

## 6. HRMS › Dashboard › Employee Master

**File:** [apps/intranet/src/pages/dashboard/hrmsDashboard/components/EmployeeMaster/index.tsx](../apps/intranet/src/pages/dashboard/hrmsDashboard/components/EmployeeMaster/index.tsx)

| #   | Severity    | Issue                                                        | Recommended Fix                                                                                                                        | Acceptance Criteria                                                |
| --- | ----------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 6.1 | **UX / UI** | Search field deviates from project's standard `SearchInput`. | Replace with shared `SearchInput` from `packages/ui`. Same fix applies to other admin tables — keep this swap consistent project-wide. | Visually identical to standard search across Claims, History, etc. |

---

# 7. Responsiveness Audit

**Reference standards:** [apps/admin/PROJECT_GUIDE.md](../apps/admin/PROJECT_GUIDE.md) and [apps/admin/DASHBOARD_PAGE_PATTERNS.md](../apps/admin/DASHBOARD_PAGE_PATTERNS.md).

**Canonical patterns these files must follow:**

- **MUI Grid v6 size prop** — `<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>` (never `item xs={…}` legacy syntax).
- **Header + actions row** — `MainLayout` with `showPrimaryAction` + `primaryAction`. On `xs`, header collapses to column; action button becomes full-width.
- **Table header filters** — `TableWrapper` with declarative `layout.rows[]` (`left`, `right`, `leftSize`). On `xs`, all controls drop to full-width rows.
- **Form fields** — `Grid container spacing={2}` parent, `size={12}` on `xs`, `size={{ xs: 12, md: 6 }}` for two-column desktop.
- **Section gap** — vertical sections inside `<Stack spacing={t.SECTION_GAP}>` (≈ 26 px).
- **Card grids** — `<Grid container spacing={2} rowSpacing={3}>` with `size={{ xs: 12, sm: 6, md: 4, lg: 3 }}` for stat / holiday / tile cards.

**Common anti-patterns observed:** raw flex rows that don't wrap (`flexWrap: nowrap`), buttons hard-coded with `direction="row"` without `flexWrap`, headers using fixed-width buttons that overflow on mobile, tile grids using `display: flex` instead of `Grid`, page bodies that bypass `MainLayout` entirely.

---

## 7.1 Profile › Documents

**File:** [apps/intranet/src/pages/dashboard/profile/components/DocumentsTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/DocumentsTab/index.tsx)

| #     | Severity    | Issue                                                                                                                         | Recommended Fix                                                                                                                                                                                                                                                                | Acceptance Criteria                                                               |
| ----- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| 7.1.1 | **UX / UI** | "Search documents" + "Upload documents" sit on a single non-wrapping row; on `< md` the button is pushed offscreen / clipped. | Wrap in `TableWrapper` `controls`: `search` (`grid: { xs: 12, md: 8 }`) + `upload` action injected via `MainLayout` `primaryAction` OR a custom control with `grid: { xs: 12, md: 4 }`. Drop into `<Stack direction={{ xs: 'column', md: 'row' }}>` if not using TableWrapper. | At `xs`: search row 1 (100%), Upload button row 2 (100%). At `md+`: side-by-side. |

## 7.2 Profile › Nominees

**File:** [apps/intranet/src/pages/dashboard/profile/components/NomineesTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/NomineesTab/index.tsx)

| #     | Severity    | Issue                                                               | Recommended Fix                                                                                                                                                                                                                              | Acceptance Criteria                                                     |
| ----- | ----------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 7.2.1 | **UX / UI** | "Add Nominee" button overflows the section header at mobile widths. | Move the action into `MainLayout.primaryAction` if Nominees is the page-level primary CTA, OR use `<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent={{ sm: 'space-between' }}>`. Make button `fullWidth` on `xs`. | At `xs`: button stretches full width below title. No horizontal scroll. |

## 7.3 Profile › Timeline

**File:** [apps/intranet/src/pages/dashboard/profile/components/TimelineTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/TimelineTab/index.tsx)

| #     | Severity    | Issue                                                                                          | Recommended Fix                                                                                                                                                                              | Acceptance Criteria                                         |
| ----- | ----------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 7.3.1 | **UX / UI** | "Joining" milestone button / pill does not wrap on small screens; timeline tile breaks layout. | Convert the timeline row to `<Grid container spacing={2}>` with `size={{ xs: 12, sm: 6 }}` per milestone tile. Replace inline flex row with `Stack direction={{ xs: 'column', sm: 'row' }}`. | Milestones stack vertically on `xs`, side-by-side on `sm+`. |

## 7.4 Profile › Helpdesk

**File:** [apps/intranet/src/pages/dashboard/profile/components/HelpdeskTab/index.tsx](../apps/intranet/src/pages/dashboard/profile/components/HelpdeskTab/index.tsx)

| #     | Severity    | Issue                                                                 | Recommended Fix                                                                                                                                                                                                 | Acceptance Criteria                                                |
| ----- | ----------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 7.4.1 | **UX / UI** | "Search ticket" + "Raise HR Support" button collide on tablet/mobile. | Use `TableWrapper` controls: row 1 → title + Raise button (`right`), row 2 → search full-width. Mirrors Documents listing pattern in [DASHBOARD_PAGE_PATTERNS.md §6](../apps/admin/DASHBOARD_PAGE_PATTERNS.md). | Search and CTA never overlap; at `xs` both occupy full-width rows. |

## 7.5 Attendance & Leaves › Yearly Overview tabs

**File:** [apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/AttendanceDashboard/](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/AttendanceDashboard/)

| #     | Severity    | Issue                                                                                                                   | Recommended Fix                                                                                                                                                                          | Acceptance Criteria                                          |
| ----- | ----------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 7.5.1 | **UX / UI** | "Combined / Leaves / WFH" toggle inside the "Yearly Leave & WFH Overview" card spills out of the card header on `< md`. | Wrap toggle in `<Box sx={{ overflowX: 'auto' }}>` AND use `<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>` for header. Toggle uses `size="small"` and `flexWrap: 'wrap'`. | Toggle visible without horizontal scroll on 375 px viewport. |

## 7.6 Attendance & Leaves › History filters

**File:** [apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/AttendanceHistory/index.tsx](../apps/intranet/src/pages/dashboard/attendance/MyAttendance/components/AttendanceHistory/index.tsx)

| #     | Severity    | Issue                                                                                                   | Recommended Fix                                                                                                                                                                                                                            | Acceptance Criteria                                                                    |
| ----- | ----------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| 7.6.1 | **UX / UI** | "All Status" + "All Requests" selects sit on the same row without wrapping; they get cut off on mobile. | Move into `TableWrapper.controls` as two `dropdown` types: `grid: { xs: 12, sm: 6, md: 3 }` each, placed `right` on row 1 with title `left`. Layout pattern per [DASHBOARD_PAGE_PATTERNS.md §6](../apps/admin/DASHBOARD_PAGE_PATTERNS.md). | At `xs`: two selects stack full width. At `sm`: side-by-side. At `md+`: aligned right. |

## 7.7 Claims › "New Claim" button

**File:** [apps/intranet/src/pages/dashboard/claims/index.tsx](../apps/intranet/src/pages/dashboard/claims/index.tsx)

| #     | Severity    | Issue                                                                         | Recommended Fix                                                                                                                                    | Acceptance Criteria                                                  |
| ----- | ----------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 7.7.1 | **UX / UI** | "+ New Claim" button breaks header alignment on `< sm` (overlaps page title). | Use `MainLayout` `primaryAction` instead of inline header button — MainLayout already handles `xs` collapse (column direction, full-width button). | Button stretches full width below title on `xs`, top-right on `md+`. |

## 7.8 My KRA — full page

**File:** [apps/intranet/src/pages/dashboard/kra/index.tsx](../apps/intranet/src/pages/dashboard/kra/index.tsx) + [components/](../apps/intranet/src/pages/dashboard/kra/components/)

| #     | Severity    | Issue                                                                                   | Recommended Fix                                                                                                                                                                                                                                                                                                            | Acceptance Criteria                                                                      |
| ----- | ----------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 7.8.1 | **UX / UI** | Entire page is non-responsive — fixed-width columns, no Grid v6 usage, no `MainLayout`. | Wrap in `MainLayout` per [DASHBOARD_PAGE_PATTERNS.md §2](../apps/admin/DASHBOARD_PAGE_PATTERNS.md#2-layout-usage-pattern). Convert summary cards to `<Grid container spacing={2} rowSpacing={3}>` + `size={{ xs: 12, sm: 6, md: 4, lg: 3 }}`. KRA form sections → `<Stack spacing={t.SECTION_GAP}>` with `SectionWrapper`. | Page renders correctly at 375 px, 768 px, 1280 px without horizontal scroll or clipping. |

## 7.9 My On/Off-boarding — full page

**File:** [apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx](../apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx) (renders the route at [userRoute.tsx:272-281](../apps/intranet/src/routes/userRoute.tsx#L272-L281))

| #     | Severity    | Issue                                                                               | Recommended Fix                                                                                                                                                                                                                          | Acceptance Criteria                                                |
| ----- | ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| 7.9.1 | **UX / UI** | Placeholder module renders illustration + CTA in a flex row that does not collapse. | Inside `HRMSPageModule`, wrap content in `<Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">`. Illustration size capped via `maxWidth: { xs: 240, md: 360 }`. Once real page is built, follow §7.8 pattern. | At `xs`: illustration on top (max 240 px), CTA below. No overflow. |

## 7.10 HRMS Dashboard › Shifts tab

**File:** [apps/intranet/src/pages/dashboard/hrmsDashboard/components/ShiftsTab/index.tsx](../apps/intranet/src/pages/dashboard/hrmsDashboard/components/ShiftsTab/index.tsx)

| #      | Severity    | Issue                                                                                                             | Recommended Fix                                                                                                                                                                                                                  | Acceptance Criteria                                                                 |
| ------ | ----------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 7.10.1 | **UX / UI** | "Search field + All Departments filter + Assign Shift button" all share one non-wrapping row → clipped on `< lg`. | Re-implement header via `TableWrapper.controls`: `title` (`grid: { xs: 12, md: 4 }`), `search` (`grid: { xs: 12, md: 5 }`), `department` dropdown (`grid: { xs: 12, sm: 6, md: 3 }`). Assign Shift → `MainLayout.primaryAction`. | At `xs`: each control on its own row, full width. At `lg`: single row, no clipping. |

## 7.11 HRMS › My Engagement (empty state)

**File:** [apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx](../apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx) (route at [userRoute.tsx:375-384](../apps/intranet/src/routes/userRoute.tsx#L375-L384))

| #      | Severity    | Issue                                                                                                               | Recommended Fix                                                                                                                                                                                                | Acceptance Criteria                                         |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 7.11.1 | **UX / UI** | "Notify me when ready" + "View roadmap" buttons sit in a row that overflows on mobile; illustration is fixed-width. | Buttons → `<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' } }}>`. Buttons `fullWidth` on `xs`. Illustration → responsive `maxWidth: { xs: 200, md: 320 }`. | At 375 px: buttons stack, fill width, no horizontal scroll. |

## 7.12 HRMS › Rewards & Recognition (empty state)

**File:** [apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx](../apps/intranet/src/pages/dashboard/shared/HRMSPageModule/index.tsx) (route at [userRoute.tsx:386-395](../apps/intranet/src/routes/userRoute.tsx#L386-L395))

| #      | Severity    | Issue                                                                | Recommended Fix                                               | Acceptance Criteria                                                                     |
| ------ | ----------- | -------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 7.12.1 | **UX / UI** | Same empty-state container as 7.11 — same non-responsive button row. | Single fix on `HRMSPageModule` cascades to both (and to 7.9). | Verified by checking Engagement, Rewards, On/Off-boarding all reflow correctly on `xs`. |

## 7.13 General › Time Reports

**File:** [apps/intranet/src/pages/dashboard/timesheets/index.tsx](../apps/intranet/src/pages/dashboard/timesheets/index.tsx)

| #      | Severity    | Issue                                                                                                         | Recommended Fix                                                                                                                                                                                                                           | Acceptance Criteria                                              |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 7.13.1 | **UX / UI** | "New Row" + "Lock Week" action row uses fixed flex, no wrap. Inputs in the row push these buttons off-screen. | Action row → `<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap" justifyContent="flex-end">`. Make buttons `fullWidth` on `xs`. Underlying table row inputs → Grid with `size={{ xs: 12, sm: 6, md: 'grow' }}`. | Both action buttons reachable without horizontal scroll on `xs`. |

## 7.14 General › Company — entire page + all tabs

**File:** [apps/intranet/src/pages/dashboard/company/](../apps/intranet/src/pages/dashboard/company/) (top-level [index.tsx](../apps/intranet/src/pages/dashboard/company/index.tsx) and all sub-tabs in [company/components/](../apps/intranet/src/pages/dashboard/company/components/))

| #      | Severity            | Issue                                                                                                                                                                          | Recommended Fix                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Acceptance Criteria                                                                                                                      |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 7.14.1 | **UX / UI — Major** | Whole module bypasses the project's grid pattern: section cards laid out with raw flex, no Grid v6, fixed widths, no `MainLayout` wrapper. Behaves like a desktop-only layout. | **Full refactor:** wrap page in `MainLayout`. Each tab content → `<Stack spacing={t.SECTION_GAP}>` with `SectionWrapper`-per-section. Card grids → `<Grid container spacing={2} rowSpacing={3}>` + `size={{ xs: 12, sm: 6, md: 4, lg: 3 }}` for tiles; `size={{ xs: 12, md: 6 }}` for 2-col content. Pattern source: [DASHBOARD_PAGE_PATTERNS.md §4](../apps/admin/DASHBOARD_PAGE_PATTERNS.md#4-grid--responsive-design-pattern). Treat each tab (About, Departments, Policies, Org Chart, etc.) as its own audit pass. | All tabs render correctly at 375 / 768 / 1280 / 1920 px. No horizontal scrollbars. Matches the visual rhythm of the main dashboard page. |

## 7.15 Admin › Organisation › Designations

**File:** [apps/intranet/src/pages/dashboard/admin/Organisation/components/Designations/](../apps/intranet/src/pages/dashboard/admin/Organisation/components/Designations/)

| #      | Severity    | Issue                                                                                                                           | Recommended Fix                                                                                                                                 | Acceptance Criteria                                                          |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 7.15.1 | **UX / UI** | "Add Designation" button + filter buttons not in a proper grid on small screens — they wrap inconsistently and break alignment. | Use `TableWrapper.controls` layout. Filters → `dropdown` with `grid: { xs: 12, sm: 6, md: 3 }`. "Add Designation" → `MainLayout.primaryAction`. | Buttons / filters aligned in a clean responsive grid across all breakpoints. |

## 7.16 Admin › HRMS › Portal Users (Add Employee row)

**File:** [apps/intranet/src/pages/dashboard/admin/HRMS/components/PortalUsers/](../apps/intranet/src/pages/dashboard/admin/HRMS/components/PortalUsers/)

| #      | Severity    | Issue                                                                                                                                       | Recommended Fix                                                                                                                                                                                                                                                                                                                                              | Acceptance Criteria                                                           |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| 7.16.1 | **UX / UI** | All Department / All Status filters + Import + Export + Add Employee — five controls jammed into a single flex row, no responsive collapse. | Migrate to `TableWrapper.controls`. Suggested layout: row 1 → `title` (`left`) + `[department, status]` (`right`, each `grid: { xs: 12, sm: 6, md: 3 }`); row 2 → `search` full-width (`leftSize: { xs: 12, md: 12 }`); Import / Export → `actions` slot in MainLayout (icon buttons on `xs`, labelled on `md+`); Add Employee → `MainLayout.primaryAction`. | At `xs`: 5 controls stacked full width. At `md+`: balanced grid, no clipping. |

## 7.17 Admin › Attendance & Leaves › Holiday Calendar

**File:** [apps/intranet/src/pages/dashboard/admin/Attendance/components/HolidayCalendar/](../apps/intranet/src/pages/dashboard/admin/Attendance/components/HolidayCalendar/)

| #      | Severity            | Issue                                                                                                                                 | Recommended Fix                                                                                                                                                                                                                                                                                    | Acceptance Criteria                                                                                                                                                                                                    |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7.17.1 | **UX / UI — Major** | Holiday cards rendered via raw flex — not in a Grid at all. Entire page lacks the project grid pattern; sub-components do not reflow. | Wrap holiday list in `<Grid container spacing={2} rowSpacing={3}>`; each holiday card → `<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>`. Page shell → `MainLayout` + `<Stack spacing={t.SECTION_GAP}>`. Filters → `TableWrapper.controls` (year selector dropdown, holiday-type dropdown, search). | Cards reflow as 1 / 2 / 3 / 4 columns across `xs → lg`. Matches the dashboard stats-card pattern shown in [DASHBOARD_PAGE_PATTERNS.md §4](../apps/admin/DASHBOARD_PAGE_PATTERNS.md#4-grid--responsive-design-pattern). |

## 7.18 Admin › Roles & Permissions

**File:** [apps/intranet/src/pages/dashboard/admin/Roles/](../apps/intranet/src/pages/dashboard/admin/Roles/)

| #      | Severity    | Issue                                                                                            | Recommended Fix                                                                                                                                                     | Acceptance Criteria                                                                                    |
| ------ | ----------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| 7.18.1 | **UX / UI** | "Add Role" button + its containing row not in grid — overflows on mobile, button overlaps title. | Move "Add Role" to `MainLayout.primaryAction`. Table header (search + filter) → `TableWrapper.controls` with title `left`, filter `right`, search full-width row 2. | At `xs`: header collapses to column; Add Role full-width below title. At `md+`: standard 2-col layout. |

---

## Responsiveness — Refactor Checklist (apply to every file in §7)

When fixing any item above, the change must:

1. **Replace** all `<Grid item xs={…}>` (v5) with `<Grid size={{ xs: …, md: … }}>` (v6) — see [PROJECT_GUIDE.md §4](../apps/admin/PROJECT_GUIDE.md#4-material-ui-mui-usage-pattern).
2. **Wrap** the page in `MainLayout` with `pageTitle`, `title`, `subtitle`, and `primaryAction` (if any) — never inline a CTA in the header.
3. **Convert** any `Stack direction="row"` action group to `Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} flexWrap="wrap"`.
4. **Migrate** table filter rows to the declarative `TableWrapper` `layout.rows[]` + `controls` pattern in [DASHBOARD_PAGE_PATTERNS.md §6](../apps/admin/DASHBOARD_PAGE_PATTERNS.md#6-data-table-pattern).
5. **Use** `theme.spacing()` tokens only — no raw `px` values in style files (rule §5 of DASHBOARD_PAGE_PATTERNS).
6. **Verify** at 4 breakpoints before closing the ticket: 375 px (mobile), 768 px (tablet), 1280 px (laptop), 1920 px (desktop).
7. **Do not touch** API calls, hooks, props, or service contracts — UI-only changes per [CLAUDE.md](../CLAUDE.md).

### Severity summary — Responsiveness

| Severity                                   | Count                                                           |
| ------------------------------------------ | --------------------------------------------------------------- |
| UX / UI — Major (full-page non-responsive) | 4 (KRA, Company, Holiday Calendar, On/Off-boarding placeholder) |
| UX / UI — Component-level                  | 14                                                              |
| **Total**                                  | **18**                                                          |

### Suggested fix order

1. **P0 — Page-wide refactors:** 7.14 (Company), 7.8 (KRA), 7.17 (Holiday Calendar)
2. **P1 — Shared placeholder (cascades to 3 pages):** 7.9 / 7.11 / 7.12 — fix `HRMSPageModule` once
3. **P2 — Header / filter rows:** 7.6, 7.10, 7.13, 7.16, 7.18, 7.15
4. **P3 — Single-button polish:** 7.1, 7.2, 7.3, 7.4, 7.5, 7.7

---

## Severity rollup (all sections)

| Severity                             | Count                                                |
| ------------------------------------ | ---------------------------------------------------- |
| Bug — Blocker                        | 1 (Category Management API)                          |
| Bug — Data integrity / business rule | 3 (Out < In time, leave overflow, stale pending WFH) |
| Bug — Other                          | 5                                                    |
| UX / UI — Functional issues          | 9                                                    |
| UX / UI — Responsiveness (Major)     | 4                                                    |
| UX / UI — Responsiveness (Component) | 14                                                   |
| Feature Gap                          | 1                                                    |
| **Total**                            | **37**                                               |

---

## Recommended ordering for fixes (overall)

1. **P0 — Blockers / data integrity:** 1.1, 2.1, 2.8, 2.10, 2.3
2. **P1 — Functional / missing features:** 2.5, 2.6, 2.9, 4.1, 4.2, 5.1
3. **P2 — Responsiveness, page-wide:** 7.14, 7.8, 7.17, 7.9 / 7.11 / 7.12 (shared)
4. **P3 — UX polish & component standardisation:** 2.2, 2.4, 2.7, 3.1, 3.2, 4.3, 4.4, 6.1
5. **P4 — Responsiveness, component-level:** remaining §7 items

---

### Notes

- All UI fixes must stay within the existing API contracts per [CLAUDE.md](../CLAUDE.md) and the intranet refactor recipe — **do not touch service calls / hooks / props**. Where API changes are required (1.1, 2.3, 2.10), call out a backend ticket explicitly.
- Where a fix mentions a shared component (`SearchInput`, `DatePicker`, `FileUpload`), confirm the prop contract before swapping — **verify in `packages/ui`**.
- Permission audit (calendar visibility, WFH approval visibility, leave-balance enforcement) should be scoped as a follow-up ticket once these issues are triaged.
