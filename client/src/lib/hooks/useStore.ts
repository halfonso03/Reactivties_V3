import { useContext } from "react";
import { StoreContext } from "../util/stores/store";

export function useStore() {
	return useContext(StoreContext);
}
