import { Box } from '@mui/material';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

import { useUser } from './context/userContext';

const App = () => {
	const { validateUser } = useUser();

	return (
		<>
			{validateUser(
				<>
					<Box
						sx={{
							width: '100%',
						}}
					>
						<LogoHeader />
						<TabsLanding />
					</Box>
				</>
			)}
		</>
	);
};

export default App;
