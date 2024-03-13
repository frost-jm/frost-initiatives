import { Box } from '@mui/material';
import TableContent from './TableContent';

const TableContentWTitle = ({ title, children }: any) => {
  return (
    <>
      <Box
        sx={{
          fontFamily: 'Figtree-SemiBold, sans-serif',
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '1',
          color: 'var(--input-color)',
        }}
      >
        {title}
      </Box>
      <Box sx={{ marginTop: '8px' }}>
        <TableContent>{children}</TableContent>
      </Box>
    </>
  );
};
export default TableContentWTitle;
