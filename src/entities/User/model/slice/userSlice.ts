import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserSchema } from "../types/user"
import { IUser } from "../types/user"
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage"

const initialState: UserSchema = {
	_inited: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuthData: (state, action: PayloadAction<IUser>) => {
			state.authData = action.payload
		},
		initAuthData: (state) => {
			const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)

			if (user) {
				state.authData = JSON.parse(user)
			}
			state._inited = true
		},
		logout: (state) => {
			state.authData = undefined
			localStorage.removeItem(USER_LOCALSTORAGE_KEY)
		}
	}
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice