import { Box } from '@mui/material';
import TableLabel from './TableLabel';
import TableContent from './TableContent';
import TableContentWTitle from './TableContentWTitle';
import Avatar from '../Avatar/Avatar';
import ProgressBar from '../ProgressBar';
import Buttons, { ButtonType } from '../Button/Buttons';

const InitiativesTable = () => {
  const tableHeads = [
    { id: 1, label: 'Date', width: '68px' },
    { id: 2, label: 'Initiative Name', width: '220px' },
    { id: 3, label: 'Pitched by', width: '140px' },
    { id: 4, label: 'Departments', width: '100px' },
    { id: 5, label: 'Results', width: '240px' },
    { id: 6, label: '', width: '64px' },
  ];

  const data = { firstName: 'Lea', lastName: 'Villanueva' };

  return (
    <Box sx={{ borderRadius: '4px', maxWidth: '1040px', overflow: 'auto' }}>
      <Box
        sx={{
          display: 'flex',
          gap: '32px',
          backgroundColor: 'var(--primary-color)',
          border: '1px solid #E9EDEE',
          borderRadius: '4px 4px 0 0',
          padding: '12px 24px',
          minWidth: '1040px',
          boxSizing: 'border-box',
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
          minWidth: '1040px',

          '> :last-of-type': {
            borderRadius: '0 0 4px 4px',
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: '#F7FAFC',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '32px',
            padding: '12px 24px',
          }}
        >
          <Box sx={{ minWidth: '68px' }}>
            <TableContent>1/15/2024</TableContent>
          </Box>

          <Box sx={{ display: 'block', minWidth: '220px' }}>
            <TableContentWTitle title='DQA Guidelines'>
              A document to record the CQA process for our future reference{' '}
            </TableContentWTitle>
          </Box>
          <Box sx={{ minWidth: '140px' }}>
            <Avatar type='single' label={true} data={data} />
          </Box>
          <Box sx={{ minWidth: '100px' }}>
            <TableContent>Design</TableContent>
          </Box>
          <Box sx={{ minWidth: '240px', margin: 'auto' }}>
            <ProgressBar count={14} totalHeads={16} />
          </Box>
          <Buttons type={ButtonType.View} action={() => console.log('click')}>
            View
          </Buttons>
        </Box>
      </Box>
    </Box>
  );
};
export default InitiativesTable;
