import { loginFormActions, loginFormReducer } from "./loginFormSlice";
import { LoginSchema } from "../types/loginSchema";

describe('loginFormSlice', () => {
	test('set username', () => {
		const state: DeepPartial<LoginSchema> = {
			username: "123"
		}
		expect(
			loginFormReducer(
				state as LoginSchema,
				loginFormActions.setUsername("123123")
			)
		).toEqual({ username: "123123" })
	})

	test('set password', () => {
		const state: DeepPartial<LoginSchema> = {
			password: "123"
		}
		expect(
			loginFormReducer(
				state as LoginSchema,
				loginFormActions.setPassword("123123")
			)
		).toEqual({ password: "123123" })
	})
}) 