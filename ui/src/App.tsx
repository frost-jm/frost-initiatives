import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

import { useContext, useState } from 'react';
import { UserContext } from './context/userContext';

const App = () => {
    const { validateUser } = useContext(UserContext);

    return (<>
      {validateUser(<>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <LogoHeader />
          <TabsLanding />
        </Box>
      </>)}
    </>)
};

export default App;
