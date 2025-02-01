import { StateSchema } from "@/app/providers/StoreProvider"
import { getProfileReadonly } from "./getProfileReadonly"

describe("test getProfileReadonly", () => {
	
	test("get readonly", () => {
		const state: DeepPartial<StateSchema> = {
			editableProfile: {
				readonly: true
			}
		}
		expect(getProfileReadonly(state as StateSchema)).toBe(true)
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileReadonly(state as StateSchema)).toEqual(undefined)
	})
})