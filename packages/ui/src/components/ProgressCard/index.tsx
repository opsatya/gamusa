/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Progress card component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 10/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import React, { memo } from 'react';
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Grid,
  Skeleton,
} from '@mui/material';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';

/* Local Imports */
import styles from './index.style';

/**
 * Props for ProgressCard component
 * @prop {number} progress - Progress percentage
 * @prop {boolean} loading - Loading state
 * @prop {string} roleLabel - Role label
 * @prop {string} roleTitle - Role title
 * @prop {string} description - Role description
 * @prop {function} onPrevious - Previous button click handler
 * @prop {function} onNext - Next button click handler
 * @prop {boolean} disablePrevious - Disable previous button
 * @prop {boolean} disableNext - Disable next button
 */
export interface ProgressCardProps {
  progress: number;
  loading?: boolean;
  roleLabel: string;
  roleTitle: string;
  description: string;
  onPrevious?: () => void;
  onNext?: () => void;

  disablePrevious?: boolean;
  disableNext?: boolean;
}

/**
 * Circular progress with label component
 * @param {number} value - Progress percentage
 * @returns {JSX.Element}
 */
const CircularProgressWithLabel = ({ value }: { value: number }) => {
  return (
    <Box sx={styles.circularRoot}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={110}
        thickness={5}
        color="secondary"
        enableTrackSlot
        sx={styles.circularProgress}
      />
      <Box sx={styles.circularLabel}>
        <Stack>
          <Typography variant="bodyMBold">Round</Typography>
          <Typography variant="bodyMRegular">1 of 4</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

/**
 * Skeleton progress card component
 * @returns {JSX.Element}
 */
const SkeletonProgressCard = () => {
  return (
    <CardWrapper>
      <Grid container spacing={3}>
        {/* Left Column Skeleton */}
        <Grid size={{ xs: 12, sm: 2 }}>
          <Box
            sx={{
              ...styles.leftColumn,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Skeleton
              variant="circular"
              width={110}
              height={110}
              animation="wave"
            />
          </Box>
        </Grid>

        {/* Right Column Skeleton */}
        <Grid size={{ xs: 12, sm: 10 }}>
          <Stack spacing={1.5}>
            {/* Role Label */}
            <Skeleton variant="text" width={120} height={18} animation="wave" />

            {/* Role Title */}
            <Skeleton variant="text" width="40%" height={28} animation="wave" />

            {/* Description lines */}
            <Skeleton
              variant="text"
              width="100%"
              height={20}
              animation="wave"
            />
            <Skeleton variant="text" width="90%" height={20} animation="wave" />
          </Stack>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

/**
 * Progress card component
 * @param {number} progress - Progress percentage
 * @param {string} roleLabel - Role label
 * @param {string} roleTitle - Role title
 * @param {string} description - Role description
 * @param {function} onPrevious - Previous button click handler
 * @param {function} onNext - Next button click handler
 * @param {boolean} disablePrevious - Disable previous button
 * @param {boolean} disableNext - Disable next button
 * @returns {JSX.Element}
 */
const ProgressCard = ({
  progress,
  loading = false,
  roleLabel,
  roleTitle,
  description,
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}: ProgressCardProps) => {
  if (loading) {
    return <SkeletonProgressCard />;
  }

  /* Render */
  return (
    <CardWrapper>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 2 }}>
          {/* Left Column */}
          <Box sx={styles.leftColumn}>
            <CircularProgressWithLabel value={progress} />
          </Box>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, sm: 10 }}>
          <Stack spacing={1.5}>
            <Typography variant="bodyMSemibold" color="textSecondary">
              {roleLabel}
            </Typography>

            <Typography variant="bodyLBold" color="secondary">
              {roleTitle}
            </Typography>

            <Typography variant="bodyMMedium">{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

export default memo(ProgressCard);
