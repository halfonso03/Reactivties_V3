import {
	Avatar,
	Box,
	Divider,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import useAccount from "../../lib/hooks/useAccount";
import { Link } from "react-router";
import { Add, Logout, Person } from "@mui/icons-material";
import { useProfile } from "../../lib/hooks/useProfile";

export default function UserMenu() {
	const { logoutUser } = useAccount();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const { currentUser } = useAccount();
	const { profile } = useProfile(currentUser?.id);

	return (
		<>
			<Button
				color='inherit'
				size='large'
				sx={{ fontSize: "1.1rem" }}
				onClick={handleClick}>
				<Box
					display={"flex"}
					alignItems={"center"}
					gap={2}>
					<Avatar
						src={currentUser?.imageUrl}
						alt={`image of host`}
						sx={{ height: 50, width: 50 }}
					/>
					{profile?.displayName}
				</Box>
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": "basic-button",
					},
				}}>
				<MenuItem
					component={Link}
					to='/createActivity'
					onClick={handleClose}>
					<ListItemIcon>
						<Add></Add>
					</ListItemIcon>
					<ListItemText>Create Activity</ListItemText>
				</MenuItem>
				<MenuItem
					component={Link}
					to={`/profile/${currentUser?.id}`}
					onClick={handleClose}>
					<ListItemIcon>
						<Person></Person>
					</ListItemIcon>
					<ListItemText>My Profile</ListItemText>
				</MenuItem>
				<Divider></Divider>

				<MenuItem
					onClick={async () => {
						await logoutUser.mutate();
						handleClose();
					}}>
					<ListItemIcon>
						<Logout></Logout>
					</ListItemIcon>
					<ListItemText>Logout</ListItemText>
				</MenuItem>
			</Menu>
		</>
	);
}
