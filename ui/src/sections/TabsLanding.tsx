import { Box } from '@mui/material';
import { Tabs } from '@/components';
import { Home, Archived, ForImplementation, Implemented, InProgress, Voting } from '@/pages/tabs';

const tabsData = [
	{ label: 'Home', count: 0, page: Home },
	{ label: 'For Voting', count: 5, page: Voting },
	{ label: 'For Implementation', count: 0, page: ForImplementation },
	{ label: 'In Progress', count: 1, page: InProgress },
	{ label: 'Implemented', count: 2, page: Implemented },
	{ label: 'Archived', count: 4, page: Archived },
];

const TabsLanding = () => {
	return (
		<Box overflow='hidden'>
			<Tabs data={tabsData} />
		</Box>
	);
};

export default TabsLanding;
