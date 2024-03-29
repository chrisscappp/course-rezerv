import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "enitites/Profile";

export const fetchProfileData = createAsyncThunk<
	Profile, 
	void, 
	ThunkConfig<string>
>(
  	'profile/fetchProfileData',
  	async (_, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.get<Profile>("/profile")

			if (!response.data) {
				throw new Error("123")
			}

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке профиля. Попробуйте обновить страницу")
		}	
  	},
)