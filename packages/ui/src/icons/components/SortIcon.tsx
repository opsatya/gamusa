import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const SortIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 14 14">
      <path
        d="M6.46055 2.32033C6.75848 2.02669 7.24152 2.02669 7.53945 2.32033L10.275 5.01651C10.7556 5.49019 10.4152 6.3001 9.73558 6.3001H4.26442C3.58476 6.3001 3.24438 5.49019 3.72498 5.01651L6.46055 2.32033Z"
        fill="currentColor"
      />
      <path
        d="M6.46055 11.6799C6.75848 11.9735 7.24152 11.9735 7.53945 11.6799L10.275 8.98369C10.7556 8.51001 10.4152 7.7001 9.73558 7.7001H4.26442C3.58476 7.7001 3.24438 8.51001 3.72498 8.98369L6.46055 11.6799Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};
