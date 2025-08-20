import { z } from "zod";

const requiredString = (fieldName: string) =>
	z
		.string({ message: `${fieldName} is required` })
		.min(1, { message: `${fieldName} is required` });

export const editProfileSchema = z.object({
	displayName: requiredString("Title"),
	bio: z.string().nullable().optional(),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
