/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Reports Skeleton
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
import { Grid, Skeleton, Stack, Box } from '@mui/material';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';

/**
 * Interface for Reports Skeleton Props
 */
interface ReportsSkeletonProps {
  length?: number;
}

/**
 * Reports Skeleton Component
 * @param {number} length - Number of skeleton cards to show
 * @returns {React.ReactElement}
 */
const ReportsSkeleton = ({ length = 7 }: ReportsSkeletonProps) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length }).map((_, index) => (
        <Grid key={index} size={{ xs: 12, md: 6 }}>
          <CardWrapper>
            <Stack gap={2}>
              <Skeleton variant="circular" width={44} height={44} />
              <Stack gap={0.5}>
                <Skeleton variant="text" width="60%" height={28} />
                <Skeleton variant="text" width="80%" height={20} />
              </Stack>
            </Stack>
          </CardWrapper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ReportsSkeleton;
