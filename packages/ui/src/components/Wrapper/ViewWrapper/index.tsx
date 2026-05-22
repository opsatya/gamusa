/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description View Wrapper component
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

// Imports
import { Box, Grid, Typography } from '@mui/material';
import { isHTML } from '@lektus/utils';
import styles from './index.style';

/* Types/Interfaces */

/**
 * Handles field for View Wrapper
 *
 * @interface Field
 * @property {string} label - label text for the field
 * @property {string | number | React.ReactNode} value - value for the field
 * @property {'horizontal' | 'vertical'} [orientation] - orientation of the field
 * @property {number} [gridSize] - grid size for the field
 */
interface Field {
  label: string;
  value: string | number | React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  gridSize?: number | Record<string, number>;
}

/**
 * Handles View Wrapper
 *
 * @interface ViewWrapperProps
 * @property {string} [title] - title for the view wrapper
 * @property {string} [subtitle] - subtitle for the view wrapper
 * @property {Field[]} data - data for the view wrapper
 * @property {any} [containerStyle] - container style for the view wrapper
 */
interface ViewWrapperProps {
  title?: string;
  subtitle?: string;
  data: Field[];
  containerStyle?: any;
}

const ViewWrapper = ({
  title,
  subtitle,
  data = [],
  containerStyle,
}: ViewWrapperProps) => {
  return (
    <Box sx={{ ...styles.container, ...containerStyle }}>
      {/* Title & Subtitle Section - Render only if provided */}
      {(title || subtitle) && (
        <Box sx={styles.headerContainer}>
          {title && <Typography variant="h5">{title}</Typography>}
          {subtitle && (
            <Typography variant="bodyMRegular">{subtitle}</Typography>
          )}
        </Box>
      )}

      {/* Data Fields Grid */}
      <Grid container spacing={3}>
        {data?.map((item, index) => {
          const isVertical = item.orientation === 'vertical';
          const isValueHtml =
            typeof item.value === 'string' && isHTML(item.value);

          return (
            <Grid size={item?.gridSize ?? { xs: 12, md: 6 }} key={index}>
              <Box
                sx={[
                  styles.fieldContainer,
                  isVertical && {
                    flexDirection: 'column',
                  },
                ]}
              >
                {/* Label */}
                <Box sx={isVertical ? undefined : styles.labelContainer}>
                  <Typography
                    variant="bodyMRegular"
                    sx={{
                      fontSize: '0.8125rem',
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    {item?.label}
                  </Typography>
                </Box>

                {/* Value */}
                <Box>
                  {isValueHtml ? (
                    <Box
                      dangerouslySetInnerHTML={{ __html: item.value as string }}
                      sx={styles.htmlContent}
                    />
                  ) : (
                    <Typography
                      variant="bodyMSemibold"
                      sx={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'text.primary',
                        lineHeight: 1.5,
                      }}
                    >
                      {item?.value || '—'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ViewWrapper;
