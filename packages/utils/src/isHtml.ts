/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Utility function to detect if a string contains HTML content.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 13/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/**
 * Checks if a given value is an HTML string
 *
 * @function isHTML
 * @param {any} value - The value to check
 * @returns {boolean} - Returns true if the value contains HTML tags, false otherwise
 *
 * @example
 * isHTML('<p>Hello World</p>') // true
 * isHTML('Plain text') // false
 * isHTML('<ul><li>Item</li></ul>') // true
 * isHTML('Hello <br/> World') // true
 * isHTML(null) // false
 * isHTML(123) // false
 */
export const isHTML = (value: any): boolean => {
  // Return false if value is not a string
  if (typeof value !== 'string') {
    return false;
  }

  // Trim the value to avoid whitespace issues
  const trimmedValue = value.trim();

  // Return false if empty string
  if (!trimmedValue) {
    return false;
  }

  // Regular expression to detect HTML tags
  // Matches opening tags like <p>, <div>, <ul>, <br/>, etc.
  const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;

  // Test if the string contains HTML tags
  return htmlTagPattern.test(trimmedValue);
};

export default isHTML;
