/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd.
 * All rights reserved.
 * @description Dashboard page unified skeleton loader.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Satya
 * Date Created: 20/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

/* Imports */
import { Grid, Skeleton, Stack, Box } from '@mui/material';
import CardWrapper from '../Wrapper/CardWrapper';
import TableSkeleton from '../Skeleton/TableSkeleton';
// ----------------------------------------------------------------------

/**
 * DashboardSkeleton Props Interface
 */
export interface DashboardSkeletonProps {
  showSummaryCard?: boolean;
  showQuickActions?: boolean;
  showTotalApplication?: boolean;
  showTopRoles?: boolean;
  showTotalHires?: boolean;
  showTable?: boolean;
  tableRows?: number;
}

// ----------------------------------------------------------------------

/**
 * DashboardSkeleton Component
 *
 * Fully configurable dashboard skeleton.
 *
 * @component
 * @param {DashboardSkeletonProps} props - Section visibility controls
 * @returns {React.ReactElement}
 */
const DashboardSkeleton = ({
  showSummaryCard = false,
  showQuickActions = false,
  showTotalApplication = false,
  showTopRoles = false,
  showTotalHires = false,
  showTable = false,
  tableRows = 4,
}: DashboardSkeletonProps): React.ReactElement => {
  return (
    <Stack spacing={3}>
      {/* Dashboard Summary Card Skeleton */}
      {showSummaryCard && (
        <CardWrapper>
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Skeleton variant="text" width={240} height={40} />
              <Skeleton
                variant="rounded"
                width={160}
                height={40}
                sx={{ borderRadius: 1.5 }}
              />
            </Stack>

            <Grid container spacing={3}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <CardWrapper containerStyle={{ border: '1px solid #E2E8F0' }}>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Skeleton variant="circular" width={24} height={24} />
                        <Skeleton variant="text" width="60%" height={24} />
                      </Stack>
                      <Skeleton variant="text" width="40%" height={40} />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-end"
                      >
                        <Skeleton variant="text" width="50%" height={20} />
                        <Skeleton
                          variant="rounded"
                          width={60}
                          height={40}
                          sx={{ borderRadius: 1.5 }}
                        />
                      </Stack>
                    </Stack>
                  </CardWrapper>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CardWrapper>
      )}

      {/* Quick Actions Section */}
      {showQuickActions && (
        <CardWrapper>
          <Stack spacing={3}>
            <Skeleton variant="text" width={160} height={32} />

            <Grid container spacing={3}>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
                  <Stack spacing={2} alignItems="flex-start">
                    <Skeleton variant="circular" width={48} height={48} />
                    <Skeleton variant="text" width="80%" height={28} />
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CardWrapper>
      )}

      {/* Charts Section */}
      {(showTotalApplication || showTopRoles || showTotalHires) && (
        <Grid container spacing={3}>
          {/* Total Application Chart */}
          {showTotalApplication && (
            <Grid size={{ xs: 12, lg: 8 }}>
              <CardWrapper>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Skeleton variant="text" width={200} height={32} />
                    <Skeleton
                      variant="rounded"
                      width={140}
                      height={40}
                      sx={{ borderRadius: 2 }}
                    />
                  </Stack>

                  <Box sx={{ width: '100%', height: 320 }}>
                    <Skeleton
                      variant="rounded"
                      width="100%"
                      height="100%"
                      sx={{ borderRadius: 3 }}
                    />
                  </Box>
                </Stack>
              </CardWrapper>
            </Grid>
          )}

          {/* Top Roles Chart */}
          {showTopRoles && (
            <Grid size={{ xs: 12, lg: 4 }}>
              <CardWrapper>
                <Stack spacing={3} alignItems="center">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ width: '100%' }}
                  >
                    <Skeleton variant="text" width={150} height={32} />
                    <Skeleton variant="rounded" width={120} height={28} />
                  </Stack>

                  <Skeleton variant="circular" width={220} height={220} />

                  <Stack spacing={1.5} sx={{ width: '100%' }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Skeleton variant="text" width="45%" />
                        <Skeleton variant="text" width="20%" />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </CardWrapper>
            </Grid>
          )}

          {/* Total Hires Chart */}
          {showTotalHires && (
            <Grid size={{ xs: 12 }}>
              <CardWrapper>
                <Stack spacing={3}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Skeleton variant="text" width={160} height={32} />
                    <Skeleton
                      variant="rounded"
                      width={130}
                      height={40}
                      sx={{ borderRadius: 2 }}
                    />
                  </Stack>

                  <Box
                    sx={{
                      height: 320,
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: 2,
                    }}
                  >
                    {Array.from({ length: 12 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        variant="rounded"
                        sx={{
                          height: `${40 + Math.random() * 60}%`,
                          borderRadius: 2,
                          flex: 1,
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </CardWrapper>
            </Grid>
          )}
        </Grid>
      )}

      {/* Table Section */}
      {showTable && <TableSkeleton rows={tableRows} />}
    </Stack>
  );
};

export default DashboardSkeleton;
