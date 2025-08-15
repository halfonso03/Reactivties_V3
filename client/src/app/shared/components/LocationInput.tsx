import {
	Box,
	debounce,
	List,
	ListItemButton,
	TextField,
	Typography,
	type TextFieldProps,
} from "@mui/material";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
	FieldValues,
	useController,
	UseControllerProps,
} from "react-hook-form";
import { LocationIQSuggestion } from "../../../lib/types";
import axios from "axios";

type Props<T extends FieldValues> = { label: string } & UseControllerProps<T> &
	TextFieldProps;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
	const { field, fieldState } = useController({ ...props });
	const [loading, setLoading] = useState(false);
	const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
	const [inputValue, setInputvalue] = useState(field.value || "");

	useEffect(() => {
		if (field.value && typeof field.value === "object") {
			setInputvalue(field.value.venue || "");
		} else {
			setInputvalue(field.value || "");
		}
	}, [field.value]);

	const locationurl = `https://api.locationiq.com/v1/autocomplete?key=pk.4edf4e07a1a6674e1feaf4231cfc5a3a&limit=5&dedupe=1&`;

	const fetchSuggestions = useMemo(
		() =>
			debounce(async (query: string) => {
				if (!query || query.length < 3) {
					setSuggestions([]);
					return;
				} else {
					setLoading(true);

					try {
						const res = await axios.get<LocationIQSuggestion[]>(
							`${locationurl}q=${query}`
						);
						setSuggestions(res.data);
					} catch (error) {
						console.log(error);
					} finally {
						setLoading(false);
					}
				}
			}, 500),
		[locationurl]
	);

	const handleChange = async (value: string) => {
		field.onChange(value);
		await fetchSuggestions(value);
	};

	const handleSelect = (location: LocationIQSuggestion) => {
		const city =
			location.address.city ||
			location.address.town ||
			location.address.village;
		const venue = location.display_name;
		const latitude = location.lat;
		const longitude = location.lon;

		setInputvalue(venue);
		field.onChange({ city, venue, latitude, longitude });
		setSuggestions([]);
	};

	return (
		<Box>
			<TextField
				{...props}
				value={inputValue}
				fullWidth
				variant='outlined'
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					handleChange(event.target.value)
				}
				error={!!fieldState.error}
				helperText={fieldState.error?.message}
			/>
			{loading && <Typography>Loading...</Typography>}
			{suggestions.length > 0 && (
				<List sx={{ border: 1 }}>
					{suggestions.map((suggestion) => (
						<ListItemButton
							divider
							key={suggestion.place_id}
							onClick={() => handleSelect(suggestion)}>
							{suggestion.display_name}
						</ListItemButton>
					))}
				</List>
			)}
		</Box>
	);
}
