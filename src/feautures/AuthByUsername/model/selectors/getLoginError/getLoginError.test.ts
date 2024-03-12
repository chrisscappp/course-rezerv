import { getLoginError } from "./getLoginError";
import { StateSchema } from "app/providers/StoreProvider";

describe('getLoginError test', () => {
	test('get error', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { error: "error" }
		}
		expect(getLoginError(state as StateSchema)).toEqual("error")
	})

	test('get empty error', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginError(state as StateSchema)).toEqual(undefined)
	})
}) 