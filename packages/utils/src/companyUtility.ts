/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the company utility functions.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 03/Mar/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/**
 * function to get valid logo URL
 * @param logoUrl - logo URL to validate
 * @returns {string | null} - valid logo URL or null
 */
export const getValidLogo = (
  logoUrl: string | null | undefined
): string | null => {
  if (
    typeof logoUrl === 'string' &&
    logoUrl.trim() !== '' &&
    logoUrl !== 'string'
  ) {
    return logoUrl;
  }
  return null;
};

/**
 * function to get company name from URL
 * @returns {string} - company name
 */
export const getCompanyNameFromUrl = (): string => {
  if (typeof window === 'undefined') return 'Nexus Intra';
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'Nexus Intra';
  }

  const parts = hostname.split('.');
  if (parts.length <= 2 && !hostname.includes('localhost')) {
    return 'Nexus Intra';
  }

  const subdomain = parts[0];
  if (subdomain && subdomain !== 'www' && subdomain !== 'localhost') {
    return subdomain.charAt(0).toUpperCase() + subdomain.slice(1);
  }

  return 'Nexus Intra';
};

/**
 * function to get dynamic copyright text
 * @returns {string} - dynamic copyright text
 */
export const getDynamicCopyright = (): string => {
  return `© ${new Date().getFullYear()} ${getCompanyNameFromUrl()} Recruitment. All rights reserved.`;
};
