import { Box, Button } from '@mui/material';
import TableHeader from '@/components/low-level-components/Table/TableHeader';
<<<<<<< HEAD
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
			<Link to='/components-library'>Go to Components Library</Link>
			<Modal
				isOpen={modalOpen}
				onClose={handleModalClose}
			>
				<Form />
			</Modal>
			<Button onClick={handleModalOpen}>Open Modal</Button>
		</>
	);
=======
import LandingBanner from '@/sections/Banners/LandingBanner';
import PitchGroup from '@/components/low-level-components/Card/PitchGroup';
import InitiativesTable from '@/components/low-level-components/Table/InitiativesTable';

const Home = () => {
  return (
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
  );
>>>>>>> 22ce55d9becf1499d331563c0809bec2699cd78a
};

export default Home;
