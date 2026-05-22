import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const animIn = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease, delay },
});

const HeroBanner = () => {
  return (
    <Box
      sx={{
        minHeight: { xs: '70vh', md: '90vh' },
        background:
          'linear-gradient(135deg, #C0392B 0%, #7B241C 50%, #1A1A1A 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative floating circles */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-4%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          position: 'absolute',
          left: '-10%',
          top: '30%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }}
      />
      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px)
          `,
        }}
      />

      <Box
        sx={{
          maxWidth: 1280,
          width: '100%',
          mx: 'auto',
          px: { xs: 3, md: 6 },
          py: { xs: 8, md: 4 },
          display: 'flex',
          alignItems: 'center',
          gap: { md: 6 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left content column ── */}
        <Box sx={{ flex: '1 1 60%' }}>
          {/* Badge */}
          <motion.div {...animIn(0)}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 20,
                  px: 2,
                  py: 0.875,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: '#4ADE80',
                    animation: 'dotPulse 2s ease infinite',
                    '@keyframes dotPulse': {
                      '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                      '50%': { transform: 'scale(1.4)', opacity: 0.7 },
                    },
                  }}
                />
                <Typography
                  sx={{ color: 'white', fontSize: 13, fontWeight: 500 }}
                >
                  🧣 100% Handwoven · Made in Assam
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* Main heading */}
          <motion.div {...animIn(0.1)}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.75rem', lg: '4.5rem' },
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                mb: 2.5,
              }}
            >
              Authentic
              <br />
              Assamese
              <br />
              <Box
                component="span"
                sx={{
                  fontFamily: '"DM Serif Display", Georgia, serif',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  background:
                    'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'heroShimmer 3s linear infinite',
                  '@keyframes heroShimmer': {
                    '0%': { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                  },
                }}
              >
                Gamusa
              </Box>
            </Typography>
          </motion.div>

          {/* Subtext */}
          <motion.div {...animIn(0.2)}>
            <Typography
              sx={{
                color: 'rgba(255,255,255,0.72)',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.75,
                maxWidth: 480,
                mb: 4,
              }}
            >
              Handcrafted with love by Assamese artisans.
              <br />
              Each piece tells a story of culture and tradition.
            </Typography>
          </motion.div>

          {/* CTA buttons */}
          <motion.div {...animIn(0.3)}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={5}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  py: 1.75,
                  '&:hover': {
                    bgcolor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                Shop Collection
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  border: '2px solid rgba(255,255,255,0.4)',
                  color: 'white',
                  borderRadius: 2,
                  px: 4,
                  py: 1.75,
                  fontWeight: 600,
                  '&:hover': {
                    border: '2px solid rgba(255,255,255,0.8)',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                Our Story
              </Button>
            </Stack>
          </motion.div>

          {/* Stats row */}
          <motion.div {...animIn(0.4)}>
            <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', mb: 3 }} />
            <Stack
              direction="row"
              spacing={3}
              divider={
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ borderColor: 'rgba(255,255,255,0.15)' }}
                />
              }
            >
              {[
                ['500+', 'Products'],
                ['10,000+', 'Happy Customers'],
                ['Since 2020', 'Proudly Assamese'],
              ].map(([val, label]) => (
                <Box key={label}>
                  <Typography
                    sx={{
                      color: 'white',
                      fontWeight: 800,
                      fontSize: { xs: 18, md: 22 },
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 12,
                      mt: 0.5,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </motion.div>
        </Box>

        {/* ── Right product showcase (desktop only) ── */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: '0 0 38%',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Rating pill — floats independently */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
            style={{ position: 'absolute', top: 10, right: -10, zIndex: 2 }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: 'white',
                  borderRadius: 3,
                  px: 2,
                  py: 1.25,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography sx={{ fontSize: 18 }} aria-hidden="true">
                  ⭐
                </Typography>
                <Box>
                  <Typography
                    sx={{ fontWeight: 800, fontSize: 14, lineHeight: 1 }}
                  >
                    4.9
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', fontSize: 11 }}>
                    2.4k reviews
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease, delay: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 5,
                  p: 3,
                  minWidth: 240,
                }}
              >
                <Box
                  sx={{
                    aspectRatio: '3/4',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.06))',
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    fontSize: 72,
                  }}
                  aria-hidden="true"
                >
                  🧣
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={0.75}
                >
                  <Typography
                    sx={{ color: 'white', fontWeight: 700, fontSize: 15 }}
                  >
                    Classic Gamusa
                  </Typography>
                  <Chip
                    label="NEW"
                    size="small"
                    sx={{
                      bgcolor: '#FFD700',
                      color: '#1A1A1A',
                      fontWeight: 700,
                      fontSize: 10,
                    }}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography
                    sx={{ color: 'white', fontWeight: 800, fontSize: 18 }}
                  >
                    ₹499
                  </Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: 13,
                      textDecoration: 'line-through',
                    }}
                  >
                    ₹699
                  </Typography>
                </Stack>
              </Box>
            </motion.div>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroBanner;
