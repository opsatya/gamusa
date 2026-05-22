/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create my avatar component.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Naishad Vaishnav
 * Date Created: 11/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import { Avatar } from '@mui/material';

/* Relative Imports */
import { useAuth } from '@lektus/auth';

// ----------------------------------------------------------------------

/**
 * Component to show logged in user's profile picture.
 *
 * @component
 * @returns {React.ReactElement}
 */
const MyAvatar = ({ ...other }): React.ReactElement => {
  /* Hooks */
  const { user } = useAuth();

  /* Output */
  return (
    <Avatar
      alt={`${user?.firstName} ${user?.lastName}`}
      src={user?.profilePhoto || undefined}
      {...other}
    />
  );
};

export default memo(MyAvatar);
