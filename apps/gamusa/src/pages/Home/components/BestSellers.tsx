import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import {
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import SectionEyebrow from '../../../components/UI/SectionEyebrow';

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic White Gamusa',
    price: 499,
    originalPrice: 699,
    initials: 'CW',
    gradient: 'linear-gradient(135deg,#FFF5F5,#FFCDD2)',
    badge: '29% OFF',
  },
  {
    id: 2,
    name: 'Red Border Gamusa',
    price: 599,
    originalPrice: 799,
    initials: 'RB',
    gradient: 'linear-gradient(135deg,#FFEBEE,#FFCDD2)',
    badge: '25% OFF',
  },
  {
    id: 3,
    name: 'Premium Silk Gamusa',
    price: 1299,
    originalPrice: 1599,
    initials: 'PS',
    gradient: 'linear-gradient(135deg,#FFF9E6,#FFECB3)',
    badge: '19% OFF',
  },
  {
    id: 4,
    name: 'Bihu Gift Set',
    price: 1999,
    originalPrice: 2499,
    initials: 'BG',
    gradient: 'linear-gradient(135deg,#F3E5F5,#E1BEE7)',
    badge: '20% OFF',
  },
  {
    id: 5,
    name: 'Mini Gamusa',
    price: 299,
    originalPrice: 399,
    initials: 'MG',
    gradient: 'linear-gradient(135deg,#E8F5E9,#C8E6C9)',
    badge: '25% OFF',
  },
  {
    id: 6,
    name: 'Wedding Gamusa',
    price: 2499,
    originalPrice: 2999,
    initials: 'WG',
    gradient: 'linear-gradient(135deg,#FFF3E0,#FFE0B2)',
    badge: '17% OFF',
  },
  {
    id: 7,
    name: 'Corporate Gift Pack',
    price: 3499,
    originalPrice: 3999,
    initials: 'CP',
    gradient: 'linear-gradient(135deg,#E3F2FD,#BBDEFB)',
    badge: '13% OFF',
  },
  {
    id: 8,
    name: 'Custom Name Gamusa',
    price: 799,
    originalPrice: 999,
    initials: 'CN',
    gradient: 'linear-gradient(135deg,#FCE4EC,#F8BBD9)',
    badge: '20% OFF',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
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

const BestSellers = () => {
  return (
    <Box
      sx={{ py: { xs: 8, md: 12 }, bgcolor: '#FAFAFA', px: { xs: 3, md: 6 } }}
    >
      <Box sx={{ maxWidth: 1280, mx: 'auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
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
            <Box>
              <SectionEyebrow text="Best Sellers" />
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.5rem' },
                  fontWeight: 800,
                  mt: 0.5,
                }}
              >
                Our Products
              </Typography>
            </Box>
            <Button
              variant="text"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: 14,
                '&:hover': { color: 'primary.main' },
              }}
            >
              View All Products →
            </Button>
          </Box>
        </motion.div>

        {/* Products grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: 2, md: 2.5 },
            }}
          >
            {PRODUCTS.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <Box
                  sx={{
                    bgcolor: 'white',
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid #F0F0F0',
                    position: 'relative',
                    flex: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.09)',
                      borderColor: '#E0E0E0',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Image area */}
                  <Box
                    sx={{
                      aspectRatio: '4/3',
                      background: product.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 36, md: 48 },
                        fontWeight: 800,
                        color: 'rgba(0,0,0,0.08)',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        letterSpacing: '-0.04em',
                        userSelect: 'none',
                      }}
                      aria-hidden="true"
                    >
                      {product.initials}
                    </Typography>

                    {/* Wishlist button */}
                    <IconButton
                      size="small"
                      aria-label={`Add ${product.name} to wishlist`}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        bgcolor: 'rgba(255,255,255,0.9)',
                        width: 32,
                        height: 32,
                        '&:hover': {
                          bgcolor: 'white',
                          '& .MuiSvgIcon-root': { color: 'primary.main' },
                        },
                      }}
                    >
                      <FavoriteBorderOutlined
                        sx={{ fontSize: 16, transition: 'color 0.2s ease' }}
                      />
                    </IconButton>

                    {/* Discount badge */}
                    <Chip
                      label={product.badge}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: 11,
                        height: 22,
                      }}
                    />
                  </Box>

                  {/* Card content */}
                  <Box
                    sx={{
                      p: { xs: 1.5, md: 2 },
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: 12, md: 13 },
                        mb: 0.75,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      mb={1.5}
                    >
                      <Typography
                        sx={{
                          color: 'primary.main',
                          fontWeight: 800,
                          fontSize: { xs: 16, md: 18 },
                        }}
                      >
                        ₹{product.price}
                      </Typography>
                      <Typography
                        sx={{
                          textDecoration: 'line-through',
                          color: 'text.disabled',
                          fontSize: 12,
                        }}
                      >
                        ₹{product.originalPrice}
                      </Typography>
                    </Stack>

                    <Button
                      fullWidth
                      size="small"
                      startIcon={
                        <ShoppingCartOutlined
                          sx={{ fontSize: '15px !important' }}
                        />
                      }
                      aria-label={`Add ${product.name} to cart`}
                      sx={{
                        mt: 'auto',
                        borderRadius: 2,
                        fontSize: { xs: 11, md: 12 },
                        fontWeight: 600,
                        border: '1.5px solid',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        py: { xs: 0.75, md: 1 },
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                        },
                      }}
                    >
                      Add to Cart
                    </Button>
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

export default BestSellers;
