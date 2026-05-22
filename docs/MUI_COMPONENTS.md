# Lektus — MUI Components & Styling Reference

> **Last updated:** 2026-03-08  
> **Covers:** MUI v7 rules, Grid v6 syntax, allowed components, typography, colors, overrides  
> **Who should read it:** Every developer writing JSX in any Lektus portal

---

## 1. Component Usage Rule: Wrapper vs. Raw MUI

Never use raw MUI input primitives. Always use the `@lektus/ui` wrapper.

| Purpose         | Use THIS                                  | NEVER use                                   |
| --------------- | ----------------------------------------- | ------------------------------------------- |
| Text input      | `<TextInput>` from `@lektus/ui`           | `<TextField>`, `<OutlinedInput>`, `<Input>` |
| Dropdown        | `<SelectInput>` from `@lektus/ui`         | `<Select>`, `<NativeSelect>`                |
| Password field  | `<PasswordInput>` from `@lektus/ui`       | Custom eye-toggle implementation            |
| Rich text       | `<RichTextInput>` from `@lektus/ui`       | Raw TipTap components                       |
| Paginated table | `<DataTable>` from `@lektus/ui`           | Raw `<Table>` + custom pagination           |
| Table shell     | `<TableWrapper>` from `@lektus/ui`        | Custom card + header combination            |
| Page shell      | `<MainLayout>` from `@lektus/ui`          | Custom page containers                      |
| Form header     | `<PageHeaderLayout>` from `@lektus/ui`    | Custom breadcrumb + save/cancel             |
| Sidebar shell   | `<UserDashboardLayout>` from `@lektus/ui` | Custom drawer/sidebar                       |
| Card section    | `<SectionWrapper>` from `@lektus/ui`      | `<Paper>` + `<Divider>` + `<Typography>`    |
| White card      | `<CardWrapper>` from `@lektus/ui`         | `<Card>`, `<Paper>` standalone              |
| Icon button     | `<ActionIconButton>` from `@lektus/ui`    | `<IconButton>` + custom sx colors           |
| Confirm modal   | `<ConfirmDialog>` from `@lektus/ui`       | Custom `<Dialog>` implementation            |
| Loading spinner | `<Loader>` from `@lektus/ui`              | `<CircularProgress>` standalone             |
| Notification    | `useSnackbarClose()` from `@lektus/hooks` | Direct `enqueueSnackbar()` calls            |

### MUI components you CAN use directly

These have no `@lektus/ui` wrapper — use raw MUI:

```typescript
import { Box, Stack, Typography, Chip, Avatar, Divider } from '@mui/material';
import { Grid } from '@mui/material';
import { MenuItem } from '@mui/material'; // inside SelectInput children
import { IconButton } from '@mui/material'; // only for non-table, non-action button uses
import { Button } from '@mui/material'; // when ActionIconButton doesn't fit
import { Tooltip } from '@mui/material';
import { Badge } from '@mui/material';
import { LinearProgress, CircularProgress } from '@mui/material'; // loading within content
import { Collapse, Grow, Fade } from '@mui/material'; // transitions
```

---

## 2. Grid v6 Syntax (MUI v7)

MUI v7 uses Grid v6 API. The `item`, `xs`, `sm`, `md`, `lg`, `xl` props are **removed**.
Always use the `size` prop.

```tsx
// ✅ CORRECT — size prop only
<Grid container spacing={2}>
  <Grid size={12}>          {/* full width */}
  <Grid size={6}>           {/* half width */}
  <Grid size={{ xs: 12, md: 6 }}>  {/* responsive */}
  <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>  {/* all breakpoints */}
</Grid>

// ❌ WRONG — old v5 API
<Grid item xs={12} md={6}>
<Grid item xs={6}>

// Container props (unchanged)
<Grid container spacing={2}>          {/* standard field gap */}
<Grid container spacing={3}>          {/* section gap */}
<Grid container columnSpacing={2} rowSpacing={3}>  {/* asymmetric */}
```

### Standard Spacing Values for Grid

| Context                      | Spacing                                      |
| ---------------------------- | -------------------------------------------- |
| Form fields within a section | `spacing={2}`                                |
| Sections within a form stack | `spacing={t.SECTION_GAP}` (from appConstant) |
| Dashboard card grid          | `spacing={3}`                                |
| Stats row at page top        | `spacing={2.5}`                              |

---

## 3. Typography Variants

Always use these named variants. Never set `fontWeight` or `fontSize` inline on a `<Typography>`.

```tsx
// ✅ CORRECT
<Typography variant="bodySMedium">{row.name}</Typography>

// ❌ WRONG
<Typography sx={{ fontWeight: 500, fontSize: '14px' }}>{row.name}</Typography>
```

### Full Variant Reference

