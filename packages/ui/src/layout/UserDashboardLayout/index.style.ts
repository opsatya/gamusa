/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for admin dashboard layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

const SIDEBAR_WIDTH = 250;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default {
  rootStyle: (theme: any) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  }),
  leftPanel: (theme: any, isCollapsed?: boolean) => ({
    width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  }),
  sidebarDrawer: (theme: any) => ({
    backgroundColor: theme.palette.common.white,
    '& .MuiDrawer-paper': {
      width: SIDEBAR_WIDTH,
      boxSizing: 'border-box',
    },
  }),
  sidebarHeader: (theme: any, isCollapsed?: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    px: isCollapsed ? 0 : 2,
    py: 1,
    borderBottom: `1px solid ${theme.palette.divider}`,
    mb: 1,
    height: 56,
    boxSizing: 'border-box',
  }),
  logoContainer: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    maxWidth: 150,
    [theme.breakpoints.down('md')]: {
      paddingX: 0,
    },
  }),
  userProfile: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    margin: theme.spacing(1, 1, 3),
    padding: 2,
    borderRadius: `${theme.shape.borderRadiusXs}px`,
    [theme.breakpoints.down('md')]: {
      marginX: 2,
    },
  }),
  profilePicture: {
    cursor: 'pointer',
    width: 48,
    height: 48,
    mr: 2,
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
    minHeight: 0,
  },
  sidebarList: {},
  wrapperStyle: {
    flex: 1,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  containerStyle: (theme: any, hasHeader?: boolean) => ({
    height: hasHeader ? 'calc(100% - 68px)' : '100%',
    mt: hasHeader ? '68px' : 0,
    overflow: 'auto',
    padding: theme.spacing(3),
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
  }),
  contentStyle: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  header: (theme: any, isCollapsed?: boolean) => ({
    width: `calc(100% - ${isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH}px)`,
    height: 68,
    position: 'fixed',
    zIndex: 999,
    left: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
    top: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingY: 1,
    transition: theme.transitions.create(['width', 'left'], {
      duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.down('laptop')]: {
      width: '100%',
      left: 0,
    },
  }),
  menuIcon: (theme: any) => ({
    mr: 3,
    color: theme.palette.grey[900],
  }),
  rightOptions: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightOptionChildrenContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  rightOptionChildren: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    cursor: 'pointer',
  },
  notificationIcon: (theme: any) => ({
    color: theme.palette.grey[900],
    width: 24,
    height: 24,
  }),
  avatar: (theme: any) => ({
    width: 32,
    height: 32,
    bgcolor: theme.palette.primary.main,
    color: theme.palette.common.white,
  }),
  downArrowIcon: (theme: any) => ({
    color: theme.palette.grey[900],
    width: 24,
    height: 24,
  }),
  footer: (theme: any) => ({
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  logoutIcon: (theme: any) => ({
    color: theme.palette.grey[900],
    width: 24,
    height: 24,
  }),
};
