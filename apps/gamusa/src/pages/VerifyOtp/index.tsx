import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBackOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const OTP_LENGTH = 6;
const ease = [0.22, 1, 0.36, 1] as const;

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, sendOtp, phone: savedPhone } = useAuth();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDelay, setResendDelay] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const state = location.state as { phone?: string } | null;
  const phone = state?.phone ?? savedPhone;

  useEffect(() => {
    document.title = 'Verify OTP — Gamusa';
  }, []);

  useEffect(() => {
    if (!phone) navigate('/login', { replace: true });
  }, [navigate, phone]);

  useEffect(() => {
    if (resendDelay <= 0) return;
    const t = window.setTimeout(() => setResendDelay((p) => p - 1), 1000);
    return () => window.clearTimeout(t);
  }, [resendDelay]);

  const focusInput = (index: number) => inputRefs.current[index]?.focus();

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...digits];
      if (next[index]) {
        next[index] = '';
        setDigits(next);
      } else if (index > 0) {
        next[index - 1] = '';
        setDigits(next);
        focusInput(index - 1);
      }
    }
    if (e.key === 'ArrowLeft' && index > 0) focusInput(index - 1);
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) focusInput(index + 1);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData('Text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    for (let i = 0; i < pasted.length; i += 1) next[i] = pasted[i];
    setDigits(next);
    focusInput(Math.min(pasted.length, OTP_LENGTH - 1));
  };

  const handleVerify = async () => {
    setError('');
    const otp = digits.join('');
    if (otp.length < OTP_LENGTH) {
      setError('Please enter the 6-digit code.');
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      navigate('/', { replace: true, state: { showWelcome: true } });
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!phone) return;
    setError('');
    setResendLoading(true);
    try {
      await sendOtp(phone);
      setResendDelay(30);
      setDigits(Array(OTP_LENGTH).fill(''));
      focusInput(0);
    } catch (err: unknown) {
      setError((err as Error)?.message ?? 'Unable to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#FEFCFB',
        px: { xs: 3, sm: 6 },
        py: 8,
        backgroundImage:
          'radial-gradient(rgba(192,57,43,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Mobile brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 6 }}>
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
            fontSize: 24,
            color: 'primary.main',
          }}
        >
          Gamusa
        </Typography>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        {/* Back button */}
        <Button
          startIcon={<ArrowBackOutlined sx={{ fontSize: '18px !important' }} />}
          onClick={() => navigate('/login')}
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: 14,
            mb: 4,
            pl: 0,
            '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
          }}
        >
          Back to login
        </Button>

        <Typography
          variant="h4"
          sx={{ fontWeight: 800, mb: 0.75, letterSpacing: '-0.02em' }}
        >
          Verify OTP
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4, fontSize: 15 }}>
          Enter the 6-digit code sent to{' '}
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>
            +91 {phone ? `${phone.slice(0, 5)}${'•'.repeat(5)}` : ''}
          </Box>
        </Typography>

        {/* OTP boxes */}
        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="space-between"
          mb={3}
        >
          {digits.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + index * 0.05, duration: 0.3, ease }}
              style={{ flex: 1 }}
            >
              <Box
                component="input"
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(index, e)
                }
                onPaste={handlePaste}
                maxLength={1}
                inputMode="numeric"
                aria-label={`OTP digit ${index + 1}`}
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 1.15',
                  border: '1.5px solid',
                  borderColor: value ? 'primary.main' : '#E8E0D8',
                  borderRadius: '14px',
                  background: value ? 'rgba(192,57,43,0.04)' : 'white',
                  textAlign: 'center',
                  fontSize: 24,
                  fontWeight: 700,
                  fontFamily: 'inherit',
                  color: 'primary.main',
                  outline: 'none',
                  cursor: 'text',
                  transition: 'all 0.15s ease',
                  display: 'block',
                  '&:focus': {
                    borderColor: '#C0392B',
                    borderWidth: '2px',
                    boxShadow: '0 0 0 3px rgba(192,57,43,0.12)',
                    background: 'white',
                  },
                }}
              />
            </motion.div>
          ))}
        </Stack>

        {error ? (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
            {error}
          </Alert>
        ) : null}

        <Button
          fullWidth
          variant="contained"
          onClick={handleVerify}
          disabled={loading}
          sx={{
            py: 1.75,
            fontSize: 15,
            fontWeight: 700,
            borderRadius: 2.5,
            mb: 2.5,
            mt: 3,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <CircularProgress size={18} color="inherit" />
              Verifying…
            </Box>
          ) : (
            'Verify OTP'
          )}
        </Button>

        {/* Resend row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
            {resendDelay > 0 ? (
              <>
                Resend in{' '}
                <Box
                  component="span"
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  {resendDelay}s
                </Box>
              </>
            ) : (
              'Did not receive it?'
            )}
          </Typography>
          <Button
            variant="text"
            disabled={resendDelay > 0 || resendLoading}
            onClick={handleResend}
            sx={{ fontSize: 14, fontWeight: 600 }}
          >
            {resendLoading ? <CircularProgress size={16} /> : 'Resend OTP'}
          </Button>
        </Box>

        <Typography
          sx={{
            color: 'text.disabled',
            fontSize: 12,
            mt: 4,
            textAlign: 'center',
            bgcolor: '#F5F5F5',
            borderRadius: 2,
            py: 1.25,
            px: 2,
          }}
        >
          Dev mode: use OTP{' '}
          <Box
            component="span"
            sx={{ fontWeight: 700, fontFamily: 'monospace', letterSpacing: 2 }}
          >
            123456
          </Box>
        </Typography>
      </motion.div>
    </Box>
  );
};

export default VerifyOtp;
