import { StateSchema } from "app/providers/StoreProvider"
import { getProfileData } from "./getProfileData"
import { Currency } from "entities/Currency"
import { Country } from "entities/Country"
import { Profile } from "entities/Profile"

describe("test getProfileData selector", () => {
	
	test("get data", () => {
		const data: Profile = {
			age: 19,
			city: "aass",
			avatar: "sdfgyuytre",
			firstname: "adsa",
			lastname: "xxx",
			username: "sdsdd",
			currency: Currency.EUR,
			country: Country.Belarus
		}
		const state: DeepPartial<StateSchema> = {
			editableProfile: {
				data: data
			}
		}
		expect(getProfileData(state as StateSchema)).toEqual(data)
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileData(state as StateSchema)).toEqual(undefined)
	})
})