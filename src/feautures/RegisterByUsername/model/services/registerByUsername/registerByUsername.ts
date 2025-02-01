import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "@/entities/User";
import { userActions } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage";
import axios from 'axios'

interface RegisterByUsernameProps {
	id: string;
	username: string;
	password: string;
}

export const registerByUsername = createAsyncThunk(
  	'register/registerByUsername',
  	async (regData: RegisterByUsernameProps, thunkAPI) => {
		try {
			const url = "http://localhost:3003/register"
    		const response = await axios.post<IUser>(url, regData)
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
			return thunkAPI.rejectWithValue("Пользователь с таким логином уже существует")
		}	
  	},
)
// вызывается внутри компонента