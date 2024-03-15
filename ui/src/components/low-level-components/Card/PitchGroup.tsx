import InitiativeCard from './InitiativeCard';
import { Box } from '@mui/material';

const PitchGroup = () => {
  const initiativeCards = [
    {
      id: 1,
      title: 'Frost Lingo v2',
      description:
        'An update to our current Frost Lingo, will be pulling Content to help this time',
      pitcher: {
        firstName: 'John Paul ',
        lastName: 'de Guzman',
      },
      vote: 15,
      totalHeads: 16,
    },
    {
      id: 2,
      title: 'DQA Guidelines',
      description: 'Serves as a guide for those who are new to doing Design QA',
      pitcher: {
        firstName: 'Jennilea',
        lastName: 'Villanueva',
      },
      vote: 12,
      totalHeads: 16,
    },
    {
      id: 3,
      title: 'CQA Document',
      description:
        'A document to record the CQA process for our future reference ',
      pitcher: {
        firstName: 'Karen',
        lastName: 'Ong',
      },
      vote: 3,
      totalHeads: 4,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          '@media screen and (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        {initiativeCards.map((initiativeCard, index) => (
          <InitiativeCard key={index} data={initiativeCard} />
        ))}
      </Box>
    </>
  );
};
export default PitchGroup;
