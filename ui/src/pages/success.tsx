import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/system';
import { Navigate } from 'react-router-dom';

const Success = () => {
    const { isAuthenticated } = useAuth0();
    console.log('from sucess: ', isAuthenticated);
    return (
      <>
        {
          isAuthenticated ? 
          <Navigate to="/"/>
          :
          <Box 
            width="100vw"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          > 
            Loading...
          </Box>
        }
      </>
    )
};

export default Success;
