/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Top Roles pie chart styles.
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

export const styles = {
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: 'common.white',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1,
  },

  legendContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingTop: '24px',
  },

  legendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  legendLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },

  legendDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    flexShrink: 0,
  },
};
