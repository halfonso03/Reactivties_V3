import { Grid2, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function PhotoUploadWidget() {
	const onDrop = useCallback((acceptedFiles: File[]) => {
		// Do something with the files

		console.log(acceptedFiles);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
	});

	return (
		<Grid2
			container
			spacing={3}>
			<Grid2 size={4}>
				<Typography
					variant='overline'
					color='secondary'>
					Step 1 - Add Photo
				</Typography>
				<div {...getRootProps()}>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p>Drop the files here ...</p>
					) : (
						<p>
							Drag 'n' drop some files here, or click to select
							files
						</p>
					)}
				</div>
			</Grid2>
			<Grid2 size={4}>
				<Typography
					variant='overline'
					color='secondary'>
					Step 2 - Resize Image
				</Typography>
			</Grid2>
			<Grid2 size={4}>
				<Typography
					variant='overline'
					color='secondary'>
					Step 3 - Preview & Upload
				</Typography>
			</Grid2>
		</Grid2>
	);
}
