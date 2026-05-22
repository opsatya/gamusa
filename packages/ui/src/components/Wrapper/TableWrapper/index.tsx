/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create table wrapper component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import CardWrapper from '../CardWrapper';
import TableHeaderControls from './TableHeaderControls';

/**
 * @description Interface for table header row
 * @property {string[]} left - Array of strings for left side of the row
 * @property {string[]} right - Array of strings for right side of the row
 */
export interface TableHeaderRow {
  left?: string[];
  right?: string[];
  leftSize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  rightSize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
}

/**
 * @description Interface for table header layout
 * @property {TableHeaderRow[]} rows - Array of table header rows
 */
export interface TableHeaderLayout {
  rows: TableHeaderRow[];
}

/**
 * @description Interface for base header control
 * @property {number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number }} grid - Grid size for this control (MUI Grid compatible)
 * @property {'left' | 'center' | 'right'} align - Optional alignment inside its grid cell
 */
export interface BaseHeaderControl {
  grid?:
    | number
    | 'auto'
    | {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
        xxl?: number;
      };
  align?: 'left' | 'center' | 'right';
}

/**
 * @description Interface for title control
 * @property {'title'} type - Type of control
 * @property {string} text - Text to display
 */
export interface TitleControl extends BaseHeaderControl {
  type: 'title';
  text?: string;
}

/**
 * @description Interface for search control
 * @property {'search'} type - Type of control
 * @property {string} placeholder - Placeholder text
 * @property {(value: string) => void} onChange - Callback function when value changes
 * @property {string} value - Current value
 */
export interface SearchControl extends BaseHeaderControl {
  type: 'search';
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  size?: 'small' | 'large' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  icon?: React.ReactNode;
  styles?: any;
}

/**
 * @description Interface for dropdown control
 * @property {'dropdown'} type - Type of control
 * @property {string} placeholder - Placeholder text
 * @property {(value: string) => void} onChange - Callback function when value changes
 * @property {string} value - Current value
 * @property {Array<{ label: string; value: string }>} options - Array of options
 */
export interface DropdownControl extends BaseHeaderControl {
  type: 'dropdown';
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  size?: 'small' | 'large' | 'medium';
  variant?: 'outlined' | 'filled' | 'standard';
  styles?: any;
}

/**
 * @description Interface for toggle control
 * @property {'toggle'} type - Type of control
 * @property {Array<{ label: string; value: string; icon?: React.ReactNode }>} options - Array of options
 * @property {(value: string) => void} onChange - Callback function when value changes
 * @property {string} value - Current value
 */
export interface ToggleControl extends BaseHeaderControl {
  type: 'toggle';
  options: ReadonlyArray<{
    label: string;
    value: string;
    icon?: React.ReactNode;
  }>;
  onChange?: (value: string) => void;
  value?: string;
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'standard'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

/**
 * @description Interface for custom control
 * @property {'custom'} type - Type of control
 * @property {React.ReactNode} component - Custom component to render
 */
export interface CustomControl extends BaseHeaderControl {
  type: 'custom';
  component: React.ReactNode;
}

/**
 * @description Union type of all header controls
 */
export type TableHeaderControl =
  | TitleControl
  | SearchControl
  | DropdownControl
  | ToggleControl
  | CustomControl;
/**
 * @description Record of header controls
 */
export type TableHeaderControls = Record<string, TableHeaderControl>;

/**
 * @description Props for TableWrapper component
 * @property {React.ReactNode} children - React node to render inside the table wrapper
 * @property {TableHeaderLayout} layout - Layout of the table header
 * @property {TableHeaderControls} controls - Optional controls for the table header
 */
export interface TableWrapperProps {
  children: React.ReactNode;
  layout: TableHeaderLayout;
  controls?: TableHeaderControls;
}

const TableWrapper = ({ children, layout, controls }: TableWrapperProps) => {
  return (
    <CardWrapper containerStyle={{ overflow: 'visible' }}>
      <TableHeaderControls layout={layout} controls={controls} />
      {children}
    </CardWrapper>
  );
};

export default memo(TableWrapper);
