export const tableHeads = [
  { id: 1, label: 'Date', width: '68px' },
  { id: 2, label: 'Initiative Name', width: '220px' },
  { id: 3, label: 'Pitched by', width: '140px' },
  { id: 4, label: 'Departments', width: '100px' },
  { id: 5, label: 'Results', width: '240px' },
  { id: 6, label: '', width: '64px' },
];

export const tableContents = [
  {
    date: '1/15/2024',
    initiativeName: 'DQA Guidelines',
    initiativeDescription:
      'A document to record the CQA process for our future reference ',
    pitcher: { firstName: 'Lea', lastName: 'Villanueva' },
    dept: 'Design',
    count: 12,
    totalHeads: 16,
    voted: true,
    joined: false,
  },
  {
    date: '2/19/2024',
    initiativeName: 'Frost Lingo v2',
    initiativeDescription:
      'A document to record the CQA process for our future reference ',
    pitcher: { firstName: 'JP', lastName: 'Villanueva' },
    dept: 'Design, Content, Dev',
    count: 0,
    totalHeads: 16,
    voted: false,
    joined: false,
  },
  {
    date: '12/20/2024',
    initiativeName: 'CQA Document',
    initiativeDescription:
      'A document to record the CQA process for our future reference ',
    pitcher: { firstName: 'Karen', lastName: 'Ong' },
    dept: 'Content',
    count: 3,
    totalHeads: 4,
    voted: true,
    joined: true,
  },
];