| Variant          | Weight | Size                 | When to use                               |
| ---------------- | ------ | -------------------- | ----------------------------------------- |
| `h1`             | 700    | 36–48px (responsive) | Hero/display headings                     |
| `h2`             | 700    | 32–40px (responsive) | Page-level headings                       |
| `h3`             | 700    | 28–32px (responsive) | Sub-page headings                         |
| `h4`             | 700    | 22–24px (responsive) | Page title (inside MainLayout `title`)    |
| `h5`             | 700    | 18–20px (responsive) | Section headings                          |
| `h6`             | 700    | 16–18px (responsive) | Card titles, dialog titles                |
| `h7`             | 700    | 14px (responsive)    | Small headings, column group labels       |
| `subtitleL`      | 600    | 18px                 | Large introductory subtitles              |
| `subtitle1`      | 600    | 16px                 | Sub-section labels                        |
| `subtitle2`      | 500    | 14px                 | Small labels, form field group titles     |
| `subtitle3`      | 500    | 12px                 | Extra-small labels                        |
| `body1`          | 400    | 16px                 | Main paragraph content                    |
| `body2`          | 400    | 14px                 | Secondary descriptive copy                |
| `body3`          | 400    | 12px                 | Extra-small body text                     |
| `body4`          | 400    | 10px                 | Micro body text                           |
| `caption`        | 400    | 12px                 | Photo captions, fine print                |
| `overline`       | 600    | 10px                 | Overline labels                           |
| `button`         | 500    | 14px                 | Button labels                             |
| `bodyXLRegular`  | 400    | 18px                 | XLarge regular body                       |
| `bodyXLMedium`   | 500    | 18px                 | XLarge medium body                        |
| `bodyXLSemibold` | 600    | 18px                 | XLarge semibold body                      |
| `bodyXLBold`     | 700    | 18px                 | XLarge bold body                          |
| `bodyLRegular`   | 400    | 16px                 | Large regular body                        |
| `bodyLMedium`    | 500    | 16px                 | Large medium body                         |
| `bodyLSemibold`  | 600    | 16px                 | Large semibold label                      |
| `bodyLBold`      | 700    | 16px                 | Large bold body                           |
| `bodyMRegular`   | 400    | 14px                 | Medium regular body                       |
| `bodyMMedium`    | 500    | 14px                 | **Card body content, medium list text**   |
| `bodyMSemibold`  | 600    | 14px                 | Medium semibold body                      |
| `bodyMBold`      | 700    | 14px                 | Medium bold body                          |
| `bodySRegular`   | 400    | 12px                 | **Table cell dates, secondary text**      |
| `bodySMedium`    | 500    | 12px                 | **Table cell primary text, field values** |
| `bodySSemibold`  | 600    | 12px                 | Small semibold body                       |
| `bodySBold`      | 700    | 12px                 | Status labels, emphasized values          |
| `bodyXSRegular`  | 400    | 10px                 | Helper text, timestamps, meta info        |
| `bodyXSMedium`   | 500    | 10px                 | XSmall medium body                        |
| `bodyXSSemibold` | 600    | 10px                 | XSmall semibold body                      |
| `bodyXSBold`     | 700    | 10px                 | XSmall bold body                          |

---

## 4. Color Usage

Always reference theme palette tokens. Never hardcode hex values.

```tsx
// ✅ CORRECT — theme reference via sx
<Box sx={{ backgroundColor: (theme) => theme.palette.primary[100] }}>

// ❌ WRONG — hardcoded color
<Box sx={{ backgroundColor: '#F5EEFF' }}>
```

### Palette Token Reference for This Project

```typescript
// Brand purple
theme.palette.primary.main; // #AC73FF — buttons, active nav, chips
theme.palette.primary.dark; // #290066 — hover states
theme.palette.primary[100]; // #F5EEFF — light backgrounds, info boxes
theme.palette.primary.contrastText; // white

// Secondary
theme.palette.secondary.main; // #D37048 — secondary actions

// Semantic
theme.palette.success.main; // #0CAF60 — active/approved
theme.palette.error.main; // #E03137 — deleted/rejected
theme.palette.warning.main; // #FFD023 — pending/on-hold
theme.palette.info.main; // #0066FF — info/edit actions

// Neutral
theme.palette.grey[100]; // #F8F8F8 — page background
theme.palette.grey[200]; // — light borders
theme.palette.grey[300]; // #E9EAEC — dividers, borders
theme.palette.grey[500]; // — placeholder text
theme.palette.grey[600]; // #687588 — secondary text
theme.palette.grey[700]; // #323B49 — primary text
theme.palette.grey[800]; // — dark text
theme.palette.grey[900]; // — near-black text

// Backgrounds
theme.palette.background.paper; // white (card surface)
theme.palette.background.default; // light grey (page background)
```

---

## 5. Spacing Rules

```typescript
// ✅ CORRECT — theme.spacing(N) where N is a multiple of 8px
theme.spacing(1); // 8px
theme.spacing(2); // 16px
theme.spacing(3); // 24px
theme.spacing(4); // 32px
theme.spacing(0.5); // 4px  — for tight gaps

// ❌ WRONG
('32px');
32;
```

### Standard Spacing Patterns

| Usage                             | Value                          |
| --------------------------------- | ------------------------------ |
| ActionIconButton gap in table row | `gap={1.25}` (Stack)           |
| Form field grid spacing           | `spacing={2}`                  |
| Section title to content gap      | built into `SectionWrapper`    |
| Inner card padding                | `padding={3}` on `CardWrapper` |
| Loader container min-height       | `theme.spacing(50)` (400px)    |

