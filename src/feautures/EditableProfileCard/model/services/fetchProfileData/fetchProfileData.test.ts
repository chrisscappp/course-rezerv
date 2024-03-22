import { Currency } from "enitites/Currency"
import { fetchProfileData } from "./fetchProfileData"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { Country } from "enitites/Country"

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

describe("test fetchProfileData", () => {

	test("success", async () => {
		
		const asyncThunk = new TestAsyncThunk(fetchProfileData)
		asyncThunk.api.get.mockReturnValue(Promise.resolve({data: data}))
		const res = await asyncThunk.callThunk()
		
		expect(asyncThunk.api.get).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("fulfilled")
		expect(res.payload).toEqual(data)
	})

	test("rejected", async () => {
		
		const asyncThunk = new TestAsyncThunk(fetchProfileData)
		asyncThunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
		const res = await asyncThunk.callThunk()
		
		expect(asyncThunk.api.get).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toBe("Произошла ошибка при загрузке профиля. Попробуйте обновить страницу")
	})
})