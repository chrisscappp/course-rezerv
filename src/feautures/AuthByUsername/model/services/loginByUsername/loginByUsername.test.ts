import axios from "axios"
import { loginByUsername } from "./loginByUsername"
import { userActions, UserRoles } from "@/entities/User/index"
import { TestAsyncThunk } from "@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk"

describe("test loginByUsername", () => {
	/*let dispatch: Dispatch
	let getState: () => StateSchema
	// чтобы передать эти поля в action - их надо замокать

	beforeEach(() => {
		dispatch = jest.fn()
		getState = jest.fn()
	}) // замокали

	test("success login", async () => {
		const userData = { 
			username: "123", 
			id: "1" 
		} // данные которые должны вернуться
		
		mockedAxios.post.mockReturnValue(Promise.resolve({data: userData}))
		// данные которые должны вернуться
		const action = loginByUsername({username: "123", password: "123"})
		// создали asyncAction и положили результат в res
		const res = await action(dispatch, getState, undefined)
		// res - это результат. action с привычными полями payload, type...
		// на основе этих данных можем писать testCases

		expect(dispatch).toHaveBeenCalledTimes(3)
		// dispatch вызывается 3 раза. 1 раз - в момент вызова action
		// 2 раз - при вызове thunkAPI. 3 раз - когда идёт response.data
		expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
		// проверяем вызов dispatch, положим туда action с данными, которые ожидаются после выполенния action
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("fulfilled")
		expect(res.payload).toEqual(userData)
		// проверили вызов метода post
	})

	test("reject login", async () => {		
		mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
		// данные которые должны вернуться
		const action = loginByUsername({username: "123", password: "123"})
		// создали asyncAction и положили результат в res
		const res = await action(dispatch, getState, undefined)
		// res - это результат. action с привычными полями payload, type...
		// на основе этих данных можем писать testCases

		expect(dispatch).toHaveBeenCalledTimes(2)
		// в случае 403 dispatch вызывается 2 раза. 1 раз - в момент вызова action
		// 2 раз - в момент обработки ошибки thunkAPI
		expect(mockedAxios.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toBe("Неверный логин или пароль")
		// проверили вызов метода post
	})*/

	test("success login", async () => {
		const userData = { 
			username: "123", 
			id: "1" ,
			roles: [UserRoles.USER]
		} // данные которые должны вернуться
		
		const asyncThunk = new TestAsyncThunk(loginByUsername)
		asyncThunk.api.post.mockReturnValue(Promise.resolve({data: userData}))
		const res = await asyncThunk.callThunk({ username: "123", password: "123" })
		
		expect(asyncThunk.dispatch).toHaveBeenCalledTimes(3)
		expect(asyncThunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userData))
		expect(asyncThunk.api.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("fulfilled")
		expect(res.payload).toEqual(userData)
	})

	test("rejected login", async () => {
		
		const asyncThunk = new TestAsyncThunk(loginByUsername)
		asyncThunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
		const res = await asyncThunk.callThunk({ username: "123", password: "123" })
		
		expect(asyncThunk.dispatch).toHaveBeenCalledTimes(2)
		expect(asyncThunk.api.post).toHaveBeenCalled()
		expect(res.meta.requestStatus).toBe("rejected")
		expect(res.payload).toBe("Неверный логин или пароль")
	})
})