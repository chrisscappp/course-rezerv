import { AnyAction, CombinedState, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { CounterSchema } from "enitites/Counter"
import { UserSchema } from "enitites/User"
import { LoginSchema } from "feautures/AuthByUsername"
import { RegisterSchema } from "feautures/RegisterByUsername"
import { ProfileSchema } from "enitites/Profile"

export interface StateSchema {
	counter: CounterSchema,
	user: UserSchema,

	// Async
	registerForm?: RegisterSchema
	loginForm?: LoginSchema,
	profile?: ProfileSchema
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

