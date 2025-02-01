import { getRegisterState } from "./getRegisterState";
import { StateSchema } from "@/app/providers/StoreProvider";

describe('getRegisterState', () => {
	test('get register state', () => {
		const state: DeepPartial<StateSchema> = {
			registerForm: { 
				username: "username",
				password: "password",
				repeatPassword: "repeatPassword",
			}
		}
		expect(getRegisterState(state as StateSchema)).toEqual({
			username: "username",
			password: "password",
			repeatPassword: "repeatPassword",
		})
	})
}) 