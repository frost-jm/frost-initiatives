import { Box } from '@mui/material';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const App = () => {
    const { isAuthenticated, user } = useAuth0();

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
          </Box> 
          :
          <><Navigate to="/authorize"/></>
        }
      </>
    )
};

export default App;
