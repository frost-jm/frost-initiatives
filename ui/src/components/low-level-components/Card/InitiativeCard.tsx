import { Box } from '@mui/material';
import Avatar from '../Avatar/Avatar';
import ProgressBar from '../ProgressBar';
import Buttons, { ButtonType } from '../Button/Buttons';

interface InitiativeData {
	title: string;
	description: string;
	pitcher: {
		firstName: string;
		lastName: string;
	};
	vote: number;
	totalHeads: number;
	action?: () => void;
}

interface InitiativeCardProp {
	data: InitiativeData;
}
const InitiativeCard = ({ data }: InitiativeCardProp) => {
	const { title, description, pitcher, vote, totalHeads } = data;
	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '341px',
				borderRadius: '8px',
				padding: '24px',
				border: '1px solid #E8EEEE',
				background: '#ffffff',
				boxSizing: 'border-box',
			}}
		>
			<Box>
				<Box
					sx={{
						fontFamily: 'Figtree-Bold,sans-serif',
						fontSize: '18px',
						lineHeight: '1',
						color: 'var(--input-color)',
					}}
				>
					{title}
				</Box>
				<Box
					sx={{
						color: 'rgba(29, 36, 79, 0.8)',
						fontFamily: 'Figtree-Regular,sans-serif',
						fontSize: '14px',
						lineHeight: '1.5',
						marginTop: '8px',
					}}
				>
					{description}
				</Box>
				<Box
					sx={{
						marginTop: '12px',
					}}
				>
					<Box
						sx={{
							color: 'rgba(29, 36, 79, 0.4)',
							fontFamily: 'Figtree-Regular,sans-serif',
							fontSize: '12px',
							lineHeight: '1.5',
						}}
					>
						Pitched by:
					</Box>
					<Box marginTop='8px'>
						<Avatar
							label={true}
							type='single'
							data={pitcher}
						/>
					</Box>
					<Box margin='24px 0'>
						<ProgressBar
							count={vote}
							totalHeads={totalHeads}
						/>
					</Box>
					<Box>
						<Buttons
							type={ButtonType.View}
							maxWidth='100%'
							background='#F2F5F7'
							fontSize='14px'
							action={() => console.log('click')}
						>
							View details
						</Buttons>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default InitiativeCard;
