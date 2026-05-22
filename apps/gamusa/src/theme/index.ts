import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#C0392B',
      light: '#E74C3C',
      dark: '#922B21',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      contrastText: '#C0392B',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#6B6B6B',
    },
    divider: '#E8E0D8',
    error: { main: '#E74C3C' },
    success: { main: '#27AE60' },
    warning: { main: '#F39C12' },
    info: { main: '#2980B9' },
  },
  typography: {
    fontFamily:
      '"Plus Jakarta Sans", "Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h5: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.5 },
    h6: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '1rem', lineHeight: 1.7 },
    body2: { fontSize: '0.875rem', lineHeight: 1.6 },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          background: '#C0392B',
          '&:hover': { background: '#922B21' },
        },
        outlinedPrimary: {
          borderColor: '#C0392B',
          '&:hover': { background: 'rgba(192,57,43,0.04)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': { borderRadius: 10 },
        },
      },
    },
  },
});

export default theme;
