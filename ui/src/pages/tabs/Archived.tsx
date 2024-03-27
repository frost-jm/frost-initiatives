import EmptyState from '@/sections/EmptyState';
import { InitiativesTable, Type } from '@/components';

const Archived = () => {
	const count = 0;
	return count > 0 ? <InitiativesTable type={Type.archived} /> : <EmptyState />;
};

export default Archived;
