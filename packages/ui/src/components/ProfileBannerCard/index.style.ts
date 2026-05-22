/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Styles for ProfileBannerCard component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 14/05/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { alpha, Theme } from '@mui/material';

// ----------------------------------------------------------------------

const BANNER_HEIGHT = 116;
const AVATAR_SIZE = 140;
const AVATAR_OVERHANG = AVATAR_SIZE - BANNER_HEIGHT + 20; // avatar starts ~20px from top

export default {
  root: (theme: Theme) => ({
    backgroundColor: theme.palette.common.white,
    width: '100%',
    overflow: 'hidden',
    pb: theme.spacing(4), // 32px
    borderRadius: theme.spacing(1.25), // 10px
    border: `1px solid ${theme.palette.grey[50]}`, // #FAFAFA
    boxShadow:
      '0px 1px 3px rgba(0, 0, 0, 0.04), 0px 4px 12px rgba(0, 0, 0, 0.06)',
  }),

  // ── Banner strip ──────────────────────────────────────────────────────
  bannerArea: (theme: Theme) => ({
    position: 'relative' as const,
    height: BANNER_HEIGHT, // 116px
    borderTopLeftRadius: theme.spacing(1.25), // 10px
    borderTopRightRadius: theme.spacing(1.25), // 10px
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
  }),

  // ── Avatar ────────────────────────────────────────────────────────────
  avatar: (theme: Theme) => ({
    position: 'absolute' as const,
    top: 20, // ~20px from top of banner
    left: theme.spacing(3), // 24px
    width: AVATAR_SIZE, // 140px
    height: AVATAR_SIZE, // 140px
    fontSize: '2.5rem',
    fontWeight: 700,
    border: `2px solid ${theme.palette.common.white}`, // #FFFFFF
    boxShadow: `0px 4px 4px 0px ${alpha(theme.palette.grey[700], 0.25)}`, // #49494940
    zIndex: 1,
  }),

  // ── Content area ──────────────────────────────────────────────────────
  contentArea: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(2.5), // 20px
    px: theme.spacing(3), // 24px
    pt: `${AVATAR_OVERHANG + 12.5}px`, // 44 + 12.5 = 56.5px
  }),

  // ── Name + role row ───────────────────────────────────────────────────
  nameRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 1,
  },

  editButton: (theme: Theme) => ({
    color: theme.palette.text.secondary,
    width: 32,
    height: 32,
    flexShrink: 0,
  }),

  // ── Info chips row ────────────────────────────────────────────────────
  infoRow: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    gap: theme.spacing(0.5), // 4px between rows
  }),

  infoChip: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5), // 12px
    height: 22,
  }),

  infoIcon: (theme: Theme) => ({
    fontSize: 16,
    color: theme.palette.primary.main,
  }),
};
