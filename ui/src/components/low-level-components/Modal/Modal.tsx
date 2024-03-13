import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			fullWidth
			sx={{
				'.MuiDialog-paperFullWidth': {
					boxShadow: 'none',
				},
			}}
		>
			<DialogTitle
				sx={{
					padding: '12px 12px 0 0',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						cursor: 'pointer',
					}}
					onClick={() => console.log('close')}
				>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M13.46 12L19 17.54V19H17.54L12 13.46L6.46 19H5V17.54L10.54 12L5 6.46V5H6.46L12 10.54L17.54 5H19V6.46L13.46 12Z'
							fill='#A5A7B9'
						/>
					</svg>
				</Box>
			</DialogTitle>
			<DialogContent className='modal-content'>{children}</DialogContent>
		</Dialog>
	);
};

export default Modal;
