import { Password } from "@mui/icons-material";
import {
	changePasswordSchema,
	ChangePasswordSchema,
} from "../../lib/schemas/changePasswordSchema";
import AccountFormWrapper from "./AccountFormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../../app/shared/components/TextInput";
import useAccount from "../../lib/hooks/useAccount";
import { toast } from "react-toastify";

export default function ChangePasswordForm() {
	const { changePassword } = useAccount();

	const onSubmit = async (data: ChangePasswordSchema) => {
		try {
			await changePassword.mutateAsync(data, {
				onSuccess: () => {
					toast.success("Your password has been changed.");
				},
			});
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<AccountFormWrapper<ChangePasswordSchema>
			title='Change Password'
			icon={<Password fontSize='large' />}
			onSubmit={onSubmit}
			submitButtonText='Update Password'
			reset={true}
			resolver={zodResolver(changePasswordSchema)}>
			<TextInput
				type='password'
				label='Current Password'
				name='currentPassword'></TextInput>
			<TextInput
				type='password'
				label='New Password'
				name='newPassword'></TextInput>
			<TextInput
				type='password'
				label='Confirm Password'
				name='confirmPassword'></TextInput>
		</AccountFormWrapper>
	);
}
