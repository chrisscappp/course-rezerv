import { StateSchema } from "@/app/providers/StoreProvider"
import { getProfileForm } from "./getProfileForm"
import { Currency } from "@/entities/Currency"
import { Country } from "@/entities/Country"
import { Profile } from "@/entities/Profile"

describe("test getProfileForm selector", () => {
	
	test("get form", () => {
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
				form: data
			}
		}
		expect(getProfileForm(state as StateSchema)).toEqual(data)
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileForm(state as StateSchema)).toEqual(undefined)
	})
})