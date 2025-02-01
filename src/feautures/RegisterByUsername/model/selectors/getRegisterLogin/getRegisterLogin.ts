import { StateSchema } from "@/app/providers/StoreProvider";

export const getRegisterLogin = (state: StateSchema) => {
	return state?.registerForm?.username
}