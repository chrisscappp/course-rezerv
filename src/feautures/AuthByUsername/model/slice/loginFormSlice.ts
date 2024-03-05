import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from "../types/loginSchema"
import { loginByUsername } from "../services/loginByUsername/loginByUsername"

const initialState: LoginSchema = {
	username: "",
	password: "",
	isLoading: false,
}

export const loginFormSlice = createSlice({
	name: 'loginForm',
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginByUsername.pending, (state) => {
				state.isLoading = true
    		})
			.addCase(loginByUsername.fulfilled, (state, action) => {
				state.error = undefined
				state.isLoading = false
				state.username = action.payload.username
				//state.password = action
    		})
			.addCase(loginByUsername.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
    		})
	}
})

export const { actions: loginFormActions } = loginFormSlice
export const { reducer: loginFormReducer } = loginFormSlice