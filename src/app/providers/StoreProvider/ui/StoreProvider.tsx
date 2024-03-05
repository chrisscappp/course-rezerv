import { ReactNode } from "react"
import { Provider } from "react-redux"
import { createReduxStore } from "../config/store"
import { StateSchema } from "../config/types"
import { DeepPartial } from "@reduxjs/toolkit"
import React from "react"

interface StoreProviderProps {
	children?: ReactNode,
	initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {

	const store = createReduxStore(initialState as StateSchema)

	return (
		<Provider store = {store}>
			{children}
		</Provider>
	)
}