import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { useForm, type FieldValues } from "react-hook-form";
import { useEffect } from "react";
import {
	activitySchema,
	type ActivitySchema,
} from "../../../lib/schemas/activitySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput";
import { useActivities } from "../../../lib/hooks/useActivities";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import LocationInput from "../../../app/shared/components/LocationInput";
import DateTimeInput from "../../../app/shared/components/DateTimeInput";

export default function ActivityForm() {
	const { reset, control, handleSubmit } = useForm<ActivitySchema>({
		mode: "onTouched",
		resolver: zodResolver(activitySchema),
	});
	const navigate = useNavigate();
	const { createActivity, updateActivity, activity, isActivityLoading } =
		useActivities(useParams().id);

	useEffect(() => {
		if (activity) {
			const a = {
				...activity,
				location: {
					city: activity.city,
					venue: activity.venue,
					latitude: activity.latitude,
					longitude: activity.longitude,
				},
			};
			reset(a);
			console.log(a);
		}
	}, [activity, reset]);

	if (isActivityLoading) {
		return <Typography>Loading...</Typography>;
	}

	const onSubmit = async (data: FieldValues) => {
		const { location, ...rest } = data;
		const flattenedData = { ...rest, ...location };
		console.log(data);
		try {
			if (activity) {
				await updateActivity.mutateAsync(
					{ ...activity, ...flattenedData },
					{ onSuccess: () => navigate(`/activities/${activity.id}`) }
				);
			} else {
				createActivity.mutate(flattenedData as unknown as Activity, {
					onSuccess: (id) => navigate(`/activities/${id}`),
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Paper sx={{ borderRadius: 3, padding: 3 }}>
			<Typography
				variant='h5'
				gutterBottom
				color='primary'>
				{activity ? "Edit Activity" : "Create Activity"}
			</Typography>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				display='flex'
				flexDirection='column'
				gap={3}>
				<TextInput
					label='Title'
					control={control}
					name='title'
				/>

				<TextInput
					label='Description'
					control={control}
					name='description'
					multiline
					rows={3}
				/>

				<Box
					display='flex'
					gap={3}>
					<SelectInput
						items={categoryOptions}
						label='Category'
						control={control}
						name='category'
					/>
					<DateTimeInput
						label='Date'
						control={control}
						name='date'
					/>
				</Box>

				<LocationInput
					label={"Enter a location"}
					name='location'
					control={control}></LocationInput>
				{/* 
				<TextField
					{...register("date")}
					label='Date'
					type='date'
					error={!!errors.date}
					helperText={errors.date?.message}
					defaultValue={
						activity?.date
							? new Date(activity.date)
									.toISOString()
									.split("T")[0]
							: new Date().toISOString().split("T")[0]
					}
				/> */}
				{/* <TextField
					{...register("city")}
					label='City'
					error={!!errors.location?.city}
					helperText={errors.location?.city?.message}
					defaultValue={activity?.city}
				/>
				<TextField
					{...register("venue")}
					label='Venue'
					defaultValue={activity?.venue}
					error={!!errors.location?.venue}
					helperText={errors.location?.venue?.message}
				/> */}
				<Box
					display='flex'
					justifyContent='end'
					gap={3}>
					<Button
						onClick={() => {}}
						color='inherit'>
						Cancel
					</Button>
					<Button
						type='submit'
						color='success'
						variant='contained'
						disabled={
							updateActivity.isPending || createActivity.isPending
						}>
						Submit
					</Button>
				</Box>
			</Box>
		</Paper>
	);
}
