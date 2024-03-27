import { Box } from '@mui/material';

interface ExpandButtonProps {
	expanded: boolean;
	handleToggle: () => void;
}

const ExpandButton = ({ expanded, handleToggle }: ExpandButtonProps) => {
	return (
		<Box
			sx={{
				opacity: '0.6',
				display: 'flex',
				alignItems: 'center',
				padding: '5px',
				border: '1px solid rgba(29, 36, 79, 0.2)',
				borderRadius: '4px',
				width: 'max-content',
				gap: '6px',
				background: expanded ? 'transparent' : 'rgba(119, 124, 149, 1)',
				cursor: 'pointer',
				userSelect: 'none',
				transition: 'background 0.2s ease-in-out',
			}}
			onClick={handleToggle}
		>
			<Box
				sx={{
					fontFamily: 'Figtree-Bold,sans-serif',
					fontWeight: '700',
					fontSize: '10px',
					lineHeight: '1',
					color: expanded ? 'rgba(29, 36, 79, 0.8)' : 'rgba(255,255,255,0.8)',
				}}
			>
				{expanded ? 'Expand' : 'Collapse'}
			</Box>
			<Box
				sx={{
					display: 'flex',
					transform: !expanded ? 'rotate(180deg)' : 'none',
					'svg path': { fill: expanded ? '#1d244f' : '#ffffff' },
				}}
			>
				<svg
					width='6'
					height='3'
					viewBox='0 0 6 3'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M0 0L3 3L6 0H0Z'
						fill='#1D244F'
					/>
				</svg>
			</Box>
		</Box>
	);
};

export default ExpandButton;
