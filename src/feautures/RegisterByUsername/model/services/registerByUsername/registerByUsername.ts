import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "@/entities/User";
import { userActions } from "@/entities/User";
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage";
import axios from 'axios'
import { ThunkConfig } from "@/app/providers/StoreProvider";

interface RegisterByUsernameProps {
	id: string;
	username: string;
	password: string;
}

export const registerByUsername = createAsyncThunk<
	IUser,
	RegisterByUsernameProps,
	ThunkConfig<string>
>(
  	'register/registerByUsername',
  	async (regData: RegisterByUsernameProps, thunkAPI) => {
		const { dispatch, rejectWithValue, extra } = thunkAPI
		
		try {
			const url = "http://localhost:3003/register"
    		const response = await axios.post<IUser>(url, regData)
			if (!response.data) {
				throw new Error()
			}

			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			extra.api.interceptors.request.use((config) => {
				config.headers.Authorization = JSON.stringify(response.data)
				return config
			}) // изменили инстанс апи после загрузки токена
			dispatch(userActions.setAuthData(response.data))
			// вызвали асинхронно action для логинизации юсера

			return response.data
			// по умолчанию данные обернутся в fullfiledWithValue
		} catch (e) {
			console.error(e)
			return rejectWithValue("Пользователь с таким логином уже существует")
		}	
  	},
)
// вызывается внутри компонента