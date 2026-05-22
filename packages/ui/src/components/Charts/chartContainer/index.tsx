/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Chart container component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/02/2026
 * Updated:      03/28/2026 — Replaced SelectInput dropdown with a segmented toggle
 *                            consistent with the Performance Summary card;
 *                            fixed leftSection gap; chart title variant h5 → subtitle1.
 */
// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import { Box, Typography, Skeleton, useTheme } from '@mui/material';
import { ResponsiveContainer } from 'recharts';
import styles from './index.style';

/**
 * Props for the ChartContainer component.
 */
export interface ChartContainerProps {
  title?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: Array<{ value: string; label: string }>;
  legend?: React.ReactNode;
  minHeight?: number;
  isLoading?: boolean;
  isEmpty?: boolean;
  children: React.ReactNode;
}

/**
 * Generic chart container — renders the header (title + legend + segmented filter),
 * then the chart body within a ResponsiveContainer.
 */
const ChartContainer = memo(
  ({
    title,
    filterValue,
    onFilterChange,
    filterOptions = [
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
    ],
    legend,
    minHeight = 420,
    isLoading = false,
    isEmpty = false,
    children,
  }: ChartContainerProps): React.ReactElement => {
    const theme = useTheme();

    const childrenArray = React.Children.toArray(children);
    const chart = childrenArray[0];
    const overlays = childrenArray.slice(1);
    const showHeader =
      title || legend || (filterOptions?.length && onFilterChange);

    return (
      <Box sx={{ ...styles.root, height: minHeight }}>
        {showHeader && (
          <Box sx={styles.header(theme)}>
            {/* Left: title (top) + legend (close below) */}
            <Box sx={styles.leftSection(theme)}>
              {title && (
                <Typography variant="subtitle1" sx={styles.chartTitle}>
                  {title}
                </Typography>
              )}
              {legend && <Box sx={styles.legendWrapper}>{legend}</Box>}
            </Box>

            {/* Right: segmented toggle (Weekly / Monthly / Yearly) */}
            {filterOptions?.length > 0 && onFilterChange && (
              <Box sx={styles.toggleContainer(theme)}>
                {filterOptions.map((opt) => (
                  <Box
                    key={opt.value}
                    component="button"
                    role="button"
                    aria-pressed={filterValue === opt.value}
                    aria-label={`Show ${opt.label.toLowerCase()} data`}
                    onClick={() => onFilterChange(opt.value)}
                    sx={styles.toggleButton(filterValue === opt.value)(theme)}
                  >
                    {opt.label}
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {isLoading ? (
          <Box sx={styles.loaderWrapper}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              sx={{ borderRadius: 2 }}
            />
          </Box>
        ) : isEmpty ? (
          <Box sx={styles.emptyWrapper}>
            <Typography variant="body2" color="text.secondary">
              No chart data available
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.chartArea}>
            <ResponsiveContainer width="100%" height="100%">
              {chart}
            </ResponsiveContainer>
            {overlays}
          </Box>
        )}
      </Box>
    );
  }
);

export default ChartContainer;
