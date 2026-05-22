import { Box } from '@mui/material';
// import EmptyUploadPng from "../svg/add.png";

interface EmptyUploadIconProps {
  size?: number;
}

export const EmptyUploadIcon = ({ size = 72 }: EmptyUploadIconProps) => {
  return (
    <Box
      component="img"
      src="../svg/Emptyupload.png"
      alt="Empty upload"
      sx={{
        width: size,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
      }}
    />
  );
};
