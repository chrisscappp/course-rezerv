import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "enitites/User";
import { userActions } from "enitites/User/index"
import { USER_LOCALSTORAGE_KEY } from "shared/consts/localStorage";
import axios from 'axios'

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk(
  	'login/loginByUsername',
  	async (authData: LoginByUsernameProps, thunkAPI) => {
		try {
			const url = "http://localhost:3003/login"
    		const response = await axios.post<IUser>(url, authData)
			if (!response.data) {
				throw new Error()
			}

			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			thunkAPI.dispatch(userActions.setAuthData(response.data))
			// вызвали асинхронно action для логинизации юсера

			return response.data
			// по умолчанию данные обернутся в fullfiledWithValue
		} catch (e) {
			console.error(e)
			return thunkAPI.rejectWithValue("Неверный логин или пароль")
		}	
  	},
)
// вызывается внутри компонента