/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create auth guard.
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
 * Interface used to create component to define protectation layout for pages, which are not accessible without login.
 *
 * @interface AuthGuardProps
 * @property {node} children - contains the child components.
 */
export interface AuthGuardProps {
  children: React.ReactElement;
  redirectTo?: string;
  loader?: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Component to define protectation layout for pages, which are not accessible without login
 *
 * @component
 * @param {node} children - contains the child components
 * @returns {React.ReactElement}
 */
const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  redirectTo = '/',
  loader = null,
}): React.ReactElement => {
  /* Hooks */
  const { isAuthenticated, isLoadingProfile } = useAuth();
  const location = useLocation();

  if (isLoadingProfile) {
    console.log('Loading from auth guard for profile');
    return <> {loader} </>;
  }
  /* Output */
  if (!isAuthenticated) {
    return <Navigate to={`${redirectTo}?returnurl=${location.pathname}`} />;
  }

  // if (isAdmin) {
  //   return (
  //     <Navigate
  //       to={PAGE_ADMIN_DASHBOARD.root.absolutePath}
  //     />
  //   );
  // }

  return children;
};

export default AuthGuard;
