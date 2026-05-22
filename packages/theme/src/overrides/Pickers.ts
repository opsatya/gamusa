/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Pickers component to override default Mui Pickers', MuiDialog's and other pickers' style.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 08/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { alpha, Theme } from '@mui/material';

// ----------------------------------------------------------------------

/**
 * Pickers contains the styles to override default Mui Pickers and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiPickers, MuiDialog and other pickers
 */
export default function Pickers(theme: Theme) {
  return {
    MuiPickersPopper: {
      styleOverrides: {
        paper: {
          boxShadow: theme.customShadows.z24,
          borderRadius: theme.shape.borderRadiusMd,
        },
      },
    },

    MuiPickersDay: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
        },
        today: {
          '&:not(.Mui-selected)': {
            border: `solid 1px ${theme.palette.divider}`,
            backgroundColor: theme.palette.action.selected,
          },
        },
      },
    },

    MuiPickersToolbar: {
      styleOverrides: {
        root: {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.main,
          '& .MuiTypography-root': {
            color: alpha(theme.palette.common.white, 0.72),
            '&.Mui-selected': {
              color: theme.palette.common.white,
            },
            '&.MuiDatePickerToolbar-dateTitleLandscape': {
              color: theme.palette.common.white,
            },
          },
        },
      },
    },

    MuiDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.palette.primary.main,
          '& .MuiTab-root': {
            margin: 0,
            opacity: 0.48,
            color: theme.palette.common.white,
            '&.Mui-selected': { opacity: 1 },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
      },
    },

    MuiPickersStaticWrapper: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z24,
          borderRadius: theme.shape.borderRadiusMd,
          '& .MuiDateRangePickerViewDesktop-rangeCalendarContainer:not(:last-child)':
            {
              borderRightWidth: 1,
            },
        },
      },
    },

    MuiTimePickerToolbar: {
      styleOverrides: {
        hourMinuteLabelLandscape: {
          margin: 'auto',
        },
      },
    },

    MuiClock: {
      styleOverrides: {
        root: {
          position: 'relative',
          margin: theme.spacing(5, 3),
        },
        clock: {
          backgroundColor: alpha(theme.palette.grey[500], 0.24),
        },
        amButton: {
          left: theme.spacing(-1),
          bottom: theme.spacing(-3),
          backgroundColor: alpha(theme.palette.grey[500], 0.24),
        },
        pmButton: {
          right: theme.spacing(-1),
          bottom: theme.spacing(-3),
          backgroundColor: alpha(theme.palette.grey[500], 0.24),
        },
      },
    },
  };
}
