import { Box } from '@mui/material';
import Avatar from '../Avatar/Avatar';

// to be updated when there is actual data
import dummyData from '../../../testdata.json';

const VoteTooltip = () => {
	return (
		<Box
			sx={{
				padding: '16px',
				boxShadow: '0px 0px 8px 0px rgba(115, 129, 154, 0.1)',
				background: '#ffffff',
				borderRadius: '6px',
				width: '100%',
				maxWidth: '320px',
				boxSizing: 'border-box',
				position: 'relative',
				'.vote-tooltip-text': {
					marginTop: '8px',
					color: 'rgba(29, 36, 79, 0.8)',
					fontFamily: 'Figtree-Medium,sans-serif',
					fontSize: '10px',
					lineHeight: '1',
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					top: '100%',
					left: '8px',
					width: 22,
					height: 11,
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg width='22' height='11' viewBox='0 0 22 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.58 9.18541C12.1929 10.6987 9.80714 10.6987 8.41996 9.18541L1.04907e-06 -1.9233e-06L22 0L13.58 9.18541Z' fill='white'/%3E%3C/svg%3E%0A\")",
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				},
			}}
		>
			<Box>
				<Box
					sx={{
						fontFamily: 'Figtree-SemiBold,sans-serif',
						fontSize: '14px',
						lineHeight: '1',
						color: 'var(--input-color)',
					}}
				>
					Results
				</Box>
				<Box marginTop='12px'>
					<Avatar
						data={dummyData.users.slice(2)}
						type='tooltip'
					/>
					<Box className='vote-tooltip-text'>voted to implement this initiative</Box>
				</Box>
			</Box>
			<Box marginTop='16px'>
				<Avatar
					data={dummyData.users.slice(0, 2)}
					type='tooltip'
				/>
				<Box className='vote-tooltip-text'>have not voted</Box>
			</Box>
		</Box>
	);
};

export default VoteTooltip;
