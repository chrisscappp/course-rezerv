import { StateSchema } from "app/providers/StoreProvider"
import { getProfileValidateErrors } from "./getProfileValidateErrors"
import { ValidateProfileError } from "../../consts/validateProfileError"

describe("test getProfileValidateErrors", () => {
	
	test("get validateErrors", () => {
		const errors: ValidateProfileError[] = [
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY
		]
		const state: DeepPartial<StateSchema> = {
			editableProfile: {
				validateErrors: errors
			}
		}
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors)
	})

	test("empty state", () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined)
	})
})