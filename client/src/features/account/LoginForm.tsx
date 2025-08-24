import { useForm } from "react-hook-form";

import { loginSchema, LoginSchema } from "../../lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useNavigate } from "react-router";
import useAccount from "../../lib/hooks/useAccount";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LoginForm() {
	const { loginUser, resendConfirmationEmail } = useAccount();
	const navigate = useNavigate();
	const [notVerified, setNotVerified] = useState(false);

	const {
		control,
		handleSubmit,
		watch,
		formState: { isValid, isSubmitting },
	} = useForm<LoginSchema>({
		mode: "onTouched",
		resolver: zodResolver(loginSchema),
	});

	const email = watch("email");

	const onSubmit = async (data: LoginSchema) => {
		await loginUser.mutateAsync(data, {
			onSuccess: () => {
				// console.log(location.state?.from);
				navigate("/activities");
			},
			onError: (error) => {
				if (error.message === "NotAllowed") setNotVerified(true);
			},
		});
	};

	const handleResendEmail = async () => {
		try {
			await resendConfirmationEmail.mutateAsync({ email });
			setNotVerified(false);
		} catch (error) {
			toast.error("Problem sending email. Please check email address.");
			console.log("error", error);
		}
	};

	return (
		<Paper
			component={"form"}
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				p: 3,
				gap: 3,
				maxWidth: "md",
				mx: "auto",
				borderRadius: 3,
			}}>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				gap={3}
				color='secondary.main'>
				<LockOpen fontSize='large'></LockOpen>
				<Typography variant='h4'>Sign In</Typography>
			</Box>
			<TextInput
				label='Email'
				control={control}
				name='email'></TextInput>
			<TextInput
				label='Password'
				control={control}
				type='password'
				name='password'></TextInput>
			<Button
				type='submit'
				disabled={!isValid || isSubmitting}
				variant='contained'
				size='large'>
				Login
			</Button>
			{notVerified ? (
				<>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}>
						<Typography
							textAlign={"center"}
							color='error'>
							Your email has not been verified. You can click the
							button to resend the verification email.
						</Typography>
						<Button
							disabled={resendConfirmationEmail.isPending}
							onClick={handleResendEmail}>
							Resend Email Link
						</Button>
					</Box>
				</>
			) : (
				<>
					<Typography sx={{ textAlign: "center" }}>
						Don't have an account?
						<Typography
							sx={{ ml: 2 }}
							component={Link}
							to='/register'
							color='primary'>
							Sign up
						</Typography>
					</Typography>
				</>
			)}
		</Paper>
	);
}
