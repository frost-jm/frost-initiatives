import { Box } from '@mui/material';
import TableHeader from '../Table/TableHeader';
import TableDropdown from '../Dropdown/TableDropdown';
import SortDropdown from '../Dropdown/SortDropdown';
import DepartmentFilter from '../Dropdown/DepartmentFilter';

const optionsData = [
  {
    value: 'Latest',
    label: 'Latest',
  },
  {
    value: 'Oldest',
    label: 'Oldest',
  },
];

const departmentData = [
  {
    value: 'All Departments',
    label: 'All Departments',
  },
  {
    value: 'Content',
    label: 'Content',
  },
  {
    value: 'Design',
    label: 'Design',
  },
  {
    value: 'Dev',
    label: 'Dev',
  },
  {
    value: 'Execom',
    label: 'Execom',
  },
  {
    value: 'Mancomm',
    label: 'Mancomm',
  },
  {
    value: 'Org-wide',
    label: 'Org-wide',
  },
  {
    value: 'PMO',
    label: 'PMO',
  },
  {
    value: 'TMG',
    label: 'TMG',
  },
];

const sortData = [
  {
    value: 'Most Votes',
    label: 'Most Votes',
  },
  {
    value: 'Least Votes',
    label: 'Least Votes',
  },
];

const TableFilter = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <TableHeader text='Initiatives for Voting' quantity='5' />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '4px',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <TableDropdown options={optionsData} />
          <DepartmentFilter options={departmentData} />
          <SortDropdown options={sortData} />
        </Box>
      </Box>
    </Box>
  );
};
export default TableFilter;
