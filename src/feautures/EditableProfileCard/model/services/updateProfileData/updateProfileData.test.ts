import { Currency } from "@/entities/Currency"
import { updateProfileData } from "./updateProfileData"
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { Country } from "@/entities/Country"
import { ValidateProfileError } from "../../consts/validateProfileError"

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

describe("test updateProfileData", () => {

	test("success", async () => {
		
		const asyncThunk = new TestAsyncThunk(updateProfileData, {
			editableProfile: {
				form: data
			}
		})
		asyncThunk.api.put.mockReturnValue(Promise.resolve({data: data}))
		const res = await asyncThunk.callThunk()
		
		expect(asyncThunk.api.put).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("fulfilled")
		expect(res.payload).toEqual(data)
	})

	test("rejected", async () => {
		const asyncThunk = new TestAsyncThunk(updateProfileData, {
			editableProfile: {
				form: data
			}
		})
		// getState вернёт undefined
		asyncThunk.api.put.mockReturnValue(Promise.resolve({ status: 403  }))
		const res = await asyncThunk.callThunk()
		
		expect(asyncThunk.api.put).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toEqual([ValidateProfileError.SERVER_ERROR])
	})

	test("validate error", async () => {
		const asyncThunk = new TestAsyncThunk(updateProfileData, {
			editableProfile: {
				form: {...data, lastname: ""}
			}
		})
		const res = await asyncThunk.callThunk()
		
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
	})
})