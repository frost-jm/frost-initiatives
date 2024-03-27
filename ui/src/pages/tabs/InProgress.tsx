import { InitiativesTable, PaginationControl, TableFilter, Type } from '@/components';
import EmptyState from '@/sections/EmptyState';
import { Box } from '@mui/material';

const InProgress = () => {
	const count = 2;
	return count > 0 ? (
		<>
			<Box sx={{ padding: '12px 0 119px 0' }}>
				<Box sx={{ padding: '24px 24px 16px' }}>
					<TableFilter
						tableheader='Initiatives in Progress'
						quantity={1}
					/>
				</Box>
				<InitiativesTable type={Type.inProgress} />
				<Box>
					<PaginationControl />
				</Box>
			</Box>
		</>
	) : (
		<EmptyState />
	);
};

export default InProgress;
