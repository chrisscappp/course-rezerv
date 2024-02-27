export interface IUser {
	id: number;
	username: string; 
}

export interface UserSchema {
	authData?: IUser; // если undefined - пользователь не авторизован
}