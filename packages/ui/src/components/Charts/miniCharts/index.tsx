/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Mini Charts Component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/26/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface MiniChartProps {
  chartType: 'area' | 'bar' | 'radial' | 'line';
  chartData: any[];
  strokeColor: string;
  id: string;
}

const MiniCharts: React.FC<MiniChartProps> = ({
  chartType,
  chartData,
  strokeColor,
  id,
}) => {
  switch (chartType) {
    case 'area':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={strokeColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={strokeColor}
              strokeWidth={2}
              fill={`url(#grad-${id})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      );

    case 'bar':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <Bar dataKey="v" fill={strokeColor} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );

    case 'radial':
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { value: chartData[0]?.v ?? 0 },
                { value: 100 - (chartData[0]?.v ?? 0) },
              ]}
              cx="50%"
              cy="50%"
              innerRadius={12}
              outerRadius={18}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill={strokeColor} />
              <Cell fill="#E2E8F0" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      );

    default:
      return null;
  }
};

export default memo(MiniCharts);
