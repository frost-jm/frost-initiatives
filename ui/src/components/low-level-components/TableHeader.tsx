import { Box } from '@mui/material';

const TableHeader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Box
        sx={{
          fontFamily: 'Figtree-Bold',
          fontWeight: '700',
          fontSize: '20px',
          lineHeight: '1',
          color: 'var(--input-color)',
        }}
      >
        Initiatives for Voting
      </Box>
      <Box
        sx={{
          backgroundColor: '#E7EEF0',
          padding: '4px 8px',
          borderRadius: '5px',
          fontFamily: 'Figtree-Bold',
          fontWeight: '700',
          fontSize: '14px',
          lineHeight: '1',
          color: 'rgba(29, 36, 79, 0.6)',
        }}
      >
        5
      </Box>
    </Box>
  );
};
export default TableHeader;
