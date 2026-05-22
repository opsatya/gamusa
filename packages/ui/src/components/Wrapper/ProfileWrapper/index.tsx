/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create profile wrapper component
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
import React from 'react';
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  LocalPhoneOutlined as PhoneIcon,
  EmailOutlined as EmailIcon,
  LocationOnOutlined as AddressIcon,
} from '@mui/icons-material';

/* Local Imports */
import {
  getRoleTextByRole,
  getStatusColorByStatus,
  getStatusColorForApplications,
  stringAvatar,
} from '@lektus/utils';
import { UserEntity } from '@lektus/types';

/* Local Components */
import CardWrapper from '../CardWrapper';
import styles from './index.style';

export interface ProfileWrapperProps {
  children: React.ReactNode;
  tabs: Array<{ label: string; value: any }>;
  onChange: (value: string) => void;
  value: string;
  user: Partial<UserEntity>;
  hideSidebar?: boolean;
}

const ProfileWrapper = ({
  children,
  tabs,
  onChange,
  value,
  user,
  hideSidebar = false,
}: ProfileWrapperProps) => {
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

  return (
    <Grid container spacing={3}>
      {!hideSidebar && (
        <Grid size={{ xs: 12, md: 4, lg: 3 }} sx={styles.stickGrid}>
          <CardWrapper>
            <Stack gap={3} alignItems="center" textAlign="center">
              <Avatar
                {...avatarProps}
                alt={name}
                sx={{
                  ...styles.avataStyle,
                  ...('sx' in avatarProps ? avatarProps.sx : {}),
                  width: (theme: any) => theme.spacing(12.5),
                  height: (theme: any) => theme.spacing(12.5),
                  fontSize: '2.5rem',
                }}
              />

              {/* Name Stack */}
              <Stack>
                <Typography variant="h5">
                  {user?.firstName} {user?.lastName}
                </Typography>
                {user?.role?.name?.toLowerCase() !== 'applicant' && (
                  <Typography variant="bodyMRegular">
                    {getRoleTextByRole(user?.role?.name, user?.id!)}
                  </Typography>
                )}
              </Stack>

              {/* Active /Inactiev Chip */}
              <Stack gap={1.5} direction="row" alignItems="center">
                <Chip
                  label={statusLabel}
                  color={statusColor as any}
                  sx={styles.chipStyle}
                />
                {/* <IconButton sx={styles.iconButton}>
                  <DownArrowIcon />
                </IconButton> */}
              </Stack>

              {/* Divider */}
              <Divider sx={styles.dividerStyles} />

              {/* Info Container */}
              <Stack gap={2}>
                {user?.email && (
                  <Box sx={styles.profileInfoContainer}>
                    <EmailIcon sx={styles.profileInfoIcon} />
                    <Typography variant="bodyMSemibold">
                      {user?.email}
                    </Typography>
                  </Box>
                )}
                {user?.phone && (
                  <Box sx={styles.profileInfoContainer}>
                    <PhoneIcon sx={styles.profileInfoIcon} />
                    <Typography variant="bodyMSemibold">
                      {user?.phone}
                    </Typography>
                  </Box>
                )}
                {(user?.address ||
                  (user as any)?.residenceAddress ||
                  (user as any)?.residence_address) && (
                  <Box sx={styles.profileInfoContainer}>
                    <AddressIcon sx={styles.profileInfoIcon} />
                    <Typography variant="bodyMSemibold">
                      {
                        (user?.address ||
                          (user as any)?.residenceAddress ||
                          (user as any)?.residence_address) as string
                      }
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Stack>
          </CardWrapper>
        </Grid>
      )}
      <Grid size={hideSidebar ? 12 : { xs: 12, md: 8, lg: 9 }}>
        <CardWrapper>
          {tabs && tabs.length > 0 && (
            <Tabs
              value={value}
              onChange={(_, value) => onChange?.(value)}
              variant="scrollable"
              scrollButtons="auto"
              sx={styles.tabContainer}
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab?.value}
                  label={tab?.label}
                  value={tab?.value}
                  sx={styles.tabItem}
                />
              ))}
            </Tabs>
          )}

          {children}
        </CardWrapper>
      </Grid>
    </Grid>
  );
};

export default ProfileWrapper;
