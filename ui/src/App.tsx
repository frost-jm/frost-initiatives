import { Box } from '@mui/material';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const App = () => {
    const { isAuthenticated, logout, user } = useAuth0();
    console.log("isAuthenticated: ", isAuthenticated)
    return (
      <>
        {
          isAuthenticated && user ? 
          <Box
            sx={{
              width: '100%',
            }}
          >
            <LogoHeader />
            <TabsLanding />
            <button onClick={() => logout()}>Logout</button>
          </Box> 
          :
          <><Navigate to="/authorize"/></>
        }
      </>
    )
};

export default App;
