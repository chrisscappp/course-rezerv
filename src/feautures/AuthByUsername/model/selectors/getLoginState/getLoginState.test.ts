import { getLoginState } from "./getLoginState";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getLoginState test', () => {
	test('get loginState', () => {
		const state: DeepPartial<StateSchema> = {
			loginForm: { 
				username: "aboba",
				password: "12345",
				isLoading: false,
				error: ""
			}
		}
		expect(getLoginState(state as StateSchema)).toEqual({ 
			username: "aboba",
			password: "12345",
			isLoading: false,
			error: ""
		})
	})

	test('get empty loginState', () => {
		const state: DeepPartial<StateSchema> = {}
		expect(getLoginState(state as StateSchema)).toEqual(undefined)
	})
}) 