import { Profile } from "enitites/Profile"

export interface EditableProfileSchema {
	data?: Profile,
    form?: Profile,
	isLoading?: boolean,
	error?: string,
	readonly?: boolean
}