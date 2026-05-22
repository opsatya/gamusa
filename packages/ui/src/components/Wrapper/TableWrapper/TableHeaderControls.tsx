/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create table wrapper component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import { memo } from 'react';
import {
  Grid,
  MenuItem,
  Stack,
  Typography,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
  Box,
} from '@mui/material';
import { SearchIcon } from '@lektus/ui';

/* Relative Imports */
import { SelectInput, TextInput } from '../../InputFields';

/* Local Imports */
import type { TableHeaderLayout, TableHeaderControls, TableHeaderRow } from '.';

interface TableHeaderControlsProps {
  layout: TableHeaderLayout;
  controls?: TableHeaderControls;
}

const TableHeaderControls = ({
  layout,
  controls,
}: TableHeaderControlsProps) => {
  /**
   * @description Function to render a control based on its type
   * @param key The key of the control
   * @returns The rendered control
   */
  const renderControl = (key: string) => {
    const control = controls?.[key];
    if (!control) {
      return null;
    }
    switch (control.type) {
      case 'title':
        return <Typography variant="h5">{control?.text}</Typography>;
      case 'search':
        return (
          <TextInput
            fullWidth
            name={key}
            size={control.size ?? 'small'}
            placeholder={control.placeholder ?? 'Search'}
            onChange={(e) => control.onChange?.(e.target.value)}
            value={control.value}
            endAdornment={
              <InputAdornment position="end">
                {control.icon || (
                  <SearchIcon
                    sx={{ fontSize: '0.9rem', color: 'text.disabled' }}
                  />
                )}
              </InputAdornment>
            }
          />
        );
      case 'dropdown':
        return (
          <SelectInput
            name={key}
            value={control.value}
            onChange={(e) => control.onChange?.(e.target.value as string)}
            size={control.size ?? 'small'}
            variant={control.variant ?? 'outlined'}
          >
            {control.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </SelectInput>
        );
      case 'toggle':
        return (
          <ToggleButtonGroup
            fullWidth
            value={control.value}
            exclusive
            onChange={(_e, val) => val && control.onChange?.(val)}
            size={control.size ?? 'small'}
            color={control.color ?? 'primary'}
          >
            {control.options?.map((option) => (
              <ToggleButton
                key={option.value}
                value={option.value}
                aria-label={option.label}
              >
                {option.icon && (
                  <Box component="span" sx={{ mr: 1, display: 'flex' }}>
                    {option.icon}
                  </Box>
                )}
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      case 'custom':
        return control.component;
    }
  };

  const renderRow = (row: TableHeaderRow, index: number) => {
    return (
      <Grid
        key={index}
        container
        rowSpacing={2}
        columnSpacing={3}
        alignItems="center"
      >
        {/* LEFT SIDE (flexible) */}
        <Grid size={row.leftSize ?? { xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            {row.left?.map((key) => (
              <Grid key={key} size={controls?.[key]?.grid ?? 'auto'}>
                {renderControl(key)}
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* RIGHT SIDE (content-sized, aligned right) — only render when there are right controls */}
        {row.right && row.right.length > 0 && (
          <Grid size={row.rightSize ?? { xs: 12, md: 6 }}>
            <Grid container spacing={2} justifyContent="flex-end">
              {row.right.map((key) => (
                <Grid key={key} size={controls?.[key]?.grid ?? 'auto'}>
                  {renderControl(key)}
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <Stack spacing={3} mb={3}>
      {layout.rows?.map((row, index) => renderRow(row, index))}
    </Stack>
  );
};

export default memo(TableHeaderControls);
