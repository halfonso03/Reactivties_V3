import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CircularProgress,
} from "@mui/material";
import { format } from "date-fns";

type Props = {
	filter: string;
};
export default function ProfileEventsList({ filter }: Props) {
	const { id } = useParams();
	const { loadingUserActivities, userActivities } = useProfile(id, filter);

	if (loadingUserActivities)
		return (
			<CircularProgress
				size={24}
				sx={{ marginTop: 3, marginLeft: 2 }}
				thickness={7}></CircularProgress>
		);

	return (
		<Box
			display={"flex"}
			flexWrap={"wrap"}
			gap={3}
			mt={2}>
			{userActivities?.map((activity) => (
				<Card sx={{ width: 175 }}>
					<CardMedia
						component='img'
						height={100}
						image={`/images/categoryImages/${activity.category}.jpg`}
						alt='Paella dish'
					/>
					<CardContent
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}>
						<Typography
							gutterBottom
							sx={{
								color: "#000",
								fontSize: 16,
								fontWeight: "bold",
							}}>
							{activity.title}
						</Typography>

						<Typography sx={{ color: "text.secondary", mb: 1.5 }}>
							{format(activity.date, "dd MMM yyy")}
						</Typography>
						<Typography sx={{ color: "text.secondary", mb: 1.5 }}>
							{format(activity.date, "h:mm aa")}
						</Typography>
					</CardContent>
				</Card>
			))}
		</Box>
	);
}
