export const getFileNameFromUrl = (url: string, index: number) => {
  try {
    const name = url.split('/').pop();
    return name || `Document ${index + 1}`;
  } catch {
    return `Document ${index + 1}`;
  }
};
