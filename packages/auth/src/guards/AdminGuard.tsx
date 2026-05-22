/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create auth guard.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 09/07/2025
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
 * @interface AdminGuardProps
 * @property {node} children - contains the child components.
 */
export interface AdminGuardProps {
  children: React.ReactElement;
}

// ----------------------------------------------------------------------

/**
 * Component to define protectation layout for pages, which are not accessible without login
 *
 * @component
 * @param {node} children - contains the child components
 * @returns {React.ReactElement}
 */
const AdminGuard: React.FC<AdminGuardProps> = ({
  children,
}): React.ReactElement => {
  /* Hooks */
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  /* Output */
  // if (!isAuthenticated) {
  //   return (
  //     <Navigate
  //       to={`${PAGE_ROOT.adminSignIn.absolutePath}?returnurl=${location.pathname}`}
  //     />
  //   );
  // }

  // if (!isAdmin) {
  //   return (
  //     <Navigate to={PAGE_USER_DASHBOARD.root.absolutePath} />
  //   );
  // }

  return children;
};

export default AdminGuard;
