import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

// --- Prop Types ---
interface TabSwitchProps {
  value: number;
  handleTabSwitch: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: Array<string>;
  sx?: any;
}

// --- Component Definition ---
const TabSwitch: React.FC<TabSwitchProps> = ({
  value,
  handleTabSwitch,
  tabs,
  sx = {},
}) => {
  return (
    <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleTabSwitch}
        aria-label="tab switch component"
        sx={sx}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#10b981', // Green indicator color
            height: '4px',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              px: 3,
              color: value === index ? '#10b981' : 'text.primary',
              '&.Mui-selected': {
                color: 'primary.main', // Green text color for selected tab
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default TabSwitch;
