import { StateSchema } from "@/app/providers/StoreProvider";

export const getUserState = (state: StateSchema) => {
	return state.user
}