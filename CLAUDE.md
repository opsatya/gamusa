# Laktus — UI Engineering Rules

**Platform:** Multi-portal SaaS (Recruitment, CRM, Intranet) with shared UI architecture.
**Goal:** Transform existing functional app into modern, premium SaaS-level UI — WITHOUT breaking functionality.
**Reference bar:** Stripe, Linear, Notion.

---

## 🚨 NON-NEGOTIABLE RULES

### DO NOT TOUCH

- API calls, state, hooks, validation, routing, business logic
- `packages/ui` component props, behavior, or contracts
- Variable names, imports affecting logic, memoization

### UI WORK = layout + structure + styling ONLY

---

## 🔒 SHARED COMPONENT SAFETY

`packages/ui` is shared across all portals.

- Internal styling improvements only — if absolutely safe
- Never break component contracts

---

## 📁 FILE SCOPE

- Work ONLY on provided files
- If file not provided → **ASK**
- No assumptions across codebase

---

## 🧱 MANDATORY PAGE STRUCTURE

Every page must follow:

1. Page Header
2. Primary Section (main action/content)
3. Secondary Sections (supporting info)
4. Tables / Lists
5. Proper bottom spacing

---

## 🗂️ LAYOUT SYSTEM

### ❌ Avoid

- Flat layouts, long vertical stacking, random spacing, mixed unrelated content, full-width overuse

### ✅ Enforce

- Section-based layout using `SectionWrapper` / `CardWrapper`
- Grid-based balanced layouts (prefer 2-column where possible)
- Priority: important content → top-left, secondary → below, passive → right

### Standard Patterns

| Page Type | Layout                                                     |
| --------- | ---------------------------------------------------------- |
| Dashboard | Left: primary actions / Right: context (notices, activity) |
| Form      | Sections (Basic Info, Details, Advanced) in 2-column grid  |
| Table     | Header (filters/actions) → Table → Pagination              |

---

## 🎨 DESIGN SYSTEM

- **Typography:** theme variants only — no manual font overrides
- **Colors:** palette tokens only — no hex values
- **Spacing:** spacing system only — no px values
- **Primary text:** `bodySMedium` (bold)
- **Secondary text:** `bodySRegular` + `textSecondary`
- **Status:** `Chip` component
- **Actions:** right-aligned

---

## 🧩 APPROVED COMPONENTS

Use these — do not introduce alternatives without justification:

`SectionWrapper` · `CardWrapper` · `TableWrapper` · `DataTable`
`TextInput` · `SelectInput` · `ActionIconButton` · `Loader`

---

## 📋 FORM UX RULES

- Group fields into logical sections
- 2-column grid layout
- Avoid long single-column forms
- Maintain logical field flow
- Proper label alignment, consistent input sizes
- Clear error/success states

---

## 🔍 BEFORE MAKING ANY CHANGE

1. Read the full file
2. Understand its purpose
3. Audit UX issues (spacing, alignment, clutter, form structure, inconsistency)
4. Plan high-impact improvements first
5. THEN make changes

For each change provide:

1. Issue identified
2. Improvement rationale
3. Updated code

---

## 🧠 UX PRINCIPLES

- Consistency > creativity
- Simplicity > complexity
- Clarity > density
- Spacing is critical — use 8px base system
- Reduce cognitive load
- Every screen must be easy to scan

---

## ✅ SUCCESS CRITERIA

| State                                        | Result  |
| -------------------------------------------- | ------- |
| UI still looks like basic CRUD               | ❌ FAIL |
| Clear hierarchy, modern layout, premium feel | ✅ PASS |

---

## ❓ IF UNSURE → ASK. Never assume.
