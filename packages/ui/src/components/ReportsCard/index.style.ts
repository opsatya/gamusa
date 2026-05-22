/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for the report card.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/15/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { Theme, alpha } from '@mui/material';

/**
 * Styles for ReportCard component.
 */
export default {
  card: (theme: Theme) => ({
    height: '100%',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[4],
      transform: 'translateY(-4px)',
    },
  }),

  iconWrapper: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: '#F5EEFF',
    '& svg': {
      width: 20,
      height: 20,
      color: theme.palette.primary.main,
      '& path': {
        fill: 'currentColor',
      },
    },
  }),
};
