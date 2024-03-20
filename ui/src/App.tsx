import { Box } from '@mui/material';

import LogoHeader from './sections/LogoHeader';
import TabsLanding from './sections/TabsLanding';

import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
	const { isAuthenticated, isLoading, user, loginWithRedirect } = useAuth0();

	if (!isAuthenticated && !isLoading) {
		loginWithRedirect();
		return null;
	}
	return (
		<>
			{isAuthenticated && user ? (
				<Box
					sx={{
						width: '100%',
					}}
				>
					<LogoHeader />
					<TabsLanding />
				</Box>
			) : (
				<Box
					width='100vw'
					height='100vh'
					display='flex'
					justifyContent='center'
					alignItems='center'
				>
					Loading...
				</Box>
			)}
		</>
	);
};

export default App;
