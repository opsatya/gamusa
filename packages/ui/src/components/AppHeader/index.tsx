/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description AppHeader — reusable header bar with search, timezone clocks,
 *              and notification bell. Designed for use across multiple apps
 *              (CRM, Intranet, etc.).
 * --------------------------------------------------------------------
 * Creation Details
 * @author CRM Team
 * Date Created: 03/05/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { useState, useEffect, useMemo, memo } from 'react';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu, NotificationsOutlined } from '@mui/icons-material';

/* Relative Imports */
import { TextInput } from '../InputFields';
import { SearchIcon } from '../../icons';

/* Local Imports */
import styles from './index.style';
import type { AppHeaderProps, TimezoneZone } from './types';

// ----------------------------------------------------------------------

/**
 * AppHeader — reusable top-bar component for dashboard applications.
 *
 * Layout: [Search Field] ──── [Timezone Clocks | Notification Bell | rightSlot]
 *
 * Uses MUI AppBar + Toolbar. Fully configurable via props:
 * - `zones` / `coreZoneLabels` control which timezone clocks are shown
 * - `searchPlaceholder` / `searchValue` / `onSearchChange` for search
 * - `notificationCount` / `onNotificationClick` for the bell
 * - `rightSlot` for app-specific items (avatar, role badge, etc.)
 *
 * Responsive behaviour:
 *   - laptop (1280–1439px): Shows search + core clocks + bell + rightSlot
 *   - lg (1440px+): Shows search + all clocks + bell + rightSlot
 *
 * @component
 * @param {AppHeaderProps} props
 * @returns {React.ReactElement}
 */
const AppHeader = ({
  greetingSubtitle,
  greetingTitle,
  zones,
  coreZoneLabels,
  searchPlaceholder = 'Search…',
  searchValue: controlledSearchValue,
  onSearchChange,
  notificationCount = 0,
  onNotificationClick,
  rightSlot,
  onMobileMenuOpen,
}: AppHeaderProps) => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isLaptopDown = useMediaQuery(theme.breakpoints.down('laptop'));

  /* ── Search state (uncontrolled fallback) ── */
  const [internalSearch, setInternalSearch] = useState('');
  const searchValue = controlledSearchValue ?? internalSearch;
  const handleSearchChange = (value: string) => {
    if (onSearchChange) {
      onSearchChange(value);
    } else {
      setInternalSearch(value);
    }
  };

  /* ── Clock — updates every second ── */
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clockFmt = (tz: string) =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: tz,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(time);

  /* ── Responsive zone selection ── */
  const visibleZones = useMemo(() => {
    if (isLargeScreen || !coreZoneLabels?.length) return zones;
    return zones.filter((z: TimezoneZone) =>
      (coreZoneLabels as readonly string[]).includes(z.label)
    );
  }, [isLargeScreen, zones, coreZoneLabels]);

  return (
    <AppBar position="static" sx={styles.appBar(theme)}>
      <Toolbar disableGutters sx={styles.toolbar(theme)}>
        {/* ─── LEFT — Greeting ─── */}
        {(greetingSubtitle || greetingTitle) && (
          <Box sx={styles.greetingWrapper}>
            {greetingSubtitle && (
              <Typography
                variant="bodyMRegular"
                sx={styles.greetingSubtitle(theme)}
              >
                {greetingSubtitle}
              </Typography>
            )}
            {greetingTitle && (
              <Typography variant="h4" sx={styles.greetingTitle(theme)}>
                {greetingTitle}
              </Typography>
            )}
          </Box>
        )}

        {/* ─── SPACER ─── */}
        <Box sx={{ flexGrow: 1 }} />

        {/* ─── RIGHT — Clocks + Bell + Custom Slot ─── */}
        <Box sx={styles.rightSection}>
          {/* ── Timezone Clocks ── */}
          {visibleZones.length > 0 && (
            <Box sx={styles.globalClockBar(theme)}>
              {visibleZones.map((z: TimezoneZone) => (
                <Box key={z.label} sx={styles.clockZone(theme)}>
                  <Typography
                    variant="bodyBaseRegular"
                    sx={styles.clockZoneFlag}
                  >
                    {z.flag}
                  </Typography>
                  <Box sx={styles.clockZoneTextCol}>
                    <Typography
                      variant="bodyMSemibold"
                      sx={styles.clockZoneLabelText(theme)}
                    >
                      {z.label}
                    </Typography>
                    <Typography
                      variant="bodyXSRegular"
                      sx={styles.clockTimeText}
                    >
                      {clockFmt(z.tz)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* ── Notification Bell ── */}
          <IconButton
            sx={styles.bellButton(theme)}
            size="small"
            onClick={onNotificationClick}
          >
            <Badge
              badgeContent={notificationCount}
              color="error"
              variant={notificationCount > 0 ? 'standard' : 'dot'}
              invisible={notificationCount === 0}
            >
              <NotificationsOutlined sx={styles.bellIcon(theme)} />
            </Badge>
          </IconButton>

          {/* ── App-specific slot (avatar, role badge, etc.) ── */}
          {rightSlot}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(AppHeader);
