/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to styles for select input component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 06/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  formControlStyle: {
    display: 'flex',
  },
  formLabelStyle: (theme: any) => ({
    position: 'relative',
    marginBottom: theme.spacing(0.5),
    width: '100%',
  }),
  formHelperTextStyle: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  }),
};
