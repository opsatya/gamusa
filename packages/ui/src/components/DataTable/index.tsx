/* eslint-disable no-nested-ternary */
/**
 * @copyright @2022 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create data table component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 18/Nov/2022
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { memo, useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

/* Relative Imports */
import ListPagination from '../Pagination';
import { applySortFilter, getComparator } from '@lektus/utils';

/* Local Imports */
import TableHeader from './TableHeader';
import styles from './index.style';
import TableSkeleton from '../Skeleton/TableSkeleton';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create data table component for showing the data.
 *
 * @interface DataTableProps
 * @property {Array} columns - columns for the data of table
 * @property {Array} rows - rows for the data of table
 * @property {number} totalRow - total row of the data
 * @property {boolean} paging - paging for the data of table
 * @property {number} initialPageSize - initial page size to show on pages of the data table
 * @property {boolean} showResults - show results for the data of table
 * @property {boolean} showRowPerPage - show rows per page for the data of table
 * @property {boolean} isLoading - loading for the data to load
 * @property {object|function} containerStyle - container style for the data table
 */
interface DataTableProps {
  columns: Array<any>;
  rows: Array<any>;
  totalRow: number;
  page?: number;
  itemsPerPage?: number;
  showResults?: boolean;
  showRowPerPage?: boolean;
  isLoading?: boolean;
  containerStyle?: object | (() => void);
  handlePageChange?: (page: number) => void;
  handleItemsPerPageChange?: (itemsPerPage: number) => void;
  onRowClick?: (row: any) => void;
  inlineAddRow?: React.ReactNode;
  inlineBottomRow?: React.ReactNode;
  onColumnResize?: (field: string, deltaX: number) => void;
}

// ----------------------------------------------------------------------

/**
 * Data Table component for showing the data
 *
 * @component
 * @param {Array} columns - columns for the data of table
 * @param {Array} rows - rows for the data of table
 * @param {number} totalRow - total row of the data
 * @param {boolean} paging - paging for the data of table
 * @param {number} initialPageSize - initial page size to show on pages of the data table
 * @param {boolean} showResults - show results for the data of table
 * @param {boolean} showRowPerPage - show rows per page for the data of table
 * @param {boolean} isLoading - loading for the data to load
 * @param {object|function} containerStyle - container style for the data table
 * @returns {React.ReactElement}
 */
const DataTable = ({
  columns,
  rows,
  totalRow,
  page,
  itemsPerPage = 10,
  showResults = true,
  showRowPerPage = true,
  isLoading = false,
  handlePageChange,
  handleItemsPerPageChange,
  containerStyle = {},
  onRowClick,
  inlineAddRow,
  inlineBottomRow,
  onColumnResize,
}: DataTableProps): React.ReactElement => {
  /* Constants */
  const rowsPerPageOption = [10, 10 * 2, 10 * 5, 10 * 10];

  /* States */
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  /* Functions */
  const handleRequestSort = (property: string): void => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedRows = useMemo(() => {
    if (order && orderBy) {
      // Find the column definition for the current orderBy field
      const column = columns.find((col) => col.field === orderBy);

      if (column && column.getValue) {
        const sortedData = [...rows].sort((a, b) => {
          const aValue = column.getValue(a);
          const bValue = column.getValue(b);

          if (aValue < bValue) {
            return order === 'asc' ? -1 : 1;
          }
          if (aValue > bValue) {
            return order === 'asc' ? 1 : -1;
          }
          return 0;
        });
        return sortedData;
      } else {
        return applySortFilter(rows, getComparator(order, orderBy));
      }
    }
    return rows;
  }, [rows, order, orderBy, columns]);

  /* Output */
  return (
    <Box sx={styles.rootStyle}>
      {isLoading ? (
        <TableSkeleton rows={rows?.length || 4} />
      ) : (
        <>
          <TableContainer sx={[styles.tableContainer, containerStyle]}>
            <Table sx={{ tableLayout: onColumnResize ? 'fixed' : 'auto' }}>
              <TableHeader
                header={columns}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                onColumnResize={onColumnResize}
              />
              <TableBody>
                {inlineAddRow}
                {sortedRows && sortedRows.length > 0 ? (
                  <>
                    {sortedRows?.map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          onClick={() => onRowClick?.(row)}
                          sx={{
                            cursor: onRowClick ? 'pointer' : 'default',
                            '&:hover': {
                              backgroundColor: onRowClick
                                ? 'action.hover'
                                : 'inherit',
                            },
                          }}
                        >
                          {columns?.map((column, cIndex) => (
                            <TableCell
                              key={cIndex}
                              align={
                                column.cellAlign ? column.cellAlign : 'left'
                              }
                              width={column.width}
                              sx={() => ({
                                ...(column.minWidth && {
                                  minWidth: column.minWidth,
                                }),
                              })}
                            >
                              {column.renderCell
                                ? column.renderCell(row)
                                : column.getValue
                                  ? column.getValue(row)
                                  : row[column.field]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <Typography variant="bodySRegular" align="left">
                        No results found.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
                {inlineBottomRow}
              </TableBody>
            </Table>
          </TableContainer>
          {totalRow > 0 &&
            handlePageChange &&
            handleItemsPerPageChange &&
            page && (
              <ListPagination
                paging={true}
                currentPage={page}
                itemsPerPage={itemsPerPage}
                itemsPerPageOption={rowsPerPageOption}
                totalItemCount={totalRow}
                showResultTab={showResults}
                showItemsPerPageFilter={showRowPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                containerStyle={styles.pagination}
              />
            )}
        </>
      )}
    </Box>
  );
};

export default memo(DataTable);
