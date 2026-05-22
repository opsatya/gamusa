/**
 * Generates an array of years for select options
 * @param {number} startYear - The starting year (default: 1990)
 * @param {number} endYearOffset - Years to add to current year for end range (default: 1 for next year)
 * @returns {Array} Array of year options
 */
export const generateYearOptions = (
  startYear: number = 1990,
  endYearOffset: number = 1
): Array<{ value: string; label: string }> => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + endYearOffset;
  const years = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  return years;
};

/**
 * Generates year options with SelectOption type
 */
export const getYearSelectOptions = (
  startYear?: number,
  endYearOffset?: number
) => {
  return generateYearOptions(startYear, endYearOffset);
};
