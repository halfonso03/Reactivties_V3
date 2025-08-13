import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";

// type Props = {
// 	activities: Activity[];
// 	selectedActivity?: Activity;
// 	selectActivity: (id: string) => void;
// 	cancelSelectActivity: () => void;
// 	openForm: (id: string) => void;
// 	closeForm: () => void;
// 	editMode: boolean;
// };

export default function ActivityDashboard() {
	return (
		<Grid2
			container
			spacing={3}>
			<Grid2 size={7}>
				<ActivityList />
			</Grid2>
			<Grid2 size={5}>Activity Filters</Grid2>
		</Grid2>
	);
}
