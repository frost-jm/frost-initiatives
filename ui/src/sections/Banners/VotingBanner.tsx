import { BannerContent, SubmitButton } from '@/components';
import { Box } from '@mui/material';

import Asset from '../../assets/voting-banner-asset.png';

const VotingBanner = () => {
	const bannerContent = {
		title: 'Got any suggestions for us?',
		description: 'Let us know by pitching your own internal initiative.',
	};
	return (
		<Box
			sx={{
				width: '100%',
				backgroundColor: '#4056C3',
				padding: '24px 24px 24px 176px',
				borderRadius: '4px',
				display: 'flex',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
				alignItems: 'center',
				position: 'relative',
				'@media screen and (max-width:767px)': {
					flexDirection: 'column',
					alignItems: 'flex-start',
				},
				'@media screen and (max-width:600px)': {
					paddingLeft: '24px',
					'.banner-asset': {
						display: 'none',
					},
				},
			}}
		>
			<Box>
				<img
					src={Asset}
					alt='asset'
					className='banner-asset'
					style={{
						position: 'absolute',
						bottom: '0',
						left: '24px',
					}}
				/>
				<BannerContent
					title={bannerContent.title}
					description={bannerContent.description}
				/>
			</Box>
			<Box
				sx={{
					'@media screen and (max-width:767px)': {
						marginTop: '8px',
					},
				}}
			>
				<SubmitButton action={() => console.log('submit initiative')} />
			</Box>
		</Box>
	);
};

export default VotingBanner;
