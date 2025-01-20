import { UserRoles } from "../consts/userRoles";

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