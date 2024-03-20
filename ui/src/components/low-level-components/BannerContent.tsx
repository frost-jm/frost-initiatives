import { Box } from '@mui/material';

const BannerContent = ({ title, description }: { title: string; description: string }) => {
	return (
		<Box
			sx={{
				color: 'var(--primary-color)',
			}}
		>
			<Box
				sx={{
					fontFamily: 'Figtree-Bold, sans-serif',
					fontWeight: '700',
					fontSize: '20px',
					lineHeight: '1',
				}}
			>
				{title}
			</Box>
			<Box
				sx={{
					fontFamily: 'Figtree-Regular, sans-serif',
					fontWeight: '400',
					fontSize: '14px',
					lineHeight: '1.5',
					opacity: '0.8',
					marginTop: '8px',
				}}
			>
				{description}
			</Box>
		</Box>
	);
};
export default BannerContent;
