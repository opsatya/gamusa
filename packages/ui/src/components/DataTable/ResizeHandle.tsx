/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Single resize handle component for table headers.
 */

import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';

interface ResizeHandleProps {
  onResize: (deltaX: number) => void;
}

const ResizeHandle = ({ onResize }: ResizeHandleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      let lastX = e.clientX;

      const onMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - lastX;
        lastX = moveEvent.clientX;
        onResize(deltaX);
      };

      const onMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    },
    [onResize]
  );

  return (
    <Box
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '6px',
        cursor: 'col-resize',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
        },
      }}
    >
      <Box
        sx={{
          width: '2px',
          height: isHovered || isResizing ? '60%' : '30%',
          backgroundColor: isHovered || isResizing ? '#7c3aed' : '#E5E7EB',
          borderRadius: '2px',
          transition: 'height 0.2s, background-color 0.2s',
        }}
      />
    </Box>
  );
};

export default React.memo(ResizeHandle);
