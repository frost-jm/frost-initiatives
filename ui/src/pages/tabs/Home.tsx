import { Box } from '@mui/material';
import TableHeader from '@/components/low-level-components/Table/TableHeader';

import { Link } from 'react-router-dom';
import LandingBanner from '@/sections/Banners/LandingBanner';
import { InitiativesTable, PitchGroup } from '@/components';

const Home = () => {
	return (
		<>
			<Box sx={{ padding: '12px 0 80px 0' }}>
				<LandingBanner />
				<Box sx={{ padding: '24px 0 16px 24px' }}>
					<TableHeader text='Top 3 Initiatives' />
				</Box>
				<PitchGroup />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '48px 24px 16px',
					}}
				>
					<Box sx={{ width: '100%' }}>
						<TableHeader text='Other Initiatives' />
					</Box>

					<Box
						sx={{
							display: 'flex',
							gap: '4px',
							width: '100%',
							justifyContent: 'flex-end',
						}}
					>
						<Box
							sx={{
								color: '#576BCD',
								fontFamily: 'Figtree-SemiBold, sans-serif',
								fontWeight: '600',
								fontSize: '12px',
								lineHeight: '1',
								cursor: 'pointer',
							}}
						>
							Show all initiatives
						</Box>
					</Box>
				</Box>
				<InitiativesTable />
			</Box>

			<Box>
				<Link to='/components-library'>Go to Components Library</Link>
			</Box>
		</>
	);
};

export default Home;
