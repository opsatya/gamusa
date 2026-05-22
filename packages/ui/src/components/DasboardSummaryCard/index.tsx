/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Performance Summary Component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/25/2026
 * Updated:      03/28/2026 — Design audit: spacing, toggle polish, removed redundant
 *                            period label from cards (toggle handles it), Isymbol fix,
 *                            negative letter-spacing on count, section subtitle added
 */

// ----------------------------------------------------------------------

import React, { useState, useMemo } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

/* Relative Imports */
import { BriefcaseIcon } from '@lektus/ui';
import styles from './index.style';
import { TimeInterval, PerformanceMetric } from './types';
import { CardWrapper } from '@lektus/ui';
import { MiniCharts } from '@lektus/ui';

// ----------------------------------------------------------------------

// --- Sub-Component: Metric Card ---
const PerformanceCard: React.FC<{
  metric: PerformanceMetric;
}> = ({ metric }) => {
  const theme = useTheme();
  const Icon = metric.icon || BriefcaseIcon;

  const hasTrend = metric.trend !== undefined && metric.trend !== null;
  const isPositive = hasTrend && (metric.trend as number) >= 0;

  return (
    <CardWrapper padding={2} containerStyle={styles.metricCard(theme)}>
      {/* Icon bubble + label */}
      <Box sx={styles.iconLabelRow}>
        <Box sx={styles.iconBubble(metric.color)}>
          <Icon sx={{ fontSize: '15px', color: metric.strokeColor }} />
        </Box>
        <Typography variant="body2" sx={styles.metricLabel}>
          {metric.label}
        </Typography>
      </Box>

      {/* Count + trend (left) / sparkline (right) */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          width: '100%',
          gap: theme.spacing(1),
        }}
      >
        {/* Left: number + optional trend badge */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing(0.75),
          }}
        >
          <Typography variant="h4" sx={styles.valueText}>
            {metric.value}
          </Typography>

          {/* Trend badge — only rendered when the API provides trend data */}
          {hasTrend && (
            <Box sx={styles.trendBadge(isPositive)}>
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: '11px' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: '11px' }} />
              )}
              {isPositive ? '+' : ''}
              {metric.trend}% vs prev
            </Box>
          )}
        </Box>

        {/* Right: sparkline */}
        <Box sx={styles.chartContainer}>
          <MiniCharts
            chartType={metric.chartType as any}
            chartData={metric.chartData}
            strokeColor={metric.strokeColor}
            id={metric.id}
          />
        </Box>
      </Box>
    </CardWrapper>
  );
};

// ----------------------------------------------------------------------

interface DashboardSummaryCardProps {
  items?: PerformanceMetric[];
  isLoading?: boolean;
  activeInterval?: TimeInterval;
  onIntervalChange?: (interval: TimeInterval) => void;
  title?: string;
  subtitle?: string;
  rightContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  /**
   * Optional fallback mock data keyed by interval.
   * Decouples the UI package from app-level constants.
   */
  mockData?: Record<TimeInterval, PerformanceMetric[]>;
}

// ----------------------------------------------------------------------

const TOGGLE_LABELS: Record<TimeInterval, string> = {
  week: 'Week',
  month: 'Month',
  year: 'Year',
};

// --- Main Component ---
const DashboardSummaryCard: React.FC<DashboardSummaryCardProps> = ({
  items,
  isLoading,
  activeInterval,
  onIntervalChange,
  title = 'Performance Summary',
  subtitle = 'Across all active roles',
  rightContent,
  footerContent,
  mockData,
}) => {
  const theme = useTheme();

  const [internalInterval, setInternalInterval] =
    useState<TimeInterval>('month');

  const selectedInterval = activeInterval || internalInterval;
  const handleIntervalChange = onIntervalChange || setInternalInterval;

  // Derive metrics: prefer live items, then mock, then empty
  const metrics = useMemo(() => {
    if (items) return items;
    if (mockData) return mockData[selectedInterval] || [];
    return [];
  }, [items, mockData, selectedInterval]);

  if (isLoading && (!metrics || metrics.length === 0)) {
    return null; // Shell renders the skeleton
  }

  return (
    <CardWrapper>
      {/* ── Header: title block + segmented toggle ── */}
      {(title || subtitle || rightContent || onIntervalChange || !items) && (
        <Box sx={styles.header}>
          {/* Left: title + subtle subtitle */}
          <Box sx={styles.titleBlock}>
            {title && (
              <Typography variant="h6" sx={styles.sectionTitle}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" sx={styles.sectionSubtitle(theme)}>
                {subtitle}
              </Typography>
            )}
          </Box>

          {/* Right: Week / Month / Year segmented control */}
          {rightContent ||
            ((onIntervalChange || !items) && (
              <Box sx={styles.toggleContainer(theme)}>
                {(Object.keys(TOGGLE_LABELS) as TimeInterval[]).map((i) => (
                  <Box
                    key={i}
                    component="button"
                    role="button"
                    aria-pressed={selectedInterval === i}
                    aria-label={`Show ${TOGGLE_LABELS[i].toLowerCase()}ly stats`}
                    onClick={() => handleIntervalChange(i)}
                    sx={styles.toggleButton(selectedInterval === i)}
                  >
                    {TOGGLE_LABELS[i]}
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      )}

      {/* ── Metric cards grid ── */}
      <Box sx={styles.gridContainer}>
        {metrics?.map((metric: any) => (
          <PerformanceCard key={metric.id} metric={metric} />
        ))}
      </Box>

      {footerContent && (
        <Box sx={{ marginTop: theme.spacing(2) }}>{footerContent}</Box>
      )}
    </CardWrapper>
  );
};

export default DashboardSummaryCard;
