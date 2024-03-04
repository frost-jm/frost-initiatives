import { Box } from '@mui/material';

const TableLabel = ({ label }: any) => {
  return (
    <Box
      sx={{
        fontFamily: 'Figtree-Bold,san-serif',
        fontWeight: '700',
        fontSize: '12px',
        lineHeight: '1.5',
        color: 'rgba(29, 36, 79, .7)',
      }}
    >
      {label}
    </Box>
  );
};
export default TableLabel;
