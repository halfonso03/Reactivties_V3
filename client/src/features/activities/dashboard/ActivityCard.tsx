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
import { Link } from "react-router";

type Props = {
	activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
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
						component={Link}
						to={`/activities/${activity.id}`}
						variant='contained'>
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
