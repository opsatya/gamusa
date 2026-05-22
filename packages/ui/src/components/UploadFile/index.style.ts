/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for UploadFile component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 04/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default {
  formLabelStyle: (theme: Theme) => ({
    marginBottom: 1.25,
    ...theme.typography.bodyMMedium,
  }),
  containerStyles: (theme: Theme) => ({
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.common.white,
  }),

  imageContainer: (theme: Theme) => ({
    width: theme.spacing(22.5),
    height: 'auto',
  }),

  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain' as const,
  },

  contentContainer: (theme: Theme) => ({
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: theme.spacing(3),
    textAlign: 'center' as const,
  }),

  uploadingFilesContainer: (theme: Theme) => ({
    padding: theme.spacing(2.5, 4),
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[400]}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
  }),

  fileIconContainer: (theme: Theme) => ({
    width: theme.spacing(7.5),
    height: theme.spacing(9.75),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.grey[200],
    flexShrink: 0,
  }),

  fileIcon: (theme: Theme) => ({
    fontSize: theme.spacing(4),
    color: theme.palette.grey[600],
  }),

  filePreview: (theme: Theme) => ({
    width: theme.spacing(7.5),
    height: theme.spacing(9.75),
    borderRadius: theme.spacing(1),
    objectFit: 'cover' as const,
    flexShrink: 0,
    border: `1px solid ${theme.palette.grey[300]}`,
  }),

  fileName: (theme: Theme) => ({
    wordBreak: 'break-word' as const,
    maxWidth: '90%',
    lineHeight: 1.4,
  }),

  deleteButton: (theme: Theme) => ({
    color: theme.palette.error.main,
    marginTop: theme.spacing(-0.5),
    '&:hover': {
      backgroundColor: theme.palette.error.light,
    },
  }),

  statusText: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  }),

  statusIcon: (theme: Theme) => ({
    fontSize: theme.spacing(2),
    marginRight: theme.spacing(0.5),
  }),

  progressBar: (theme: Theme) => ({
    height: theme.spacing(0.75),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.grey[200],
    '& .MuiLinearProgress-bar': {
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.primary.main,
    },
  }),

  errorAlert: (theme: Theme) => ({
    padding: theme.spacing(0.5, 1),
    fontSize: theme.typography.body2.fontSize,
    '& .MuiAlert-icon': {
      fontSize: theme.spacing(2),
    },
  }),
};
