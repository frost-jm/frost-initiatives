import { Box } from '@mui/material';
import { Logo } from '@/components';

const LogoHeader = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#0C1335',
        width: '100%',
        padding: '16px 0s',
      }}
    >
      <Box
        sx={{
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '24px 0 24px 24px',
        }}
      >
        <Logo />
      </Box>
    </Box>
  );
};
export default LogoHeader;
