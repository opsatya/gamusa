/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create side bar/drawer for admin dashboard pages.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 */

// ----------------------------------------------------------------------

import { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useAuth, getCompanySlug } from '@lektus/auth';
import { getValidLogo } from '@lektus/utils';
import WebsiteLogo from '../../../components/WebsiteLogo';
import { breakpoints } from '@lektus/theme';
import { LogoutOutlined as LogoutIcon } from '@mui/icons-material';
import { MyAvatar, SidebarIcon } from '@lektus/ui';
import styles from '../index.style';
import SidebarItem from './SidebarItem';
import { NavItem } from '..';
import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  ExpandMoreOutlined,
} from '@mui/icons-material';

export interface SidebarProps {
  openMobile: boolean;
  onMobileClose: () => void;
  sidebarItems?: NavItem[];
  logoutIconSrc?: string;
  logoSrc: string;
  faviconSrc?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  /** Called with the item key when a sidebar leaf item is clicked */
  onItemClick?: (key: string) => void;
  defaultRoleLabel?: string;
  hidePhone?: boolean;
}

// ----------------------------------------------------------------------

const Sidebar = ({
  openMobile,
  onMobileClose,
  sidebarItems,
  logoSrc,
  faviconSrc,
  logoutIconSrc,
  isCollapsed,
  onToggleCollapse,
  onItemClick,
  defaultRoleLabel,
  hidePhone,
}: SidebarProps): React.ReactElement => {
  const theme = useTheme();
  const location = useLocation();
  const laptopDownMatches = useMediaQuery(
    theme.breakpoints.down(breakpoints.values.laptop)
  );
  const effectiveCollapsed = laptopDownMatches ? false : isCollapsed;
  const { user, logoutUser } = useAuth();

  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const profileOpen = Boolean(profileAnchorEl);
  const currentSlug = getCompanySlug();
  const companyLogo = getValidLogo(
    user?.company?.logoUrl || user?.company?.logo
  );

  const handleLogout = (): void => {
    setProfileAnchorEl(null);
    logoutUser();
  };

  useEffect(() => {
    if (openMobile) onMobileClose();
  }, [location.pathname]);

  // ─── Shared token values ──────────────────────────────────────
  const BRAND_COLOR = '#7c6ef7';
  const BRAND_BG = 'rgba(124, 110, 247, 0.09)';
  const MUTED = '#6B7280';
  const BORDER = '#F1F2F4';

  const content = (
    <Stack height="100%" spacing={0}>
      {/* ── Logo header ─────────────────────────────────────────── */}
      {effectiveCollapsed ? (
        /* ── Collapsed header: favicon aligned with nav icons, arrow beside it ── */
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            // pl: 2 = 16px matches nav container (px:1=8px) + button (px:1=8px) = 16px
            pl: 2,
            pr: 1,
            borderBottom: `1px solid ${BORDER}`,
            backgroundColor: '#FAFAFA',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Favicon icon — left edge aligns with nav icons below */}
          {faviconSrc && (
            <Box
              component="img"
              src={faviconSrc}
              alt="Logo"
              sx={{
                width: 28,
                height: 28,
                objectFit: 'contain',
                display: 'block',
                flexShrink: 0,
              }}
            />
          )}
          {/* Expand arrow — pushed to the right via space-between */}
          {!laptopDownMatches && (
            <IconButton
              onClick={onToggleCollapse}
              size="small"
              sx={{
                color: '#9CA3AF',
                p: 0.25,
                borderRadius: '4px',
                flexShrink: 0,
                '&:hover': {
                  backgroundColor: 'rgba(107,114,128,0.08)',
                  color: '#374151',
                },
              }}
            >
              <ChevronRightOutlined sx={{ width: 16, height: 16 }} />
            </IconButton>
          )}
        </Box>
      ) : (
        /* ── Expanded header: full logo + collapse arrow ── */
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            px: 2,
            borderBottom: `1px solid ${BORDER}`,
            backgroundColor: '#FAFAFA',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          <Box sx={styles.logoContainer(theme)}>
            {currentSlug ? (
              companyLogo ? (
                <WebsiteLogo logoColor="black" src={companyLogo} />
              ) : user?.company?.slug ? (
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {user.company.slug}
                </Typography>
              ) : (
                <WebsiteLogo logoColor="black" src={logoSrc} />
              )
            ) : (
              <WebsiteLogo logoColor="black" src={logoSrc} />
            )}
          </Box>
          {!laptopDownMatches && (
            <IconButton
              onClick={onToggleCollapse}
              sx={{
                color: '#9CA3AF',
                p: 0.5,
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: 'rgba(107,114,128,0.08)',
                  color: '#374151',
                },
              }}
            >
              <ChevronLeftOutlined sx={{ width: 20, height: 20 }} />
            </IconButton>
          )}
        </Box>
      )}

      {/* ── Nav list ────────────────────────────────────────────── */}
      <Box
        sx={{
          ...styles.listContainer,
          px: effectiveCollapsed ? 1 : 1.5,
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <List
          sx={{
            ...styles.sidebarList,
            pt: 1,
            pb: 0,
            '& .MuiListItemButton-root': {
              borderRadius: '8px',
              mb: '2px',
              px: effectiveCollapsed ? 1 : '10px',
              py: '7px',
              color: MUTED,
              '& .MuiListItemIcon-root': {
                minWidth: 20,
                mr: '10px',
                color: '#9CA3AF',
              },
              '& .MuiTypography-root, & .MuiListItemText-primary': {
                fontSize: '13.5px',
                fontWeight: 400,
                lineHeight: '20px',
              },
              '&:hover': {
                backgroundColor: 'rgba(107,114,128,0.07)',
                color: theme.palette.primary.main,
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              },
              '&.Mui-selected': {
                background:
                  'linear-gradient(90deg, rgba(124,110,247,0.18) 0%, rgba(124,110,247,0.05) 100%)',
                color: BRAND_COLOR,
                py: '5px',
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiTypography-root, & .MuiListItemText-primary': {
                  fontWeight: 600,
                  color: BRAND_COLOR,
                },
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(124,110,247,0.24) 0%, rgba(124,110,247,0.09) 100%)',
                },
              },
            },
          }}
        >
          {sidebarItems?.map((item) => {
            /* ── Section group: flat children under a label ── */
            if (item.children?.length) {
              return (
                <Box key={item.key ?? item.title} sx={{ mb: 0.5 }}>
                  {!effectiveCollapsed && (
                    <Typography
                      sx={{
                        fontSize: '0.6875rem',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: '#9CA3AF',
                        textTransform: 'uppercase',
                        px: '10px',
                        pt: 1.5,
                        pb: 0.5,
                        lineHeight: 1.4,
                        userSelect: 'none',
                      }}
                    >
                      {item.title}
                    </Typography>
                  )}
                  {effectiveCollapsed && <Box sx={{ pt: 1 }} />}
                  {item.children.map((child) => (
                    <SidebarItem
                      key={child.key ?? child.title}
                      item={child}
                      isCollapsed={effectiveCollapsed}
                      onItemClick={onItemClick}
                    />
                  ))}
                </Box>
              );
            }

            /* ── Standalone item with optional section label ── */
            return (
              <Box key={item.key ?? item.title}>
                {!effectiveCollapsed && item.groupLabel && (
                  <Typography
                    sx={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: '#9CA3AF',
                      textTransform: 'uppercase',
                      px: '10px',
                      pt: 1.5,
                      pb: 0.5,
                      lineHeight: 1.4,
                      userSelect: 'none',
                    }}
                  >
                    {item.groupLabel}
                  </Typography>
                )}
                <SidebarItem
                  item={item}
                  isCollapsed={effectiveCollapsed}
                  onItemClick={onItemClick}
                />
              </Box>
            );
          })}
        </List>
      </Box>

      {/* ── Sidebar footer ──────────────────────────────────────────── */}
      <Box sx={{ flexShrink: 0 }}>
        <Divider />

        {/* ── User identity row — opens profile popover ────────────── */}
        <Box
          onClick={(e) => setProfileAnchorEl(e.currentTarget)}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: effectiveCollapsed ? 1 : 1.5,
            py: 1.25,
            cursor: 'pointer',
            userSelect: 'none',
            transition: theme.transitions.create('background-color', {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': { backgroundColor: theme.palette.action.hover },
          }}
        >
          <MyAvatar sx={{ width: 30, height: 30 }} />

          {!effectiveCollapsed && (
            <>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="bodySMedium"
                  sx={{
                    color: theme.palette.text.primary,
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textTransform: 'capitalize',
                    display: 'block',
                  }}
                >
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography
                  variant="bodyXSRegular"
                  sx={{
                    color: theme.palette.text.secondary,
                    lineHeight: 1.4,
                    textTransform: 'capitalize',
                    display: 'block',
                  }}
                >
                  {user?.role?.name || defaultRoleLabel || 'Admin'}
                </Typography>
              </Box>
              {/* Points UP by default (closed), DOWN when popover is open */}
              <ExpandMoreOutlined
                sx={{
                  fontSize: 16,
                  color: theme.palette.action.disabled,
                  flexShrink: 0,
                  transform: profileOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </>
          )}
        </Box>
      </Box>

      {/* ── Profile popover ─────────────────────────────────────────── */}
      <Popover
        open={profileOpen}
        anchorEl={profileAnchorEl}
        onClose={() => setProfileAnchorEl(null)}
        anchorOrigin={
          effectiveCollapsed
            ? { vertical: 'center', horizontal: 'right' }
            : { vertical: 'top', horizontal: 'left' }
        }
        transformOrigin={
          effectiveCollapsed
            ? { vertical: 'center', horizontal: 'left' }
            : { vertical: 'bottom', horizontal: 'left' }
        }
        marginThreshold={0}
        slotProps={{
          paper: {
            elevation: effectiveCollapsed ? 8 : 0,
            sx: {
              width: effectiveCollapsed ? 240 : 250,
              overflow: 'hidden',
              ...(effectiveCollapsed
                ? {
                    borderRadius: 2,
                    ml: 1,
                    boxShadow: theme.shadows[8],
                    backgroundColor: theme.palette.background.paper,
                  }
                : {
                    left: '0 !important',
                    borderRadius: '12px 12px 0 0',
                    border: `1px solid ${theme.palette.divider}`,
                    borderBottom: 'none',
                    boxShadow: 'none',
                    backgroundColor: theme.palette.background.paper,
                  }),
            },
          },
        }}
      >
        {/* Profile info section */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            backgroundColor: theme.palette.grey[50],
          }}
        >
          <MyAvatar sx={{ width: 72, height: 72, fontSize: '1.75rem' }} />

          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Typography
              variant="bodyMSemibold"
              sx={{
                color: theme.palette.text.primary,
                textTransform: 'capitalize',
              }}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            {user?.email && (
              <Typography
                variant="bodySRegular"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.25,
                  wordBreak: 'break-all',
                  display: 'block',
                }}
              >
                {user.email}
              </Typography>
            )}
            {!hidePhone && user?.phone && (
              <Typography
                variant="bodySRegular"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.25,
                  display: 'block',
                }}
              >
                {user.phone}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Visible separation between profile and logout */}
        <Divider sx={{ borderWidth: 1 }} />

        {/* Logout row */}
        <Box
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            px: 2,
            py: 1.5,
            cursor: 'pointer',
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create('background-color', {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: theme.palette.error.light + '1a',
              '& .logout-icon, & .logout-text': {
                color: theme.palette.error.main,
              },
            },
          }}
        >
          <LogoutIcon
            className="logout-icon"
            sx={{
              fontSize: 16,
              color: theme.palette.text.secondary,
              transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          />
          <Typography
            className="logout-text"
            variant="bodySMedium"
            sx={{
              color: theme.palette.text.primary,
              transition: theme.transitions.create('color', {
                duration: theme.transitions.duration.shortest,
              }),
            }}
          >
            Log out
          </Typography>
        </Box>
      </Popover>
    </Stack>
  );

  return (
    <>
      {laptopDownMatches ? (
        <Drawer
          anchor="left"
          variant="temporary"
          open={openMobile}
          onClose={onMobileClose}
          sx={styles.sidebarDrawer}
        >
          {content}
        </Drawer>
      ) : (
        <Box sx={(theme) => styles.leftPanel(theme, effectiveCollapsed)}>
          {content}
        </Box>
      )}
    </>
  );
};

export default memo(Sidebar);
