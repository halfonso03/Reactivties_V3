import { AccessTime, Place } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Divider,
	Typography,
} from "@mui/material";
import { Link } from "react-router";
import { formatDate } from "../../../lib/util/util";
import AvatarPopover from "../../../app/shared/components/AvatarPopover";

type Props = {
	activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
	const label = activity.isHost ? "You are hosting" : "You are going";
	const color = activity.isHost
		? "secondary"
		: activity.isGoing
		? "warning"
		: "default";
	return (
		<Card
			elevation={3}
			sx={{ borderRadius: 3 }}>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}>
				<CardHeader
					avatar={
						<Avatar
							src={activity.hostImageUrl}
							alt={`image of host`}
							sx={{ height: 80, width: 80 }}></Avatar>
					}
					title={activity.title}
					titleTypographyProps={{
						fontWeight: "bold",
						fontSize: 20,
					}}
					subheader={
						<>
							Hosted by{" "}
							<Link to={`/profile/${activity.hostId}`}>
								{activity.hostDisplayedName}
							</Link>
						</>
					}
				/>
				<Box
					display={"flex"}
					flexDirection={"column"}
					gap={2}
					mr={2}>
					{(activity.isHost || activity.isGoing) && (
						<Chip
							label={label}
							color={color}
							variant='outlined'
							sx={{ borderRadius: 2 }}
						/>
					)}
					{activity.isCancelled && (
						<Chip
							label={"Cancelled"}
							color='error'
							sx={{ borderRadius: 2 }}></Chip>
					)}
				</Box>
			</Box>
			<Divider sx={{ marginBottom: 3 }}></Divider>
			<CardContent sx={{ p: 0 }}>
				<Box
					display={"flex"}
					alignItems={"center"}
					mb={2}
					px={2}>
					<Box
						display={"flex"}
						alignItems={"center"}
						flexGrow={0}>
						<AccessTime sx={{ mr: 1 }} />
						<Typography
							variant='body2'
							noWrap>
							{formatDate(activity.date)}
						</Typography>
					</Box>

					<Place sx={{ ml: 3, mr: 1 }} />
					<Typography variant='body2'>{activity.venue}</Typography>
					<Divider />
				</Box>{" "}
				<Box
					display={"flex"}
					gap={2}
					sx={{
						backgroundColor: "grey.200",
						py: 3,
						pl: 3,
					}}>
					{activity.attendees.map((att) => (
						<AvatarPopover
							key={att.id}
							profile={att}></AvatarPopover>
					))}
				</Box>
			</CardContent>
			<CardContent
				sx={{
					pb: 2,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}>
				<Typography variant='body2'>{activity.description}</Typography>
				<Button
					size='medium'
					component={Link}
					to={`/activities/${activity.id}`}
					variant='contained'
					sx={{
						justifySelf: "self-end",
						borderRadius: 3,
					}}>
					View
				</Button>
			</CardContent>
		</Card>
	);
}
