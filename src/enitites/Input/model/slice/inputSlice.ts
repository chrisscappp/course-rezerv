import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { InputSchema } from "../types/inputSchema"

const initialState: InputSchema = {
	value: "",
}

export const inputSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		changeValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload
		}
	}
})

export const { actions: inputActions } = inputSlice
export const { reducer: inputReducer } = inputSlice