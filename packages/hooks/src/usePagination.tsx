import { useState, useMemo } from 'react';

/**
 * @description Interface for the properties required by the usePagination hook.
 * @template T - The type of data in the array.
 * @property {T[]} data - The full array of data to be paginated.
 * @property {number} [initialItemsPerPage=10] - The number of items to display on a single page.
 * @property {number} [initialPage=1] - The page to be displayed on initial render.
 */
interface UsePaginationProps<T> {
  data: T[];
  initialItemsPerPage?: number;
  initialPage?: number;
}

/**
 * @description A custom hook to manage pagination logic for a data table.
 * @template T - The type of data in the array.
 * @param {UsePaginationProps<T>} props - The properties for the hook.
 * @returns An object containing pagination state and helper functions.
 */
export function usePagination<T>({
  data,
  initialItemsPerPage = 5,
  initialPage = 1,
}: UsePaginationProps<T>) {
  // State to track the current active page.
  const [currentPage, setCurrentPage] = useState(initialPage);

  // State to track the number of items to display per page.
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Memoized calculation for the total number of pages.
  // This recalculates only when the data length or itemsPerPage changes.
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  // Memoized calculation for the data to be displayed on the current page.
  // This slices the data array based on the current page and items per page.
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  /**
   * @description Handler to change the current page.
   * @param {number} page - The new page number to navigate to.
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /**
   * @description Handler to change the number of items displayed per page.
   * Resets the current page to 1 to avoid being on a non-existent page.
   * @param {string | number} value - The new number of items per page.
   */
  const handleItemsPerPageChange = (value: string | number) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to the first page
  };

  // The public API of the hook, returning state and handlers.
  return {
    // State values
    currentPage,
    itemsPerPage,
    totalItemCount: data.length,
    paginatedData,
    totalPages,

    // Handlers
    onPageChange: handlePageChange,
    onItemsPerPageChange: handleItemsPerPageChange,
  };
}
