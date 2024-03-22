import { StateSchema } from "app/providers/StoreProvider"
import { getProfileIsLoading } from "./getProfileIsLoading"

describe("test getProfileIsLoadingselector", () => {
	
	test("get loading", () => {
		const state: DeepPartial<StateSchema> = {
			editableProfile: {
				isLoading: true
			}
		}
		expect(getProfileIsLoading(state as StateSchema)).toBe(true)
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileIsLoading(state as StateSchema)).toEqual(undefined)
	})
})