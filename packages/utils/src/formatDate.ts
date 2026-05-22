/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the format date functions.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 09/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { format } from 'date-fns';

// ----------------------------------------------------------------------

/**
 * function to format the date
 *
 * @param {Date | string} date - date to convert in specific format
 * @param {string} dateFormat - date format to convert the date
 * @returns {string}
 */
export function getDate(
  date: Date | string,
  dateFormat: string = 'dd MMM yyyy'
): string | undefined {
  if (date) {
    return format(new Date(date), dateFormat);
  }
}

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
