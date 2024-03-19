
import { useAuth0 } from '@auth0/auth0-react';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';


const Authorize = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();

    useEffect(() => {
        (async function login() {
          if (!isLoading && !user) {
            await loginWithRedirect();
          }
        })();
      }, [isLoading]);

    return(<> {
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
      }</>)
};

export default Authorize;
