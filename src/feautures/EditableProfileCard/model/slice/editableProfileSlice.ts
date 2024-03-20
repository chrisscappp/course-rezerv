import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile } from "enitites/Profile"
import { EditableProfileSchema } from "../types/editableProfile"
import { fetchProfileData } from "enitites/Profile"
import { updateProfileData } from "../services/updateProfileData/updateProfileData"

const initialState: EditableProfileSchema = {
	data: undefined,
	form: undefined,
	error: undefined,
	isLoading: false,
	readonly: true
}

export const editableProfileSlice = createSlice({
	name: 'editableProfile',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state.form = {
				...state.form,
				...action.payload
			}
		},
		cancelEdit: (state) => {
			state.readonly = true
			state.form = state.data
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProfileData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(fetchProfileData.fulfilled, (
				state,
				action: PayloadAction<Profile>,
			) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload
			})
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(updateProfileData.pending, (state) => {
				state.error = undefined;
				state.isLoading = true;
			})
			.addCase(updateProfileData.fulfilled, (
				state,
				action: PayloadAction<Profile>,
			) => {
				state.isLoading = false;
				state.data = action.payload;
				state.form = action.payload
			})
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
})

export const { actions: editableProfileActions } = editableProfileSlice
export const { reducer: editableProfileReducer } = editableProfileSlice