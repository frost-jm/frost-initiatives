import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import TableHeader from '@/components/low-level-components/Table/TableHeader';
import Form from '@/components/high-level-components/Form/Form';
import Modal from '@/components/low-level-components/Modal/Modal';

const Home = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const handleModalOpen = () => {
		setModalOpen(true);
	};

	return (
		<>
			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
			>
				<Form />
			</Modal>
			<Button onClick={handleModalOpen}>Open Modal</Button>

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
		</>
	);
};

export default Home;
