import { useMode } from '@/context/DataContext';
import { useMutation } from '@apollo/client';
import { Box } from '@mui/material';
import { DELETE_INITIATIVE, DELETE_COMMENT } from '@/graphql/queries';

interface CommentData {
	id: string;
	author: number | string;
	comment: string;
	initiativeID: string;
}
interface ActionDropdownProps {
	setIsOpen: (isOpen: boolean) => void;
	type: string;
	commentData?: CommentData;
	onEdit?: () => void;
}

const ActionDropdown = ({ setIsOpen, type, commentData, onEdit }: ActionDropdownProps) => {
	const { setMode, selectedInitiative, setSelectedInitiative, setModalOpen, setActionNotif, setActionMessage } = useMode();
	const [deletePost] = useMutation(DELETE_INITIATIVE);
	const [deleteComment] = useMutation(DELETE_COMMENT);

	const handleEditClick = () => {
		if (type === 'modal') {
			setMode('edit');
			setSelectedInitiative(null);
		} else {
			onEdit?.();
		}
		setIsOpen(false);
	};

	const handleDeleteClick = () => {
		type === 'modal' ? handleDelete() : handleRemoveComment();
	};

	const baseActions = [
		{
			type: 'Edit',
			icon: './icons/edit-icon.svg',
			onClick: handleEditClick,
		},
		{
			type: 'Delete',
			icon: './icons/delete-icon.svg',
			onClick: handleDeleteClick,
		},
	];

	const actions = type === 'comment' ? baseActions.map((action) => ({ ...action, type: `${action.type} comment` })) : baseActions.map((action) => ({ ...action, type: `${action.type} post` }));

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

	const handleRemoveComment = async () => {
		const { data } = await deleteComment({
			variables: { commentId: commentData?.id },
		});

		try {
			if (data.removeComment && data.removeComment.success === true) {
				setIsOpen(false);
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
