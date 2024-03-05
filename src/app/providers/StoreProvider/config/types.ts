import { CounterSchema } from "enitites/Counter/index"
import { UserSchema } from "enitites/User"
import { LoginSchema } from "feautures/AuthByUsername/index"
import { RegisterSchema } from "feautures/RegisterByUsername/index"

export interface StateSchema {
	counter: CounterSchema,
	user: UserSchema,
	loginForm?: LoginSchema,
	registerForm?: RegisterSchema
}