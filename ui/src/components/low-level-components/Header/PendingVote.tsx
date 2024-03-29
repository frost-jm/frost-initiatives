import { Box } from '@mui/material';
import { Buttons, ButtonType } from '@/components/index';

interface PendingVoteProp {
	type?: 'fixed' | 'block';
}

const PendingVote = ({ type = 'block' }: PendingVoteProp) => {
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: '#0C1335',
				position: type === 'fixed' ? 'fixed' : 'static',
				borderRadius: type === 'fixed' ? 0 : '0 0 12px 12px',
				padding: '20px 24px',
				boxSizing: 'border-box',
				bottom: '0',
				left: '0',
			}}
		>
			<Box
				sx={{
					maxWidth: '980px',
					margin: '0 auto',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					'@media screen and (max-width:767px)': {
						flexDirection: 'column',
						maxWidth: '100%',
						margin: '0',
					},
				}}
			>
				<Box width='100%'>
					<Box
						sx={{
							fontFamily: 'Figtree-SemiBold, sans-serif',
							fontSize: '12px',
							color: 'rgba(255,255,255,0.6)',
							lineHeight: '1',
						}}
					>
						Pending Vote
					</Box>
					<Box
						sx={{
							fontFamily: 'Figtree-Bold, sans-serif',
							fontSize: '20px',
							lineHeight: '1',
							marginTop: '8px',
							color: '#ffffff',
						}}
					>
						Would you want this implemented?
					</Box>
				</Box>
				<Box
					sx={{
						display: 'flex',
						gap: '4px',
						height: 'max-content',
						'@media screen and (max-width:767px)': {
							width: '100%',
							marginTop: '8px',
						},
					}}
				>
					<Buttons
						type={ButtonType.Join}
						action={() => console.log('Join')}
					>
						Yes
					</Buttons>
					<Buttons
						type={ButtonType.Cancel}
						action={() => console.log('No')}
					>
						No
					</Buttons>
				</Box>
			</Box>
		</Box>
	);
};

export default PendingVote;
