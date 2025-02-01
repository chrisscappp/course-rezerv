import { StateSchema } from "@/app/providers/StoreProvider"
import { getProfileError } from "./getProfileError"

describe("test getProfileError selector", () => {
	
	test("error", () => {
		const state: DeepPartial<StateSchema> = {
			editableProfile: {
				error: "error"
			}
		}
		expect(getProfileError(state as StateSchema)).toBe("error")
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileError(state as StateSchema)).toEqual(undefined)
	})
})