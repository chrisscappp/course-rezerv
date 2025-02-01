import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegisterError = (state: StateSchema) => {
	return state?.registerForm?.error
}