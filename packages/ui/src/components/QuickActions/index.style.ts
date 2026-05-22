/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Quick Actions Styles
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 16/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

const hexToRGBA = (hex: string, alpha: number) => {
  if (!hex) return '';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const styles = {
  // Individual action card
  card: (color?: string) => (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: theme.spacing(1.5),
    border: 'none',
    p: theme.spacing(2.5, 3),
    backgroundColor: color ? hexToRGBA(color, 0.04) : theme.palette.grey[50],
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  }),

  // Icon circle container (left side)
  iconWrapper: (color?: string) => (theme: any) => ({
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    backgroundColor: color ? hexToRGBA(color, 0.1) : theme.palette.grey[100],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
    flexShrink: 0,
  }),

  // Icon inside circle
  icon: (color?: string) => (theme: any) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    color: color || theme.palette.primary.main,
  }),

  // Content container (title + subtitle)
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '2px',
  },

  // Arrow button (right side)
  arrowWrapper: (_color?: string) => (_theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#14201F',
    flexShrink: 0,
    transition: 'all 0.2s ease',
  }),
};

export default styles;
