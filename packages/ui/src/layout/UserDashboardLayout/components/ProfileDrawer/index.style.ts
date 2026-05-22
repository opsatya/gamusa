import { Theme } from '@mui/material';

export const styles = {
  drawerStyle: (theme: Theme) => ({
    width: '550px',
    padding: theme.spacing(4.5),
    backgroundColor: theme.palette.common.white,
  }),
  avatar: {
    width: '100px',
    height: '100px',
  },
  profileInfoContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(1.25),
  }),
  profileInfoIcon: (theme: Theme) => ({
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
    color: theme.palette.text.secondary,
  }),
  tabContainer: (theme: Theme) => ({
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  }),
  tabItem: (theme: Theme) => ({
    textTransform: 'none',
    fontSize: theme.spacing(1.75),
    fontWeight: 700,
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
    },
    width: theme.spacing(25),
  }),
  profileTabHeader: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  profileTabContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  profileTabLabel: (theme: Theme) => ({
    minWidth: theme.spacing(18.75),
    maxWidth: theme.spacing(18.75),
  }),
  submitButtonContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
  }),
  submitButton: (theme: Theme) => ({
    width: theme.spacing(12),
  }),
  photoUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mt: 1,
  },
  photoAvatar: {
    width: 72,
    height: 72,
    cursor: 'pointer',
    fontSize: '1.5rem',
  },
  notificationContainer: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.spacing(1.25),
    backgroundColor: theme.palette.common.white,
  }),
  closeButton: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    left: '10%',
  },
};
