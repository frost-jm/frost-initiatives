import React from 'react';
import EmptyState from '@/sections/EmptyState';
import { InitiativesTable } from '@/components';

const Archived = () => {
  const count = 4;
  return count > 0 ? <InitiativesTable /> : <EmptyState />;
};

export default Archived;
