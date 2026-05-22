/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Top Roles pie chart component.
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
import React, { memo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Sector } from 'recharts';

/* Local Imports */
import ChartContainer from '../chartContainer';
import { DonutChartProps, FilterOption } from './types';
import { styles } from './index.style';
import CardWrapper from '../../Wrapper/CardWrapper';
// ----------------------------------------------------------------------

/**
 * Active shape renderer for the pie chart hover effect.
 *
 * @param {any} props - shape props
 * @returns {React.ReactElement}
 */
const renderActiveShape = (props: any): React.ReactElement => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        style={{
          filter: `drop-shadow(0px 8px 20px ${fill}40)`,
          outline: 'none',
        }}
      />
    </g>
  );
};

/**
 * Default filter options.
 */
const DEFAULT_FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All Time' },
  { value: 'monthly', label: 'Monthly' },
];

/**
 * Component to display Top Roles with a donut chart.
 *
 * @component
 * @param {DonutChartProps} props - component props
 * @returns {React.ReactElement}
 */
const DonutChart = memo(
  ({
    title,
    data,
    totalLabel = 'Total Emp.',
    filterValue,
    onFilterChange,
    filterOptions = DEFAULT_FILTER_OPTIONS,
    isLoading = false,
    isEmpty = false,
    showLegend = true,
    color,
  }: DonutChartProps): React.ReactElement => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(
      undefined
    );
    const total = (data || []).reduce((s, i) => s + i.value, 0);

    const onPieEnter = (_: any, index: number) => {
      setActiveIndex(index);
    };

    const onPieLeave = () => {
      setActiveIndex(undefined);
    };
    return (
      <CardWrapper>
        <ChartContainer
          title={title}
          filterValue={filterValue}
          onFilterChange={onFilterChange}
          filterOptions={filterOptions}
          minHeight={420}
          isLoading={isLoading}
          isEmpty={isEmpty}
        >
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              dataKey="value"
              innerRadius={80}
              outerRadius={110}
              paddingAngle={3}
              stroke="none"
              cornerRadius={4}
              animationDuration={800}
              animationBegin={0}
              cx="50%"
              cy="50%"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              {...(activeIndex !== undefined && { activeIndex })}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    Array.isArray(color)
                      ? color[index] || entry.color
                      : color || entry.color
                  }
                  style={{
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              ))}
            </Pie>
          </PieChart>

          {/* Center Circle with Shadow as an overlay */}
          <Box sx={styles.centerCircle}>
            <Typography variant="h4">{total}</Typography>
            <Typography variant="body2">{totalLabel}</Typography>
          </Box>
        </ChartContainer>

        {/* Legend */}
        {showLegend && !isLoading && !isEmpty && (
          <Box sx={styles.legendContainer}>
            {data?.map((item, index) => (
              <Box key={item.label} sx={styles.legendItem}>
                <Box sx={styles.legendLeft}>
                  <Box
                    sx={{
                      ...styles.legendDot,
                      backgroundColor: Array.isArray(color)
                        ? color[index] || item.color
                        : color || item.color,
                    }}
                  />
                  <Typography variant="bodySMedium" color="text.secondary">
                    {item?.label}
                  </Typography>
                </Box>
                <Typography variant="bodyMBold">{item?.value}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </CardWrapper>
    );
  }
);

export default DonutChart;
