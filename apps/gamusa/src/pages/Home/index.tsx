import { useEffect, useState, type SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Box, GlobalStyles, Snackbar } from '@mui/material';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import HeroBanner from './components/HeroBanner';
import FeaturedCategories from './components/FeaturedCategories';
import BestSellers from './components/BestSellers';
import WhyChooseUs from './components/WhyChooseUs';
import CustomerReviews from './components/CustomerReviews';

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: #C0392B; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #922B21; }

  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-12px); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.05); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

const Home = () => {
  const location = useLocation();
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    document.title = 'Gamusa — Authentic Assamese Handwoven Products';
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    if ((location.state as { showWelcome?: boolean })?.showWelcome) {
      setShowSnackbar(true);
    }
  }, [location.state]);

  const handleClose = (_e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setShowSnackbar(false);
  };

  return (
    <Box>
      <GlobalStyles styles={globalStyles} />

      <Header />
      <HeroBanner />
      <FeaturedCategories />
      <BestSellers />
      <WhyChooseUs />
      <CustomerReviews />
      <Footer />

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%', borderRadius: 2 }}
        >
          Welcome to Gamusa! 🧣 Happy shopping.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
