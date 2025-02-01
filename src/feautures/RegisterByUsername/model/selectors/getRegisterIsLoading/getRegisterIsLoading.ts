import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegisterIsLoading = (state: StateSchema) => {
	return state?.registerForm?.isLoading
}