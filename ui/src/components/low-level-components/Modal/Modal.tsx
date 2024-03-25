import { useMode } from '@/context/DataContext';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ActionDropdown } from '@/components/index';
import { useState, useRef, useEffect } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const { mode } = useMode();
	const popupRef = useRef<HTMLDivElement>(null);

	const [popupOpen, setPopupOpen] = useState<boolean>(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				setPopupOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			sx={{
				'.MuiModal-backdrop': {
					background: '#EFF4F7',
				},
				'.MuiDialog-scrollPaper': {
					alignItems: 'flex-start',
					paddingTop: '40px',
				},
				'.MuiDialog-paperFullWidth': {
					boxShadow: 'none',
				},
				'.MuiDialog-paper': {
					width: '100%',
					maxWidth: '980px',
					borderRadius: '12px',
					boxShadow: 'none',
					margin: '0 auto',
				},
				'.MuiDialogContent-root': {
					padding: mode === 'view' ? '0 0 40px' : '0 0 24px',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
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
						gap: '4px',
					}}
				>
					<Box
						position='relative'
						height='24px'
					>
						<img
							src='./icons/kebab.svg'
							alt='kebab'
							onClick={() => setPopupOpen(true)}
						/>
						{popupOpen && (
							<Box
								ref={popupRef}
								sx={{
									position: 'absolute',
									zIndex: '3',
									width: 'max-content',
									right: '44px',
									top: '29px',
								}}
							>
								<ActionDropdown />
							</Box>
						)}
					</Box>

					<img
						src='./icons/light-close-icon.svg'
						alt='close-icon'
						onClick={onClose}
					/>
				</Box>
			</DialogTitle>
			<DialogContent className='modal-content'>{children}</DialogContent>
		</Dialog>
	);
};

export default Modal;
