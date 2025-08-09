import { useEffect, useState } from "react";
import "./App.css";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import axios from 'axios';

function App() {
	const [activities, setActivities] = useState<Activity[]>([]);

	useEffect(() => {
		axios.get<Activity[]>("https://localhost:5001/api/activities")			
			.then((response) => setActivities(response.data));

		return () => {};
	}, []);

	return (
		<>
			<Typography variant='h3'>Reactivites</Typography>
			<List>
				{activities.map((a) => (
					<ListItem key={a.id}>
						<ListItemText>{a.title}</ListItemText>
					</ListItem>
				))}
			</List>
		</>
	);
}

export default App;
