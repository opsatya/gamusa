# Laktus UI System — Engineering + UX Rules (Strict Mode)

You are working on a **multi-portal SaaS platform (Recruitment, CRM, Intranet)**
with shared UI architecture and reusable components.

Your job is to ensure:
:point_right: Safe UI changes
:point_right: Consistent design system usage
:point_right: High-quality SaaS-level UX

---

# :rotating_light: NON-NEGOTIABLE RULES

## 1. ZERO LOGIC CHANGES

You MUST NOT change:

- API calls
- state / hooks
- validation
- routing
- business logic

UI work = **layout + structure + styling ONLY**

---

## 2. SHARED COMPONENT SAFETY (CRITICAL)

`packages/ui` is used across multiple apps.

DO NOT:

- Change props
- Change behavior
- Break contracts

ONLY:

- Improve internal styling (if absolutely safe)

---

## 3. STRICT FILE SCOPE

- Work ONLY on provided file(s)
- If file not provided → ASK
- No assumptions across codebase

---

# :bricks: GLOBAL UI STRUCTURE (MANDATORY)

Every page MUST follow:

1. Page Header
2. Primary Section (main action/content)
3. Secondary Sections (supporting info)
4. Tables / Lists
5. Proper bottom spacing

---

# :jigsaw: LAYOUT SYSTEM (MANDATORY)

## :x: Avoid

- Flat layouts
- Long vertical stacking
- Random spacing
- Mixed unrelated content

## :white_check_mark: Enforce

### 1. Section-based Layout

- Group UI logically using:
  - `SectionWrapper`
  - `CardWrapper`

### 2. Grid-based Layout

- Use balanced layouts
- Avoid full-width overuse
- Prefer 2-column where possible

### 3. Priority Layout

- Important content → top-left
- Secondary → below
- Passive content → right

---

# :compass: STANDARD LAYOUT PATTERNS

## Dashboard Pages

- Left → Primary actions (check-in, forms, quick actions)
- Right → Context (notices, activity, updates)

## Form Pages

- Split into sections:
  - Basic Info
  - Details
  - Advanced
- Use grid (2-column)

## Table Pages

- Header (filters/actions)
- Table
- Pagination

---

# :art: DESIGN SYSTEM RULES

## Typography

- Use theme variants ONLY
- Never override font styles manually

## Colors

- Use palette tokens ONLY
- No hex values

## Spacing

- Use spacing system ONLY
- No px values

---

# :bricks: COMPONENT RULES (MANDATORY)

Use these components:

- SectionWrapper
- CardWrapper
- TableWrapper
- DataTable
- TextInput / SelectInput
- ActionIconButton
- Loader

---

# :bar_chart: DATA DISPLAY RULES

- Primary text → bold (`bodySMedium`)
- Secondary → muted (`bodySRegular`, `textSecondary`)
- Status → Chip
- Actions → right aligned

---

# :receipt: FORM UX RULES

- Group fields into sections
- Avoid long forms
- Use grid layout
- Maintain logical flow

---

# :warning: ENGINEERING DISCIPLINE

- Do NOT rename variables
- Do NOT change imports affecting logic
- Do NOT remove memoization
- Do NOT introduce breaking changes

---

# :brain: UX EXPECTATION

Every UI must:

- Be clearly structured
- Have strong hierarchy
- Be easy to scan
- Avoid clutter
- Feel like modern SaaS (Stripe / Linear level)

---

# :test_tube: BEFORE MAKING CHANGES

You MUST:

1. Read full file
2. Understand purpose
3. Identify UX issues
4. THEN improve

---

# :octagonal_sign: IF UNSURE

ASK — never assume.

---

# :dart: SUCCESS CRITERIA

If UI still looks like CRUD → FAIL
If layout is improved → PASS
