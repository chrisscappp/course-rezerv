import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
	Profile, 
	// возвращамемый тип
	void, 
	// тип аргументов action
	ThunkConfig<string>
	// типизировали thunkAPI
>(
  	'profile/fetchProfileData',
  	async (_, thunkAPI) => {
		// в поле extra лежит тот api который мы передали при создании store
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.get<Profile>("/profile")
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Неверный логин или пароль")
		}	
  	},
)
// вызывается внутри компонента