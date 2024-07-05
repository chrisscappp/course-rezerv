import { editableProfileActions, editableProfileReducer } from "./editableProfileSlice";
import { EditableProfileSchema, ValidateProfileError } from "../types/editableProfile";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
import { fetchProfileData } from "../services/fetchProfileData/fetchProfileData";

describe('editableProfileSlice', () => {
	test('set readonly', () => {
		const state: DeepPartial<EditableProfileSchema> = {
			readonly: false
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				editableProfileActions.setReadonly(true)
			)
		).toEqual({ readonly: true })
	})
	test("update profile", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			form: {
				firstname: "123"	
			},
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				editableProfileActions.updateProfile({firstname: "1234"})
			)
		).toEqual({ form: { firstname: "1234" } })
	})
	test("cancelEdit", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			readonly: false,
			form: { firstname: "1234" },
			data: { firstname: "123" },
			validateErrors: []
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				editableProfileActions.cancelEdit()
			)
		).toEqual({
			readonly: true,
			form: { firstname: "123" },
			data: { firstname: "123" },
			validateErrors: undefined
		})
	})
	test("service update pending", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: false
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				updateProfileData.pending
			)
		).toEqual({
			isLoading: true,
			validateErrors: undefined
		})
	})
	test("service update fulfilled", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: true,
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				updateProfileData.fulfilled({ firstname: "123" }, "")
			)
		).toEqual({
			isLoading: false,
			validateErrors: undefined,
			readonly: true,
			form: { firstname: "123" },
			data: { firstname: "123" }
		})
	})
	test("service update rejected", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: true,
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				updateProfileData.rejected({ message: "error" } as Error, "", undefined, [ValidateProfileError.SERVER_ERROR])
			)
		).toEqual({
			isLoading: false,
			validateErrors: [ValidateProfileError.SERVER_ERROR]
		})
	})
	test("service fetch pending", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: false,
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				fetchProfileData.pending
			)
		).toEqual({
			isLoading: true,
		})
	})
	test("service fetch fulfilled", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: true,
		}
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				fetchProfileData.fulfilled({ lastname: "123" }, "", "")
			)
		).toEqual({
			isLoading: false,
			data: { lastname: "123" },
			form: { lastname: "123" }
		})
	})
	test("service fetch rejected", () => {
		const state: DeepPartial<EditableProfileSchema> = {
			isLoading: true,
		}
		const errorMsg = "Произошла ошибка при загрузке профиля. Попробуйте обновить страницу"
		expect(
			editableProfileReducer(
				state as EditableProfileSchema,
				fetchProfileData.rejected({ message: "123" } as Error, "", "", errorMsg)
			)
		).toEqual({
			isLoading: false,
			error: errorMsg
		})
	})
}) 