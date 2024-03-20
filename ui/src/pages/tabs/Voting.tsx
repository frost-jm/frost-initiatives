import React from 'react';
import { Box } from '@mui/material';
import EmptyState from '@/sections/EmptyState';
import VotingBanner from '@/sections/Banners/VotingBanner';
import Pagination from '@/components/low-level-components/Pagination';
import { InitiativesTable, TableFilter } from '@/components';

const Voting = () => {
  const count = 5;
  return count > 0 ? (
    <>
      <Box sx={{ padding: '12px 0 119px 0' }}>
        <VotingBanner />
        <Box sx={{ padding: '24px 0 16px' }}>
          <TableFilter />
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

export default Voting;
