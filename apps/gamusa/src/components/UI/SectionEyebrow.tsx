import { Typography } from '@mui/material';

interface Props {
  text: string;
  centered?: boolean;
}

export default function SectionEyebrow({ text, centered }: Props) {
  return (
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '3px',
        color: 'primary.main',
        textTransform: 'uppercase',
        mb: 1,
        textAlign: centered ? 'center' : 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        justifyContent: centered ? 'center' : 'flex-start',
        '&::before': {
          content: '""',
          display: 'inline-block',
          width: '20px',
          height: '2px',
          background: '#C0392B',
          borderRadius: '4px',
          flexShrink: 0,
        },
      }}
    >
      {text}
    </Typography>
  );
}
