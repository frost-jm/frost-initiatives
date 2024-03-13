import { Box } from '@mui/material';
import React from 'react';

interface TableContentProp {
  children: React.ReactNode;
}
const TableContent = ({ children }: TableContentProp) => {
  return (
    <>
      <Box
        sx={{
          fontFamily: 'Figtree-Medium,san-serif',
          fontWeight: '500',
          fontSize: '12px',
          lineHeight: '1.5',
          color: 'rgba(29, 36, 79, .8)',
          maxWidth: '24ch',
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default TableContent;
