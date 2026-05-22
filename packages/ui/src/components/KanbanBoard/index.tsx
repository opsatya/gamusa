/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description KanbanBoard — Generic, reusable Kanban board component.
 *              Renders data items in status-grouped columns with built-in card layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author CRM Team
 * Date Created: 27/04/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, { memo, useMemo } from 'react';
import { Avatar, Box, Chip, Typography, useTheme } from '@mui/material';

/* Local Imports */
import styles from './index.style';

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Interface for a badge displayed on each card.
 *
 * @interface KanbanBadge
 * @property {string} label - Badge text
 * @property {string} bg - Badge background color
 * @property {string} color - Badge text color
 */
export interface KanbanBadge {
  label: string;
  bg: string;
  color: string;
}

/**
 * Interface for a single Kanban column configuration.
 *
 * @interface KanbanColumn
 * @property {string} key - Unique key for the column (matches the groupBy field value)
 * @property {string} label - Display label for the column header
 * @property {string} color - Text color for the column header label
 * @property {string} bg - Background color for the column header
 * @property {string} dotColor - Accent color used for the bottom border and count badge
 */
export interface KanbanColumn {
  key: string;
  label: string;
  color: string;
  bg: string;
  dotColor: string;
}

/**
 * Interface for card data that the built-in card renderer consumes.
 *
 * @interface KanbanCardConfig
 * @property {string} title - Primary title (e.g. company name)
 * @property {string} [subtitle] - Secondary line (e.g. POC name)
 * @property {KanbanBadge[]} [badges] - Vertical / Priority badges
 * @property {string} [avatarLabel] - Single character for the avatar
 * @property {string} [avatarColor] - Background color for the avatar
 * @property {number} [score] - Numeric score displayed as a chip
 */
export interface KanbanCardConfig {
  title: string;
  subtitle?: string;
  badges?: KanbanBadge[];
  avatarLabel?: string;
  avatarColor?: string;
  score?: number;
}

/**
 * Interface for KanbanBoard component props.
 *
 * @interface KanbanBoardProps
 * @property {Array<KanbanColumn>} columns - Column definitions for the board
 * @property {Array<T>} items - Flat data array to be grouped into columns
 * @property {string} groupBy - Field name on each item used to determine which column it belongs to
 * @property {function} getCardConfig - Maps each item to a KanbanCardConfig for the built-in card renderer
 * @property {function} [renderCard] - Optional custom render function; overrides built-in card when provided
 * @property {function} [onCardClick] - Optional click handler for individual cards
 * @property {string} [emptyText] - Text to display when a column has no items
 * @property {object} [containerSx] - Optional sx override for the board container
 */
interface KanbanBoardProps<T extends Record<string, any>> {
  columns: KanbanColumn[];
  items: T[];
  groupBy: string;
  getCardConfig: (item: T) => KanbanCardConfig;
  renderCard?: (item: T) => React.ReactNode;
  onCardClick?: (item: T) => void;
  emptyText?: string;
  containerSx?: object;
}

// ----------------------------------------------------------------------

/* Sub-Components */

/**
 * KanbanCardContent — Internal card renderer following the project's
 * sub-component pattern (like StatsItem in HorizontalStatsCard).
 * Consumers pass data via getCardConfig, not raw JSX.
 */
