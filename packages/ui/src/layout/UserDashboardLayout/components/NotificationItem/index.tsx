/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create Notification item component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 13/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import { Box, Stack, SvgIconProps, Typography } from '@mui/material';
import {
  Circle as DotIcon,
  SettingsOutlined as SettingsIcon,
} from '@mui/icons-material';
import { getDate, getNotificationColorByType } from '@lektus/utils';
import { palette } from '@lektus/theme';

/* Local Imports */
import styles from './index.style';

/**
 * Props for NotificationItem component
 * @interface NotificationItemProp
 * @property {string} title - Title of the notification
 * @property {string} description - Description of the notification
 * @property {React.ComponentType<SvgIconProps>} icon - Icon of the notification
 * @property {string} type - Type of the notification
 * @property {string} date - Date of the notification
 * @property {boolean} isRead - Whether the notification is read or not
 * @property {() => void} onClick - Callback function to handle click event
 */
export interface NotificationItemProp {
  title: string;
  description?: string;
  icon?: React.ComponentType<SvgIconProps>;
  type: string;
  date: string;
  isRead?: boolean;
  onClick?: () => void;
}
/**
 * NotificationItem component
 * @param {NotificationItemProp} param0 - Props for NotificationItem component
 * @returns {React.ReactElement}
 */
const NotificationItem: React.FC<NotificationItemProp> = ({
  icon = SettingsIcon,
  title,
  description,
  type,
  date,
  isRead,
  onClick,
}: NotificationItemProp) => {
  return (
    <Box sx={styles.containerStyle} onClick={onClick}>
      <Box
        sx={(theme) =>
          styles.iconContainer(
            theme,
            getNotificationColorByType(type, palette)?.background
          )
        }
      >
        {icon &&
          React.createElement(icon, {
            sx: (theme) =>
              styles.icon(
                theme,
                getNotificationColorByType(type, palette)?.icon
              ),
          })}
      </Box>
      <Box sx={styles.contentContainer}>
        <Stack sx={styles.content}>
          <Typography variant="bodyMSemibold"> {title} </Typography>
          {description && (
            <Typography variant="bodySRegular" color="textSecondary">
              {description}
            </Typography>
          )}
        </Stack>
        <Stack alignItems="flex-end">
          <Typography variant="bodyXSRegular">
            {getDate(date, 'dd MMM yyyy')}
          </Typography>

          {!isRead && <DotIcon color="error" sx={styles.errorIcon} />}
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(NotificationItem);
