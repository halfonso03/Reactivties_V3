import { useNavigate, useSearchParams } from "react-router";
import useAccount from "../../lib/hooks/useAccount";
import AccountFormWrapper from "./AccountFormWrapper";
import { Typography } from "@mui/material";
import {
	resetPasswordSchema,
	ResetPasswordSchema,
} from "../../lib/schemas/resetPasswordSchema";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function ResetPasswordForm() {
	const [searchParams] = useSearchParams();
	const { resetPassword } = useAccount();

	const email = searchParams.get("email");
	const code = searchParams.get("code");
	const navigate = useNavigate();

	if (!email || !code)
		return <Typography>Invalid reset password code</Typography>;

	const onSubmit = async (data: ResetPasswordSchema) => {
		try {
			await resetPassword.mutateAsync(
				{ email, resetCode: code, newPassword: data.newPassword },
				{
					onSuccess: () => {
						toast.success(
							"Password reset successfully - you can now lign in"
						);
						navigate("/login");
					},
				}
			);
		} catch (error) {
			console.log("error", error);
		}
	};
	return (
		<AccountFormWrapper<ResetPasswordSchema>
			onSubmit={onSubmit}
			title='Reset your password'
			submitButtonText='Reset Password'
			resolver={zodResolver(resetPasswordSchema)}
			icon={<LockOpen fontSize='large'></LockOpen>}>
			<TextInput
				label='New Password'
				type='Password'
				name='newPassword'></TextInput>
			<TextInput
				label='Conform Password'
				type='Password'
				name='confirmPassword'></TextInput>
		</AccountFormWrapper>
	);
}
