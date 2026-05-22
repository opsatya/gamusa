# Lektus — Coding Patterns Reference

> **Last updated:** 2026-03-08  
> **Covers:** All standard patterns used in page code, form pages, service files, and component build  
> **Who should read it:** Every developer writing feature code for any Lektus portal

This file contains copy-paste-ready annotated templates carved directly from the actual codebase.
All patterns are mandatory — do not deviate without architectural review.

---

## 1. Listing Page Pattern

Use for any page that shows a paginated, searchable table of records.

**File location:** `apps/[portal]/src/pages/dashboard/[Feature]/index.tsx`

```typescript
/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description [Feature] management page
 * --------------------------------------------------------------------
 * Creation Details
 * @author [Author Name]
 * Date Created: DD/MM/YYYY
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

/* Relative Imports */
import { useAuth } from '@lektus/auth';
import { PAGE_USER_DASHBOARD } from '@/routes/paths';
import { useDebounce, useSnackbarClose } from '@lektus/hooks';
import { extractErrorMessage, getDate, RECRUITMENT_PERMISSIONS } from '@lektus/utils';
import {
  ActionIconButton,
  ConfirmDialog,
  DataTable,
  EditIcon,
  MainLayout,
  TableWrapper,
  TrashIcon,
} from '@lektus/ui';
import { getFeatureListRequest, deleteFeatureRequest } from '@/services/feature';
import { FeatureItem } from '@/models';

/* Local Imports */
import styles from './index.style';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
// Define filter/dropdown options here as typed const arrays (not in appConstant.ts)

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const FeaturePage = (): React.ReactElement => {
  /* Hooks */
  const navigate = useNavigate();
  const { hasPermission } = useAuth();
  const { showSnackbar } = useSnackbarClose();

  // Derive permission once — do not call hasPermission() inside render expressions
  const canManage = hasPermission(RECRUITMENT_PERMISSIONS.FEATURE_MANAGE);

  /* States */
  const [items, setItems] = useState<FeatureItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 500); // 500ms is standard
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8); // default always 8
  const [totalRow, setTotalRow] = useState(0);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });

  /* TableWrapper Controls */
  // Keys in this object become the identifiers used in layout.rows[].left/right arrays
  const controls = {
    title: { type: 'title' as const, text: '[Feature] Management' },
    search: {
      type: 'search' as const,
      placeholder: 'Search...',
      onChange: setSearchText,
      value: searchText,
    },
    // Add DropdownControl here for filter dropdowns:
    // statusFilter: { type: 'dropdown' as const, placeholder: 'All Status', options: [...], onChange: ... }
  };

  /* TableWrapper Layout */
  const layout = {
    rows: [
      {
        left: ['title'],
        right: [],
      },
      {
        left: ['search'],
        leftSize: { xs: 12, md: 4 },
        right: [],
      },
    ],
  };

  /* DataTable Columns */
  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 300,
      renderCell: (row: FeatureItem) => (
        // bodySMedium for primary cell text
        <Typography variant="bodySMedium">{row.name}</Typography>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created Date',
      width: 200,
      renderCell: (row: FeatureItem) => (
        // bodySRegular for dates and secondary info
        <Typography variant="bodySRegular">
          {row.createdAt ? getDate(row.createdAt, 'dd MMM yyyy') : '—'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      hide: !canManage, // hidden from users without manage permission
      renderCell: (row: FeatureItem) => (
        <Stack direction="row" gap={1.25}>
          <ActionIconButton
            icon={<EditIcon />}
            variant="info"
            onClick={() =>
              navigate(
                PAGE_USER_DASHBOARD.feature.editFeature.absolutePath.replace(
                  ':id',
                  row.id.toString()
                )
              )
            }
          />
          <ActionIconButton
            icon={<TrashIcon />}
            variant="error"
            onClick={() => setDeleteDialog({ open: true, id: row.id })}
          />
        </Stack>
      ),
    },
  ];

  /* Functions */
  // Never define async functions directly in useEffect body — define separately and call
  const fetchItems = async () => {
    try {
      setIsTableLoading(true);
      const response = await getFeatureListRequest({
        page,
        limit: rowsPerPage,
        search: debouncedSearch,
        sortOrder: 'desc',
      });
      if (response?.success && response?.data) {
        // API can return data in different shapes — normalize safely
        const dataArray = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data)
            ? response.data
            : [];
        setItems(dataArray);
        setTotalRow(response.data.meta?.total ?? dataArray.length);
      }
    } catch (err) {
      console.error('fetchItems error', err);
      showSnackbar(extractErrorMessage(err), 'error');
    } finally {
      setIsTableLoading(false);
    }
  };

  // ALWAYS reset page to 1 when changing items per page
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setRowsPerPage(newItemsPerPage);
    setPage(1);
  };

  /* Side Effects */
  useEffect(() => {
    fetchItems();
  }, [page, rowsPerPage, debouncedSearch]); // all pagination state + debounced search

  /* Output */
  return (
    <>
      <MainLayout
        pageTitle="[Feature]"
        title="Manage [Feature]"
        subtitle="[One-line description of this section.]"
        showPrimaryAction={canManage}
        primaryAction={{
          label: 'Add [Feature]',
          onClick: () => navigate(PAGE_USER_DASHBOARD.feature.addFeature.absolutePath),
          startIcon: <Add />,
        }}
      >
        <Box>
          <TableWrapper layout={layout} controls={controls}>
            <DataTable
              columns={columns.filter((col) => !col.hide)}
              rows={items}
              totalRow={totalRow}
              isLoading={isTableLoading}
              page={page}
              itemsPerPage={rowsPerPage}
              handlePageChange={setPage}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          </TableWrapper>
        </Box>

        <ConfirmDialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, id: null })}
          title="Delete [Feature]"
          description="Are you sure you want to delete this [feature]? This action cannot be undone."
          agreeText="Delete"
          disagreeText="Cancel"
          buttonColor="error"
          onAgreeAction={async () => {
            if (!deleteDialog.id) return;
            try {
              await deleteFeatureRequest(deleteDialog.id);
              showSnackbar('Deleted successfully.', 'success');
              // Reset to page 1 and refetch after delete
              setPage(1);
              fetchItems();
            } catch (err) {
              showSnackbar(extractErrorMessage(err), 'error');
            } finally {
              setDeleteDialog({ open: false, id: null });
            }
          }}
          onDisAgreeAction={() => setDeleteDialog({ open: false, id: null })}
        />
      </MainLayout>
    </>
  );
};

export default FeaturePage;
```

