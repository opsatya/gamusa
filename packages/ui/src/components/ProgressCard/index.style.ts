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

export default {
  backButton: {
    alignSelf: 'flex-start',
  },

  leftColumn: {
    minWidth: 120,
    display: 'flex',
    justifyContent: 'center',
  },

  circularRoot: {
    position: 'relative',
    display: 'inline-flex',
  },

  circularProgress: (theme: any) => {
    return {
      borderRadius: '50%',
      '& .MuiCircularProgress-circle': {
        stroke: theme.palette.secondary.lighter,
      },
      // completed portion color
      '& .MuiCircularProgress-circleDeterminate': {
        stroke: theme.palette.secondary.main,
      },
      '& .MuiCircularProgress-svg': {
        color: 'red',
      },
      '& .MuiCircularProgress-track': {
        stroke: theme.palette.secondary.main,
      },
    };
  },
  circularLabel: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  iconContainer: {
    width: 1.5,
    height: 1.5,
  },
};
