/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Calendar event card component
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
import { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';

/* Local Imports */
import styles from './index.style';
import type { CalendarEventProps } from './types';

// ----------------------------------------------------------------------

/**
 * CalendarEvent - Individual event card within a day cell
 *
 * @component
 * @param {CalendarEventProps} props - Component props
 * @returns {React.ReactElement}
 */
export const CalendarEvent = memo(
  ({
    event,
    backgroundColor,
    onClick,
    isLast = false,
  }: CalendarEventProps): React.ReactElement => {
    return (
      <Box
        onClick={onClick}
        sx={(theme) => ({
          ...styles.eventCardStyle(theme, backgroundColor),
          marginBottom: isLast ? 0 : theme.spacing(1),
        })}
      >
        {/* Event Title */}
        <Typography variant="bodyLBold" flex={1}>
          {event.title}
        </Typography>

        {event?.extendedProps?.applicantName && (
          <Typography variant="bodyLMedium">
            {event?.extendedProps?.applicantName}
          </Typography>
        )}
      </Box>
    );
  }
);

CalendarEvent.displayName = 'CalendarEvent';
