import { toast } from "react-toastify";
import { store } from "../util/stores/store";
import axios from "axios";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

agent.interceptors.request.use(async (config) => {
	store.uiStore.isBusy();
	await sleep(1);
	return config;
});

agent.interceptors.response.use(
	async (response) => {
		await sleep(1000);
		store.uiStore.isIdle();
		return response;
	},
	async (error) => {
		await sleep(400);
		store.uiStore.isIdle();
		console.log(error);
		const { status, data } = error.response;

		switch (status) {
			case 400: {
				if (data.errors) {
					const modelStateErrors = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				} else {
					toast.error(data);
				}

				break;
			}
			case 401: {
				toast.error("Unauthorized");
				break;
			}
			case 404: {
				router.navigate("/not-found");

				break;
			}
			case 500: {
				console.log("srver error");
				router.navigate("/server-error", { state: { error: data } });

				break;
			}
		}
	}
);

export default agent;
