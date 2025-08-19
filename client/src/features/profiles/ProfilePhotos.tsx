import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import {
	Box,
	Button,
	ImageList,
	ImageListItem,
	Typography,
} from "@mui/material";
import { useState } from "react";
import PhotoUploadWidget from "../../app/shared/components/PhotoUploadWidget";

export default function ProfilePhotos() {
	const { id } = useParams();

	const { photos, loadingPhotos } = useProfile(id);

	const [editMode, setEditMode] = useState(false);

	if (loadingPhotos) return <Typography>Loading Photos...</Typography>;

	if (!photos || photos.length === 0)
		return <Typography>No photos found</Typography>;

    const isCurrentUser = true;

	return (
		<Box>
			{isCurrentUser && (
				<Box>
					<Button onClick={() => setEditMode(!editMode)}>
						{editMode ? "Cancel" : "Add Photo"}
					</Button>
				</Box>
			)}
			{editMode ? (
				<PhotoUploadWidget></PhotoUploadWidget>
			) : (
				<ImageList
					sx={{ height: 450 }}
					cols={6}
					rowHeight={164}>
					{photos.map((item) => (
						<ImageListItem key={item.id}>
							<img
								srcSet={`${item.url.replace(
									"/upload/",
									"/upload/w_164,h_164,c_fill,f_auto,dpr_2,g_face/"
								)}`}
								src={`${item.url.replace(
									"/upload/",
									"/upload/w_164,h_164,c_fill,f_auto,g_face/"
								)}`}
								alt={"user profile image"}
								loading='lazy'
							/>
						</ImageListItem>
					))}
				</ImageList>
			)}
		</Box>
	);
}
