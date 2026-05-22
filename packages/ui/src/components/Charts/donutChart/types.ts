/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Top Roles chart types.
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
 * Interface for pie chart data item.
 *
 * @interface PieDataItem
 * @property {string} label - display label for the segment
 * @property {number} value - numeric value for the segment
 * @property {string} color - color for the segment
 */
export interface PieDataItem {
  label: string;
  value: number;
  color: string;
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
 * Props for DonutChart component.
 *
 * @interface DonutChartProps
 * @property {string} title - chart title
 * @property {PieDataItem[]} data - pie chart data
 * @property {string} totalLabel - label for center total display
 * @property {string} filterValue - current filter value
 * @property {Function} onFilterChange - filter change handler
 * @property {FilterOption[]} filterOptions - available filter options
 * @property {boolean} isLoading - loading state
 * @property {boolean} isEmpty - empty state indicator
 * @property {boolean} showLegend - show/hide legend
 */
export interface DonutChartProps {
  title?: string;
  data: PieDataItem[];
  totalLabel?: string;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  isLoading?: boolean;
  isEmpty?: boolean;
  showLegend?: boolean;
  color?: string | string[];
}
