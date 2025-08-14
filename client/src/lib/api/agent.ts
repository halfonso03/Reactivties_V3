import { store } from '../util/stores/store';
import axios from "axios";

const sleep = (delay: number) =>
	new Promise((resolve) => setTimeout(resolve, delay));

const agent = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use(async (config) => {

	store.uiStore.isBusy();
	await sleep(1);
	return config;
})

agent.interceptors.response.use(async (response) => {
	try {

		return response;
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	} finally {
		store.uiStore.isIdle();
	}
});

export default agent;
