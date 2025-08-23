import { DateArg, format, formatDistanceToNow } from "date-fns";
import z from "zod";

export function formatDate(date: Date) {
	return format(date, "dd MMM yyyy h:mm a");
}

export const requiredString = (fieldName: string) =>
	z
		.string({ error: `${fieldName} is required` })
		.min(1, { error: `${fieldName} is required` });

export function timeAgo(date: DateArg<Date>) {
	return formatDistanceToNow(date) + " ago";
}
