import { IUser } from "enitites/User";

export interface Comment {
	id: string;
    text: string;
	user: IUser;
}