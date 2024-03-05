import { getRegisterLogin } from "./getRegisterLogin";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getRegisterLogin', () => {
	test('get register state login', () => {
		const state: DeepPartial<StateSchema> = {
			registerForm: { username: "username" }
		} // deppPartial - игнор всех полей и типизация тех, которые необходимы
		expect(getRegisterLogin(state as StateSchema)).toEqual("username")
	})
}) 