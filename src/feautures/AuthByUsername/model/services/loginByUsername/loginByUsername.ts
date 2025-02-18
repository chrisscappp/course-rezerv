import { createAsyncThunk } from '@reduxjs/toolkit'
import { IUser } from "@/entities/User";
import { userActions } from "@/entities/User"
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { $api } from "@/shared/api/api";

interface LoginByUsernameProps {
	username: string;
	password: string;
}

export const loginByUsername = createAsyncThunk<
	IUser, 
	// возвращамемый тип
	LoginByUsernameProps, 
	// тип аргументов action
	ThunkConfig<string>
	// типизировали thunkAPI
>(
  	'login/loginByUsername',
  	async (authData, thunkAPI) => {
		// в поле extra лежит тот api который мы передали при создании store
		const {
			dispatch,
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.post<IUser>("/login", authData)
			if (!response.data) {
				throw new Error()
			}
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
			extra.api.interceptors.request.use((config) => {
				config.headers.Authorization = JSON.stringify(response.data)
				return config
			}) // изменили инстанс апи после загрузки токена
			dispatch(userActions.setAuthData(response.data))
			return response.data
			// по умолчанию данные обернутся в fullfiledWithValue
		} catch (e) {
			console.error(e)
			return rejectWithValue("Неверный логин или пароль")
		}	
  	},
)
// вызывается внутри компонента