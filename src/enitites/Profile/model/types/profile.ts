import { Country } from "enitites/Country"
import { Currency } from "enitites/Currency";

export interface Profile {
	firstname?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
    id?: string;
}

export interface ProfileSchema {
	data?: Profile,
	isLoading?: boolean,
	error?: string,
    readonly?: true;
}