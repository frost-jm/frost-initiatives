import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  Sample,
  Logo,
  SubmitButton,
  Input,
  StatusDropdown,
  ActionDropdown,
  EditorTabs,
  DepartmentDropdown,
  BannerContent,
  StatusHeader,
  TableHeader,
  Buttons,
  ButtonType,
  Avatar,
  TableLabel,
  TableContent,
  PendingVote,
  TableContentWTitle,
} from '@/components/index';

const tabLabelsData = [
  { label: 'Home', count: 0 },
  { label: 'For Voting', count: 5 },
  { label: 'For Implementation', count: 1 },
];

// Dummy Data for Avatar
import dummyData from '../testdata.json';

// Add the components here
const components = [
  { name: 'Sample Component', component: Sample },
  { name: 'Page logo', component: Logo },
  { name: 'Submit button', component: SubmitButton },
  { name: 'Status Dropdown', component: StatusDropdown },
  { name: 'Input Field', component: Input },
  { name: 'Comment Field', component: Input, props: { variant: 'comment' } },
  { name: 'Action Dropdown', component: ActionDropdown },
  { name: 'Department Dropdown', component: DepartmentDropdown },
  {
    name: 'Table Header',
    component: TableHeader,
    props: {
      text: 'Initiatives for Voting',
      quantity: '5',
    },
  },
  {
    name: 'Table Label',
    component: TableLabel,
    props: {
      label: 'Date',
    },
  },
  {
    name: 'Table Content',
    component: TableContent,
    props: {
      children: <>1/12/24</>,
    },
  },
  {
    name: 'Table Content with Title',
    component: TableContentWTitle,
    props: {
      title: 'DQA Guidelines',
    },
  },
  {
    name: 'Editor Tabs',
    component: EditorTabs,
    props: { tabLabels: tabLabelsData },
  },
  {
    name: 'Banner Content',
    component: BannerContent,
    props: {
      title: 'Got any suggestions for us?',
      description: 'Let us know by pitching your own internal initiative.',
    },
  },
  // To check different status: Change the status to any of the ff: 'Done', 'In Progress', 'For Implementation', 'Archived'
  {
    name: 'Status Header',
    component: StatusHeader,
    props: { status: 'Pending' },
  },
  { name: 'Avatar', component: Avatar },
  {
    name: 'Multiple Avatar ( Expanded )',
    component: Avatar,
    props: {
      type: dummyData.users.length > 1 ? 'multiple' : 'single',
      data: dummyData.users,
      label: true,
    },
  },
  {
    name: 'Multiple Avatar',
    component: Avatar,
    props: { type: 'multiple', data: dummyData.users },
  },
  {
    name: 'Multiple Avatar ( Table View )',
    component: Avatar,
    props: { type: 'table', data: dummyData.users },
  },

  //To check other button type: 'Join', 'View', 'Leave','Cancel'
  {
    name: 'Buttons',
    component: Buttons,
    props: {
      type: ButtonType.View,
      children: 'View',
    },
  },

  {
    name: 'Pending Vote',
    component: PendingVote,
    props: {
      type: 'fixed',
    },
  },
];

const ComponentsLibrary = () => {
  return (
    <Box padding={4}>
      <Typography variant='h2' gutterBottom>
        Component Library
      </Typography>
      <Grid container spacing={3}>
        {components.map(({ name, component: Component, props }) => (
          <Grid item xs={12} key={name}>
            <Card
              style={{
                border: '1px solid #000',
                boxShadow: 'none',
                background: '#B4B4B4',
              }}
            >
              <CardContent>
                <Typography variant='h6' gutterBottom>
                  {name}
                </Typography>
                {props && props.children ? (
                  <Component {...props}>{props.children}</Component>
                ) : props ? (
                  <Component {...props} />
                ) : (
                  <Component />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ComponentsLibrary;
