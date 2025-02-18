import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from "@/app/providers/StoreProvider"
import { Profile } from "@/entities/Profile"
import { USER_LOCALSTORAGE_KEY } from "@/shared/consts/localStorage"

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
			
			if (!response.data) {
				throw new Error("Данные не найдены")
			}

			return response.data
		} catch (e) {
			console.error(e)
			return rejectWithValue("Произошла ошибка при загрузке профиля. Попробуйте обновить страницу")
		}	
  	},
)