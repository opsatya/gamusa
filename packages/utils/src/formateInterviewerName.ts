// Add this helper function inside the component (or above it)
export const formatInterviewName = (name: string): string => {
  if (!name) return '';
  return name
    .split('_')
    .map((w: string) => {
      const up = w.toUpperCase();
      if (up === 'HR' || up === 'IT' || up === 'CTO' || up === 'CEO') {
        return up;
      }
      return up.charAt(0) + up.slice(1).toLowerCase();
    })
    .join(' ');
};
