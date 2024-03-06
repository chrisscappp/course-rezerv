import { StateSchema } from "app/providers/StoreProvider";

export const getRegisterRepeatPassword = (state: StateSchema) => {
	return state?.registerForm?.repeatPassword
}