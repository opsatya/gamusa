import {
  Avatar,
  Box,
  Chip,
  Divider,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import SectionEyebrow from '../../../components/UI/SectionEyebrow';

const REVIEWS = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    initials: 'PS',
    color: '#C0392B',
    text: 'The quality is absolutely amazing. My family loved the Gamusa I gifted them for Bihu! The weaving detail is exceptional and the colors are so vibrant.',
    verified: true,
  },
  {
    name: 'Rajesh Bora',
    location: 'Guwahati',
    rating: 5,
    initials: 'RB',
    color: '#2ECC71',
    text: 'Authentic Assamese feel. The weaving is so detailed and the colors are vibrant. Truly a premium product — will definitely order for every festival.',
    verified: true,
  },
  {
    name: 'Anita Das',
    location: 'Delhi',
    rating: 4,
    initials: 'AD',
    color: '#3498DB',
    text: 'Fast delivery and beautiful packaging. Will definitely order again for festivals. Highly recommend to anyone who wants authentic Assamese crafts.',
    verified: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

const CustomerReviews = () => {
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
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <SectionEyebrow text="Testimonials" centered />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                fontWeight: 800,
                mt: 0.5,
              }}
            >
              What Our Customers Say
            </Typography>
          </Box>

          {/* Overall rating */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              sx={{
                fontSize: { xs: 48, md: 56 },
                fontWeight: 800,
                color: 'primary.main',
                lineHeight: 1,
                mb: 0.5,
              }}
            >
              4.9
            </Typography>
            <Rating
              value={5}
              readOnly
              precision={0.5}
              sx={{
                color: '#FFB800',
                '& .MuiRating-icon': { fontSize: { xs: 20, md: 24 } },
              }}
            />
            <Typography
              sx={{ color: 'text.secondary', fontSize: 14, mt: 0.75 }}
            >
              Based on 2,400+ reviews
            </Typography>
          </Box>
        </motion.div>

        {/* Review cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 2.5, md: 3 },
            }}
          >
            {REVIEWS.map((review) => (
              <motion.div
                key={review.name}
                variants={itemVariants}
                style={{ height: '100%' }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 5,
                    p: { xs: 3, md: 4 },
                    border: '1px solid #F0F0F0',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.28s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.08)',
                    },
                  }}
                >
                  {/* Decorative quote */}
                  <Typography
                    aria-hidden="true"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 20,
                      fontSize: 80,
                      lineHeight: 1,
                      color: 'rgba(192,57,43,0.07)',
                      fontFamily: 'Georgia, serif',
                      userSelect: 'none',
                    }}
                  >
                    "
                  </Typography>

                  {/* Stars */}
                  <Rating
                    value={review.rating}
                    readOnly
                    size="small"
                    sx={{ color: '#FFB800', mb: 2 }}
                  />

                  {/* Review text */}
                  <Typography
                    sx={{
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      flex: 1,
                      mb: 3,
                    }}
                  >
                    "{review.text}"
                  </Typography>

                  {/* Author */}
                  <Box>
                    <Divider sx={{ mb: 2.5 }} />
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        sx={{
                          bgcolor: review.color,
                          width: 44,
                          height: 44,
                          fontWeight: 700,
                          fontSize: 15,
                          flexShrink: 0,
                        }}
                      >
                        {review.initials}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: 14,
                            lineHeight: 1.2,
                          }}
                        >
                          {review.name}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          mt={0.5}
                        >
                          <Typography
                            sx={{ color: 'text.secondary', fontSize: 12 }}
                          >
                            {review.location}
                          </Typography>
                          {review.verified && (
                            <Chip
                              label="✓ Verified"
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{
                                fontSize: 10,
                                height: 18,
                                '& .MuiChip-label': { px: 0.75 },
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default CustomerReviews;
