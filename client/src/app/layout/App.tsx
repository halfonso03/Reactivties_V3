import { Box, Container, CssBaseline } from '@mui/material';
import NavBar from './NavBar';
import { Outlet, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? (
        <HomePage></HomePage>
      ) : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ paddingTop: 14 }}>
            <Outlet></Outlet>
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;

// activities = { activities };
// selectActivity = { handleSelectActivity };
// cancelSelectActivity = { handleCancelSelectActivity };
// selectedActivity = { selectedActivity };
// openForm = { handleOpenForm };
// editMode = { editMode };
// closeForm = { handleFormClose };
