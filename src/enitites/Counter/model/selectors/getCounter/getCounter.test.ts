import { getCounter } from "./getCounter";
import { DeepPartial } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";

describe('getCounter', () => {
	test('get counter state', () => {
		const state: DeepPartial<StateSchema> = {
			counter: { value: 10 }
		} // deppPartial - игнор всех полей и типизация тех, которые необходимы
		expect(getCounter(state as StateSchema)).toEqual({value: 10})
	})
}) 