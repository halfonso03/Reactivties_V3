import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Paper, Box } from "@mui/material";
import { useState } from "react";
import ProfilePhotos from "./ProfilePhotos";
import ProfileAbout from "./ProfileAbout";

type Props = {
	profile: Profile | undefined;
};

export default function ProfileContent({ profile }: Props) {
	const [value, setValue] = useState(0);

	const tabContent = [
		{ label: "About", content: <ProfileAbout></ProfileAbout> },
		{ label: "Photos", content: <ProfilePhotos></ProfilePhotos> },
		{ label: "Events", content: <div>Events</div> },
		{ label: "Followers", content: <div>Followers</div> },
		{ label: "Following", content: <div>Following</div> },
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
