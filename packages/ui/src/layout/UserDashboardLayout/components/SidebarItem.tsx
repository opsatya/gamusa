import { memo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme,
  alpha,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

/* Types/Interfaces */
export interface SidebarItemData {
  /** Matches the sidebarKey from the notification system */
  key?: string;
  icon?: React.ElementType;
  title: string;
  href?: string;
  children?: SidebarItemData[];
  badgeCount?: number;
  isDisabled?: boolean;
  tag?: string;
}

export interface SidebarItemProps {
  item: SidebarItemData;
  isSubItem?: boolean;
  isFirstChild?: boolean;
  isCollapsed?: boolean;
  /** Called with the item key when a leaf nav item is clicked */
  onItemClick?: (key: string) => void;
}

// ----------------------------------------------------------------------

const SidebarItem = ({
  item,
  isSubItem = false,
  isFirstChild = false,
  isCollapsed = false,
  onItemClick,
  ...other
}: SidebarItemProps): React.ReactElement => {
  const {
    icon: Icon,
    title,
    href,
    children,
    badgeCount,
    isDisabled,
    tag,
  } = item;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const isActive = href && pathname === href;
  const isParentActive = children?.some(
    (child) => child.href && pathname.includes(child.href)
  );

  const [open, setOpen] = useState(isParentActive);

  // Keep accordion open/closed state in sync with the current route.
  // Without this, when sidebarApiData updates (or falls back) and new
  // SidebarItem instances mount, unrelated groups could flash open.
  useEffect(() => {
    setOpen(isParentActive);
  }, [isParentActive]);

  const isBadgeVisible = typeof badgeCount === 'number' && badgeCount > 0;
  const badgeLabel =
    typeof badgeCount === 'number' && badgeCount > 99 ? '99+' : badgeCount;

  const badgeStyles = isCollapsed
    ? {
        minWidth: 16,
        height: 16,
        borderRadius: '8px',
        backgroundColor: 'primary.main',
        color: 'common.white',
        fontSize: '10px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        px: 0.5,
        position: 'absolute' as const,
        top: 5,
        left: '50%',
        transform: 'translateX(8px)',
        boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
        zIndex: 1,
      }
    : {
        minWidth: 20,
        height: 20,
        borderRadius: '10px',
        backgroundColor: 'primary.main',
        color: 'common.white',
        fontSize: '11px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ml: 0.75,
        px: 0.5,
        flexShrink: 0,
        lineHeight: 1,
      };

  const handleClick = () => {
    if (isDisabled) return;
    if (children) {
      setOpen((prev) => !prev);
    } else if (href) {
      navigate(href);
      if (item.key) {
        onItemClick?.(item.key);
      }
    }
  };

  const itemStyles = {
    borderRadius: `${theme.shape.borderRadius}px`,
    paddingX: isCollapsed ? 0 : 1.25,
    marginBottom: 0.5,
    position: 'relative',
    display: 'flex',
    justifyContent: isCollapsed ? 'center' : 'flex-start',

    transition: theme.transitions.create(
      ['padding-left', 'background-color', 'border'],
      {
        duration: theme.transitions.duration.shorter,
      }
    ),

    '& .MuiListItemIcon-root': {
      color: theme.palette.grey[500],
      minWidth: isCollapsed ? 0 : isSubItem ? 28 : 20,
      justifyContent: 'center',
    },

    '&:hover': {
      backgroundColor: isDisabled
        ? 'transparent'
        : theme.palette.primary.lighter,
      color: isDisabled
        ? theme.palette.text.disabled
        : theme.palette.primary.main,
      cursor: isDisabled ? 'default' : 'pointer',
      '& .MuiListItemIcon-root': {
        color: isDisabled
          ? theme.palette.text.disabled
          : theme.palette.primary.main,
      },
      '& .MuiListItemText-root .MuiTypography-root': {
        color: isDisabled
          ? theme.palette.text.disabled
          : theme.palette.primary.main,
        fontWeight: isDisabled ? 400 : 600,
      },
    },

    '&.Mui-selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,

      '& .MuiListItemIcon-root': {
        color: theme.palette.primary.main,
      },
      '& .MuiListItemText-root .MuiTypography-root': {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
    },
  };

  const listItemIconStyles = {
    mr: isCollapsed || isSubItem ? 0 : 1.25,
  };

  const horizotalLineStyles = {
    content: '""',
    position: 'absolute',
    bottom: '50%',
    left: '-12px',
    width: '12px',
    height: isFirstChild ? '50%' : 'calc(100% + 6px)',
    borderLeft: `2px solid ${theme.palette.grey[200]}`,
    borderBottom: `2px solid ${theme.palette.grey[200]}`,
    borderBottomLeftRadius: '4px',
  };

  const expandIconStyles = {
    color: isParentActive
      ? theme.palette.primary.main
      : theme.palette.grey[500],
  };

  if (children) {
    // --- RENDER A PARENT ITEM WITH A SUB-MENU ---
    const parentContent = (
      <ListItemButton
        selected={false}
        onClick={handleClick}
        sx={itemStyles}
        {...other}
      >
        {Icon && (
          <ListItemIcon sx={listItemIconStyles}>
            <Icon
              sx={{
                width: 20,
                height: 20,
              }}
            />
          </ListItemIcon>
        )}
        {!isCollapsed && <ListItemText primary={title} />}
        {isBadgeVisible && (
          <Box component="span" sx={badgeStyles}>
            {badgeLabel}
          </Box>
        )}
        {!isCollapsed &&
          (open ? (
            <ExpandLess sx={expandIconStyles} />
          ) : (
            <ExpandMore sx={expandIconStyles} />
          ))}
      </ListItemButton>
    );

    return (
      <>
        {isCollapsed ? (
          <Tooltip
            title={title}
            placement="right"
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
          >
            {parentContent}
          </Tooltip>
        ) : (
          parentContent
        )}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box position="relative" sx={{ pl: 3.75, pr: 2 }}>
            <List component="div" disablePadding>
              {children.map((subItem, index) => (
                <SidebarItem
                  key={subItem.title}
                  item={subItem}
                  isSubItem
                  isFirstChild={index === 0}
                  isCollapsed={isCollapsed}
                  onItemClick={onItemClick}
                />
              ))}
            </List>
          </Box>
        </Collapse>
      </>
    );
  }

  // --- RENDER A REGULAR OR SUB-ITEM ---
  const itemContent = (
    <ListItemButton
      selected={Boolean(isActive)}
      onClick={handleClick}
      disabled={isDisabled}
      sx={{
        ...itemStyles,
        ...(isDisabled && {
          opacity: 0.6,
          '& .MuiListItemIcon-root': { color: theme.palette.text.disabled },
          '& .MuiListItemText-root .MuiTypography-root': {
            color: theme.palette.text.disabled,
          },
        }),
      }}
    >
      {isSubItem && !isCollapsed && <Box sx={horizotalLineStyles} />}
      {Icon && (
        <ListItemIcon sx={listItemIconStyles}>
          <Icon sx={{ width: 20, height: 20 }} />
        </ListItemIcon>
      )}
      {!isCollapsed && (
        <Box
          sx={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}
        >
          <ListItemText
            primary={title}
            sx={{
              '& .MuiTypography-root': {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            }}
          />
          {tag && (
            <Box
              sx={{
                ml: 1,
                px: 0.75,
                py: 0.25,
                borderRadius: '4px',
                backgroundColor: theme.palette.grey[200],
                color: theme.palette.text.secondary,
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {tag}
            </Box>
          )}
        </Box>
      )}
      {isBadgeVisible && (
        <Box component="span" sx={badgeStyles}>
          {badgeLabel}
        </Box>
      )}
    </ListItemButton>
  );

  return isCollapsed ? (
    <Tooltip
      title={title}
      placement="right"
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -10],
              },
            },
          ],
        },
      }}
    >
      {itemContent}
    </Tooltip>
  ) : (
    itemContent
  );
};

export default memo(SidebarItem);
