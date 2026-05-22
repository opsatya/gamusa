/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create Header for admin dashboard pages.
 */

// ----------------------------------------------------------------------

import { memo, useState } from 'react';
import { Container, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { breakpoints } from '@lektus/theme';
import styles from '../index.style';
import { useAuth } from '@lektus/auth';
import ProfileDrawer from './ProfileDrawer';

// ----------------------------------------------------------------------

export interface HeaderProps {
  onMobileNavOpen: any;
  isCollapsed?: boolean;
  onProfileSave?: (data: any) => Promise<any>;
  onProfileUpload?: (files: File[], folder: string) => Promise<any>;
}

// ----------------------------------------------------------------------

const Header = ({
  onMobileNavOpen,
  isCollapsed,
  onProfileSave,
  onProfileUpload,
}: HeaderProps): React.ReactElement => {
  const theme = useTheme();
  const laptopDownMatches = useMediaQuery(
    theme.breakpoints.down(breakpoints.values.laptop)
  );

  // ProfileDrawer state — kept here for mobile, sidebar handles desktop
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // ↓ On desktop: header is effectively empty (just a 56px bar for spacing)
  // ↓ On mobile: shows hamburger menu button only
  return (
    <Container
      maxWidth={false}
      sx={(theme) => ({
        ...styles.header(theme, isCollapsed),
        // ↓ On desktop, no user pill here — sidebar handles it
        justifyContent: laptopDownMatches ? 'space-between' : 'flex-end',
        // ↓ Visually: header is just a thin rule on desktop — could remove entirely
        ...(laptopDownMatches ? {} : { display: 'none' }),
      })}
    >
      {laptopDownMatches && (
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
          sx={styles.menuIcon}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* ProfileDrawer kept available for mobile via sidebar trigger */}
      <ProfileDrawer
        open={isProfileMenuOpen}
        onClose={() => setIsProfileMenuOpen(false)}
        anchor="right"
        onSave={onProfileSave}
        onUpload={onProfileUpload}
      />
    </Container>
  );
};

export default memo(Header);
