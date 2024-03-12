import { AnyAction, CombinedState, Reducer, ReducersMapObject } from "@reduxjs/toolkit"
import { CounterSchema } from "enitites/Counter"
import { UserSchema } from "enitites/User"
import { LoginSchema } from "feautures/AuthByUsername"
import { RegisterSchema } from "feautures/RegisterByUsername"
import { ProfileSchema } from "enitites/Profile"
import { AxiosInstance } from "axios"
import { NavigateOptions } from "react-router-dom"
import { To } from "history"

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

export interface ThunkExtraArg {
	api: AxiosInstance,
	navigate?: (to: To, options?: NavigateOptions) => void,
}

export interface ThunkConfig<T> {
	rejectValue: T,
	extra: ThunkExtraArg
} // тип для thunkAPI
