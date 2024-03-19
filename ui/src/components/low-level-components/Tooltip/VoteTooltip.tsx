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
				'.vote-tooltip-text': {
					marginTop: '8px',
					color: 'rgba(29, 36, 79, 0.8)',
					fontFamily: 'Figtree-Medium,sans-serif',
					fontSize: '10px',
					lineHeight: '1',
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