---

## 2. Form Page Pattern

Use for Add and Edit pages with Formik validation.

**File location:** `apps/[portal]/src/pages/dashboard/[Feature]/Add[Feature]/index.tsx`

```typescript
/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Add and Edit [Feature] page
 * --------------------------------------------------------------------
 * Creation Details
 * @author [Author Name]
 * Date Created: DD/MM/YYYY
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, MenuItem, Stack } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

/* Relative Imports */
import { PAGE_USER_DASHBOARD } from '@/routes/paths';
import { t } from '@/constants/appConstant';
import {
  Loader,
  MainLayout,
  PageHeaderLayout,
  SectionWrapper,
  SelectInput,
  TextInput,
} from '@lektus/ui';
import { extractErrorMessage } from '@lektus/utils';
import { useSnackbarClose } from '@lektus/hooks';
import {
  createFeatureRequest,
  getFeatureByIdRequest,
  updateFeatureRequest,
} from '@/services/feature';

/* Local Imports */
import { styles } from './index.style';

// ─── Types ────────────────────────────────────────────────────────────────────
// Field naming convention: txt prefix = text/number inputs, ddl prefix = dropdowns/selects
interface FeatureFormValues {
  txtName: string;
  txtDescription: string;
  ddlStatus: string;
}

const INITIAL_VALUES: FeatureFormValues = {
  txtName: '',
  txtDescription: '',
  ddlStatus: '',
};

// ─── Component ────────────────────────────────────────────────────────────────

const AddFeaturePage = (): React.ReactElement => {
  /* Hooks */
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showSnackbar } = useSnackbarClose();
  const isEditMode = Boolean(id);

  /* States */
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<FeatureFormValues>(INITIAL_VALUES);

  /* Validation Schema */
  const validationSchema = Yup.object({
    txtName: Yup.string().trim().required('Name is required'),
    txtDescription: Yup.string().trim().required('Description is required'),
    ddlStatus: Yup.string().required('Status is required'),
  });

  /* Data Fetch for Edit Mode */
  const fetchPageData = async () => {
    if (!isEditMode || !id) return;
    try {
      setIsPageLoading(true);
      const response = await getFeatureByIdRequest(id);
      // Normalize the response shape — APIs may return data at different nesting levels
      const data = response?.data?.feature ?? response?.data ?? response;
      if (data?.id) {
        setInitialValues({
          txtName: data.name ?? '',
          txtDescription: data.description ?? '',
          ddlStatus: data.status ?? '',
        });
      }
    } catch (error) {
      console.error('fetchPageData error', error);
      showSnackbar(extractErrorMessage(error), 'error');
    } finally {
      setIsPageLoading(false);
    }
  };

  /* Submit Handler */
  const handleSubmit = async (
    values: FeatureFormValues,
    actions: FormikHelpers<FeatureFormValues>
  ) => {
    try {
      const payload = {
        name: values.txtName,
        description: values.txtDescription,
        status: values.ddlStatus,
      };
      if (isEditMode && id) {
        await updateFeatureRequest(id, payload);
        showSnackbar('Updated successfully.', 'success');
      } else {
        await createFeatureRequest(payload);
        showSnackbar('Created successfully.', 'success');
      }
      navigate(PAGE_USER_DASHBOARD.feature.absolutePath);
    } catch (error) {
      console.error('handleSubmit error', error);
      showSnackbar(extractErrorMessage(error), 'error');
    } finally {
      // ALWAYS call setSubmitting(false) in finally — enables the save button again
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, [id]);

  /* Loading State */
  // Show full-page loader when fetching edit data
  if (isPageLoading) {
    return (
      <MainLayout pageTitle={isEditMode ? 'Edit [Feature]' : 'Add [Feature]'}>
        <Box sx={styles.loader}>
          <Loader size={40} />
        </Box>
      </MainLayout>
    );
  }

  /* Output */
  return (
    <MainLayout pageTitle={isEditMode ? 'Edit [Feature]' : 'Add [Feature]'}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // ALWAYS true for edit pages so data loads after fetch
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
          handleSubmit: formikHandleSubmit,
        }) => (
          <Form noValidate>
            {/* Stack spacing={t.SECTION_GAP} is the standard vertical section gap */}
            <Stack spacing={t.SECTION_GAP}>
              <PageHeaderLayout
                title={isEditMode ? 'Edit [Feature]' : 'Add New [Feature]'}
                breadcrumbs={[
                  {
                    label: '[Feature] Listing',
                    href: PAGE_USER_DASHBOARD.feature.absolutePath,
                  },
                  { label: isEditMode ? 'Edit [Feature]' : 'Add New [Feature]' },
                ]}
                showBackButton
                saveAction={{
                  // Disable when submitting OR when form is invalid
                  disabled: isSubmitting || !isValid,
                  loading: isSubmitting,
                  onClick: formikHandleSubmit as unknown as () => void,
                }}
                cancelAction={{
                  disabled: isSubmitting,
                  onClick: () => navigate(PAGE_USER_DASHBOARD.feature.absolutePath),
                }}
              />

              <SectionWrapper title="Basic Information">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextInput
                      required
                      label="Name"
                      name="txtName"
                      placeholder="Enter name"
                      value={values.txtName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.txtName && Boolean(errors.txtName)}
                      helperText={String((touched.txtName && errors.txtName) || '')}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <SelectInput
                      required
                      label="Status"
                      name="ddlStatus"
                      placeholder="Select status"
                      value={values.ddlStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.ddlStatus && Boolean(errors.ddlStatus)}
                      helperText={String((touched.ddlStatus && errors.ddlStatus) || '')}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </SelectInput>
                  </Grid>
                  <Grid size={12}>
                    <TextInput
                      required
                      label="Description"
                      name="txtDescription"
                      placeholder="Enter description"
                      value={values.txtDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.txtDescription && Boolean(errors.txtDescription)}
                      helperText={String((touched.txtDescription && errors.txtDescription) || '')}
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </SectionWrapper>
            </Stack>
          </Form>
        )}
      </Formik>
    </MainLayout>
  );
};

export default AddFeaturePage;
```

