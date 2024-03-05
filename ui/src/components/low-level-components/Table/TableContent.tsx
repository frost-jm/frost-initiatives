import { Box } from '@mui/material';

const TableContent = ({ content }: any) => {
  return (
    <>
      <Box
        sx={{
          fontFamily: 'Figtree-Regular,san-serif',
          fontWeight: '500',
          fontSize: '12px',
          lineHeight: '1.5',
          color: 'rgba(29, 36, 79, .8)',
        }}
      >
        {content}
      </Box>
    </>
  );
};
export default TableContent;
