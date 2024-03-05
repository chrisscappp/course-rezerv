import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RegisterSchema } from "../types/registerSchema"
import { registerByUsername } from "../services/registerByUsername/registerByUsername"

const initialState: RegisterSchema = {
	username: "",
	password: "",
	repeatPassword: "",
	isLoading: false,
}

export const registerFormSlice = createSlice({
	name: 'registerForm',
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
		setRepeatPasword: (state, action: PayloadAction<string>) => {
			state.repeatPassword = action.payload
		},
		setError: (state, action: PayloadAction<string>) => {
			state.error = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerByUsername.pending, (state) => {
				state.isLoading = true
    		})
			.addCase(registerByUsername.fulfilled, (state, action) => {
				state.error = undefined
				state.isLoading = false
				state.username = action.payload.username
    		})
			.addCase(registerByUsername.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
    		})
	}
})

export const { actions: registerFormActions } = registerFormSlice
export const { reducer: registerFormReducer } = registerFormSlice