/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define file-related utility functions.
 */

/**
 * Construct URL for a file
 * @param {string | File | null} file - File path or File object
 * @returns {string} - Full URL or object URL
 */
export const makeFileUrl = (
  apiBaseUrl: string,
  file: string | File | null | undefined
): string => {
  if (!file) return '';
  if (file instanceof File) return URL.createObjectURL(file);
  if (file.startsWith('blob:') || file.startsWith('http')) return file;
  return `${apiBaseUrl}/files/${file}`;
};

/**
 * Get file name from path or File object
 * @param {string | File | null | undefined} file
 * @returns {string}
 */
export const getFileName = (file: string | File | null | undefined): string => {
  if (!file) return '';
  if (file instanceof File) return file.name;
  return file.split('/').pop() || '';
};

/**
 * Get formatted file size
 * @param {string | File | null | undefined} file
 * @returns {string}
 */
export const getFileSize = (file: string | File | null | undefined): string => {
  if (!file || !(file instanceof File)) return '';
  const bytes = file.size;
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Sanitize a string so it's safe to use inside a download filename.
 */
const sanitizeForFileName = (value: string): string =>
  value.replace(/[\\/:*?"<>|]+/g, '').trim();

/**
 * Download a remote file directly to disk under a custom filename.
 *
 * S3 / direct URL downloads can't be renamed inline by the browser (the user
 * gets whatever filename the URL ends with). We work around it by fetching
 * the file as a blob, attaching it to a hidden anchor with a `download`
 * attribute, and clicking that anchor — the browser then saves the file
 * using the supplied name.
 *
 * On cross-origin / fetch failure we fall back to `window.open` so the user
 * still sees the file, even though the filename will be the original URL one.
 *
 * @param url       Source URL of the file (S3, etc.)
 * @param baseName  Desired filename without extension. Spaces allowed.
 */
export const openFileWithName = async (
  url: string | null | undefined,
  baseName: string
): Promise<void> => {
  if (!url) return;

  const safeBase = sanitizeForFileName(baseName) || 'document';
  const extFromUrl = (
    url.split('?')[0].split('#')[0].split('.').pop() || ''
  ).toLowerCase();
  const extension = extFromUrl && extFromUrl.length <= 5 ? extFromUrl : 'pdf';
  const fileName = `${safeBase}.${extension}`;

  try {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Failed to fetch file (${response.status})`);
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = fileName;
    // No `target="_blank"` — keeping it on the current tab is what makes the
    // browser actually honor the `download` attribute (instead of opening
    // an inline preview where the filename is ignored).
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
  } catch (err) {
    console.error('openFileWithName fallback to window.open:', err);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Build the candidate-CV display filename used across recruitment screens.
 * Format: "Post Applied for_Candidate First & Last Name".
 */
export const buildCandidateCvFileName = (
  jobTitle: string | null | undefined,
  candidateName: string | null | undefined
): string => {
  const job = (jobTitle || 'Job').toString().trim();
  const candidate = (candidateName || 'Candidate').toString().trim();
  return `Post Applied for ${job}_${candidate}`;
};

/**
 * Get file type label and color
 * @param {string | File | null | undefined} file
 */
export const getFileIcon = (file: string | File | null | undefined) => {
  const name = getFileName(file).toLowerCase();
  if (name.endsWith('.pdf')) return { label: 'PDF', color: '#E4405F' };
  if (name.endsWith('.doc') || name.endsWith('.docx'))
    return { label: 'DOC', color: '#2B579A' };
  if (name.endsWith('.png') || name.endsWith('.jpg') || name.endsWith('.jpeg'))
    return { label: 'IMG', color: '#4CAF50' };
  return { label: 'FILE', color: '#9E9E9E' };
};
