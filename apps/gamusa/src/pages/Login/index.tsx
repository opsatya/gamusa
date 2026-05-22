import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ease = [0.22, 1, 0.36, 1] as const;

const Login = () => {
  const navigate = useNavigate();
  const { sendOtp } = useAuth();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Login — Gamusa';
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Enter a valid 10-digit number');
      return;
    }
    setLoading(true);
    try {
      await sendOtp(phone);
      navigate('/verify-otp', { state: { phone } });
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Unable to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* ── Left brand panel (desktop only) ── */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '45%',
          background:
            'linear-gradient(145deg, #C0392B 0%, #7B241C 55%, #140806 100%)',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          px: 8,
        }}
      >
        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '5%',
            left: '-15%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }}
        />
        {/* Dot grid */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {/* Brand wordmark */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                bgcolor: 'rgba(255,255,255,0.85)',
                transform: 'rotate(45deg)',
              }}
            />
            <Typography
              sx={{
                fontFamily: '"DM Serif Display", Georgia, serif',
                fontSize: 30,
                color: 'white',
                letterSpacing: '-0.01em',
              }}
            >
              Gamusa
            </Typography>
          </Box>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              mb: 2.5,
            }}
          >
            🧣 100% Handwoven · Made in Assam
          </Typography>

          <Typography
            sx={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: { md: '2.25rem', lg: '2.75rem' },
              color: 'white',
              lineHeight: 1.15,
              mb: 3,
            }}
          >
            Authentic Assamese{' '}
            <Box
              component="span"
              sx={{
                background:
                  'linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 3s linear infinite',
                '@keyframes shimmer': {
                  '0%': { backgroundPosition: '-200% center' },
                  '100%': { backgroundPosition: '200% center' },
                },
              }}
            >
              Craftsmanship
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 15,
              lineHeight: 1.75,
              maxWidth: 340,
            }}
          >
            Handcrafted with love by Assamese artisans. Each piece tells a story
            of culture and tradition.
          </Typography>

          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              gap: 5,
            }}
          >
            {[
              ['500+', 'Products'],
              ['10K+', 'Happy Customers'],
              ['Since 2020', 'Proudly Assamese'],
            ].map(([val, label]) => (
              <Box key={label}>
                <Typography
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: 22,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </Typography>
                <Typography
                  sx={{
                    color: 'rgba(255,255,255,0.48)',
                    fontSize: 12,
                    mt: 0.5,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>

      {/* ── Right form panel ── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#FEFCFB',
          px: { xs: 3, sm: 6, md: 8 },
          py: 8,
          backgroundImage:
            'radial-gradient(rgba(192,57,43,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Mobile logo */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1.5,
            mb: 6,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              bgcolor: 'primary.main',
              transform: 'rotate(45deg)',
            }}
          />
          <Typography
            sx={{
              fontFamily: '"DM Serif Display", Georgia, serif',
              fontSize: 26,
              color: 'primary.main',
            }}
          >
            Gamusa
          </Typography>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
          style={{ width: '100%', maxWidth: 400 }}
        >
          {/* Desktop logo */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 1.5,
              mb: 5,
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
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
          </Box>

          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 0.75, letterSpacing: '-0.02em' }}
          >
            Welcome back
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: 15 }}>
            Enter your mobile number to continue
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
              }
              placeholder="1234567890"
              inputProps={{
                inputMode: 'numeric',
                maxLength: 10,
                'aria-label': 'Mobile number',
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        mr: 0.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: 15,
                          color: 'text.primary',
                          lineHeight: 1,
                        }}
                      >
                        +91
                      </Typography>
                      <Box sx={{ width: 1, height: 20, bgcolor: 'divider' }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
              helperText={error || ' '}
              error={Boolean(error)}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.75,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 2.5,
                mb: 3,
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CircularProgress size={18} color="inherit" />
                  Sending OTP…
                </Box>
              ) : (
                'Send OTP'
              )}
            </Button>
          </Box>

          <Typography
            sx={{ color: 'text.disabled', fontSize: 12, textAlign: 'center' }}
          >
            By continuing, you agree to our Terms & Privacy Policy
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Login;
