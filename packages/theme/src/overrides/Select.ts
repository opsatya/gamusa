/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Select component to override default Mui Select's style.
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
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { Theme } from '@mui/material';
import type { Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

/**
 * Select contains the styles to override default Mui Select and it's children's styles.
 *
 * @component
 * @param theme - global theme object to provide colors, fonts, spacing, shadows etc.
 * @returns Add-on styles for MuiSelect
 */
export default function Select(theme: Theme): Components<Theme> {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: ExpandMoreRoundedIcon,
      },
      styleOverrides: {
        select: {
          ...theme.typography.body1,
          height: 48,
          padding: '11px 20px',
          '&.MuiInputBase-inputSizeSmall': {
            height: 40,
            lineHeight: 1.4,
          },
        },
      },
    },
  };
}
