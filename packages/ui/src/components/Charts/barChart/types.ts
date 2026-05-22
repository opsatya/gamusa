/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description bar chart types.
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

/**
 * Interface for bar chart data item.
 *
 * @interface BarDataItem
 * @property {string} label - display label for the bar
 * @property {number} value - numeric value for the bar
 * @property {string} color - color for the bar
 */
export interface BarDataItem {
  label: string;
  value: number;
  color?: string;
}

/**
 * Interface for filter option configuration.
 *
 * @interface FilterOption
 * @property {string} value - option value
 * @property {string} label - option display label
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Interface for axis configuration.
 *
 * @interface AxisConfig
 * @property {[number | string, number | string]} domain - axis domain
 * @property {number[]} ticks - axis ticks
 * @property {(value: number) => string} formatter - tick formatter function
 */
export interface AxisConfig {
  domain?: [number | string, number | string];
  ticks?: number[];
  formatter?: (value: number) => string;
}

/**
 * Props for TotalHires component.
 *
 * @interface BarchartProps
 * @property {string} title - chart title
 * @property {BarDataItem[]} data - bar chart data
 * @property {string} filterValue - current filter value
 * @property {Function} onFilterChange - filter change handler
 * @property {FilterOption[]} filterOptions - available filter options
 * @property {AxisConfig} yAxis - Y-axis configuration
 * @property {boolean} isLoading - loading state
 * @property {boolean} isEmpty - empty state indicator
 * @property {number} barSize - width of each bar
 * @property {number} cornerRadius - corner radius for bar top
 */
export interface BarchartProps {
  title?: string;
  data: BarDataItem[];
  xAxisKey?: string;
  height?: number | string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  yAxis?: AxisConfig;
  isLoading?: boolean;
  isEmpty?: boolean;
  barSize?: number;
  cornerRadius?: number;
}
