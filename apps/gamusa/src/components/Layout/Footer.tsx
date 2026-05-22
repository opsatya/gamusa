import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Facebook, Instagram, Twitter, WhatsApp } from '@mui/icons-material';

const QUICK_LINKS = ['Home', 'Shop', 'About Us', 'Contact', 'Track Order'];
const CATEGORIES = [
  'Traditional',
  'Premium',
  'Bihu Special',
  'Gift Collection',
  'Handmade',
  'Custom Name',
];

const linkSx = {
  color: 'rgba(255,255,255,0.55)',
  fontSize: 14,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'block',
  '&:hover': {
    color: 'white',
    paddingLeft: '6px',
  },
};

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#111111', color: 'white' }}>
      {/* Main content */}
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* Col 1 — Brand */}
          <Box sx={{ gridColumn: { xs: 'span 2', md: 'span 1' } }}>
            <Stack direction="row" alignItems="center" spacing={1.25} mb={2}>
              <Box
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: 'primary.main',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontSize: 26,
                  color: 'primary.main',
                  lineHeight: 1,
                }}
              >
                Gamusa
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: 'rgba(255,255,255,0.55)',
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 260,
                mb: 3,
              }}
            >
              Authentic Assamese handwoven products crafted by local artisans.
              Preserving culture, one weave at a time.
            </Typography>

            <Stack direction="row" spacing={1}>
              {[
                {
                  icon: <Instagram sx={{ fontSize: 18 }} />,
                  label: 'Instagram',
                },
                { icon: <Facebook sx={{ fontSize: 18 }} />, label: 'Facebook' },
                {
                  icon: <Twitter sx={{ fontSize: 18 }} />,
                  label: 'X / Twitter',
                },
                { icon: <WhatsApp sx={{ fontSize: 18 }} />, label: 'WhatsApp' },
              ].map(({ icon, label }) => (
                <IconButton
                  key={label}
                  size="small"
                  aria-label={label}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.6)',
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {icon}
                </IconButton>
              ))}
            </Stack>
          </Box>

          {/* Col 2 — Quick Links */}
          <Box>
            <Typography
              sx={{ color: 'white', fontWeight: 700, fontSize: 15, mb: 2.5 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.25}>
              {QUICK_LINKS.map((link) => (
                <Typography key={link} sx={linkSx}>
                  {link}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Col 3 — Categories */}
          <Box>
            <Typography
              sx={{ color: 'white', fontWeight: 700, fontSize: 15, mb: 2.5 }}
            >
              Categories
            </Typography>
            <Stack spacing={1.25}>
              {CATEGORIES.map((cat) => (
                <Typography key={cat} sx={linkSx}>
                  {cat}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* Col 4 — Contact */}
          <Box>
            <Typography
              sx={{ color: 'white', fontWeight: 700, fontSize: 15, mb: 2.5 }}
            >
              Get in Touch
            </Typography>
            <Stack spacing={2} mb={3}>
              {[
                { icon: '📍', text: 'Assam, India' },
                { icon: '📞', text: '+91 98765 43210' },
                { icon: '📧', text: 'hello@gamusa.in' },
              ].map(({ icon, text }) => (
                <Stack
                  key={text}
                  direction="row"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Typography
                    aria-hidden="true"
                    sx={{ fontSize: 15, flexShrink: 0 }}
                  >
                    {icon}
                  </Typography>
                  <Typography
                    sx={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}
                  >
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>

            <Button
              variant="contained"
              startIcon={<WhatsApp />}
              component="a"
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                bgcolor: '#25D366',
                color: 'white',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 600,
                px: 2.5,
                py: 1.25,
                '&:hover': { bgcolor: '#128C7E' },
              }}
            >
              Chat on WhatsApp
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Bottom bar */}
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />
      <Box
        sx={{
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
        }}
      >
        <Typography sx={{ color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>
          © 2026 Gamusa. All rights reserved.
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>
          Made with ❤️ in Assam
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
