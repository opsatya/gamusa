/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description QuickActions component to display a list of clickable action cards.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 04/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface for a single quick action item
 *
 * @interface QuickAction
 * @property {string} id - unique identifier
 * @property {string} title - main title text
 * @property {string} subtitle - supporting description text
 * @property {React.ElementType} icon - icon component to render
 * @property {string} [href] - optional navigation path
 */
export interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  href?: string;
  color?: string;
}

/**
 * Props for QuickActionCard component
 *
 * @interface QuickActionCardProps
 * @property {QuickAction} item - the action item data
 * @property {(item: QuickAction) => void} [onAction] - click handler
 */
interface QuickActionCardProps {
  item: QuickAction;
  onAction?: (item: QuickAction) => void;
}

/**
 * Props for QuickActions component
 *
 * @interface QuickActionsProps
 * @property {string} [title] - section title
 * @property {QuickAction[]} items - list of action items
 * @property {(item: QuickAction) => void} [onAction] - click handler for items
 */
interface QuickActionsProps {
  title?: string;
  items: QuickAction[];
  onAction?: (item: QuickAction) => void;
}

// ----------------------------------------------------------------------

/**
 * QuickActionCard Component - individual card for an action
 *
 * @component
 * @param {QuickActionCardProps} props
 * @returns {React.ReactElement}
 */
const QuickActionCard = ({
  item,
  onAction,
}: QuickActionCardProps): React.ReactElement => {
  const Icon = item.icon;
  /* Output */
  return (
    <Box sx={styles.card(item.color)} onClick={() => onAction?.(item)}>
      {/* Icon Container */}
      <Box sx={styles.iconWrapper(item.color)}>
        <Icon sx={styles.icon(item.color)} />
      </Box>

      {/* Content Container */}
      <Box sx={styles.content}>
        <Typography variant="bodyLBold">{item.title}</Typography>
        <Typography variant="bodySMedium">{item.subtitle}</Typography>
      </Box>

      {/* Arrow Button */}
      <Box sx={styles.arrowWrapper(item.color)}>
        <ArrowForward />
      </Box>
    </Box>
  );
};

// ----------------------------------------------------------------------

/**
 * QuickActions Component - renders a card wrapper containing a title and a list of quick action items.
 *
 * @component
 * @param {QuickActionsProps} props
 * @returns {React.ReactElement}
 */
const QuickActions = ({
  title,
  items,
  onAction,
}: QuickActionsProps): React.ReactElement => {
  /* Output */
  return (
    <CardWrapper>
      <Stack gap={3} my={1.25}>
        {/* Header Title */}
        {title && <Typography variant="h5">{title}</Typography>}

        {/* Responsive Grid */}
        <Grid container spacing={2}>
          {items?.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <QuickActionCard item={item} onAction={onAction} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </CardWrapper>
  );
};

export default QuickActions;
