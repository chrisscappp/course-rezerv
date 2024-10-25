export interface IUser {
	id: string;
	username: string; 
	avatar?: string;
}

export interface UserSchema {
	authData?: IUser; // если undefined - пользователь не авторизован
	_inited: boolean;
}