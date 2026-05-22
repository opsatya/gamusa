import { SvgIcon, SvgIconProps } from '@mui/material';

export const RejectIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
        transform="rotate(45 12 12)"
      />
    </SvgIcon>
  );
};
