import { useState } from "react";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useActivties } from "../../lib/hooks/useActivities";

function App() {
	const [selectedActivity, setSelectedActivity] = useState<
		Activity | undefined
	>(undefined);

	const [editMode, setEditMode] = useState(false);
	const { activities, isPending } = useActivties();

	const handleSelectActivity = (id: string) => {
		setSelectedActivity(activities!.find((x: Activity) => x.id === id));
	};

	const handleCancelSelectActivity = () => {
		setSelectedActivity(undefined);
	};

	const handleOpenForm = (id?: string) => {
		if (id) handleSelectActivity(id);
		else handleCancelSelectActivity();
		setEditMode(true);
	};

	const handleFormClose = () => {
		setEditMode(false);
	};

	// const handleSubmitForm = (activity: Activity) => {
	// 	console.log(activity);
	// 	setEditMode(false);
	// };

	const handleDelete = (id: string) => {
		console.log(id);
	};

	return (
		<Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
			<CssBaseline />
			<NavBar openForm={handleOpenForm} />
			<Container
				maxWidth='xl'
				sx={{ marginTop: 3 }}>
				{!activities || isPending ? (
					<Typography>Loading...</Typography>
				) : (
					<ActivityDashboard
						activities={activities}
						selectActivity={handleSelectActivity}
						cancelSelectActivity={handleCancelSelectActivity}
						selectedActivity={selectedActivity}
						openForm={handleOpenForm}
						editMode={editMode}
						closeForm={handleFormClose}
						deleteActivity={handleDelete}></ActivityDashboard>
				)}
			</Container>
		</Box>
	);
}

export default App;
