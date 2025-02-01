import { getLoginIsLoading } from "./getLoginIsLoading";
import { StateSchema } from "@/app/providers/StoreProvider";

describe('getLoginIsLoading test', () => {
	test('get isLoading', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { isLoading: true }
		}
		expect(getLoginIsLoading(state as StateSchema)).toEqual(true)
	})

	test('get empty isLoading', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginIsLoading(state as StateSchema)).toEqual(false)
	})
}) 