import { Box, Button } from '@mui/material';
import TableHeader from '@/components/low-level-components/Table/TableHeader';
import Form from '@/components/high-level-components/Form/Form';
import Modal from '@/components/low-level-components/Modal/Modal';
import { useMode } from '@/context/DataContext';
import { Link } from 'react-router-dom';

const Home = () => {
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

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	const handleModalClose = () => {
		setModalOpen(false);
		setDepartment([]);
		resetForm();
	};

	return (
		<>
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

			<Modal
				isOpen={modalOpen}
				onClose={handleModalClose}
			>
				<Form />
			</Modal>
			<Button onClick={handleModalOpen}>Open Modal</Button>
			<Box>
				<Link to='/components-library'>Go to Components Library</Link>
			</Box>
		</>
	);
};

export default Home;
