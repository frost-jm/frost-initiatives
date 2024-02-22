import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { Sample, logo } from '@/components/index';

// Add the component here
const components = [
  { name: 'Sample Component', component: Sample },
  { name: 'Page logo', component: logo },
];

const ComponentsLibrary = () => {
  return (
    <Box padding={4}>
      <Typography variant="h2" gutterBottom>
        Component Library
      </Typography>
      <Grid container spacing={3}>
        {components.map(({ name, component: Component }) => (
          <Grid item xs={12} key={name}>
            <Card
              style={{
                border: '1px solid #000',
                boxShadow: 'none',
                background: '#B4B4B4',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {name}
                </Typography>
                <Component />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ComponentsLibrary;
