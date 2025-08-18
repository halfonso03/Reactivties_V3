import {
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	Grid2,
	Paper,
	Stack,
	Typography,
} from "@mui/material";

type Props = {
	profile: Profile | undefined;
};

export default function ProfileHeader({ profile }: Props) {
	const isFollowing = true;
	return (
		<Paper
			elevation={3}
			sx={{ padding: 4 }}>
			<Grid2
				container
				spacing={2}>
				<Grid2 size={8}>
					<Stack
						direction={"row"}
						spacing={3}
						alignItems={"center"}>
						<Avatar
							src={profile?.imageUrl}
							alt={profile?.imageUrl + " image"}
							sx={{ width: 150, height: 150 }}></Avatar>
						<Box
							display={"flex"}
							flexDirection={"column"}
							gap={2}>
							<Typography variant='h4'>
								{profile!.displayName}
							</Typography>
							{isFollowing && (
								<Chip
									variant='outlined'
									color='secondary'
									label='Following'
									sx={{
										width: "100%",
										borderRadius: 1,
									}}></Chip>
							)}
						</Box>
					</Stack>
				</Grid2>
				<Grid2 size={4}>
					<Stack
						spacing={2}
						alignItems={"center"}>
						<Box
							textAlign={"center"}
							display={"flex"}
							justifyContent={"space-around"}
							width={"100%"}>
							<Box textAlign={"center"}>
								<Typography variant='h6'>Followers</Typography>
								<Typography variant='h4'>5</Typography>
							</Box>
							<Box textAlign={"center"}>
								<Typography variant='h6'>Following</Typography>
								<Typography variant='h4'>42</Typography>
							</Box>
						</Box>
						<Divider sx={{ width: "100%" }}></Divider>
						<Button
							color={isFollowing ? "error" : "success"}
							fullWidth
							variant='outlined'>
							{isFollowing ? "Unfollow" : "Follow"}
						</Button>
					</Stack>
				</Grid2>
			</Grid2>
		</Paper>
	);
}
