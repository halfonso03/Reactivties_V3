import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Box, Typography } from "@mui/material";
import { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useProfile } from "../../lib/hooks/useProfile";
import { useParams } from "react-router";

export default function ProfileContent() {
	const [value, setValue] = useState(0);
	const { id } = useParams();
	const { profile } = useProfile(id);
	if (!profile) return <Typography>Profile not found.</Typography>;

	const tabContent = [
		{
			label: "About",
			content: <ProfileAbout></ProfileAbout>,
		},
		{ label: "Photos", content: <ProfilePhotos></ProfilePhotos> },
		{ label: "Events", content: <div>Events</div> },
		{
			label: "Followers",
			content: <ProfileFollowings activeTab={value} />,
		},
		{
			label: "Following",
			content: <ProfileFollowings activeTab={value} />,
		},
	];

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			component={Paper}
			mt={2}
			p={3}
			elevation={3}
			height={500}
			sx={{
				alignItems: "flex-start",
				borderRadius: 3,
				display: "flex",
			}}>
			<Tabs
				orientation='vertical'
				value={value}
				onChange={handleChange}
				sx={{ borderRight: 1, height: 450, minWidth: 200 }}>
				{tabContent.map((t) => (
					<Tab
						key={t.label}
						label={t.label}
						sx={{ mr: 3 }}></Tab>
				))}
			</Tabs>
			<Box sx={{ flexGrow: 1, p: 3, pt: 0 }}>
				{tabContent[value].content}
			</Box>
		</Box>
	);
}
