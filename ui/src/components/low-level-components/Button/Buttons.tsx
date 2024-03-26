import { Box, CircularProgress } from '@mui/material';

export enum ButtonType {
	View = 'View',
	Join = 'Join',
	Cancel = 'Cancel',
	Leave = 'Leave',
}

interface ButtonTypeProps {
	type: ButtonType;
	maxWidth?: string;
	fontSize?: string;
	borderRadius?: string;
	background?: string;
	children: React.ReactNode;
	action?: () => void;
	loading?: boolean;
}

const Buttons = ({ type, children, maxWidth, action, background, fontSize, borderRadius, loading }: ButtonTypeProps) => {
	let btnBgColor, btnColor, btnBorder, btnPadding;

	switch (type) {
		case ButtonType.Join:
			btnBgColor = '#576BCD';
			btnColor = 'var(--primary-color)';
			btnPadding = '12px 20px';
			break;
		case ButtonType.Leave:
			btnBgColor = '#EF6060';
			btnColor = 'var(--primary-color)';
			btnPadding = '12px 16px';
			break;
		case ButtonType.Cancel:
			btnBgColor = 'transparent';
			btnColor = '#FC7171';
			btnBorder = '2px solid #FC7171';
			btnPadding = '10px 21px';
			break;
		default:
			btnBgColor = '#ECF1F5';
			btnColor = 'rgba(29, 36, 79, .6)';
			btnPadding = '12px 18px';
			break;
	}

	return (
		<Box
			sx={{
				maxWidth: maxWidth ? maxWidth : '64px',
				width: '100%',
				minWidth: loading ? '94px' : 'unset',
				boxSizing: 'border-box',
				borderRadius: borderRadius ? borderRadius : '4px',
				textAlign: 'center',
				fontFamily: 'Figtree-SemiBold, sans-serif',
				fontWeight: '600',
				fontSize: fontSize ? fontSize : '12px',
				lineHeight: '1',
				cursor: 'pointer',
				color: btnColor,
				backgroundColor: background ? background : btnBgColor,
				border: btnBorder,
				padding: btnPadding,
				opacity: loading ? '0.2' : '1',
			}}
			onClick={action}
		>
			{loading ? (
				<CircularProgress
					size={13}
					sx={{
						color: 'var(--primary-color)',
					}}
				/>
			) : (
				children
			)}
		</Box>
	);
};

export default Buttons;
