import { CloudUpload } from "@mui/icons-material";
import { Grid2, Typography, Box, Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ReactCropperElement, Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

type Props = {
	uploadPhoto: (file: Blob) => void;
	loading: boolean;
};

export default function PhotoUploadWidget({ uploadPhoto, loading }: Props) {
	const [files, setFiles] = useState<(object & { preview: string })[]>([]);

	const croppeRef = useRef<ReactCropperElement>(null);

	useEffect(() => {
		return () => {
			files.forEach((file) => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(
			acceptedFiles.map((file: File) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file as Blob),
				})
			)
		);
	}, []);

	const onCrop = useCallback(() => {
		const cropper = croppeRef.current?.cropper;
		cropper?.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob as Blob));
	}, [uploadPhoto]);

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
				<Box
					{...getRootProps()}
					sx={{
						border: "dashed 3px #eee",
						borderColor: isDragActive ? "green" : "#eee",
						borderRadius: "5px",
						paddingTop: "30px",
						textAlign: "center",
						height: 286,
					}}>
					<input {...getInputProps()} />
					<CloudUpload sx={{ fontSize: 80 }}></CloudUpload>
					<Typography variant='h5'>Drop Image Here</Typography>
				</Box>
			</Grid2>
			<Grid2 size={4}>
				<Typography
					variant='overline'
					color='secondary'>
					Step 2 - Resize Image
				</Typography>
				{files[0]?.preview && (
					<Cropper
						src={files[0]?.preview}
						style={{ height: 300, width: "90%" }}
						aspectRatio={1}
						initialAspectRatio={1}
						preview='.img-preview'
						guides={false}
						viewMode={1}
						background={false}
						ref={croppeRef}></Cropper>
				)}
			</Grid2>
			<Grid2 size={4}>
				{files[0]?.preview && (
					<>
						<Typography
							variant='overline'
							color='secondary'>
							Step 3 - Preview & Upload
						</Typography>
						<div
							className='img-preview'
							style={{
								width: 300,
								height: 300,
								overflow: "hidden",
							}}></div>
						<Button
							sx={{ my: 1, width: 300 }}
							onClick={onCrop}
							variant='contained'
							color='secondary'
							disabled={loading}>
							Upload
						</Button>
					</>
				)}
			</Grid2>
		</Grid2>
	);
}
