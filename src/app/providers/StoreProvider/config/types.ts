import { CounterSchema } from "enitites/Counter/index"
import { UserSchema } from "enitites/User"

export interface StateSchema {
	counter: CounterSchema,
	user: UserSchema
}