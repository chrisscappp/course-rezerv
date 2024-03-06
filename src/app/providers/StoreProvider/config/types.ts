import { AnyAction, CombinedState, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { CounterSchema } from "enitites/Counter/index"
import { UserSchema } from "enitites/User"
import { LoginSchema } from "feautures/AuthByUsername/index"
import { RegisterSchema } from "feautures/RegisterByUsername/index"

export interface StateSchema {
	counter: CounterSchema,
	user: UserSchema,

	// Async
	registerForm?: RegisterSchema
	loginForm?: LoginSchema,
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManagerType {
	getReducerMap: () => ReducersMapObject<StateSchema>;
	reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
	add: (key: StateSchemaKey, reducer: Reducer) => void;
	remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager {
	reducerManager: ReducerManagerType
}