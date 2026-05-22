/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Calendar skeleton loader component
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
import { Box, Skeleton } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/**
 * CalendarSkeleton - Loading state for calendar
 * Shows a grid structure matching the calendar layout
 *
 * @component
 * @returns {React.ReactElement}
 */
export const CalendarSkeleton = memo((): React.ReactElement => {
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const totalDays = 35; // 5 weeks × 7 days

  return (
    <Box sx={styles.skeletonRootStyle}>
      {/* Header Row (Week Days) */}
      <Box sx={styles.skeletonHeaderStyle}>
        {weekDays.map((day) => (
          <Box key={day} sx={styles.skeletonHeaderCellStyle}>
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box sx={styles.skeletonGridStyle}>
        {Array.from({ length: totalDays }).map((_, index) => (
          <Box key={index} sx={styles.skeletonDayCellStyle}>
            {/* Day Number */}
            <Skeleton variant="text" width={30} height={24} />

            {/* Random event skeletons (show for some days) */}
            {index % 3 === 0 && (
              <>
                <Box sx={{ marginTop: 'auto' }}>
                  <Skeleton
                    variant="rounded"
                    width="100%"
                    height={60}
                    sx={{ marginBottom: 1 }}
                  />
                  {index % 6 === 0 && (
                    <Skeleton variant="rounded" width="100%" height={60} />
                  )}
                </Box>
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
});

CalendarSkeleton.displayName = 'CalendarSkeleton';
