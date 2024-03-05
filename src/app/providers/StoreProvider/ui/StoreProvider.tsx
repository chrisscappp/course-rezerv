import { ReactNode } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../config/store"
import { StateSchema } from "../config/types"
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit"
import React from "react"

interface StoreProviderProps {
	children?: ReactNode,
	initialState?: DeepPartial<StateSchema>,
	asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = ({ children, initialState, asyncReducers }: StoreProviderProps) => {

	const store = createReduxStore(initialState as StateSchema, asyncReducers as ReducersMapObject)

	return (
		<Provider store = {store}>
			{children}
		</Provider>
	)
}