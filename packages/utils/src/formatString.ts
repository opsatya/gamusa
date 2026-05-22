export const toPascalCase = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Converts a raw string label into a human-readable display format
 * by replacing dots (.) and underscores (_) with spaces.
 *
 * Capitalization should be handled via CSS `text-transform: capitalize`.
 *
 * @example
 * formatLabel('jobs.applications') // => 'jobs applications'
 * formatLabel('hr_head')           // => 'hr head'
 * formatLabel('view', 'jobs.applications') // => 'view jobs applications'
 *
 * @param parts - One or more string parts to join and format
 * @returns The formatted label string
 */
export const formatLabel = (
  ...parts: (string | undefined | null)[]
): string => {
  return parts.filter(Boolean).join(' ').replace(/[._-]/g, ' ').trim();
};
