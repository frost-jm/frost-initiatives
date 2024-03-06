import { BannerContent } from '@/components';
import { Box } from '@mui/material';

import Asset from '../../assets/8bit-cup.png';

const LandingBannerr = () => {
	const bannerContent = {
		title: 'You’ve been the top submitter of initiatives in the last 30 days! ',
		description: 'Keep up the great work! You’ve been contributing greatly to Frost.',
	};
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: '#4056C3',
				padding: '20px 24px',
				borderRadius: '4px',
				display: 'flex',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
				alignItems: 'center',
				position: 'relative',
				'@media screen and (max-width:767px)': {},
				'@media screen and (max-width:600px)': {
					flexDirection: 'column',
					alignItems: 'flex-start',
					'.banner-asset': {
						display: 'none',
					},
				},
			}}
		>
			<BannerContent
				title={bannerContent.title}
				description={bannerContent.description}
			/>
			<img
				src={Asset}
				alt='asset'
				className='banner-asset'
				style={{
					height: '80px',
					width: '96px',
				}}
			/>
		</Box>
	);
};

export default LandingBannerr;
