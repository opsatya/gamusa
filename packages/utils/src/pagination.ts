export const generateRowsPerPageOptions = (
  baseOption: number = 4
): number[] => {
  return Array.from({ length: 10 }, (_, i) => baseOption * (i + 1));
};

export const generatePageNumber = (totalPages: number): number[] => {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
};
