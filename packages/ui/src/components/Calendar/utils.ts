/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Utility functions for LektusCalendar component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 11/02/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/**
 * Generate a deterministic light pastel color based on event ID
 * Uses string hash to ensure same event always gets same color
 *
 * Algorithm:
 * - Converts event ID to numeric hash
 * - Uses hash to generate HSL color with:
 *   - Hue: Random (0-360)
 *   - Saturation: 70-80% (vibrant but not oversaturated)
 *   - Lightness: 85-92% (light pastel range)
 *
 * @param {string} eventId - Unique event identifier
 * @returns {string} HSL color string
 *
 * @example
 * generateLightColor('event-123') // 'hsl(245, 75%, 88%)'
 * generateLightColor('event-123') // 'hsl(245, 75%, 88%)' (same result)
 */
export const generateLightColor = (eventId: string): string => {
  // Simple string hash function
  let hash = 0;
  for (let i = 0; i < eventId.length; i++) {
    const char = eventId.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Convert hash to positive number
  hash = Math.abs(hash);

  // Generate HSL values
  const hue = hash % 360; // Full color spectrum
  const saturation = 70 + (hash % 10); // 70-80%
  const lightness = 85 + (hash % 7); // 85-92% (light pastel range)

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Format date string to readable format
 *
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string (e.g., "Feb 15, 2025")
 */
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Check if a date is today
 *
 * @param {string} dateStr - ISO date string (YYYY-MM-DD)
 * @returns {boolean} True if date is today
 */
export const isToday = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Get week number of the year
 *
 * @param {Date} date - Date object
 * @returns {number} Week number (1-53)
 */
export const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
