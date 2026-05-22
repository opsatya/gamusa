/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Accordian component.
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
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/* Local Imports */
import styles from './index.style';
import React from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to Accordian component for showing the data.
 *
 * @interface AccordianProps
 * @property {boolean} defaultExpanded - paging for the data of table
 * @property {string} title - title for the accordian
 * @property {string} workingTime - show results for the data of table
 * @property {string} idealTime - show rows per page for the data of table
 * @property {node} children - loading for the data to load
 */

export interface AccordianProps {
  defaultExpanded: boolean;
  title: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  expandIconPosition?: 'start' | 'end';
}

// ----------------------------------------------------------------------

/**
 * Component to create the Accordian.
 *
 * @component
 * @returns {React.ReactElement}
 */
const Accordian = ({
  defaultExpanded,
  expanded,
  onChange,
  title,
  icon: Icon,
  children,
  sx,
  expandIconPosition = 'end',
}: AccordianProps): React.ReactElement => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      expanded={expanded}
      onChange={onChange}
      sx={{ ...styles.accordianRootContainer, ...sx }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          ...styles.accordianSummary,
          ...(expandIconPosition === 'start' && {
            '& .MuiAccordionSummary-expandIconWrapper': {
              order: -1,
              marginLeft: 0,
              marginRight: '8px',
            },
          }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Typography variant="h5">{title}</Typography>
          {Icon && (
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {Icon}
            </Box>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default Accordian;
