/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create styles for auth layout.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 10/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

export default {
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'relative',
    backgroundImage: 'url(/assets/images/auth_inner_background.png)',
    backgroundSize: '100% 100%',
    overflow: 'hidden',
  },
  mainStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
  },
  mobileLogoContainer: (theme: any) => ({
    width: '100%',
    maxWidth: 188,
    mb: 1,
  }),
  formStyle: {
    width: '100%',
    maxWidth: 480,
    py: 3,
  },
};
