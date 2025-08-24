import z from "zod";
import { requiredString } from "../util/util";

export const changePasswordSchema = z
	.object({
		currentPassword: requiredString("Current Password"),
		newPassword: requiredString("New Password"),
		confirmPassword: requiredString("Confirm Password"),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: " Passwords must match",
		path: ["confirmPassword"],
	});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
