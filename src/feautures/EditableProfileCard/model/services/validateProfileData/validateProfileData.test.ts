import { Currency } from "entities/Currency"
import { validateProfileData } from "./validateProfileData"
import { Country } from "entities/Country"
import { ValidateProfileError } from "../../types/editableProfile"

const data = {
	age: 19,
	city: "aass",
	avatar: "asdfg",
	firstname: "adsa",
	lastname: "xxx",
	username: "sdsdd",
	currency: Currency.EUR,
	country: Country.Belarus
}

describe("test validateErrors", () => {
	test("no errors", async () => {
		const res = validateProfileData(data)

		expect(res).toEqual([])
	})

	test("without first and last name", async () => {
		const res = validateProfileData({...data, firstname: "", lastname: ""})

		expect(res).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
	})

	test("without age", async () => {
		const res = validateProfileData({...data, age: 0})

		expect(res).toEqual([ValidateProfileError.INCORRECT_AGE])
	})

	test("without country", async () => {
		const res = validateProfileData({...data, country: undefined})

		expect(res).toEqual([ValidateProfileError.INCORRECT_COUNTRY])
	})

	test("without no data", async () => {
		const res = validateProfileData()

		expect(res).toEqual([ValidateProfileError.NO_DATA])
	})

	test("without all", async () => {
		const res = validateProfileData({})

		expect(res).toEqual([
			ValidateProfileError.INCORRECT_USER_DATA,
			ValidateProfileError.INCORRECT_AGE,
			ValidateProfileError.INCORRECT_COUNTRY
		])
	})
})