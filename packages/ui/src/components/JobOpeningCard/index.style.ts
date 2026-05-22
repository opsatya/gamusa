/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Job Opening Card Styles
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 16/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

import { Theme, alpha } from '@mui/material';

const styles = {
  root: (theme: any) => ({
    cursor: 'pointer',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create(
      ['box-shadow', 'border-color', 'transform'],
      {
        duration: theme.transitions.duration.shorter,
      }
    ),
    '&:hover': {
      borderColor: theme.palette.primary.light,
      boxShadow: theme.customShadows?.z4 || theme.shadows[4],
      transform: 'translateY(-2px)',
    },
  }),

  cardHeader: (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 1.5,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1.5),
    },
  }),

  departmentChip: (theme: Theme) => ({
    borderRadius: '6px',
    height: '28px',
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.text.primary,
    '& .MuiChip-label': {
      fontSize: '12px',
      fontWeight: 600,
      padding: '4px 12px',
    },
  }),

  titleSection: {
    mb: 2,
  },

  infoRow: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing(2.5),
  }),

  infoItem: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    '& .MuiSvgIcon-root': {
      fontSize: '18px',
      color: theme.palette.grey[500],
    },
  }),

  actionSection: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),

    '& .MuiFormControl-root': {
      minWidth: 140,
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      justifyContent: 'space-between',

      '& .MuiFormControl-root': {
        minWidth: 110,
        maxWidth: 140,
      },
    },
  }),

  moreButton: (theme: Theme) => ({
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
  }),

  menu: (theme: any) => ({
    '& .MuiPaper-root': {
      width: '200px',
      boxShadow: theme.customShadows?.z8 || theme.shadows[8],
      borderRadius: '10px',
      border: `1px solid ${theme.palette.divider}`,
    },
    '& .MuiList-root': {
      padding: theme.spacing(0.75),
    },
  }),

  menuItem: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1.25,
    px: 1.5,
    py: 1,
    borderRadius: '8px',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shorter,
    }),

    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  }),

  menuItemDelete: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 1.25,
    px: 1.5,
    py: 1,
    borderRadius: '8px',
    color: theme.palette.error.main,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.shorter,
    }),

    '& .MuiSvgIcon-root': {
      color: theme.palette.error.main,
    },

    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.08),
    },
  }),

  editIconBox: {
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIcon: {
    width: '17px',
    height: '17px',
  },
};
export default styles;
