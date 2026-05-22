/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create permission guard.
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
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Interface used to create component to define protectation layout for pages, which are not accessible after login.
 *
 * @interface PermissionGuardProps
 * @property {node} children required - contains the child components.
 * @property {string | string[]} permissions required - contains the permissions required to access the page.
 * @property {boolean} requireAll optional - if true, user must have ALL permissions. Default: false (ANY)
 * @property {string} fallbackPath optional - where to redirect if no permission
 */

interface PermissionGuardProps {
  children: React.ReactElement;
  permissions: string | string[];
  requireAll?: boolean;
  fallbackPath?: string;
}

// ----------------------------------------------------------------------

/**
 * Component to define protectation layout for pages, which are not accessible after login
 *
 * @component
 * @param {node} children - contains the child components
 * @param {string | string[]} permissions - contains the permissions required to access the page
 * @param {boolean} requireAll - if true, user must have ALL permissions. Default: false (ANY)
 * @param {string} fallbackPath - where to redirect if no permission
 * @returns {React.ReactElement}
 */

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permissions,
  requireAll = false,
  fallbackPath = '/not-allowed',
}) => {
  const { hasPermission, hasAnyPermission, isPageLoaded, isLoadingProfile } =
    useAuth();
  const location = useLocation();

  /* Check if page is loaded */
  if (!isPageLoaded) {
    // return <Loader />;
    console.log('Loading from permission guard for page');
    return <Typography>Loading from permission guard for page</Typography>;
  }

  if (isLoadingProfile) {
    // return <Loader />;
    console.log('Loading from permission guard for profile');
    return <Typography>Loading from permission guard for profile</Typography>;
  }

  /* Convert single permission to array */
  const permissionArray = Array.isArray(permissions)
    ? permissions
    : [permissions];

  /* Check permissions */
  const hasAccess = requireAll
    ? hasPermission(permissionArray) // User must have ALL
    : hasAnyPermission(permissionArray); // User needs ANY

  /* Redirect if no access */
  if (!hasAccess) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  return children;
};

export default PermissionGuard;
