export default {
  backButton: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    fontSize: '0.8125rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    paddingLeft: '10px',
    paddingRight: '12px',
    minWidth: 0,
    '&:hover': {
      borderColor: theme.palette.text.disabled,
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
    },
  }),
};
