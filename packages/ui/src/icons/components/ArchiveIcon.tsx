import { SvgIcon, SvgIconProps } from '@mui/material';

export const ArchiveIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 20 20">
      <path
        d="M17.5 6.66666V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V6.66666"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="1.66666"
        y="2.5"
        width="16.6667"
        height="4.16667"
        rx="0.833333"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33334 10.8333H11.6667"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};
