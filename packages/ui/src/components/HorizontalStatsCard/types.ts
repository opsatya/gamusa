/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Horizontal Stats Card Types
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 16/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Stats item configuration interface
 *
 * @interface StatsItemConfig
 * @property {string} id - Unique identifier
 * @property {string} label - Display label
 * @property {string} value - Display value
 * @property {React.ComponentType} icon - Icon component
 * @property {{ value: number; type: 'up' | 'down' }} [change] - Change information
 */
export interface StatsItemConfig {
  id: string;
  label: string;
  value: string;
  icon: React.ComponentType;
  change?: {
    value: number;
    type: 'up' | 'down';
  };
}

/**
 * Horizontal stats card props interface
 *
 * @interface HorizontalStatsCardProps
 * @property {StatsItemConfig[]} items - Array of stats items
 * @property {boolean} [isLoading] - Loading state
 * @property {boolean} [isEmpty] - Empty state
 */
export interface HorizontalStatsCardProps {
  items: StatsItemConfig[];
  isLoading?: boolean;
  isEmpty?: boolean;
}
