export interface IUser {
	id: string;
	username: string; 
}

export interface UserSchema {
	authData?: IUser; // если undefined - пользователь не авторизован
}