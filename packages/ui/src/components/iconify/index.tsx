import { SvgIcon, SvgIconProps } from '@mui/material';

interface IconifyProps extends SvgIconProps {
  icon: string;
}

// Simple wrapper for icons
export default function Iconify({ icon, sx, ...other }: IconifyProps) {
  // In a real implementation, you would map the icon string to an actual icon component
  // For now, we'll just return a generic icon
  return <SvgIcon sx={sx} {...other} />;
}
