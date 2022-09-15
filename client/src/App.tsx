import { Container, Grid } from '@mui/material';
import { TableComponent } from './Components/TableComponent';

function App() {
  
  return (
    <Container maxWidth='xl' sx={{height: '100vh'}}>
      <Grid 
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        height='100vh'
      >
        <Grid item>

        </Grid>
        <Grid item>
          <TableComponent/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
