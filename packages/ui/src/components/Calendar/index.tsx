/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable calendar component using FullCalendar with MUI theme integration
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 11/02/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { memo, useCallback, useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, useTheme } from '@mui/material';

/* Relative Imports */
import { CalendarSkeleton } from './CalendarSkeleton';

/* Local Imports */
import styles from './index.style';
import type { LektusCalendarProps, CalendarEventData } from './types';

// ----------------------------------------------------------------------

/**
 * LektusCalendar - Enterprise-grade calendar component
 *
 * Features:
 * - FullCalendar integration with MUI theme
 * - Week starts from Monday
 * - Custom day cell rendering
 * - Event management with callback system
 * - isLoading skeleton state
 * - Fully customizable via prop forwarding
 *
 * @component
 * @param {LektusCalendarProps} props - Component props
 * @returns {React.ReactElement}
 */
const LektusCalendar = ({
  events = [],
  isLoading = false,
  onViewDetails,
  onAccept,
  onReject,
  onAssign,
  onEventClick,
  ...fullCalendarProps
}: LektusCalendarProps): React.ReactElement => {
  /* Hooks */
  const theme = useTheme();

  /* Memoized Values */

  /**
   * Transform events to FullCalendar format with color mapping.
   * ONLINE → pink, F2F → success (green), null/unknown → primary[100] (light purple).
   * Timed events (startTime set) render as dot+time in month view.
   */
  const transformedEvents = useMemo(() => {
    return events.map((event) => {
      const mode = event.extendedProps?.mode?.toUpperCase();
      const isOnline = mode === 'ONLINE';
      const isF2F = mode === 'F2F';
      return {
        id: event.id,
        title: event.title,
        start: event.date,
        backgroundColor: isOnline
          ? theme.palette.common.pink
          : isF2F
            ? theme.palette.success.main
            : theme.palette.primary.lighter,
        borderColor: isOnline
          ? theme.palette.common.pinkDark
          : isF2F
            ? theme.palette.success.dark
            : theme.palette.primary.light,
        textColor:
          isOnline || isF2F
            ? theme.palette.common.white
            : theme.palette.primary.dark,
        extendedProps: {
          // Store original CalendarEventData for retrieval in eventClick
          originalData: event,
          ...event,
        },
      };
    });
  }, [events, theme]);

  /* Functions */

  /**
   * Apply custom class to day cells — marks other-month days for grey background
   */
  const getDayCellClassNames = useCallback(
    (arg: any) => [arg.isOther ? 'lektus-day-other-month' : ''],
    []
  );

  /* Output */

  // Show skeleton while isLoading
  if (isLoading) {
    return <CalendarSkeleton />;
  }

  return (
    <Box sx={styles.rootStyle}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        firstDay={1} // Week starts from Monday
        fixedWeekCount={false}
        expandRows
        headerToolbar={false} // Custom header managed by parent
        dayMaxEvents={4} // Show max 4 events per cell, rest collapse into "+N more"
        events={transformedEvents}
        // dayCellContent not set — FullCalendar renders default day numbers
        dayCellClassNames={getDayCellClassNames}
        eventDidMount={(info) => {
          // FullCalendar calls el.focus() after every click (keyboard-nav accessibility).
          // With tall custom eventContent cards this causes a visible scroll-into-view.
          // Override focus() on the element to always pass preventScroll:true so the
          // element can still receive focus for keyboard users but never scrolls the page.
          const el = info.el as HTMLElement;
          const _original = el.focus.bind(el);
          el.focus = (options?: FocusOptions) =>
            _original({ ...options, preventScroll: true });
        }}
        eventClick={(info) => {
          info.jsEvent.preventDefault();
          const originalData = info.event.extendedProps
            ?.originalData as CalendarEventData;
          if (originalData) {
            onEventClick?.(originalData, info.jsEvent);
          }
        }}
        height="auto"
        contentHeight="auto"
        {...fullCalendarProps}
      />

      {/* Context Menu — kept for optional future use via onAccept/onReject/onAssign props */}
      {/* <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleMenuAction('view')}>
          <Typography variant="bodySRegular">View Details</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('accept')}>
          <Typography variant="bodySRegular">Accept</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('reject')}>
          <Typography variant="bodySRegular">Reject</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction('assign')}>
          <Typography variant="bodySRegular">Assign to Interviewer</Typography>
        </MenuItem>
      </Menu> */}
    </Box>
  );
};

export default memo(LektusCalendar);
