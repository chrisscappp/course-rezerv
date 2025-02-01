import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegisterPassword = (state: StateSchema) => {
	return state?.registerForm?.password
}