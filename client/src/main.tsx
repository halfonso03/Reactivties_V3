import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/layout/styles.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router";
import { router } from "./app/router/Routes.tsx";
import { store, StoreContext } from "./lib/util/stores/store.ts";
import { ToastContainer } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
// If you are using date-fns v3.x or v4.x, please import `AdapterDateFns`
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// If you are using date-fns v2.x, please import the v2 adapter
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<StoreContext.Provider value={store}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router}></RouterProvider>
					<ReactQueryDevtools
						initialIsOpen={false}></ReactQueryDevtools>
					<ToastContainer
						position='bottom-right'
						hideProgressBar
						theme='colored'
					/>
				</QueryClientProvider>
			</StoreContext.Provider>
		</LocalizationProvider>
	</StrictMode>
);
