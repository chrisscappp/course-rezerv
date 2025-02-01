/* eslint-disable i18next/no-literal-string */
import { Country } from "@/entities/Country"
import { EditableProfileCard } from "./EditableProfileCard"
import userEvent from "@testing-library/user-event"
import { Currency } from "@/entities/Currency"
import { Profile } from "@/entities/Profile"
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender"
import { EditableProfileSchema } from "../model/types/editableProfile"
import { screen } from "@testing-library/react"
import { $api } from "@/shared/api/api"
import { UserRoles } from "@/entities/User"

const mockUserId = '1'

const profile: Profile = {
	id: mockUserId,
	firstname: 'admin',
	lastname: 'admin',
	age: 456,
	currency: Currency.USD,
	country: Country.Russia,
	city: 'Moscow',
	username: 'admin123'
}

const initialEditableProfile: EditableProfileSchema = {
	readonly: true,
	data: profile,
	form: profile,
	error: '',
	isLoading: false
}	

const options = {
	initialState: {
		editableProfile: initialEditableProfile,
		user: {
			authData: { id: mockUserId, username: 'admin', roles: [UserRoles.USER] }
		}
	},
	asyncReducers: {
		editableProfile: initialEditableProfile
	}
}

describe('feautures/EditableProfileCard', () => {
	test('Visible cancel button', async () => {
		componentRender(<EditableProfileCard userId={mockUserId}/>, options)
		await userEvent.click(screen.getByTestId("EditableProfilePageHeader.EditButton"))
		expect(screen.getByTestId("EditableProfilePageHeader.CancelButton")).toBeInTheDocument()
	})

	test('If cancel event - edited values return to the previous state', async () => {
		componentRender(<EditableProfileCard userId={mockUserId}/>, options)
		await userEvent.click(screen.getByTestId("EditableProfilePageHeader.EditButton"))
		
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
		await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

		expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
		expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

		await userEvent.click(screen.getByTestId('EditableProfilePageHeader.CancelButton'))

		await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'admin')
		await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'admin')
	})

	test('Validation error if empty field', async () => {
		componentRender(<EditableProfileCard userId={mockUserId}/>, options)
		await userEvent.click(screen.getByTestId("EditableProfilePageHeader.EditButton"))
		
		await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
		
		await userEvent.click(screen.getByTestId('EditableProfilePageHeader.SaveButton'))

		expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
	})

	test('If didnt have validation error - send PUT request to the server', async () => {
		const mockPutRequest = jest.spyOn($api, 'put')
		componentRender(<EditableProfileCard userId={mockUserId}/>, options)
		await userEvent.click(screen.getByTestId("EditableProfilePageHeader.EditButton"))
		
		await userEvent.type(screen.getByTestId("ProfileCard.firstname"), "user")
		
		await userEvent.click(screen.getByTestId('EditableProfilePageHeader.SaveButton'))

		expect(mockPutRequest).toHaveBeenCalled()
		//замокали запрос
	})
})