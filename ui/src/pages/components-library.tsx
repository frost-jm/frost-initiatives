import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Sample, Logo, Button, Input, StatusDropdown } from '@/components/index';

// Add the component here
const components = [
	{ name: 'Sample Component', component: Sample },
	{ name: 'Page logo', component: Logo },
	{ name: 'Submit button', component: Button },
	{ name: 'Input Field', component: Input },
	{ name: 'Status Dropdown', component: StatusDropdown },
];

const ComponentsLibrary = () => {
	return (
		<Box padding={4}>
			<Typography
				variant='h2'
				gutterBottom
			>
				Component Library
			</Typography>
			<Grid
				container
				spacing={3}
			>
				{components.map(({ name, component: Component, props }) => (
					<Grid
						item
						xs={12}
						key={name}
					>
						<Card
							style={{
								border: '1px solid #000',
								boxShadow: 'none',
								background: '#B4B4B4',
							}}
						>
							<CardContent>
								<Typography
									variant='h6'
									gutterBottom
								>
									{name}
								</Typography>
								{props ? <Component {...props} /> : <Component />}
							</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default ComponentsLibrary;
