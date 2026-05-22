/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reusable action menu component with icon trigger and styled menu items.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 14/05/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { memo, useState } from 'react';
import {
  alpha,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  PopoverOrigin,
  Stack,
  Typography,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

/* Local Imports */
import ActionIconButton from '../ActionIconButton';

// ----------------------------------------------------------------------

/* Types */
export interface ActionMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  description?: string;
  divider?: boolean;
}

export interface ActionMenuProps {
  items: ActionMenuItem[];
  width?: number;
  trigger?: React.ReactNode;
  triggerTitle?: string;
  triggerVariant?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info';
  anchorOrigin?: PopoverOrigin;
  transformOrigin?: PopoverOrigin;
  disabled?: boolean;
}

// ----------------------------------------------------------------------

/**
 * Reusable action menu — renders a trigger button (default: MoreVert) that opens
 * a styled dropdown menu. Supports normal and destructive (danger) item variants,
 * optional descriptions per item, and custom triggers.
 *
 * @component
 */
const ActionMenu = ({
  items,
  width = 200,
  trigger,
  triggerTitle = 'More Actions',
  triggerVariant = 'primary',
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  transformOrigin = { vertical: 'top', horizontal: 'right' },
  disabled = false,
}: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!disabled) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleItemClick = (item: ActionMenuItem) => {
    if (item.disabled) return;
    item.onClick();
    handleClose();
  };

  const visibleItems = items.filter(Boolean);
  if (visibleItems.length === 0) return null;

  return (
    <>
      {trigger ? (
        <span
          onClick={handleOpen}
          style={{
            display: 'inline-flex',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {trigger}
        </span>
      ) : (
        <ActionIconButton
          icon={<MoreVert />}
          variant={triggerVariant}
          onClick={handleOpen}
          title={triggerTitle}
          disabled={disabled}
        />
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        sx={(theme) => ({
          '& .MuiPaper-root': {
            width,
            boxShadow: theme.shadows[4],
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
            p: 0.75,
          },
          '& .MuiList-root': {
            p: 0,
          },
        })}
      >
        {visibleItems.map((item, index) => (
          <span key={item.key}>
            <MenuItem
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              sx={(theme) => ({
                display: 'flex',
                alignItems: item.description ? 'flex-start' : 'center',
                gap: 1.5,
                py: item.description ? 1 : 0.75,
                px: 1.5,
                borderRadius: '8px',
                color: item.danger
                  ? theme.palette.error.main
                  : theme.palette.text.primary,
                transition: 'background-color 0.15s',
                '& .MuiSvgIcon-root, & svg': {
                  fontSize: 16,
                  color: item.danger
                    ? theme.palette.error.main
                    : theme.palette.text.secondary,
                  mt: item.description ? '2px' : 0,
                },
                '&:hover': {
                  backgroundColor: item.danger
                    ? alpha(theme.palette.error.main, 0.08)
                    : alpha(theme.palette.primary.main, 0.08),
                  '& .MuiSvgIcon-root, & svg': {
                    color: item.danger
                      ? theme.palette.error.main
                      : theme.palette.primary.main,
                  },
                },
                '&.Mui-disabled': {
                  opacity: 0.5,
                },
              })}
            >
              {item.icon && (
                <ListItemIcon
                  sx={{ minWidth: 'auto !important', color: 'inherit' }}
                >
                  {item.icon}
                </ListItemIcon>
              )}

              {item.description ? (
                <Stack spacing={0.25}>
                  <Typography
                    sx={(theme) => ({
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      lineHeight: 1.3,
                      color: item.danger
                        ? theme.palette.error.main
                        : theme.palette.text.primary,
                    })}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    sx={(theme) => ({
                      fontSize: '0.6875rem',
                      color: theme.palette.text.secondary,
                      lineHeight: 1.4,
                    })}
                  >
                    {item.description}
                  </Typography>
                </Stack>
              ) : (
                <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                  {item.label}
                </Typography>
              )}
            </MenuItem>

            {item.divider && index < visibleItems.length - 1 && (
              <Divider sx={{ my: 0.5 }} />
            )}
          </span>
        ))}
      </Menu>
    </>
  );
};

export default memo(ActionMenu);