---

## 6. sx Prop Rules

Use `sx` ONLY for one-off per-element overrides on a single JSX element. For anything
used more than once, define it in `index.style.ts`.

```tsx
// ✅ CORRECT — single-use override
<Box sx={{ mb: 2 }}>

// ✅ CORRECT — style file for reusable styles
<Box sx={styles.container}>

// ❌ WRONG — complex style object inline
<Box sx={{
  display: 'flex', flexDirection: 'column', gap: 2,
  backgroundColor: theme.palette.primary[100], borderRadius: 2,
  padding: 3, boxShadow: theme.shadows[1]
}}>
// This belongs in index.style.ts
```

---

## 7. MUI Component Overrides in @lektus/theme

The theme's `overrides/` directory provides pre-configured styles for these MUI components.
You generally do not need to override these again — the theme handles defaults.

| Component                     | Override Notes                                                       |
| ----------------------------- | -------------------------------------------------------------------- |
| `Button`                      | Rounded (borderRadius 8px), no text transform, Medium font weight    |
| `LoadingButton`               | Same as Button                                                       |
| `TextField` / `OutlinedInput` | Handled by `TextInput` wrapper, custom border radius and focus color |
| `Select`                      | Handled by `SelectInput` wrapper                                     |
| `Card`                        | Subtle box shadow, white background, rounded corners                 |
| `Table`                       | Row hover state, header background light grey                        |
| `TableCell`                   | `bodySMedium` typography applied globally                            |
| `Chip`                        | Custom small/medium sizes, border radius 6px                         |
| `Dialog`                      | Standard padding, rounded corners                                    |
| `IconButton`                  | Size variants match standard scale                                   |
| `Typography`                  | All custom variants registered as theme variants                     |
| `Accordion`                   | Custom border, no default shadow                                     |
| `Pagination`                  | Rounded items, primary color active state                            |
| `Pickers`                     | AdapterDayjs-compatible, themed to primary color                     |
| `Checkbox` / `Radio`          | Primary color, larger hit area                                       |
| `Switch`                      | Rounded, primary/success/error color variants                        |

---

## 8. Responsive Layout Patterns

### Stack vs Grid

```tsx
// Stack — for vertical or horizontal sequences of items (not grid)
<Stack direction="row" alignItems="center" gap={1.5}>
  <MyAvatar />
  <Typography variant="bodySMedium">{name}</Typography>
</Stack>

// Grid — for two-dimensional form layouts
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextInput label="First Name" ... />
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <TextInput label="Last Name" ... />
  </Grid>
</Grid>
```

### Standard Grid Breakpoints by Content Type

```typescript
// Full-width fields (descriptions, long text)
<Grid size={12}>

// Half-width fields (names, codes, short values)
<Grid size={{ xs: 12, md: 6 }}>

// Third-width fields (dates, numbers, enums)
<Grid size={{ xs: 12, sm: 6, md: 4 }}>

// Quarter-width fields (compact filters)
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

// Dashboard stat cards (4 per row on desktop)
<Grid size={{ xs: 12, sm: 6, md: 3 }}>

// Dashboard wide cards (2 per row on desktop)
<Grid size={{ xs: 12, md: 6 }}>
```

---

## 9. ActionIconButton Variants

Use the correct color variant for each action type:

| Action           | Variant       | Notes                            |
| ---------------- | ------------- | -------------------------------- |
| Edit / Update    | `"info"`      | Blue — navigate to edit page     |
| Delete / Remove  | `"error"`     | Red — opens ConfirmDialog        |
| View / Detail    | `"primary"`   | Purple — navigate to detail page |
| Approve / Accept | `"success"`   | Green — status change action     |
| Reject / Deny    | `"error"`     | Red — status change action       |
| Download         | `"secondary"` | Orange — file download           |
| Settings         | `"primary"`   | Purple — config action           |

```tsx
// Standard action cell pattern in DataTable:
<Stack direction="row" gap={1.25}>
  <ActionIconButton
    icon={<EditIcon />}
    variant="info"
    onClick={() => navigate(editPath)}
  />
  <ActionIconButton
    icon={<TrashIcon />}
    variant="error"
    onClick={() => setDeleteDialog({ open: true, id: row.id })}
  />
</Stack>
```

---

## 10. Chip Status Patterns

Always use `getStatusColorForApplications` or `getStatusColorByApproval` from `@lektus/utils`
for Chip color derivation:

```tsx
import { getStatusColorForApplications, getStatusColorByApproval } from '@lektus/utils';

// Application status (applied, shortlisted, interview, rejected, hired)
<Chip
  label={row.status}
  color={getStatusColorForApplications(row.status ?? '')}
  size="small"
/>

// Approval/requisition status (pending, approved, rejected, on-hold)
<Chip
  label={row.approvalStatus}
  color={getStatusColorByApproval(row.approvalStatus ?? '')}
  size="small"
/>

// For boolean active/inactive:
<Chip
  label={row.isActive ? 'Active' : 'Inactive'}
  color={row.isActive ? 'success' : 'default'}
  size="small"
/>
```
