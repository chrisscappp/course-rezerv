import { counterReducer, counterActions } from "./counterSlice";
import { CounterSchema } from "../types/counterSchema";

describe('counterSlice', () => {
	test('decrement counter action', () => {
		const state: CounterSchema = {
			value: 10
		}
		expect(
			counterReducer(
				state as CounterSchema, counterActions.decrement
			)).toEqual({ value: 9 })
	})

	test('increment counter action', () => {
		const state: CounterSchema = {
			value: 10
		}
		expect(
			counterReducer(
				state as CounterSchema, counterActions.increment
			)).toEqual({ value: 11 })
	})

	test('sholud work with empty state', () => {
		expect(
			counterReducer(
				undefined, counterActions.increment
			)).toEqual({ value: 1 })
	}) // если state undefined, идёт работа с стэйтом внутри слайса
}) 