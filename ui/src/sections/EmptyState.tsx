import { Box } from '@mui/material';
import { SubmitButton } from '@/components';
import Form from '@/components/high-level-components/Form/Form';
import Modal from '@/components/low-level-components/Modal/Modal';
import { useMode } from '@/context/DataContext';

const EmptyState = () => {
	const { modalOpen, setModalOpen, setDepartment, setFormData } = useMode();

	const resetForm = () => {
		setFormData({
			postId: '',
			title: '',
			post: '',
			reason: '',
			department: [],
			members: '',
			status: '',
			created_by: '',
			updated_at: '',
		});
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setDepartment([]);
		resetForm();
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
						action={() => setModalOpen(true)}
					/>
				</Box>
			</Box>
			<Modal
				isOpen={modalOpen}
				onClose={handleModalClose}
			>
				<Form />
			</Modal>
		</>
	);
};
export default EmptyState;