---

## 3. Style File Pattern

Every page or component with custom styles must have a sibling `index.style.ts`.

```typescript
// apps/[portal]/src/pages/dashboard/[Feature]/Add[Feature]/index.style.ts

import { Theme } from '@mui/material';

// Style functions receive theme as argument — never use raw pixel values or hardcoded colors
export const styles = {
  loader: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: theme.spacing(50), // always theme.spacing(N), not '400px'
  }),
  sectionContainer: (theme: Theme) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  }),
  statusChip: (theme: Theme) => ({
    borderRadius: theme.spacing(1),
    fontWeight: 600,
  }),
};

// Usage in page/component:
// import { styles } from './index.style';
// <Box sx={styles.loader}>
```

---

## 4. Service File Pattern

One service file per domain entity. All functions import from the single portal Axios instance.

```typescript
// apps/[portal]/src/services/feature.ts

import axiosInstance from '@/config/axiosConfig';
import {
  FeatureItem,
  ListFeaturesParams,
  CreateFeaturePayload,
  UpdateFeaturePayload,
} from '@/models';

// GET list (server-paginated with filters)
export const getFeatureListRequest = (
  params: ListFeaturesParams
): Promise<any> =>
  axiosInstance.get('/feature/', { params }).then((r) => r.data);

// GET single by ID
export const getFeatureByIdRequest = (id: string): Promise<any> =>
  axiosInstance.get(`/feature/${id}`).then((r) => r.data);

// POST create
export const createFeatureRequest = (
  data: CreateFeaturePayload
): Promise<any> => axiosInstance.post('/feature/', data).then((r) => r.data);

// PATCH update
export const updateFeatureRequest = (
  id: string,
  data: UpdateFeaturePayload
): Promise<any> =>
  axiosInstance.patch(`/feature/${id}`, data).then((r) => r.data);

// DELETE
export const deleteFeatureRequest = (id: string): Promise<any> =>
  axiosInstance.delete(`/feature/${id}`).then((r) => r.data);

// POST with FormData (file upload)
export const uploadFeatureDocumentRequest = (
  id: string,
  file: File
): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  return axiosInstance
    .post(`/feature/${id}/document`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data);
};
```

