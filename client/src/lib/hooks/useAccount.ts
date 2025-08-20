import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/loginSchema";
import agent from "../api/agent";
import { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function useAccount() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const loginUser = useMutation({
		mutationFn: async (creds: LoginSchema) => {
			await agent.post("/login?useCookies=true", creds);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
	});

	const registerUser = useMutation({
		mutationFn: async (creds: RegisterSchema) => {
			await agent.post("/account/register", creds);
		},
		onSuccess: () => {
			toast.success("Register successful - you can now login");
			navigate("/login");
		},
	});

	const logoutUser = useMutation({
		mutationFn: async () => {
			agent.post("/account/logout");
		},
		onSuccess: async () => {
			queryClient.removeQueries();
			// queryClient.removeQueries({ queryKey: ["user"] });
			// queryClient.removeQueries({ queryKey: ["activities"] });
			// queryClient.removeQueries({ queryKey: ["profile"] });
			navigate("/");
		},
	});

	const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const response = await agent.get<User>("/account/user-info");
			// console.log(response.data);
			return response.data;
		},
		enabled: !queryClient.getQueryData(["user"]),
	});

	return {
		loginUser,
		registerUser,
		logoutUser,
		currentUser,
		loadingUserInfo,
	};
}
