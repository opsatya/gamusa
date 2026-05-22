/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create pagination component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import { Box, MenuItem, Pagination, Typography } from '@mui/material';

/* Relative Imports */
import SelectInput from '../InputFields/SelectInput';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Pagination Component for list.
 *
 * @interface ListPaginationProps
 * @property {boolean} paging - flag to enable/disable paging
 * @property {number} currentPage - page number of current page
 * @property {number} itemsPerPage - number of items listed in a page
 * @property {array} itemsPerPageOption - array for select box of items per page
 * @property {number} totalItemCount - total number of items
 * @property {function} onPageChange - changing page number on clicking
 * @property {function} onItemsPerPageChange - selecting number of Items to list in a page
 * @property {boolean} showResultTab - condition whether to show ResultTab
 * @property {boolean} showItemsPerPageFilter - condition whether to use ItemsPerPage selection tab
 * @property {object|function} containerStyle - custom styles
 */

interface ListPaginationProps {
  paging: boolean;
  currentPage: number;
  itemsPerPage: number;
  itemsPerPageOption: Array<any>;
  totalItemCount: number;
  onPageChange: (val: number) => void;
  onItemsPerPageChange?: (val: number) => void;
  showResultTab?: boolean;
  showItemsPerPageFilter?: boolean;
  containerStyle?: object | (() => void);
}

const ListPagination = memo(
  ({
    paging,
    currentPage,
    itemsPerPage,
    itemsPerPageOption,
    totalItemCount,
    onPageChange,
    onItemsPerPageChange = () => null,
    showResultTab = true,
    showItemsPerPageFilter = true,
    containerStyle = {},
  }: ListPaginationProps): React.ReactElement => {
    const firstItemCount =
      totalItemCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const lastItemCount =
      (currentPage - 1) * itemsPerPage + itemsPerPage > totalItemCount
        ? totalItemCount
        : (currentPage - 1) * itemsPerPage + itemsPerPage;

    return (
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: theme.spacing(1.25, 1.5),
          flexWrap: 'wrap',
          rowGap: 1,
          ...containerStyle,
        })}
      >
        {/* Left Side: Result count */}
        {showResultTab && (
          <Typography
            sx={(theme) => ({
              fontSize: '0.8125rem',
              color: theme.palette.text.secondary,
              fontWeight: 400,
              flex: { xs: '1 1 100%', sm: '0 0 auto' },
            })}
          >
            Showing{' '}
            <Box
              component="span"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              {firstItemCount} – {lastItemCount}
            </Box>{' '}
            of{' '}
            <Box
              component="span"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              {totalItemCount}
            </Box>{' '}
            entries
          </Typography>
        )}

        {/* Right Side: Pagination Controls and Items per Page */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {paging && (
            <Pagination
              variant="outlined"
              shape="rounded"
              page={currentPage}
              siblingCount={0}
              boundaryCount={1}
              count={Math.ceil(totalItemCount / itemsPerPage)}
              onChange={(_, page) => onPageChange(page)}
              sx={(theme) => ({
                '& .MuiPaginationItem-root': {
                  borderRadius: '6px',
                  margin: '0 2px',
                  border: 'none',
                  fontSize: '0.8125rem',
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  minWidth: 32,
                  height: 32,
                },
                '& .MuiPaginationItem-ellipsis': {
                  border: 'none',
                },
                '& .Mui-selected': {
                  backgroundColor: `${theme.palette.primary.main} !important`,
                  color: '#fff !important',
                  fontWeight: 600,
                  borderColor: `${theme.palette.primary.main} !important`,
                },
                '& .MuiPaginationItem-previousNext': {
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                },
              })}
            />
          )}
          {paging && showItemsPerPageFilter && (
            <Box sx={{ width: 100, flexShrink: 0 }}>
              <SelectInput
                name="items-per-page"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(e.target.value as number)}
                renderValue={(value) => `Show ${value}`}
                sx={(theme) => ({
                  height: 30,
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: theme.palette.text.secondary,
                  borderRadius: '6px',
                  '& .MuiSelect-select': {
                    padding: '0 6px 0 10px',
                    display: 'flex',
                    alignItems: 'center',
                  },
                })}
              >
                {itemsPerPageOption.map((option: any) => (
                  <MenuItem key={option} value={option}>
                    Show {option}
                  </MenuItem>
                ))}
              </SelectInput>
            </Box>
          )}
        </Box>
      </Box>
    );
  }
);
export default memo(ListPagination);
