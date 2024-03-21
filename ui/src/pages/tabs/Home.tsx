import { Box } from '@mui/material';
import TableHeader from '@/components/low-level-components/Table/TableHeader';

const Home = () => {
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Box sx={{ width: '100%' }}>
					<TableHeader text='Initiatives for Voting' />
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
		</Box>
	);
};

export default Home;
