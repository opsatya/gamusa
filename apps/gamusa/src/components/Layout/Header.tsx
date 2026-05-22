import { useEffect, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import {
  Close,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = ['Home', 'Shop', 'About', 'Contact'];

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeLink, setActiveLink] = useState('Home');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setAnchorEl(null);
    navigate('/login', { replace: true });
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1200,
        bgcolor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.07)' : 'none',
        transition: 'box-shadow 0.3s ease',
        animation: 'headerReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        '@keyframes headerReveal': {
          from: { opacity: 0, transform: 'translateY(-16px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 3, md: 6 },
          height: { xs: 56, md: 64 },
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Mobile: hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="small"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
          >
            <MenuOutlined />
          </IconButton>
        </Box>

        {/* Brand wordmark */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          onClick={() => navigate('/')}
          sx={{ cursor: 'pointer', userSelect: 'none', flexShrink: 0 }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: 'primary.main',
              transform: 'rotate(45deg)',
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: { xs: 22, md: 24 },
              color: 'primary.main',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            Gamusa
          </Typography>
        </Stack>

        {/* Desktop nav links */}
        <Stack
          direction="row"
          spacing={4}
          sx={{ display: { xs: 'none', md: 'flex' } }}
        >
          {NAV_LINKS.map((link) => (
            <Typography
              key={link}
              component="span"
              onClick={() => setActiveLink(link)}
              sx={{
                fontSize: 14,
                fontWeight: activeLink === link ? 600 : 500,
                color: activeLink === link ? 'primary.main' : 'text.secondary',
                cursor: 'pointer',
                position: 'relative',
                pb: 0.5,
                transition: 'color 0.2s ease',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: activeLink === link ? '100%' : '0%',
                  height: '2px',
                  bgcolor: 'primary.main',
                  transition: 'width 0.25s ease',
                  borderRadius: 1,
                },
                '&:hover': { color: 'primary.main' },
                '&:hover::after': { width: '100%' },
              }}
            >
              {link}
            </Typography>
          ))}
        </Stack>

        {/* Right actions */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="small" aria-label="Search products">
              <SearchOutlined sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          <IconButton size="small" aria-label="Cart (2 items)">
            <Badge
              badgeContent={2}
              sx={{
                '& .MuiBadge-badge': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontSize: 10,
                  minWidth: 16,
                  height: 16,
                  padding: 0,
                },
              }}
            >
              <ShoppingCartOutlined sx={{ fontSize: 20 }} />
            </Badge>
          </IconButton>

          {/* Auth section — desktop only */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1.5,
              pl: 1,
            }}
          >
            <Divider orientation="vertical" sx={{ height: 20 }} />
            {isAuthenticated ? (
              <>
                <IconButton
                  size="small"
                  onClick={(e: MouseEvent<HTMLElement>) =>
                    setAnchorEl(e.currentTarget)
                  }
                  aria-label="Open account menu"
                >
                  <Avatar
                    sx={{
                      width: 30,
                      height: 30,
                      bgcolor: 'primary.main',
                      fontSize: 13,
                      fontWeight: 700,
                    }}
                  >
                    {user?.name?.charAt(0) ?? 'G'}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  PaperProps={{
                    sx: {
                      borderRadius: 2,
                      minWidth: 160,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <MenuItem
                    dense
                    disableRipple
                    sx={{
                      fontSize: 13,
                      color: 'text.secondary',
                      cursor: 'default',
                    }}
                  >
                    {user?.name}
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    dense
                    onClick={handleLogout}
                    sx={{ fontSize: 13, color: 'error.main', fontWeight: 500 }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate('/login')}
                sx={{ borderRadius: 20, px: 2.5, fontSize: 13, py: 0.75 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Stack>
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 280 } }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 3,
              pb: 2,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  bgcolor: 'primary.main',
                  transform: 'rotate(45deg)',
                }}
              />
              <Typography
                sx={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: 22,
                  color: 'primary.main',
                }}
              >
                Gamusa
              </Typography>
            </Stack>
            <IconButton
              size="small"
              onClick={() => setDrawerOpen(false)}
              aria-label="Close navigation menu"
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Divider />

          <List sx={{ flex: 1, pt: 1, px: 1 }}>
            {NAV_LINKS.map((link) => (
              <ListItemButton
                key={link}
                onClick={() => {
                  setActiveLink(link);
                  setDrawerOpen(false);
                }}
                selected={activeLink === link}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    bgcolor: 'rgba(192,57,43,0.06)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemText
                  primary={link}
                  primaryTypographyProps={{
                    fontSize: 15,
                    fontWeight: activeLink === link ? 600 : 500,
                  }}
                />
              </ListItemButton>
            ))}
          </List>

          <Box sx={{ p: 3 }}>
            {isAuthenticated ? (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
                sx={{ borderRadius: 2 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  navigate('/login');
                  setDrawerOpen(false);
                }}
                sx={{ borderRadius: 2 }}
              >
                Login / Sign Up
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Header;
