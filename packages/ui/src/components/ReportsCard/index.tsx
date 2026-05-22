/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Component to display the report card.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 02/15/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';
// import { ReportItem } from '@/services/reportService';

/* Local Imports */
import styles from './index.style';

/**
 * ReportCard Component
 */
interface ReportCardProps {
  report: any;
}

const ReportCard = ({ report }: ReportCardProps): React.ReactElement => {
  const Icon = report.icon;

  return (
    <CardWrapper containerStyle={styles.card}>
      <Stack gap={2}>
        <Box sx={styles.iconWrapper}>
          <Icon />
        </Box>

        <Stack gap={0.5}>
          <Typography variant="h6">{report.title}</Typography>

          {report.description && (
            <Typography variant="bodyMMedium" color="text.secondary">
              {report.description}
            </Typography>
          )}
        </Stack>
      </Stack>
    </CardWrapper>
  );
};

export default ReportCard;
