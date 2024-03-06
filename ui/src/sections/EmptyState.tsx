import { Box } from '@mui/material';
import { SubmitButton } from '@/components';

const EmptyState = () => {
  return (
    <Box
      sx={{
        maxWidth: '1040px',
        minHeight: '551px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'var(--input-color)',
      }}
    >
      <img
        src='./public/assets/empty-state-img.png'
        style={{ width: '200px' }}
      />
      <Box
        sx={{
          fontFamily: 'Figtree-Bold, sans-serif',
          fontSize: '18px',
          fontWeight: '700',
          marginTop: '32px',
          lineHeight: '1.2',
        }}
      >
        Crickets? No pending initiatives yet!
      </Box>
      <Box
        sx={{
          fontFamily: 'Figtree-Regular, sans-serif',
          fontSize: '16px',
          fontWeight: '400',
          marginTop: '8px',
          lineHeight: '1.5',
          maxWidth: '40ch',
          textAlign: 'center',
        }}
      >
        Looks like no one has added any new initiatives yet. Come back later or
        suggest one yourself.
      </Box>
      <Box sx={{ marginTop: '24px' }}>
        <SubmitButton text='Submit an initiative' />
      </Box>
    </Box>
  );
};
export default EmptyState;
