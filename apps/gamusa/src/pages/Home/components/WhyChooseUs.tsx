import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionEyebrow from '../../../components/UI/SectionEyebrow';

const FEATURES = [
  {
    icon: '🧵',
    title: 'Handmade in Assam',
    desc: 'Every piece woven by skilled local artisans preserving generations of craft.',
  },
  {
    icon: '⭐',
    title: 'Premium Quality',
    desc: 'Only the finest cotton and silk materials, rigorously quality-checked.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    desc: 'Delivered to your door in 3–5 business days across India.',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    desc: '100% safe and encrypted transactions with multiple payment options.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const WhyChooseUs = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #FDF6EC 0%, #FFFFFF 100%)',
        px: { xs: 3, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <SectionEyebrow text="Our Promise" centered />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 800,
                mt: 0.5,
              }}
            >
              Why Choose Gamusa?
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                mt: 1.5,
                maxWidth: 480,
                mx: 'auto',
                fontSize: 15,
              }}
            >
              We combine age-old Assamese tradition with modern reliability and
              convenience.
            </Typography>
          </Box>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, md: 3 },
            }}
          >
            {FEATURES.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 5,
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                    border: '1px solid #F0EAE0',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%',
                    transition: 'all 0.28s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 40px rgba(192,57,43,0.10)',
                      borderColor: 'rgba(192,57,43,0.2)',
                    },
                    '&:hover .feature-icon': {
                      animation: 'featurePulse 0.5s ease',
                    },
                    '@keyframes featurePulse': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.1)' },
                    },
                  }}
                >
                  {/* Corner decoration */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      width: 80,
                      height: 80,
                      background:
                        'radial-gradient(circle, rgba(192,57,43,0.07) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Icon circle */}
                  <Box
                    className="feature-icon"
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      background:
                        'linear-gradient(135deg, rgba(192,57,43,0.10), rgba(192,57,43,0.04))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2.5,
                      fontSize: 32,
                    }}
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 14, md: 16 },
                      mb: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: 13, md: 14 },
                      lineHeight: 1.65,
                    }}
                  >
                    {feature.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default WhyChooseUs;
