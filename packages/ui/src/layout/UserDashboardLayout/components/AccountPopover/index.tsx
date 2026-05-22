/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create Notification popover component.
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
import React, { memo, useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CheckCircle as CheckIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

/* Relative Imports */
import { NotificationModel } from '@lektus/types';

/* Local Imports */
import MenuPopover from '../../../../components/MenuPopover';
import styles from './index.style';
import NotificationItem from '../NotificationItem';
import Loader from '../../../../components/Loader';

// ----------------------------------------------------------------------

/**
 * Props for NotificationPopover component
 */
interface NotificationPopoverProps {
  children: React.ReactNode;
}

/**
 * Notification Popover for the logged in pages
 *
 * @component
 * @param {NotificationPopoverProps} props - The component props
 * @returns {React.ReactElement}
 */
const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  children,
}) => {
  /* States */
  const [anchorEl, setAnchorEl] = useState(null);

  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* Constants */
  const open = Boolean(anchorEl);

  /**
   * function to open profile menu
   * @returns {void}
   */
  const handleOpenMenu = (event: any): void => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * function to close profile menu
   * @returns {void}
   */
  const handleCloseMenu = (): void => {
    setAnchorEl(null);
  };

  /**
   * function to get notifications
   * @returns {Promise<void>}
   */
  const getNotifications = async (): Promise<void> => {
    try {
      setLoading(true);
      // const response = await getNotificationsApi();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotifications([
        {
          id: '1',
          title: 'Notification 1',
          description:
            'Description 1 lorem ipsum dolor sit amet consectetur adipiscing elit',
          date: new Date().toISOString(),
          isRead: false,
          type: 'APPLICATION_STATUS_UPDATED',
        },
        {
          id: '2',
          title: 'Notification 2',
          description: 'Description 2',
          date: new Date().toISOString(),
          isRead: true,
          type: 'INTERVIEW_SCHEDULED',
        },
        {
          id: '3',
          title: 'Notification 2',
          description: 'Description 2',
          date: new Date().toISOString(),
          isRead: true,
          type: 'INTERVIEW_SCHEDULED',
        },
        {
          id: '4',
          title: 'Notification 2',
          description: 'Description 2',
          date: new Date().toISOString(),
          isRead: true,
          type: 'INTERVIEW_SCHEDULED',
        },
        {
          id: '5',
          title: 'Notification 2',
          description: 'Description 2',
          date: new Date().toISOString(),
          isRead: true,
          type: 'INTERVIEW_SCHEDULED',
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * function to clear all notifications
   * @returns {Promise<void>}
   */
  const clearAllNotifications = async (): Promise<void> => {
    try {
      setIsSubmitting(true);
      // const response = await clearAllNotificationsApi();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotifications([]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * function to render empty notification view
   * @returns {React.ReactElement}
   */
  const EmptyNotificationView = (): React.ReactElement => {
    return (
      <Box sx={styles.emptyNotificationContainer}>
        <Box sx={styles.iconContainer}>
          <CheckIcon color="primary" />
        </Box>
        <Typography variant="bodyMBold">No Pending Notifications</Typography>
        <Typography variant="bodySRegular" color="textSecondary">
          You are all caught up! There are no new updates or actions needed
          right now.
        </Typography>
      </Box>
    );
  };

  /* use effects */
  useEffect(() => {
    if (open) {
      getNotifications();
    }
  }, [open]);

  return (
    <>
      <Box onClick={handleOpenMenu}>
        <Box data-testid="notification-popover-button">{children}</Box>
      </Box>

      <MenuPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        sx={styles.menu}
      >
        <Box sx={styles.notificationContainer}>
          <Typography variant="bodyLBold">Notifications</Typography>
          <Stack sx={styles.notificationItemContainer}>
            {loading ? (
              <Loader />
            ) : notifications.length === 0 ? (
              <EmptyNotificationView />
            ) : (
              notifications.map((notification: any) => (
                <NotificationItem
                  key={notification?.id}
                  title={notification?.title}
                  description={notification?.description}
                  date={notification?.date}
                  isRead={notification?.isRead}
                  type={notification?.type}
                  icon={notification.icon}
                />
              ))
            )}
          </Stack>
          {!loading && notifications.length > 0 && (
            <LoadingButton
              onClick={clearAllNotifications}
              variant="contained"
              loading={isSubmitting}
            >
              Clear All
            </LoadingButton>
          )}
        </Box>
      </MenuPopover>
    </>
  );
};

export default memo(NotificationPopover);
