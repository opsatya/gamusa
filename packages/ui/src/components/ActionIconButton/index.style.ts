import { alpha, Theme } from '@mui/material';
import type { PaletteColor } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { ActionIconButtonProps } from './';

export default {
  containerStyles: (
    theme: Theme,
    disabled: boolean,
    variant: ActionIconButtonProps['variant'],
    sx?: SxProps<Theme>
  ) => {
    const key = variant || 'primary';
    const mainColor = (theme.palette[key] as PaletteColor).main;

    return {
      backgroundColor: 'white',
      borderRadius: theme.spacing(1),
      color: disabled ? theme.palette.grey[300] : mainColor,
      border: `1px solid ${disabled ? theme.palette.grey[200] : alpha(mainColor, 0.5)}`,
      padding: theme.spacing(0.625),
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.15s ease-in-out',
      '&:hover': disabled
        ? {}
        : {
            opacity: 0.85,
            transform: 'scale(1.04)',
            backgroundColor: '#F9FAFB',
          },
      '& svg': {
        width: theme.spacing(2),
        height: theme.spacing(2),
      },
      ...sx,
    };
  },
};
