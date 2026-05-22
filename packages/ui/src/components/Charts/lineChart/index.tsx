/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Total Applications area chart component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/02/2026
 * Updated:      03/28/2026 — Redesigned as smooth area chart with gradient fills;
 *                            Applied → Shortlisted → Hired funnel series;
 *                            fixed axis label weights; hollow active dots;
 *                            removed railValue bar hack; enabled horizontal grid.
 */
// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import { Box, Typography, Stack, useTheme } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

/* Relative Imports */
import ChartContainer from '../chartContainer';
import CardWrapper from '../../Wrapper/CardWrapper';

/* Local Imports */
import { LineChartProps, SeriesConfig } from './types';
import { styles } from './index.style';

// ----------------------------------------------------------------------

/**
 * Legend — uses horizontal line segments (not dots) to communicate "this is a line/area".
 */
const ChartLegend = ({
  series,
  colors,
}: {
  series: SeriesConfig[];
  colors?: string | string[];
}): React.ReactElement => (
  <Box sx={styles.legend}>
    {series?.map((s, index) => {
      const lineColor = Array.isArray(colors)
        ? colors[index] || s.color
        : colors || s.color;
      return (
        <Stack key={s.key} sx={styles.legendItem}>
          {/* Horizontal line segment — communicates "line/area" better than a dot */}
          <Box sx={{ ...styles.legendSwatch, backgroundColor: lineColor }} />
          <Typography sx={styles.legendLabel}>{s.label}</Typography>
        </Stack>
      );
    })}
  </Box>
);

// ----------------------------------------------------------------------

/**
 * Smooth area chart for showing funnel trends over time.
 * Three areas (Applied → Shortlisted → Hired) with gradient fills give
 * an immediate visual sense of pipeline shape and conversion.
 */
const LineChart = memo(
  ({
    title,
    data,
    series,
    xAxisKey = 'label',
    color,
    filterValue,
    onFilterChange,
    filterOptions,
    yAxis,
    isLoading,
    isEmpty,
    showLegend = true,
  }: LineChartProps): React.ReactElement => {
    const theme = useTheme();

    /** Resolve stroke colour for a series by index */
    const getColor = (index: number, fallback: string) =>
      Array.isArray(color) ? color[index] || fallback : color || fallback;

    return (
      <CardWrapper
        containerStyle={{ border: `1px solid ${theme.palette.divider}` }}
      >
        <ChartContainer
          title={title}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
          isLoading={isLoading}
          isEmpty={isEmpty}
          legend={
            showLegend ? (
              <ChartLegend series={series} colors={color} />
            ) : undefined
          }
        >
          <Box mt={1.5}>
            <AreaChart margin={{ left: -30, bottom: 16 }} data={data || []}>
              {/* ── Gradient fill definitions ──────────────────────────── */}
              <defs>
                {series?.map((s, index) => {
                  const lineColor = getColor(index, s.color);
                  return (
                    <linearGradient
                      key={s.key}
                      id={`areaGrad-${s.key}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={lineColor}
                        stopOpacity={0.14}
                      />
                      <stop
                        offset="100%"
                        stopColor={lineColor}
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  );
                })}
              </defs>

              {/* ── Horizontal guide lines — subtle, dashed ─────────────── */}
              <CartesianGrid
                vertical={false}
                stroke={theme.palette.divider}
                strokeDasharray="4 4"
                strokeOpacity={0.9}
              />

              {/* ── X Axis ─────────────────────────────────────────────── */}
              <XAxis
                dataKey={xAxisKey}
                scale="point"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 12,
                  fontWeight: 400,
                  fill: theme.palette.text.disabled,
                }}
                padding={{ left: 40, right: 40 }}
                interval={0}
                dy={12}
              />

              {/* ── Y Axis ─────────────────────────────────────────────── */}
              <YAxis
                axisLine={false}
                tickLine={false}
                domain={yAxis?.domain || ['auto', 'auto']}
                ticks={yAxis?.ticks}
                tickFormatter={yAxis?.formatter}
                tick={{
                  fontSize: 12,
                  fontWeight: 400,
                  fill: theme.palette.text.disabled,
                }}
                padding={{ top: 16, bottom: 0 }}
              />

              {/* ── Tooltip ────────────────────────────────────────────── */}
              <Tooltip
                cursor={{
                  stroke: theme.palette.divider,
                  strokeWidth: 1,
                  strokeDasharray: '4 4',
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <Box sx={styles.tooltipContainer}>
                        <Typography sx={styles.tooltipTitle}>
                          {label}
                        </Typography>
                        {payload.map((item: any, index: number) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={styles.tooltipItem}
                          >
                            <Box
                              sx={{
                                ...styles.tooltipDot,
                                backgroundColor: item.stroke,
                              }}
                            />
                            <Typography variant="body2">
                              {item.name}:
                            </Typography>
                            <Typography variant="subtitle2">
                              {item.value?.toLocaleString() ?? '0'}
                            </Typography>
                          </Stack>
                        ))}
                      </Box>
                    );
                  }
                  return null;
                }}
              />

              {/* ── Area series ─────────────────────────────────────────── */}
              {series?.map((s, index) => {
                const lineColor = getColor(index, s.color);
                // First series (Applied / largest) gets a slightly thicker stroke
                const strokeWidth = index === 0 ? 2.5 : 2;
                return (
                  <Area
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={lineColor}
                    strokeWidth={strokeWidth}
                    fill={`url(#areaGrad-${s.key})`}
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: '#FFFFFF',
                      stroke: lineColor,
                      strokeWidth: 2,
                    }}
                    isAnimationActive={false}
                  />
                );
              })}
            </AreaChart>
          </Box>
        </ChartContainer>
      </CardWrapper>
    );
  }
);

export default LineChart;
