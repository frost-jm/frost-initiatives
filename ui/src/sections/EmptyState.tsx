import { Box } from '@mui/material';
import { SubmitButton } from '@/components';
import { useMode } from '@/context/DataContext';

const EmptyState = () => {
	const { setModalOpen, setMode } = useMode();

	const handleModalOpen = () => {
		setModalOpen(true);
		setMode('create');
	};

	return (
		<>
			<Box
				sx={{
					minHeight: '551px',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					color: 'var(--input-color)',
					padding: '0 24px',
					textAlign: 'center',
				}}
			>
				<img
					src='./assets/empty-state-img.png'
					style={{ width: '200px' }}
				/>
				<Box
					sx={{
						fontFamily: 'Figtree-Bold, sans-serif',
						fontSize: '18px',
						fontWeight: '700',
						marginTop: '32px',
						lineHeight: '1.2',
					}}
				>
					Crickets? No pending initiatives yet!
				</Box>
				<Box
					sx={{
						fontFamily: 'Figtree-Regular, sans-serif',
						fontSize: '16px',
						fontWeight: '400',
						marginTop: '8px',
						lineHeight: '1.5',
						maxWidth: '40ch',
					}}
				>
					Looks like no one has added any new initiatives yet. Come back later or suggest one yourself.
				</Box>
				<Box sx={{ marginTop: '24px' }}>
					<SubmitButton
						text='Submit an initiative'
						action={handleModalOpen}
					/>
				</Box>
			</Box>
		</>
	);
};
export default EmptyState;
