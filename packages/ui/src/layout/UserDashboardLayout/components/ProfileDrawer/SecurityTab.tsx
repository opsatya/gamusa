/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create security tab component.
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

/* constants */
const notificationsList = [
  {
    id: 1,
    title: 'Email Notifications',
    description: 'Get notified about new job opportunities and updates',
    checked: true,
  },
  {
    id: 2,
    title: 'Push Notifications',
    description: 'Get notified about new job opportunities and updates',
    checked: false,
  },
  {
    id: 3,
    title: 'SMS Notifications',
    description: 'Get notified about new job opportunities and updates',
    checked: false,
  },
];

/* Imports */
import React from 'react';
import { Box, Stack, Switch, Typography } from '@mui/material';

/* Local Imports */
import { styles } from './index.style';
import { Check } from '@mui/icons-material';

const SecurityTab = () => {
  const [notifications, setNotifications] = React.useState(notificationsList);

  /* Functions */
  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const id = Number(event.target.name);
    try {
      await new Promise((resolve, reject) => {
        setNotifications((prev) => {
          return prev.map((notification) => {
            if (notification.id === id) {
              return { ...notification, checked: !notification.checked };
            }
            return notification;
          });
        });
        /* API CALL */
      });
    } catch (error: any) {
      console.log('error', error);
    }
  };

  return (
    <Stack gap={3}>
      {notifications.map((notification) => (
        <Box key={notification.id} sx={styles.notificationContainer}>
          <Stack>
            <Typography variant="bodyMSemibold">
              {notification?.title}
            </Typography>
            <Typography variant="bodySMedium" color="text.secondary">
              {notification.description}
            </Typography>
          </Stack>
          <Switch
            checked={notification?.checked}
            onChange={handleChange}
            name={String(notification.id)}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default SecurityTab;
