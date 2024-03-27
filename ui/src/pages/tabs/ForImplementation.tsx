import EmptyState from '@/sections/EmptyState';
import { InitiativesTable, TableFilter, Type, PaginationControl } from '@/components';
import { Box } from '@mui/material';

const ForImplementation = () => {
	const count = 2;
	return count > 0 ? (
		<>
			<Box sx={{ padding: '12px 0 119px 0' }}>
				<Box sx={{ padding: '24px 24px 16px' }}>
					<TableFilter
						tableheader='Initiatives for Implementation'
						quantity={1}
					/>
				</Box>
				<InitiativesTable type={Type.forImplementation} />
				<Box>
					<PaginationControl />
				</Box>
			</Box>
		</>
	) : (
		<EmptyState />
	);
};

export default ForImplementation;
