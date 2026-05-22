/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Types for the Performance Summary component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/25/2026
 */

import type { ReactNode } from 'react';

export type TimeInterval = 'week' | 'month' | 'year';

export interface PerformanceMetric {
  id: string;
  label: string;
  value: string;
  subLabel: string;
  /** Optional trend relative to the previous period, e.g. +12 or -3 */
  trend?: number;
  icon?: React.ElementType;
  iconType?: string;
  chartType: 'line' | 'bar' | 'radial' | 'area';
  chartData: any[];
  color: string;
  strokeColor: string;
}

export interface PerformanceSummaryProps {
  metrics?: PerformanceMetric[];
}

export interface DashboardSummaryCardExtras {
  title?: string;
  subtitle?: string;
  rightContent?: ReactNode;
  footerContent?: ReactNode;
}
