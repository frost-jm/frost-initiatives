import React from 'react';
import EmptyState from '@/sections/EmptyState';
import { InitiativesTable } from '@/components';

const ForImplementation = () => {
  const count = 0;
  return count > 0 ? <InitiativesTable /> : <EmptyState />;
};

export default ForImplementation;
