/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Types for LineChart component.
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

export interface SeriesConfig {
  key: string;
  label: string;
  color: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface YAxisConfig {
  domain?: [number | string, number | string];
  ticks?: number[];
  formatter?: (value: any) => string;
}

export interface LineChartProps {
  title: string;
  data: any[];
  series: SeriesConfig[];
  xAxisKey?: string;
  color?: string | string[];
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  yAxis?: YAxisConfig;
  isLoading?: boolean;
  isEmpty?: boolean;
  showLegend?: boolean;
}
