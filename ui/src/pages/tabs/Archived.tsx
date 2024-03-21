import { Box } from '@mui/material';
import { TableFilter, InitiativesTable } from '@/components';
import Pagination from '@/components/low-level-components/Pagination';
import EmptyState from '@/sections/EmptyState';

const Archived = () => {
  const count = 4;
  return count > 0 ? (
    <>
      <Box>
        <Box sx={{ padding: '24px 0 16px' }}>
          <TableFilter tableheader='Initiatives Archived' quantity={4} />
        </Box>
        <InitiativesTable />
        <Box sx={{ paddingTop: '24' }}>
          <Pagination />
        </Box>
      </Box>
    </>
  ) : (
    <EmptyState />
  );
};

export default Archived;
