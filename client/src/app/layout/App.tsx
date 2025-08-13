import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router";

function App() {
	return (
		<Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
			<CssBaseline />
			<NavBar />
			<Container
				maxWidth='xl'
				sx={{ marginTop: 3 }}>
				<Outlet></Outlet>
			</Container>
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
