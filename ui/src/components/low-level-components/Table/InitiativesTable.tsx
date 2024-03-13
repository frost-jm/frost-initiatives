import { Box } from '@mui/material';
import TableLabel from './TableLabel';
import TableContent from './TableContent';
import TableContentWTitle from './TableContentWTitle';

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
          <Box sx={{ minWidth: tableHead.width }}>
            <TableLabel label={tableHead.label} />
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          '& :last-of-type': {
            borderRadius: '0 0 4px 4px',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            display: 'flex',
            gap: '32px',
            padding: '12px 24px',
          }}
        >
          <TableContent>1/15/2024</TableContent>
          <Box sx={{ display: 'block', width: '220px' }}>
            <TableContentWTitle title='DQA Guidelines'>
              A document to record the CQA process for our future reference{' '}
            </TableContentWTitle>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default InitiativesTable;
