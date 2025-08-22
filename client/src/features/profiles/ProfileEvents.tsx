import { Box, Tab, Tabs } from "@mui/material";
import ProfileEventsList from "./ProfileEventsList";
import { useState } from "react";

export default function ProfileEvents() {
	const [value, setValue] = useState(0);

	const tabContent = [
		{
			label: "FUTURE EVENTS",
			content: <ProfileEventsList filter='future'></ProfileEventsList>,
		},
		{
			label: "PAST EVENTS",
			content: <ProfileEventsList filter='past'></ProfileEventsList>,
		},
		{
			label: "HOSTING",
			content: <ProfileEventsList filter='hosting'></ProfileEventsList>,
		},
	];

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box>
			<Tabs
				orientation='horizontal'
				value={value}
				onChange={handleChange}>
				{tabContent.map((t) => (
					<Tab
						key={t.label}
						label={t.label}
						sx={{ mr: 3 }}></Tab>
				))}
			</Tabs>
			<Box sx={{ flexGrow: 1, p: 0 }}>{tabContent[value].content}</Box>
		</Box>
	);
}
