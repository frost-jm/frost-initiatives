import { Box } from '@mui/material';

const actions = [
	{
		type: 'Edit post',
		icon: './icons/edit-icon.svg',
		onClick: () => {
			console.log('edit');
		},
	},
	{
		type: 'Delete post',
		icon: './icons/delete-icon.svg',
		onClick: () => {
			console.log('delete');
		},
	},
];

const ActionDropdown = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: 'var(--primary-color)', color: 'var(--input-color)', borderRadius: '4px', border: '1px solid #E9EDEE', width: '100%', maxWidth: '185px', boxShadow: '2px 2px 8px 0px rgba(233, 237, 238, 1)' }}>
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
