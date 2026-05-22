/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create profile drawer component.
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

import React, { lazy, Suspense, useState } from 'react';
import { Avatar, Box, Chip, Drawer, Stack, Typography } from '@mui/material';
// import { Tab, Tabs } from '@mui/material'; // Commented out – Security tab removed
import { useAuth } from '@lektus/auth';
import {
  LocalPhoneOutlined as PhoneIcon,
  EmailOutlined as EmailIcon,
} from '@mui/icons-material';

/* Local Imports */

import { styles } from './index.style';
import {
  // getRoleTextByRole, // No longer needed – role name displayed directly from API
  getStatusColorByStatus,
  getStatusColorForApplications,
  stringAvatar,
} from '@lektus/utils';

/* Lazy Imports */
const ProfileTab = lazy(() => import('./ProfileTab'));
// const SecurityTab = lazy(() => import('./SecurityTab')); // Commented out – Security tab removed

// /**
//  * List of tabs for the profile drawer.
//  */
// const TabsList = ['Profile', 'Security']; // Commented out – Security tab removed

/**
 * Interface used to create profile drawer component.
 * @interface ProfileDrawerProps
 * @property {boolean} open - flag to check if drawer is open/close
 * @property {function} onClose - callback function to change the state of open
 * @property {string} anchor - anchor position of the drawer
 */
interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
  onSave?: (data: any) => Promise<any>;
  onUpload?: (files: File[], folder: string) => Promise<any>;
}

/**
 * Profile Drawer Component
 * @param {boolean} open - flag to check if drawer is open/close
 * @param {function} onClose - callback function to change the state of open
 * @param {string} anchor - anchor position of the drawer
 * @returns {React.ReactElement}
 */
const ProfileDrawer = ({
  open,
  onClose,
  anchor = 'right',
  onSave,
  onUpload,
}: ProfileDrawerProps) => {
  const { user, updateUser } = useAuth();
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  /** Reset mode to view when drawer closes */
  const handleClose = () => {
    setMode('view');
    onClose();
  };

  // /* states */
  // const [value, setValue] = useState(0); // Commented out – Security tab removed

  // /* Functions */
  // /**
  //  * Function to handle change of tabs.
  //  * @param {React.SyntheticEvent} event - event object
  //  * @param {number} newValue - new value of the tab
  //  * @returns {void}
  //  */
  // const handleChange = (_: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // }; // Commented out – Security tab removed

  const name = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  const avatarProps = !user?.profilePhoto
    ? stringAvatar(name || 'User')
    : { src: user.profilePhoto };

  const rawStatus =
    (user as any)?.status || (user?.isActive ? 'active' : 'inactive');
  const statusLabel =
    rawStatus.charAt(0).toUpperCase() +
    rawStatus.slice(1).toLowerCase().replace(/_|-/g, ' ');

  const statusColor = (user as any)?.status
    ? getStatusColorForApplications((user as any).status)
    : getStatusColorByStatus(user?.isActive ? 'active' : 'inactive');

  /* Output */
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: styles.drawerStyle,
        },
      }}
    >
      <Stack gap={4}>
        {/* Section:1 Profile Summary — hidden in edit mode */}
        {mode === 'view' && (
          <Stack gap={3}>
            <Avatar
              {...avatarProps}
              alt={name}
              sx={{
                ...styles.avatar,
                ...('sx' in avatarProps ? avatarProps.sx : {}),
                width: (theme: any) => theme.spacing(12.5),
                height: (theme: any) => theme.spacing(12.5),
                fontSize: '2.5rem',
              }}
            />

            <Stack gap={1.25}>
              <Stack direction="row" gap={1.25} alignItems="center">
                <Typography variant="h4">
                  {user?.firstName + ' ' + user?.lastName}
                </Typography>
                <Chip
                  label={statusLabel}
                  color={statusColor as any}
                  size="small"
                />
              </Stack>
              {user?.role?.name && (
                <Typography
                  variant="bodyMRegular"
                  color="text.secondary"
                  sx={{ textTransform: 'capitalize' }}
                >
                  {user.role.name.replace(/_/g, ' ')}
                </Typography>
              )}
            </Stack>

            <Stack gap={2}>
              {user?.email && (
                <Box sx={styles.profileInfoContainer}>
                  <EmailIcon sx={styles.profileInfoIcon} />
                  <Typography variant="bodyMSemibold">{user?.email}</Typography>
                </Box>
              )}
              {user?.phone && (
                <Box sx={styles.profileInfoContainer}>
                  <PhoneIcon sx={styles.profileInfoIcon} />
                  <Typography variant="bodyMSemibold">{user?.phone}</Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        )}

        {/* Section:2  Profile content (Security tab removed) */}
        <Stack gap={4}>
          {/* Commented out – Security tab removed, only Profile tab remains */}
          {/* <Tabs value={value} onChange={handleChange} sx={styles.tabContainer}>
            {TabsList.map((tab, index) => (
              <Tab key={index} value={index} label={tab} sx={styles.tabItem} />
            ))}
          </Tabs> */}
          <Suspense>
            <ProfileTab
              userData={user!}
              updateUser={updateUser}
              onSave={onSave}
              onUpload={onUpload}
              mode={mode}
              onModeChange={setMode}
            />
            {/* {value === 1 && <SecurityTab />} */}
          </Suspense>
        </Stack>
      </Stack>
    </Drawer>
  );
};

export default ProfileDrawer;
