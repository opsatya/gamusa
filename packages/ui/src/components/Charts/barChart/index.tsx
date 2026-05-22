/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Total Hires bar chart component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  Cell,
  CartesianGrid,
} from 'recharts';

/* Local Imports */
import ChartContainer from '../chartContainer';
import { BarchartProps } from './types';
import CardWrapper from '../../Wrapper/CardWrapper';

/**
 * Custom bar shape for the bar chart.
 *
 * @param {any} props - bar props
 * @param {number} cornerRadius - corner radius for the top of the bar
 * @returns {React.ReactElement | null}
 */
const CustomBar = (
  { x, y, width, height, fill }: any,
  cornerRadius: number
): React.ReactElement | null => {
  if (!height || height === 0) return null;
  const r = Math.min(cornerRadius, width / 2);
  return (
    <path
      d={`
        M ${x},${y + height}
        L ${x + width},${y + height}
        L ${x + width},${y + r}
        Q ${x + width},${y} ${x + width - r},${y}
        L ${x + r},${y}
        Q ${x},${y} ${x},${y + r}
        L ${x},${y + height}
        Z
      `}
      fill={fill}
    />
  );
};

/**
 * Custom label for the bar chart.
 * Pill width and font size scale proportionally with the bar width
 * so the badge stays visually correct at any chart/screen size.
 *
 * @param {any} props - label props (x, y, width, value injected by Recharts)
 * @returns {React.ReactElement | null}
 */
const BarLabel = (props: any): React.ReactElement | null => {
  const { x, y, width, value } = props;
  const theme = useTheme();

  if (!value) return null;

  // Scale the pill relative to bar width, clamped to a sensible range
  const pillWidth = Math.min(Math.max(width * 0.75, 22), 42);
  const pillHeight = Math.min(Math.max(pillWidth * 0.48, 14), 20);
  const pillRadius = pillHeight / 2;
  const fontSize = Math.min(Math.max(pillWidth * 0.3, 9), 12);

  return (
    <g>
      <rect
        x={x + (width - pillWidth) / 2}
        y={y - pillHeight / 2} // centred on the bar top edge
        width={pillWidth}
        height={pillHeight}
        rx={pillRadius}
        fill={theme.palette.common.white}
        stroke={theme.palette.divider}
      />
      <text
        x={x + width / 2}
        y={y + pillHeight / 2 - pillHeight / 2 + fontSize * 0.35} // vertically centred inside pill
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight={600}
        fill={theme.palette.text.primary}
      >
        {value}
      </text>
    </g>
  );
};

// ----------------------------------------------------------------------

/**
 * Component to display Total Hires with a bar chart.
 *
 * @component
 * @param {BarchartProps} props - component props
 * @returns {React.ReactElement}
 */
const Barchart = memo(
  ({
    title,
    data,
    xAxisKey = 'label',
    height,
    filterValue,
    onFilterChange,
    filterOptions,
    yAxis,
    isLoading = false,
    isEmpty = false,
    barSize = 54,
    cornerRadius = 6,
  }: BarchartProps): React.ReactElement => {
    const theme = useTheme();

    return (
      <CardWrapper>
        <ChartContainer
          title={title}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
          isLoading={isLoading}
          isEmpty={isEmpty}
        >
          <Box mt={1}>
            <BarChart data={data || []}>
              <CartesianGrid
                vertical={false}
                stroke={theme.palette.divider}
                strokeOpacity={0.25}
                strokeDasharray="2 6"
              />

              <XAxis
                dataKey={xAxisKey}
                padding={{ left: 0, right: 0 }}
                height={30}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 13,
                  fontWeight: 500,
                  fill: theme.palette.text.secondary,
                }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={yAxis?.domain || [0, 'auto']}
                ticks={yAxis?.ticks}
                tickFormatter={yAxis?.formatter}
                tick={{
                  fontSize: 13,
                  fontWeight: 500,
                  fill: theme.palette.text.secondary,
                }}
                width={40}
              />

              <Bar
                dataKey="value"
                shape={(props: any) => CustomBar(props, cornerRadius)}
                background={{
                  fill: theme.palette.action.hover,
                  radius: [cornerRadius * 2, cornerRadius * 2, 0, 0] as any,
                }}
                barSize={barSize}
                isAnimationActive={false}
              >
                {(data || [])?.map((d, i) => (
                  <Cell key={i} fill={d.color || theme.palette.grey[400]} />
                ))}
                <LabelList dataKey="value" content={<BarLabel />} />
              </Bar>
            </BarChart>
          </Box>
        </ChartContainer>
      </CardWrapper>
    );
  }
);

export default Barchart;
