import { useMode } from '@/context/DataContext';
import { useMutation } from '@apollo/client';
import { Box } from '@mui/material';
import { DELETE_INITIATIVE } from '@/graphql/queries';

const ActionDropdown = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
	const { setMode, selectedInitiative, setSelectedInitiative, setModalOpen, setActionNotif, setActionMessage } = useMode();
	const [deletePost] = useMutation(DELETE_INITIATIVE);

	const actions = [
		{
			type: 'Edit post',
			icon: './icons/edit-icon.svg',
			onClick: () => {
				setMode('edit');
				setSelectedInitiative(null);
				setIsOpen(false);
			},
		},
		{
			type: 'Delete post',
			icon: './icons/delete-icon.svg',
			onClick: () => {
				handleDelete();
			},
		},
	];

	const handleDelete = async () => {
		const { data } = await deletePost({
			variables: { deleteInitiativeId: selectedInitiative?.id },
		});

		try {
			if (data.deleteInitiative && data.deleteInitiative.success === true) {
				setMode('');
				setActionMessage(data.deleteInitiative.message);
				setModalOpen(false);
				setActionNotif(true);
				setTimeout(() => {
					setModalOpen(false);
				}, 1000);
			}
		} catch (error) {
			console.error('Error', error);
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'var(--primary-color)', color: 'var(--input-color)', borderRadius: '4px', border: '1px solid #E9EDEE', width: '100%', maxWidth: '185px', boxShadow: '2px 2px 8px 0px rgba(29, 36, 79, 0.04)' }}>
			{actions.map((action, index) => (
				<Box
					key={index}
					onClick={action.onClick}
					sx={{
						fontFamily: 'Figtree-Medium, sans-serif',
						fontSize: '16px',
						fontWeight: '500',
						lineHeight: '24px',
						padding: '0',
						width: '100%',
						display: 'flex',
						gap: '10px',
						justifyContent: 'space-between',
						textTransform: 'unset',
						cursor: 'pointer',
						'&:hover': {
							background: 'transparent',
						},
					}}
				>
					<Box sx={{ width: '100%' }}>{action.type}</Box>
					<img
						src={action.icon}
						alt='Edit Icon'
						loading='lazy'
						width='24px'
						height='24px'
					/>
				</Box>
			))}
		</Box>
	);
};

export default ActionDropdown;
