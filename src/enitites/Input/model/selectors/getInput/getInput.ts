import { StateSchema } from "app/providers/StoreProvider";

export const getInput = (state: StateSchema) => {
	return state.input
}