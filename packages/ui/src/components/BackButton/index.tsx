import { ChevronLeft } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import styles from './index.style';

interface BackButtonProps {
  handleGoback?: () => void;
  buttonStyle?: ButtonProps['sx'];
}

const BackButton: React.FC<BackButtonProps> = ({
  handleGoback,
  buttonStyle,
  ...props
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (handleGoback) {
      handleGoback();
    } else {
      navigate(-1);
    }
  };
  return (
    <Button
      sx={(theme) => ({ ...styles.backButton(theme), ...buttonStyle })}
      size="small"
      onClick={handleBack}
      {...props}
    >
      <ChevronLeft sx={{ fontSize: '1rem' }} />
      Back
    </Button>
  );
};

export default BackButton;
