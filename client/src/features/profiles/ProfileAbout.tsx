import { useParams } from "react-router";
import { useProfile } from "../../lib/hooks/useProfile";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TextInput from "../../app/shared/components/TextInput";
import {
	EditProfileSchema,
	editProfileSchema,
} from "../../lib/schemas/editProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfileAbout() {
	const [editMode, setEditMode] = useState(false);
	const {
		reset,
		control,
		handleSubmit,
		formState: { isDirty, isValid },
	} = useForm<EditProfileSchema>({
		mode: "onTouched",
		resolver: zodResolver(editProfileSchema),
	});

	const { id } = useParams();
	const { profile, editProfile } = useProfile(id);

	const onSubmit = async (data: EditProfileSchema) => {
		await editProfile.mutateAsync(data, {
			onSuccess: () => {
				setEditMode(false);
			},
		});
	};

	useEffect(() => {
		if (profile) {
			reset({
				displayName: profile.displayName,
				bio: profile?.bio || "",
			});
		}
	}, [profile, reset]);

	return (
		<>
			{editMode ? (
				<Box
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					display='flex'
					flexDirection='column'
					gap={3}>
					<TextInput
						label='DisplayName'
						control={control}
						name='displayName'
						value={profile?.displayName}
					/>

					<TextInput
						label='Bio'
						control={control}
						name='bio'
						multiline
						rows={3}
						value={profile?.bio}
					/>
					<Box display={"flex"}>
						<Button
							onClick={() => {
								setEditMode(false);
								reset();
							}}
							color='inherit'>
							Cancel
						</Button>
						<Button
							type='submit'
							color='success'
							variant='contained'
							disabled={
								!isValid || !isDirty || editProfile.isPending
							}>
							Submit
						</Button>
					</Box>
				</Box>
			) : (
				<Box>
					<Box
						display='flex'
						justifyContent='space-between'>
						<Typography variant='h5'>
							About {profile?.displayName}
						</Typography>
						<Button onClick={() => setEditMode(!editMode)}>
							Edit profile
						</Button>
					</Box>
					<Divider sx={{ my: 2 }} />
					<Box sx={{ overflow: "auto", maxHeight: 350 }}>
						<Typography
							variant='body1'
							sx={{ whiteSpace: "pre-wrap" }}>
							{profile?.bio || "No description added yet"}
						</Typography>
					</Box>
				</Box>
			)}
		</>
	);
}
