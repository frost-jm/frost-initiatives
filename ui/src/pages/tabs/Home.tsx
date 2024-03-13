import { useState } from 'react';
import Modal from '@/components/low-level-components/Modal/Modal';
import { Button } from '@mui/material';
import Form from '@/components/high-level-components/Form/Form';

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
		</>
	);
};

export default Home;
