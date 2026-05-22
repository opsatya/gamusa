/**
 * @copyright @2022 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for data table component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 18/Nov/2022
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  rootStyle: (theme: any) => ({
    borderRadius: `${theme.shape.borderRadiusXs}px`,
  }),
  headerNameStyle: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    overflow: 'hidden',
    '& .MuiTableSortLabel-icon': {
      flexShrink: 0,
    },
  },
  headerTextStyle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flex: 1,
    minWidth: 0,
  },
  nonSortableHeaderStyle: {
    display: 'inline-block',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  tableHeader: {
    borderRadius: '10px',
  },
  tableContainer: {
    borderRadius: '10px',
    overflowX: 'auto',
    paddingBottom: '8px',
  },
  pagination: (theme: any) => ({
    position: 'static',
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  loaderStyle: {
    height: 300,
  },
};
