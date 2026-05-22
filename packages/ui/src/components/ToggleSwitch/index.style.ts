/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for toggle switch component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 22/04/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  track: (checked: boolean, disabled: boolean) => ({
    width: '36px',
    height: '20px',
    backgroundColor: checked ? 'primary.main' : 'grey.400',
    borderRadius: '1000px',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    padding: '2px',
  }),

  thumb: (checked: boolean) => ({
    width: '16px',
    height: '16px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    position: 'absolute',
    left: checked ? 18 : 2,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  }),

  icon: {
    fontSize: '14px',
    transition: 'color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
