import { Box, Snackbar } from '@mui/material';
import { Tabs, Modal, Form } from '@/components';
import { Home, Archived, ForImplementation, Implemented, InProgress, Voting } from '@/pages/tabs';
import { useMode } from '@/context/DataContext';

const tabsData = [
	{ label: 'Home', count: 0, page: Home },
	{ label: 'For Voting', count: 5, page: Voting },
	{ label: 'For Implementation', count: 0, page: ForImplementation },
	{ label: 'In Progress', count: 1, page: InProgress },
	{ label: 'Implemented', count: 2, page: Implemented },
	{ label: 'Archived', count: 4, page: Archived },
];

const TabsLanding = () => {
	const { modalOpen, setModalOpen, setSelectedInitiative, setMode, resetForm, actionNotif, setActionNotif, actionMessage } = useMode();

	const handleModalClose = () => {
		setMode('');
		setModalOpen(false);
		setSelectedInitiative(null);
		resetForm();
	};

	return (
		<>
			<Box overflow='hidden'>
				<Tabs data={tabsData} />
			</Box>
			<Modal
				isOpen={modalOpen}
				onClose={() => handleModalClose()}
			>
				<Form />
			</Modal>
			<Snackbar
				open={actionNotif}
				onClose={() => setActionNotif(false)}
				autoHideDuration={2000}
				message={actionMessage}
			/>
		</>
	);
};

export default TabsLanding;
