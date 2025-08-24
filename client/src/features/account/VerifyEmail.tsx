import { useEffect, useRef, useState } from "react";
import useAccount from "../../lib/hooks/useAccount";
import { Link, useSearchParams } from "react-router";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { EmailRounded } from "@mui/icons-material";

export default function VerifyEmail() {
	const { verifyEmail, resendConfirmationEmail } = useAccount();
	const [status, setStatus] = useState("verifying");
	const [searchParams] = useSearchParams();

	const userId = searchParams.get("userId");
	const code = searchParams.get("code");

	const hasRun = useRef(false);

	useEffect(() => {
		if (code && userId && !hasRun.current) {
			hasRun.current = true;
			verifyEmail
				.mutateAsync({ userId, code })
				.then(() => setStatus("verified"))
				.catch(() => setStatus("failed"));
		}
	}, [code, userId, verifyEmail]);
	console.log("status", status);
	const getBody = () => {
		switch (status) {
			case "verifying":
				return <Typography>Verifying...</Typography>;
			case "failed":
				return (
					<Box
						display={"flex"}
						flexDirection={"column"}
						gap={2}
						justifyContent={"center"}>
						<Typography>
							Verification Failed. You can try resending th verify
							link to your email.
						</Typography>
						<Button
							disabled={resendConfirmationEmail.isPending}
							onClick={() =>
								resendConfirmationEmail.mutateAsync({
									userId,
								})
							}>
							Resend Verification Email
						</Button>
					</Box>
				);
			case "verified":
				return (
					<Box
						display={"flex"}
						flexDirection={"column"}
						gap={2}
						justifyContent={"center"}>
						<Typography>
							Email has been verified. You can now log in.
							<Button
								component={Link}
								to={"/login"}>
								Go to login
							</Button>
						</Typography>
					</Box>
				);
		}
	};
	return (
		<Paper
			sx={{
				height: 400,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				padding: 6,
			}}>
			<EmailRounded
				sx={{ fontSize: 100 }}
				color='primary'></EmailRounded>
			<Typography
				gutterBottom
				variant='h3'>
				Email Verification
			</Typography>
			<Divider></Divider>
			{getBody()}
		</Paper>
	);
}
