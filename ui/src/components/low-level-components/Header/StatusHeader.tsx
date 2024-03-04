import { Box } from '@mui/material';

enum Status {
	Done = 'Done',
	InProgress = 'In Progress',
	ForImplementation = 'For Implementation',
	Archived = 'Archived',
	Pending = 'Pending',
}

interface ModalHeaderProps {
	status: Status;
}

const StatusHeader = ({ status }: ModalHeaderProps) => {
	let headerText, headerColor;

	switch (status) {
		case Status.Done:
			headerText = 'Done';
			headerColor = '#4DC78F';
			break;
		case Status.InProgress:
			headerText = 'In Progress';
			headerColor = '#36B9D6';
			break;
		case Status.ForImplementation:
			headerText = 'For Implementation';
			headerColor = '#F69D4A';
			break;
		case Status.Archived:
			headerText = 'Archived';
			headerColor = '#CFD5DA';
			break;
		default:
			headerText = 'Pending';
			headerColor = '#576BCD';
			break;
	}

	return (
		<Box
			sx={{
				padding: '6px 12px',
				background: headerColor,
				color: '#ffffff',
				borderRadius: '12px 12px 0 0',

				fontFamily: 'Figtree-Bold,sans-serif',
				fontSize: '10px',
				lineHeight: '10px',
				letterSpacing: '0.6px',
				textTransform: 'uppercase',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				img: {
					cursor: 'pointer',
				},
			}}
		>
			{headerText}
			<img
				src='./icons/close-icon.svg'
				alt='close-icon'
				onClick={() => console.log('close')}
			/>
		</Box>
	);
};

export default StatusHeader;
