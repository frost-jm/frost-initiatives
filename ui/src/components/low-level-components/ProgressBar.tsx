import { LinearProgress, Box } from '@mui/material';

interface ProgressBarProps {
	count?: number;
	totalHeads?: number;
}
const ProgressBar = ({ count, totalHeads }: ProgressBarProps) => {
	return (
		<>
			<Box sx={{ width: '100%', position: 'relative' }}>
				<LinearProgress
					variant='determinate'
					value={80}
					sx={{
						background: '#ECF1F5',
						height: '10px',
						borderRadius: '100px',

						span: {
							background: '#55D299',
						},
					}}
				/>
				<Box
					sx={{
						width: '16px',
						height: '1px',
						borderTop: '1px dashed rgba(29, 36, 79, 0.8)',
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%) rotate(90deg)',
					}}
				></Box>
			</Box>
			<Box
				sx={{
					marginTop: '11px',
					fontFamily: 'Figtree-Medium,san-serif',
					fontSize: '10px',
					lineHeight: '1',
					color: 'rgba(29, 36, 79, 0.6)',
				}}
			>
				{count} of {totalHeads} in favor of this initiative
			</Box>
		</>
	);
};

export default ProgressBar;
