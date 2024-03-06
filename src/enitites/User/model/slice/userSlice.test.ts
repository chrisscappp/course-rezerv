import { userActions, userReducer } from "./userSlice";
import { UserSchema, IUser } from "../types/user";
import { DeepPartial } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "shared/consts/localStorage";

describe("test userSlice", () => {
	test("test case setAuthData", () => {
		const state: DeepPartial<UserSchema> = {}
		const authData: IUser = {
			id: "1",
			username: "123"
		}

		expect(userReducer(
			state as UserSchema, 
			userActions.setAuthData(authData)
		)).toEqual({ authData: authData })
	})

	test("test case initAuthData", () => {
		const state: DeepPartial<UserSchema> = {
			authData: {
				id: "1",
				username: "123"
			}
		}

		expect(userReducer(
			state as UserSchema,
			userActions.initAuthData()
		)).toEqual(state)
	})

	test("test case empty initAuthData", () => {
		const state: DeepPartial<UserSchema> = {}

		expect(userReducer(
			state as UserSchema,
			userActions.initAuthData()
		)).toEqual({})
	})

	test("test case logout", () => {
		const state: DeepPartial<UserSchema> = {
			authData: {
				id: "1",
				username: "123"
			}
		}

		expect(userReducer(
			state as UserSchema,
			userActions.logout()
		)).toEqual({})
	})
})
