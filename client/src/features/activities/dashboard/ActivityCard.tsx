import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Typography,
} from "@mui/material";
import { useActivties } from "../../../lib/hooks/useActivities";

type Props = {
	activity: Activity;
	selectActivity: (id: string) => void;
};

export default function ActivityCard({ activity, selectActivity }: Props) {
	const { deleteActivity } = useActivties();

	return (
		<Card sx={{ borderRadius: 3 }}>
			<CardContent>
				<Typography variant='h5'>{activity.title}</Typography>
				<Typography sx={{ color: "text.secondary", md: 1 }}>
					{activity.date}
				</Typography>
				<Typography variant='body2'>{activity.description}</Typography>
				<Typography variant='subtitle1'>
					{activity.city} / {activity.venue}
				</Typography>
			</CardContent>
			<CardActions
				sx={{
					display: "flex",
					justifyContent: "space-between",
					pb: 2,
				}}>
				<Chip
					label={activity.category}
					variant='outlined'></Chip>
				<Box sx={{ display: "flex", gap: 1 }}>
					<Button
						size='medium'
						variant='contained'
						onClick={() => selectActivity(activity.id)}>
						View
					</Button>
					<Button
						size='medium'
						variant='contained'
						color='error'
						disabled={deleteActivity.isPending}
						onClick={() => deleteActivity.mutateAsync(activity.id)}>
						Delete
					</Button>
				</Box>
			</CardActions>
		</Card>
	);
}
