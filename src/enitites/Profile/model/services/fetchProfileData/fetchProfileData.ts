import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfileData = createAsyncThunk<
	Profile, 
	string, 
	ThunkConfig<string>
>(
  	'profile/fetchProfileData',
  	async (profileId, thunkAPI) => {
		const {
			extra,
			rejectWithValue
		} = thunkAPI

		try {
    		const response = await extra.api.get<Profile>(`/profile/${profileId}`)

			console.log("RES", response)
			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке профиля. Попробуйте обновить страницу")
		}	
  	},
)