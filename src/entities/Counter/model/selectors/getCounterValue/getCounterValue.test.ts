import { getCounterValue } from "./getCounterValue";
import { StateSchema } from "@/app/providers/StoreProvider";

describe('getCounterValue', () => {
	test('get counter state', () => {
		const state: DeepPartial<StateSchema> = {
			counter: { value: 10 }
		} // deppPartial - игнор всех полей и типизация тех, которые необходимы
		expect(getCounterValue(state as StateSchema)).toEqual(10)
	})
}) 