---

## 5. Model File Pattern

Domain models live in `apps/[portal]/src/models/` — never in `@lektus/types`.

```typescript
// apps/[portal]/src/models/Feature.ts

// Response shape from GET /feature/ list endpoint
export interface FeatureItem {
  id: string;
  name: string;
  description: string | null;
  status: 'active' | 'inactive';
  createdAt: string; // ISO date string
  updatedAt: string;
}

// Params for GET /feature/ list endpoint
export interface ListFeaturesParams {
  page: number;
  limit: number;
  search?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
}

// Body for POST /feature/
export interface CreateFeaturePayload {
  name: string;
  description: string;
  status: string;
}

// Body for PATCH /feature/:id
export interface UpdateFeaturePayload {
  name?: string;
  description?: string;
  status?: string;
}
```

```typescript
// apps/[portal]/src/models/index.ts — re-export everything
export * from './Feature';
export * from './Department';
// ... all other models
```

---

## 6. DataTable renderCell Patterns

Standard column rendering patterns used throughout the app:

```typescript
// Primary text field
{
  field: 'name',
  headerName: 'Name',
  width: 300,
  renderCell: (row: FeatureItem) => (
    <Typography variant="bodySMedium">{row.name ?? '—'}</Typography>
  ),
},

// Date value
{
  field: 'createdAt',
  headerName: 'Created Date',
  width: 160,
  renderCell: (row: FeatureItem) => (
    <Typography variant="bodySRegular">
      {row.createdAt ? getDate(row.createdAt, 'dd MMM yyyy') : '—'}
    </Typography>
  ),
},

// Status Badge (Chip)
{
  field: 'status',
  headerName: 'Status',
  width: 140,
  renderCell: (row: FeatureItem) => (
    <Chip
      label={row.status ?? 'Unknown'}
      color={getStatusColorForApplications(row.status ?? '')}
      size="small"
      variant="filled"
    />
  ),
},

// Avatar + Name (for user columns)
{
  field: 'applicant',
  headerName: 'Applicant',
  width: 240,
  renderCell: (row: ApplicationItem) => (
    <Stack direction="row" alignItems="center" gap={1.5}>
      <MyAvatar
        src={row.user?.profilePhoto ?? null}
        name={`${row.user?.firstName} ${row.user?.lastName}`}
        size={32}
      />
      <Typography variant="bodySMedium">
        {`${row.user?.firstName} ${row.user?.lastName}`}
      </Typography>
    </Stack>
  ),
},

// Action buttons (conditionally rendered via hide: !canManage column)
{
  field: 'actions',
  headerName: 'Actions',
  width: 120,
  hide: !canManage,
  renderCell: (row: FeatureItem) => (
    <Stack direction="row" gap={1.25}>
      <ActionIconButton icon={<EditIcon />} variant="info" onClick={() => handleEdit(row)} />
      <ActionIconButton icon={<TrashIcon />} variant="error" onClick={() => handleDelete(row)} />
    </Stack>
  ),
},

// Clickable row cell (navigates to detail page)
{
  field: 'title',
  headerName: 'Job Title',
  width: 280,
  renderCell: (row: JobItem) => (
    <Typography
      variant="bodySMedium"
      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
      onClick={() => navigate(PAGE_USER_DASHBOARD.jobs.jobDetail.absolutePath.replace(':id', row.id))}
    >
      {row.title}
    </Typography>
  ),
},
```

