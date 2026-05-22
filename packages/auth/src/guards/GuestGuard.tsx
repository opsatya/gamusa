/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create user guard.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 30/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { Navigate, useLocation } from 'react-router-dom';

/* Relative Imports */
import { useAuth } from '../index';

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create component to define protectation layout for pages, which are not accessible after login.
 *
 * @interface GuestGuardProps
 * @property {node} children - contains the child components.
 */
export interface GuestGuardProps {
  children: React.ReactElement;
  redirectPath: string;
  loader?: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Component to define protectation layout for pages, which are not accessible after login
 *
 * @component
 * @param {node} children - contains the child components
 * @returns {React.ReactElement}
 */
const GuestGuard: React.FC<GuestGuardProps> = ({
  children,
  redirectPath = '/',
  loader = null,
}): React.ReactElement => {
  /* Hooks */
  const { isAuthenticated, user, hasPendingVerification } = useAuth();
  const location = useLocation();
  // const returnUrl = new URLSearchParams(location.search).get('returnurl');

  // if (location.pathname === PAGE_ROOT.verifyOtpSuccess.absolutePath) {
  //   // If already authenticated, redirect to dashboard
  //   if (isAuthenticated) {
  //     return <Navigate to={PAGE_USER_DASHBOARD.root.absolutePath} replace />;
  //   }

  //   // If no pending verification, redirect to signin
  //   if (!hasPendingVerification) {
  //     return <Navigate to={PAGE_ROOT.signIn.absolutePath} replace />;
  //   }

  //   // Has pending verification - allow access
  //   return children;
  // }

  if (isAuthenticated) {
    // If the user is authenticated, redirect them from the guest page.
    // Redirect to the 'returnUrl' if it exists, otherwise to the main dashboard.
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // if (isAuthenticated) {
  //   // If the user is authenticated, redirect them from the guest page.
  //   // Redirect to the 'returnUrl' if it exists, otherwise to the main dashboard.
  //   const redirectPath = returnUrl || PAGE_ADMIN_DASHBOARD.root.absolutePath;
  //   return <Navigate to={redirectPath} state={{ from: location }} replace />;
  // }

  return children;
};

export default GuestGuard;
