import { CounterSchema } from "enitites/Counter/index"
import { InputSchema } from "enitites/Input/index"

export interface StateSchema {
	counter: CounterSchema,
	input: InputSchema
}