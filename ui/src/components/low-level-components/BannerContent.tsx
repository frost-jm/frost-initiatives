import { Box } from '@mui/material';

const BannerContent = () => {
  return (
    <Box
      sx={{
        color: 'var(--primary-color)',
      }}
    >
      <Box
        sx={{
          fontFamily: 'Figtree-Bold, sans-serif',
          fontweight: '700',
          fontSize: '20px',
          lineHeight: '1',
        }}
      >
        Got any suggestions for us?
      </Box>
      <Box
        sx={{
          fontFamily: 'Figtree-Regular, sans-serif',
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '1.5',
          opacity: '0.8',
          marginTop: '8px',
        }}
      >
        Let us know by pitching your own internal initiative.
      </Box>
    </Box>
  );
};
export default BannerContent;
