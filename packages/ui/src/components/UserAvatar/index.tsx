import { memo } from 'react';
import { Avatar, AvatarProps } from '@mui/material';

export interface UserAvatarProps extends Omit<AvatarProps, 'src'> {
  src?: string | null;
  name?: string;
}

/**
 * Component to show a user's profile picture or a fallback user icon.
 *
 * @component
 * @returns {React.ReactElement}
 */
const UserAvatar = ({
  src,
  name,
  sx,
  ...other
}: UserAvatarProps): React.ReactElement => {
  return (
    <Avatar
      alt={name || 'User Avatar'}
      src={src && src !== 'null' ? src : undefined}
      sx={sx}
      {...other}
    />
  );
};

export default memo(UserAvatar);
