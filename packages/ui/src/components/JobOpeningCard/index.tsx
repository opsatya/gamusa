/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Job Opening Card component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 16/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  IconButton,
  Chip,
  Menu,
  alpha,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';

/* Local Imports */
import styles from './index.style';
import {
  DeleteOutline,
  Edit,
  VisibilityOutlined,
  OpenInNewOutlined,
} from '@mui/icons-material';

// ----------------------------------------------------------------------

/* Types/Interfaces */

/**
 * Interface for JobOpeningCard props
 *
 * @interface JobOpeningCardProps
 * @property {any} job - Job data object
 * @property {() => void} [onClick] - Card click handler
 * @property {() => void} [onEdit] - Edit action handler
 * @property {() => void} [onDelete] - Delete action handler
 * @property {() => void} [onToggleStatus] - Toggle active/inactive handler
 */
interface JobOpeningCardProps {
  job: any;
  canManage: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onToggleStatus?: () => void;
  onViewPortal?: () => void;
}

const JobOpeningCard = ({
  job,
  onClick,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewPortal,
  canManage = false,
}: JobOpeningCardProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (
    action: 'view' | 'edit' | 'delete' | 'toggleStatus' | 'viewPortal'
  ) => {
    handleMenuClose();
    if (action === 'view') onClick?.();
    if (action === 'edit') onEdit?.();
    if (action === 'delete') onDelete?.();
    if (action === 'toggleStatus') onToggleStatus?.();
    if (action === 'viewPortal') onViewPortal?.();
  };

  return (
    <CardWrapper containerStyle={styles.root(theme)}>
      <Box onClick={onClick}>
        {/* Title + Menu */}
        <Box sx={styles.cardHeader}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              letterSpacing: '-0.015em',
              lineHeight: 1.35,
              flex: 1,
              mr: 1,
            }}
          >
            {job.title}
          </Typography>
          {(canManage ||
            onEdit ||
            onViewPortal ||
            onToggleStatus ||
            onDelete) && (
            <Box sx={styles.actionSection}>
              <IconButton sx={styles.moreButton} onClick={handleMenuOpen}>
                <MoreVertIcon fontSize="small" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={(e) => e.stopPropagation()}
                slotProps={{ list: { 'aria-labelledby': 'basic-button' } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={styles.menu}
              >
                {onEdit && (
                  <MenuItem
                    onClick={() => handleMenuAction('edit')}
                    sx={styles.menuItem}
                  >
                    <Edit sx={styles.editIcon} />
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      Edit Job
                    </Typography>
                  </MenuItem>
                )}
                {onViewPortal && (
                  <MenuItem
                    onClick={() => handleMenuAction('viewPortal')}
                    sx={styles.menuItem}
                  >
                    <Box sx={styles.editIconBox}>
                      <OpenInNewOutlined fontSize="small" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      View on Portal
                    </Typography>
                  </MenuItem>
                )}
                {onToggleStatus && (
                  <MenuItem
                    onClick={() => handleMenuAction('toggleStatus')}
                    sx={styles.menuItem}
                  >
                    <Box sx={styles.editIconBox}>
                      <VisibilityOutlined fontSize="small" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      {job.isActive ? 'Make Inactive' : 'Make Active'}
                    </Typography>
                  </MenuItem>
                )}
                {onDelete && (
                  <MenuItem
                    onClick={() => handleMenuAction('delete')}
                    sx={styles.menuItemDelete}
                  >
                    <DeleteOutline fontSize="small" />
                    <Typography sx={{ fontSize: '0.8125rem', fontWeight: 500 }}>
                      Delete
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Box>

        {/* Department chip + Status chip */}
        <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
          {job?.department?.name && (
            <Chip
              label={job.department.name}
              sx={styles.departmentChip}
              size="small"
            />
          )}
          <Chip
            size="small"
            label={job.isActive ? 'Active' : 'Inactive'}
            sx={{
              backgroundColor: alpha(
                job.isActive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
                0.12
              ),
              fontWeight: 700,
              '& .MuiChip-label': {
                color: job.isActive
                  ? theme.palette.success.main
                  : theme.palette.error.main,
              },
            }}
          />
        </Box>

        {/* Location + Job Type */}
        <Box sx={styles.infoRow}>
          {job?.location && (
            <Box sx={styles.infoItem}>
              <LocationOnOutlined />
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                }}
              >
                {job.location}
              </Typography>
            </Box>
          )}
          {job?.jobType && (
            <Box sx={styles.infoItem}>
              <AccessTimeOutlined />
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                }}
              >
                {job.jobType}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </CardWrapper>
  );
};

export default JobOpeningCard;
