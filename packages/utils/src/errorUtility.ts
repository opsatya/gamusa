/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the error utility functions.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 29/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

const commonErrorMessage = 'Unable to process your request. Please try again.';

/**
 * function to extract error message from error object
 *
 * @param {object} error - error object
 * @returns {string}
 */

export function extractErrorMessage(error: any) {
  try {
    if (error?.response?.data?.errors?.length > 0) {
      // Return all error messages joined together
      return error.response.data.errors
        .map((err: any) => err?.message)
        .join(', ');
    }

    if (error?.response?.data?.message) {
      return error.response.data.message;
    }

    if (error?.message === 'Network Error') {
      return 'Network error — please check your connection or file size limit.';
    }

    if (error?.message) {
      return error.message;
    }

    return commonErrorMessage;
  } catch {
    return commonErrorMessage;
  }
}
