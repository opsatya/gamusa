/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable profile banner card — displays avatar, name, role,
 *              tenure, location, and employee code in a compact card format.
 *              Designed to be used across multiple apps (Intranet, CRM, Admin).
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 14/05/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import {
  Box,
  IconButton,
  Stack,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import {
  CalendarMonthRounded,
  LocationOnOutlined,
  BusinessOutlined,
  EditRounded,
} from '@mui/icons-material';

/* Relative Imports */
import MyAvatar from '../MyAvatar';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types */

/**
 * A single metadata row below the user name (e.g. tenure, location, code).
 *
 * @interface ProfileBannerInfoItem
 * @property {React.ReactNode} icon - MUI icon component or element
 * @property {string} label - Display text for the item
 */
export interface ProfileBannerInfoItem {
  icon: React.ReactNode;
  label: string;
}

/**
 * Props for the ProfileBannerCard component.
 *
 * @interface ProfileBannerCardProps
 * @property {string} name - Full name of the user
 * @property {string} role - Role text (e.g. "Head of Department · Infrastructure Engineering")
 * @property {string | null} [profilePhoto] - URL of the user's profile photo
 * @property {ProfileBannerInfoItem[]} [infoItems] - Array of metadata items to display
 * @property {boolean} [showOnlineIndicator] - Whether to show the green online dot
 * @property {() => void} [onEdit] - Edit button click handler (hides button when undefined)
 * @property {SxProps<Theme>} [containerSx] - Optional sx overrides for the root container
 */
export interface ProfileBannerCardProps {
  name: string;
  role: string;
  profilePhoto?: string | null;
  infoItems?: ProfileBannerInfoItem[];
  showOnlineIndicator?: boolean;
  onEdit?: () => void;
  containerSx?: SxProps<Theme>;
}

// ----------------------------------------------------------------------

/**
 * Profile banner card component — renders a compact identity card with
 * avatar, name, designation, and configurable info rows.
 *
 * @component
 * @param {ProfileBannerCardProps} props
 * @returns {React.ReactElement}
 */
const ProfileBannerCard = ({
  name,
  role,
  profilePhoto,
  infoItems = [],
  showOnlineIndicator = false,
  onEdit,
  containerSx,
}: ProfileBannerCardProps): React.ReactElement => {
  /* Derived */
  /* Output */
  return (
    <Box
      sx={[
        styles.root,
        ...(Array.isArray(containerSx)
          ? containerSx
          : containerSx
            ? [containerSx]
            : []),
      ]}
    >
      {/* Gradient banner — avatar is absolutely positioned inside */}
      <Box sx={styles.bannerArea}>
        <MyAvatar sx={styles.avatar} />
      </Box>

      {/* Content: name, role, info chips */}
      <Box sx={styles.contentArea}>
        {/* Name + role + edit button */}
        <Box sx={styles.nameRow}>
          <Stack spacing={0.25}>
            <Typography variant="bodyLBold">{name}</Typography>
            <Typography variant="bodyMRegular" color="text.secondary">
              {role}
            </Typography>
          </Stack>
          {onEdit && (
            <IconButton onClick={onEdit} sx={styles.editButton}>
              <EditRounded sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>

        {/* Info chips */}
        {infoItems.length > 0 && (
          <Box sx={styles.infoRow}>
            {infoItems.map((item, idx) => (
              <Box key={idx} sx={styles.infoChip}>
                {item.icon}
                <Typography variant="bodyMRegular" color="text.secondary">
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default memo(ProfileBannerCard);
