import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionEyebrow from '../../../components/UI/SectionEyebrow';

const CATEGORIES = [
  {
    emoji: '🧣',
    name: 'Traditional Gamusa',
    bg: 'linear-gradient(135deg, #FFF5F5, #FFE8E8)',
    accent: '#C0392B',
  },
  {
    emoji: '✨',
    name: 'Premium Collection',
    bg: 'linear-gradient(135deg, #FFF9E6, #FFF0CC)',
    accent: '#D4A017',
  },
  {
    emoji: '🎊',
    name: 'Bihu Special',
    bg: 'linear-gradient(135deg, #F0FFF4, #DCFFE4)',
    accent: '#2ECC71',
  },
  {
    emoji: '🎁',
    name: 'Gift Collection',
    bg: 'linear-gradient(135deg, #F0F4FF, #E0E8FF)',
    accent: '#3498DB',
  },
  {
    emoji: '🤲',
    name: 'Handmade Collection',
    bg: 'linear-gradient(135deg, #FFF0F9, #FFE0F4)',
    accent: '#E91E8C',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const FeaturedCategories = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white', px: { xs: 3, md: 6 } }}>
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionEyebrow text="Collections" />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              mb: 6,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 800,
              }}
            >
              Shop by Category
            </Typography>
            <Typography
              sx={{
                color: 'text.secondary',
                fontSize: 14,
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s ease',
              }}
            >
              View all →
            </Typography>
          </Box>
        </motion.div>

        {/* Category grid */}
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
                sm: 'repeat(3, 1fr)',
                md: 'repeat(5, 1fr)',
              },
              gap: 2.5,
            }}
          >
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.name} variants={itemVariants}>
                <Box
                  sx={{
                    background: cat.bg,
                    borderRadius: 4,
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                    cursor: 'pointer',
                    border: '1.5px solid transparent',
                    transition: 'all 0.28s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 16px 40px ${cat.accent}22`,
                      borderColor: `${cat.accent}44`,
                    },
                    '&:hover .cat-arrow': {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  }}
                >
                  <Typography
                    component="span"
                    aria-hidden="true"
                    sx={{
                      fontSize: { xs: 36, md: 48 },
                      display: 'block',
                      mb: 1.5,
                    }}
                  >
                    {cat.emoji}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 12, md: 13 },
                      color: 'text.primary',
                      mb: 0.75,
                      lineHeight: 1.3,
                    }}
                  >
                    {cat.name}
                  </Typography>
                  <Typography
                    className="cat-arrow"
                    sx={{
                      fontSize: 12,
                      color: cat.accent,
                      fontWeight: 600,
                      opacity: 0,
                      transform: 'translateX(-8px)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    Explore →
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

export default FeaturedCategories;
