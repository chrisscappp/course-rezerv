// type ValueOf<T> = T[keyof T]

// const UserRoles = {
// 	USER: "USER",
// 	ADMIN: "ADMIN",
// 	MANAGER: "MANAGER"
// } as const

// type UserRolesEnum = ValueOf<typeof UserRoles>

export enum UserRoles {
	USER = "USER",
	ADMIN = "ADMIN",
	MANAGER = "MANAGER"
}

export interface IUser {
	id: string;
	username: string; 
	avatar?: string;
	roles: UserRoles[]
}

export interface UserSchema {
	authData?: IUser; // если undefined - пользователь не авторизован
	_inited: boolean;
}