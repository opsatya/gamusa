/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create profile tab component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo, useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';

/* Relative Imports */
import { EditIcon } from '../../../../icons';
import { TextInput, SelectInput } from '../../../../components/InputFields';

/* Local Imports */
import { styles } from './index.style';
import { UserEntity } from '@lektus/types';
import { constructProfileData, extractErrorMessage } from '@lektus/utils';
import { LoadingButton } from '@mui/lab';
import { useSnackbarClose } from '@lektus/hooks';

/* Constants */
const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_FORMATS = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
];

/* Types/Interfaces */
/**
 * Interface for profile edit form values.
 */
interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  profilePhoto: File | null;
}

/**
 * Interface used to create profile tab component.
 *
 * @interface ProfileTabProps
 * @property {UserEntity} userData - user data object
 * @property {function} updateUser - function to update user in auth context
 * @property {function} onSave - async function to save profile to the API
 */
export interface ProfileTabProps {
  userData: UserEntity;
  updateUser?: (userData: Partial<UserEntity>) => void;
  onSave?: (data: any) => Promise<any>;
  onUpload?: (files: File[], folder: string) => Promise<any>;
  mode: 'view' | 'edit';
  onModeChange: (mode: 'view' | 'edit') => void;
}

const ProfileTab = ({
  userData,
  updateUser,
  onSave,
  onUpload,
  mode,
  onModeChange,
}: ProfileTabProps) => {
  /* Hooks */
  const { showSnackbar } = useSnackbarClose();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string>(
    userData?.profilePhoto || ''
  );

  const initialValues: ProfileFormValues = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    gender: userData?.gender || '',
    dateOfBirth: userData?.birthDate || '',
    address: userData?.address || '',
    profilePhoto: null,
  };

  const validationSchema = yup.object({
    profilePhoto: yup
      .mixed()
      .nullable()
      .test('fileSize', 'File size must not exceed 5MB.', (value) => {
        if (!value) return true;
        if (typeof value === 'string') return true;
        return (value as File).size <= MAX_FILE_SIZE;
      })
      .test(
        'fileFormat',
        'Please upload a valid image file (jpg, jpeg, png, or gif).',
        (value) => {
          if (!value) return true;
          if (typeof value === 'string') return true;
          return SUPPORTED_IMAGE_FORMATS.includes((value as File).type);
        }
      ),
    firstName: yup
      .string()
      .trim()
      .matches(
        /^[A-Za-z ]+$/,
        'Please enter a valid first name (alphabets only).'
      )
      .min(2, 'First name must be at least 2 characters.')
      .max(30, 'First name cannot exceed 30 characters.')
      .required('Please enter the first name.'),
    lastName: yup
      .string()
      .trim()
      .matches(
        /^[A-Za-z ]+$/,
        'Please enter a valid last name (alphabets only).'
      )
      .min(2, 'Last name must be at least 2 characters.')
      .max(30, 'Last name cannot exceed 30 characters.'),
    email: yup
      .string()
      .trim()
      .email('Please enter a valid email address.')
      .required('Please enter the email address.'),
    phone: yup
      .string()
      .trim()
      .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number.'),
    gender: yup.string().trim(),
    dateOfBirth: yup.string(),
    address: yup
      .string()
      .trim()
      .max(200, 'Address cannot exceed 200 characters.'),
  });

  /* Functions */

  /**
   * Function to handle edit action.
   * @returns {void}
   */
  const handleEdit = () => {
    onModeChange('edit');
  };

  /**
   * Function to handle cancel action.
   * @returns {void}
   */
  const handleCancel = () => {
    onModeChange('view');
    setAvatarPreview(userData?.profilePhoto || '');
  };

  /**
   * Handles profile photo file selection.
   */
  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
      showSnackbar('File format must be jpg, jpeg, png, gif, or webp', 'error');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showSnackbar('File size must not exceed 5MB', 'error');
      return;
    }

    setFieldValue('profilePhoto', file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  /**
   * Function to handle submit action.
   * @param values - form values
   * @returns {void}
   */
  const handleSubmit = async (values: ProfileFormValues): Promise<void> => {
    try {
      let profilePhotoUrl: string | null = userData?.profilePhoto || null;

      if (values.profilePhoto instanceof File) {
        if (!onUpload) {
          showSnackbar('Upload service not available.', 'error');
          return;
        }

        const uploadResponse = await onUpload(
          [values.profilePhoto],
          'profile-photos'
        );

        const uploadedUrl = uploadResponse?.data?.files?.[0]?.url || null;

        if (!uploadedUrl) {
          showSnackbar('Failed to upload profile photo.', 'error');
          return;
        }

        profilePhotoUrl = uploadedUrl;
      }

      const payload: any = {
        firstName: values.firstName,
        lastName: values.lastName || null,
        phone: values.phone || null,
        gender: values.gender || null,
        birthDate: values.dateOfBirth || null,
        address: values.address || null,
        profilePhoto: profilePhotoUrl,
      };

      if (onSave) {
        const response = await onSave(payload);
        if (response?.success) {
          showSnackbar('Profile updated successfully.', 'success');
          const responseData = response?.data || {};
          updateUser?.({
            firstName: responseData.firstName ?? values.firstName,
            lastName: responseData.lastName ?? values.lastName,
            email: responseData.email ?? values.email,
            phone: responseData.phone ?? values.phone,
            profilePhoto: responseData.profilePhoto ?? profilePhotoUrl,
            gender: responseData.gender ?? values.gender ?? null,
            birthDate: responseData.birthDate ?? values.dateOfBirth ?? null,
            address: responseData.address ?? values.address ?? null,
          });
          onModeChange('view');
        }
      } else {
        // Fallback: just update auth context
        updateUser?.({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          gender: values.gender || null,
          birthDate: values.dateOfBirth || null,
          address: values.address || null,
          profilePhoto: profilePhotoUrl,
        });
        onModeChange('view');
      }
    } catch (error) {
      console.log('Error while updating profile', error);
      showSnackbar(extractErrorMessage(error), 'error');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form noValidate>
          <Stack gap={4}>
            <Divider />

            <Box sx={styles.profileTabHeader}>
              <Typography variant="bodyLSemibold">Basic Information</Typography>
              {mode === 'view' && (
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
              )}
            </Box>

            {/* ── VIEW MODE ── */}
            {mode === 'view' && (
              <Stack gap={2}>
                {constructProfileData(userData)?.map((item, index) => (
                  <Box key={index} sx={styles.profileTabContainer}>
                    <Typography
                      variant="bodyMRegular"
                      color="text.secondary"
                      sx={styles.profileTabLabel}
                    >
                      {item?.label}
                    </Typography>
                    <Typography variant="bodyMSemibold">
                      {item?.value}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}

            {/* ── EDIT MODE ── */}
            {mode === 'edit' && (
              <Grid container spacing={2}>
                <Grid size={12}>
                  <Stack spacing={1}>
                    <Typography variant="bodyMMedium">
                      Upload Profile Photo
                    </Typography>
                    <Typography variant="bodySMedium" color="text.secondary">
                      Max file size: 5MB. Formats: jpg, jpeg, png, gif, webp
                    </Typography>

                    <Box sx={styles.photoUploadContainer}>
                      <Avatar
                        src={avatarPreview}
                        sx={styles.photoAvatar}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {!avatarPreview &&
                          `${userData?.firstName?.[0] || ''}${userData?.lastName?.[0] || ''}`}
                      </Avatar>
                    </Box>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      hidden
                      onChange={(e) => handlePhotoChange(e, setFieldValue)}
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    required
                    label="First Name"
                    name="firstName"
                    placeholder="Enter first name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && !!errors.firstName}
                    helperText={String(touched.firstName && errors.firstName)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && !!errors.lastName}
                    helperText={String(touched.lastName && errors.lastName)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    required
                    label="Email Address"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled
                    error={touched.email && !!errors.email}
                    helperText={String(touched.email && errors.email)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && !!errors.phone}
                    helperText={String(touched.phone && errors.phone)}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <SelectInput
                    label="Gender"
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.gender && !!errors.gender}
                    helperText={String(touched.gender && errors.gender)}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </SelectInput>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextInput
                    type="date"
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dateOfBirth && !!errors.dateOfBirth}
                    helperText={String(
                      touched.dateOfBirth && errors.dateOfBirth
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <TextInput
                    label="Address"
                    name="address"
                    placeholder="Enter address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.address && !!errors.address}
                    helperText={String(touched.address && errors.address)}
                  />
                </Grid>

                <Grid size={12}>
                  <Box sx={styles.submitButtonContainer}>
                    <Button
                      onClick={handleCancel}
                      variant="outlined"
                      disabled={isSubmitting}
                      sx={styles.submitButton}
                    >
                      Cancel
                    </Button>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      loading={isSubmitting}
                      sx={styles.submitButton}
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default memo(ProfileTab);
