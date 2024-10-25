import axios from "axios"
import { registerByUsername } from "./registerByUsername"
import { TestAsyncThunk } from "shared/lib/tests/TestAsyncThunk/TestAsyncThunk"
import { userActions } from "entities/User"

jest.mock("axios")
const mockedAxios = jest.mocked(axios, true)

describe("test registerByUsername", () => {
	test("success register", async () => {
		const userData = {
			username: "123",
			id: "1"
		}
		const regData = {
			username: "123",
			password: "321",
			id: "3"
		}

		mockedAxios.post.mockReturnValue(Promise.resolve({data: userData}))

		const asyncThunk = new TestAsyncThunk(registerByUsername)
		const res = await asyncThunk.callThunk(regData)

		expect(asyncThunk.dispatch).toHaveBeenCalledTimes(3)
		expect(asyncThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("fulfilled")
		expect(res.payload).toEqual(userData)
	})

	test("rejected register", async () => {
		const regData = {
			username: "123",
			password: "321",
			id: "3"
		}

		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))

		const asyncThunk = new TestAsyncThunk(registerByUsername)
		const res = await asyncThunk.callThunk(regData)

		expect(asyncThunk.dispatch).toHaveBeenCalledTimes(2)
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toBe("Пользователь с таким логином уже существует")
	})
})