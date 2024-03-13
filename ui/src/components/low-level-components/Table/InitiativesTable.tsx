import { Box } from '@mui/material';
import TableLabel from './TableLabel';

const InitiativesTable = () => {
  const tableHeads = [
    { id: 1, label: 'Date', width: '68px' },
    { id: 2, label: 'Initiative Name', width: '220px' },
    { id: 3, label: 'Pitched by', width: '140px' },
    { id: 4, label: 'Departments', width: '100px' },
    { id: 5, label: 'Results', width: '240px' },
    { id: 6, label: '', width: '64px' },
  ];

  return (
    <Box sx={{ borderRadius: '4px', maxWidth: '1040px' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '32px',
          backgroundColor: 'var(--primary-color)',
          border: '1px solid #E9EDEE',
          borderRadius: '4px 4px 0 0',
          padding: '12px 24px',
        }}
      >
        {tableHeads.map((tableHead) => (
          <Box sx={{ width: tableHead.width }}>
            <TableLabel label={tableHead.label}></TableLabel>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default InitiativesTable;
