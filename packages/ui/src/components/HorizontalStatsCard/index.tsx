/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Horizontal stats card component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { Box, Typography, Skeleton, Grid } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

/*local imports*/
import { StatsItemConfig, HorizontalStatsCardProps } from './types';
import styles from './index.style';
import CardWrapper from '../Wrapper/CardWrapper';

/**
 * Stats item component for the Horizontal stats card.
 *
 * @component
 * @param {object} props - component props
 * @param {string} props.id - id of the stats item
 * @param {string} props.label - label of the stats item
 * @param {string} props.value - value of the stats item
 * @param {React.ReactNode} props.icon - icon of the stats item
 * @param {object} props.change - change of the stats item
 * @returns {React.ReactElement}
 */
/**
 * Horizontal stats card component.
 *
 * @component
 * @param {object} props - component props
 * @param {StatsItemConfig[]} props.items - configuration for chart series
 * @returns {React.ReactElement}
 */

const StatsItem = ({ id, label, value, icon, change }: StatsItemConfig) => {
  // Determine if trend is negative
  const isNegative = change?.type === 'down';
  const Icon = icon;

  return (
    <Box sx={styles.card.main} id={id}>
      <Box
        sx={styles.card.iconContainer}
        role="img"
        aria-label={`${label} icon`}
      >
        <Icon />
      </Box>

      <Box sx={styles.card.valueContainer}>
        <Typography variant="h3">{value}</Typography>
        {change && (
          <Box
            sx={[
              styles.card.trendUpContainer,
              {
                color: isNegative ? 'error.main' : 'info.main',
                backgroundColor: isNegative ? 'error.light' : 'info.light[100]',
              },
            ]}
          >
            {isNegative ? (
              <TrendingDown sx={styles.card.trendIcon} />
            ) : (
              <TrendingUp sx={styles.card.trendIcon} />
            )}
            <Typography variant="bodySBold">
              {change.type === 'up' ? '+' : ''}
              {change.value}%
            </Typography>
          </Box>
        )}
      </Box>
      <Typography variant="bodyLSemibold">{label}</Typography>
    </Box>
  );
};

const HorizontalStatsCard = ({
  items,
  isLoading = false,
  isEmpty = false,
}: HorizontalStatsCardProps) => {
  /*
   * Loading state
   */
  if (isLoading) {
    return null;
  }

  /*
   * Empty state
   */
  if (isEmpty || items.length === 0) {
    return (
      <CardWrapper>
        <Box sx={styles.emptyState}>
          <Typography variant="body2">No statistics available</Typography>
        </Box>
      </CardWrapper>
    );
  }

  /*
   * Default state
   */
  return (
    <CardWrapper>
      <Grid container spacing={3}>
        {items?.map((item) => (
          <Grid size={{ xs: 6, sm: 6, md: 6, lg: 3 }} key={item.id}>
            <StatsItem {...item} />
          </Grid>
        ))}
      </Grid>
    </CardWrapper>
  );
};

export default HorizontalStatsCard;
