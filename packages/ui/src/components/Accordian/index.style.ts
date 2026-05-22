/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for master dashboard pages/components.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 * */
// ----------------------------------------------------------------------

/**
 * Style object for accordian
 *
 * @returns {object}
 */
export default {
  accordianRootContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '6px !important',
    boxShadow: 'none',
    border: 'none',
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded': {
      border: 'none',
      minHeight: '48px',
    },
    '& .MuiAccordionDetails-root': {
      padding: 0,
    },
    '& .MuiAccordionSummary-content': {
      gap: 2,
    },
  },
  accordianSummary: {
    backgroundColor: '#ffffff',
    padding: '0 16px',
    margin: 0,
    minHeight: '48px',
    borderRadius: '6px',
    '& .MuiAccordionSummary-expandIconWrapper': {
      marginLeft: '8px',
    },
    '&.Mui-expanded': {
      minHeight: '48px',
      mt: 0,
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
    },
  },
  timeChip: {
    height: 28,
    '& .MuiChip-label': {
      fontStyle: 'italic',
    },
  },
};
