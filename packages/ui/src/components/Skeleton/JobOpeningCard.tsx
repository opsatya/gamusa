/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Job Openings listing skeleton.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 19/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { Skeleton, Stack } from '@mui/material';

/* Relative Imports */
import CardWrapper from '../Wrapper/CardWrapper';

/**
 * Interface for JobOpeningsSkeleton Props
 */
interface JobOpeningsSkeletonProps {
  rows?: number;
}

/**
 * JobOpeningsSkeleton Component
 *
 * Mimics:
 * - Department chip + status chip
 * - Title
 * - Location + Job type info row
 * - Salary range + openings count footer
 *
 * @param {number} rows - Number of cards to render
 * @returns {React.ReactElement}
 */
const JobOpeningsSkeleton = ({ rows = 6 }: JobOpeningsSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <CardWrapper key={index} padding={2}>
          <Stack spacing={2.5}>
            {/* Header: Department chip + Status chip */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Skeleton
                variant="rounded"
                width={90}
                height={28}
                sx={{ borderRadius: '6px' }}
              />
              <Skeleton
                variant="rounded"
                width={54}
                height={24}
                sx={{ borderRadius: '6px' }}
              />
            </Stack>

            {/* Title */}
            <Skeleton variant="text" width="70%" height={28} />

            {/* Info Row: Location + Job Type */}
            <Stack direction="row" alignItems="center" spacing={2.5}>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Skeleton variant="circular" width={18} height={18} />
                <Skeleton variant="text" width={70} height={20} />
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.75}>
                <Skeleton variant="circular" width={18} height={18} />
                <Skeleton variant="text" width={70} height={20} />
              </Stack>
            </Stack>
          </Stack>
        </CardWrapper>
      ))}
    </>
  );
};

export default JobOpeningsSkeleton;