const KanbanCardContent: React.FC<{ config: KanbanCardConfig }> = ({
  config,
}) => {
  const theme = useTheme();

  const scoreStyle = useMemo(() => {
    if (config.score === undefined) return {};
    let bg = theme.palette.error.lighter || '#FEE2E2';
    let color = theme.palette.error.main || '#DC2626';
    if (config.score > 70) {
      bg = theme.palette.primary.lighter || '#DCFCE7';
      color = theme.palette.primary.main || '#16A34A';
    } else if (config.score > 40) {
      bg = theme.palette.warning.lighter || '#FEF3C7';
      color = theme.palette.warning.dark || '#D97706';
    }
    return { backgroundColor: bg, color, fontWeight: 700 };
  }, [config.score, theme]);

  return (
    <>
      <Typography variant="bodySSemibold" noWrap sx={{ mb: 0.25 }}>
        {config.title}
      </Typography>

      {config.subtitle && (
        <Typography
          variant="bodyXSRegular"
          color="text.secondary"
          noWrap
          sx={{ display: 'block', mb: 0.75 }}
        >
          {config.subtitle}
        </Typography>
      )}

      {config.badges && config.badges.length > 0 && (
        <Box sx={styles.cardBadges}>
          {config.badges.map((badge) => (
            <Chip
              key={badge.label}
              label={badge.label}
              size="small"
              sx={{
                backgroundColor: badge.bg,
                color: badge.color,
                fontWeight: 600,
                ...styles.cardBadge,
              }}
            />
          ))}
        </Box>
      )}

      {(config.avatarLabel || config.score !== undefined) && (
        <Box sx={styles.cardFooter}>
          {config.avatarLabel && (
            <Avatar
              sx={styles.cardOwnerAvatar(
                theme,
                config.avatarColor || theme.palette.primary.main
              )}
            >
              {config.avatarLabel}
            </Avatar>
          )}
          {config.score !== undefined && (
            <Chip label={config.score} size="small" sx={scoreStyle} />
          )}
        </Box>
      )}
    </>
  );
};

// ----------------------------------------------------------------------

/**
 * KanbanBoard — A generic, reusable Kanban board layout.
 *
 * Renders data items grouped into columns based on a specified field.
 * Each column displays a header with label + count badge, and scrollable
 * card content rendered via getCardConfig (built-in) or renderCard (custom).
 *
 * @component
 * @example
 * ```tsx
 * <KanbanBoard
 *   columns={[
 *     { key: 'New Lead', label: 'New Lead', color: '#2563EB', bg: '#EFF6FF', dotColor: '#2563EB' },
 *   ]}
 *   items={leads}
 *   groupBy="status"
 *   getCardConfig={(lead) => ({
 *     title: lead.company,
 *     subtitle: lead.poc,
 *     badges: [{ label: lead.vertical, bg: '#F0FFF4', color: '#86A328' }],
 *     avatarLabel: getUser(lead.owner)?.name?.[0],
 *     avatarColor: getUser(lead.owner)?.color,
 *     score: lead.score,
 *   })}
 *   onCardClick={(lead) => handleViewLead(lead)}
 *   emptyText="No leads"
 * />
 * ```
 */
function KanbanBoard<T extends Record<string, any>>({
  columns,
  items,
  groupBy,
  getCardConfig,
  renderCard,
  onCardClick,
  emptyText = 'No items',
  containerSx,
}: KanbanBoardProps<T>) {
  const theme = useTheme();

  /** Group items by the specified field */
  const groupedItems = useMemo(() => {
    const map = new Map<string, T[]>();
    columns.forEach((col) => map.set(col.key, []));
    items.forEach((item) => {
      const key = item[groupBy] as string;
      if (map.has(key)) {
        map.get(key)!.push(item);
      }
    });
    return map;
  }, [columns, items, groupBy]);

  return (
    <Box sx={{ ...styles.container, ...containerSx }}>
      {columns.map((col) => {
        const colItems = groupedItems.get(col.key) || [];
        return (
          <Box key={col.key} sx={styles.column(theme)}>
            {/* Column Header */}
            <Box sx={styles.columnHeader(col.bg, col.dotColor)}>
              <Typography variant="bodySSemibold" sx={{ color: col.color }}>
                {col.label}
              </Typography>
              <Typography
                variant="bodyXSBold"
                sx={styles.columnCount(col.dotColor)}
              >
                {colItems.length}
              </Typography>
            </Box>

            {/* Column Body */}
            <Box sx={styles.columnBody}>
              {colItems.map((item, index) => (
                <Box
                  key={item.id ?? index}
                  sx={styles.card(theme)}
                  onClick={() => onCardClick?.(item)}
                >
                  {renderCard ? (
                    renderCard(item)
                  ) : (
                    <KanbanCardContent config={getCardConfig(item)} />
                  )}
                </Box>
              ))}
              {colItems.length === 0 && (
                <Typography variant="bodyXSRegular" sx={styles.empty(theme)}>
                  {emptyText}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default memo(KanbanBoard) as typeof KanbanBoard;
