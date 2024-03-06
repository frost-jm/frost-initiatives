import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

const App = () => {
  return (
    <>
      <h1>Hello World!</h1>
      <Link to='/components-library'>Go to Components Library</Link>

      <Box
        sx={{
          width: '100%',
        }}
      >
        <LogoHeader />
        <TabsLanding />
      </Box>
    </>
  );
};

export default App;
