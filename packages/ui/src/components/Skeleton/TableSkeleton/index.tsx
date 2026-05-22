/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Table Skeleton layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 19/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import { Box, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material';

/* Relative Imports */
import CardWrapper from '../../Wrapper/CardWrapper';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/**
 * @interface TableSkeletonProps
 * @property {number} rows - Number of rows to display
 */
interface TableSkeletonProps {
  rows?: number;
}

// ----------------------------------------------------------------------

/**
 * Desktop: all 8 columns
 * Mobile: only 3 columns so pills are wide enough to look realistic
 */
const DESKTOP_FLEX = [2, 1.2, 1.4, 1.6, 1.2, 1.5, 0.8, 1];
const MOBILE_FLEX = [2, 1.5, 1.2];

// ----------------------------------------------------------------------

/**
 * TableSkeleton component
 *
 * @component
 * @param {number} rows - Number of data rows (default: 4)
 * @returns {React.ReactElement}
 */
const TableSkeleton = ({ rows = 4 }: TableSkeletonProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const columnFlex = isMobile ? MOBILE_FLEX : DESKTOP_FLEX;

  return (
    <Stack spacing={3} sx={styles.wrapper}>
      {/* ── Filter Bar ── */}
      <Skeleton variant="rounded" sx={styles.filterBar} />

      <CardWrapper>
        {/* ── Header Row ── */}
        <Box sx={styles.headerRow}>
          <Skeleton variant="circular" sx={styles.circle} />
          {columnFlex.map((flex, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              sx={{ ...styles.headerPill, flex }}
            />
          ))}
        </Box>

        {/* ── Data Rows ── */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <Box key={rowIndex} sx={styles.dataRow}>
            <Skeleton variant="circular" sx={styles.circle} />
            {columnFlex.map((flex, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                sx={{ ...styles.pill, flex }}
              />
            ))}
          </Box>
        ))}
      </CardWrapper>
    </Stack>
  );
};

export default memo(TableSkeleton);