---

## 7. TableWrapper Control & Layout Patterns

```typescript
// Single-row layout with title left, action right
const layout = {
  rows: [
    {
      left: ['title'],
      right: ['addButton'], // addButton goes in primaryAction on MainLayout instead
    },
  ],
};

// Two-row layout: title row + search/filter row (most common)
const layout = {
  rows: [
    { left: ['title'], right: [] },
    {
      left: ['search'],
      leftSize: { xs: 12, md: 4 },
      right: ['statusFilter', 'dateFilter'],
      rightSize: { xs: 12, md: 8 },
    },
  ],
};

// All control types
const controls = {
  // Title — just text
  title: { type: 'title' as const, text: 'Page Title', grid: { xs: 12 } },

  // Search input
  search: {
    type: 'search' as const,
    placeholder: 'Search by name...',
    value: searchText,
    onChange: setSearchText,
    size: 'medium' as const,
    grid: { xs: 12, md: 4 },
  },

  // Dropdown filter
  statusFilter: {
    type: 'dropdown' as const,
    placeholder: 'All Status',
    value: statusFilter,
    onChange: setStatusFilter,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
    size: 'medium' as const,
    grid: { xs: 12, md: 3 },
  },
};
```

---

## 8. Route Paths Pattern

```typescript
// apps/[portal]/src/routes/paths.ts

export const PAGE_ROOT = {
  signIn: { relativePath: '/sign-in', absolutePath: '/sign-in' },
  verifyOtp: { relativePath: '/verify-otp', absolutePath: '/verify-otp' },
  notFound: { relativePath: '/404', absolutePath: '/404' },
  notAllowed: { relativePath: '/403', absolutePath: '/403' },
};

export const PAGE_USER_DASHBOARD = {
  // root path for the dashboard area
  root: { relativePath: '/user', absolutePath: '/user' },

  // Feature group — each feature has its own nested object
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
      // Usage: absolutePath.replace(':id', row.id.toString())
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
  },
};
```

---

## 9. Router & Route Guard Pattern

```typescript
// apps/[portal]/src/routes/userRoute.tsx

import { AuthGuard, PermissionGuard } from '@lektus/auth';
import { RECRUITMENT_PERMISSIONS } from '@lektus/utils';
import { PAGE_USER_DASHBOARD } from './paths';

// In useRoutes() element array:
{
  path: PAGE_USER_DASHBOARD.root.relativePath,
  element: (
    <AuthGuard redirectTo={PAGE_ROOT.signIn.absolutePath}>
      <UserDashboardLayout logoSrc={t.LOGO_SRC} sidebarItems={sidebarConfig} />
    </AuthGuard>
  ),
  children: [
    {
      path: PAGE_USER_DASHBOARD.departments.relativePath,
      element: (
        <PermissionGuard
          permissions={RECRUITMENT_PERMISSIONS.DEPARTMENTS_VIEW}
          fallbackPath={PAGE_ROOT.notAllowed.absolutePath}
        >
          <DepartmentsPage />
        </PermissionGuard>
      ),
    },
    // ...
  ],
}
```

---

## 10. New Feature Checklist

When adding a new feature to an existing portal:

- [ ] Create model file: `src/models/[Feature].ts` with `FeatureItem`, `ListFeaturesParams`, `CreateFeaturePayload`, `UpdateFeaturePayload`
- [ ] Export from `src/models/index.ts`
- [ ] Create service file: `src/services/[feature].ts` with all CRUD functions
- [ ] Add routes to `src/routes/paths.ts` under `PAGE_USER_DASHBOARD.[feature]`
- [ ] Add listing page: `src/pages/dashboard/[Feature]/index.tsx` + `index.style.ts`
- [ ] Add form page: `src/pages/dashboard/[Feature]/Add[Feature]/index.tsx` + `index.style.ts`
- [ ] Register routes in `src/routes/userRoute.tsx` with `PermissionGuard`
- [ ] Add sidebar entry to `src/routes/sidebarConfig.ts` with permission gate
- [ ] Add permission keys to `RECRUITMENT_PERMISSIONS` in `packages/utils/src/permissionUtility.ts`
- [ ] Add feature strings to `src/constants/appConstant.ts` in `toastMessages`
