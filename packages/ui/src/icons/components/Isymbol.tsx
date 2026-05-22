import { SvgIcon, SvgIconProps } from '@mui/material';

export const Isymbol = (props: SvgIconProps) => {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 20 20"
      sx={{ ...props.sx, display: 'inline-block' }}
    >
      {/* Outer Circle */}
      <circle
        cx="10"
        cy="10"
        r="7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Info Dot (Top) */}
      <circle cx="10" cy="7" r="0.4" fill="currentColor" />
      {/* Info Stem (Bottom) */}
      <line
        x1="10"
        y1="9.5"
        x2="10"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};
