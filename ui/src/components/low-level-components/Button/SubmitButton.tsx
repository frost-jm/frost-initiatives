import { Box } from '@mui/material';

interface SubmitButtonProps {
	backgroundColor?: string;
	color?: string;
	textAlign?: string;
	text?: string;
	action: () => void;
	width?: string;
	padding?: string;
	borderRadius?: string;
	lineHeight?: string;
}

const SubmitButton = ({ text = 'Submit an initiative' }: SubmitButtonProps) => {
	return (
		<Box
			sx={{
				backgroundColor: 'var(--secondary-color)',
				color: 'var(--primary-color)',
				padding: '12px 20px',
				textAlign: 'center',
				borderRadius: '63px',
				width: 'max-content',
				cursor: 'pointer',
				fontFamily: 'Figtree-SemiBold, sans-serif',
				fontWeight: '600',
				fontSize: '14px',
				lineHeight: '1',
			}}
		>
			{text}
		</Box>
	);
};
export default SubmitButton;
