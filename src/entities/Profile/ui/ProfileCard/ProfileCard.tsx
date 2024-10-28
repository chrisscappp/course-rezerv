import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./ProfileCard.module.scss"
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Spinner } from "shared/ui/Spinner/Spinner";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { CurrencySelect, Currency } from "entities/Currency";
import { Country, CountrySelect } from "entities/Country";
import React from "react"
import { HStack, VStack } from "shared/ui/Stack";

interface ProfileCardProps {
	className?: string;
	readonly?: boolean;
	data?: Profile;
	error?: string;
	isLoading?: boolean;
	onChangeFirstname?: (value?: string) => void;
	onChangeLastname?: (value?: string) => void;
	onChangeAge?: (value?: number) => void;
	onChangeAvatar?: (value?: string) => void;
	onChangeCity?: (value?: string) => void;
	onChangeUsername?: (value?: string) => void;
	onChangeCurrency?: (currency: Currency) => void;
	onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {

	const {
		className,
		readonly,
		data,
		error,
		isLoading,
		onChangeFirstname,
		onChangeLastname,
		onChangeAge,
		onChangeAvatar,
		onChangeCity,
		onChangeUsername,
		onChangeCurrency,
		onChangeCountry
	} = props
	const { t } = useTranslation("profile")

	if (error) {
		return (
			<HStack justify="center" max className = {classNames(cls.ProfileCard, {}, [className])}>
				<Text
					text = {error}
					theme = {TextTheme.ERROR}
					align = {TextAlign.CENTER}
				/>
			</HStack>
		)
	}

	if (isLoading) {
		return (
			<HStack justify="center" max className = {classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
				<Spinner/>
			</HStack>
		)
	}

	const mods: Mods = {
		[cls.editing]: !readonly
	}

	return (
		<VStack max gap="16" className = {classNames(cls.ProfileCard, mods, [className])}>
			{data?.avatar &&
				<HStack justify="center" max>
					<Avatar src = {data?.avatar}/>
				</HStack>
			}
			<Input
				value = {data?.firstname}
				placeholder = {t("Имя")}
				onChange = {onChangeFirstname}
				readonly = {readonly}
			/>
			<Input
				value = {data?.lastname}
				placeholder = {t("Фамилия")}
				onChange = {onChangeLastname}
				readonly = {readonly}
			/>
			<Input
				value = {data?.username}
				placeholder = {t("Логин")}
				onChange = {onChangeUsername}
				readonly = {readonly}
			/>
			<Input
				value = {data?.age}
				placeholder = {t("Возраст")}
				onChange = {onChangeAge}
				readonly = {readonly}
			/>
			<Input
				value = {data?.city}
				placeholder = {t("Город")}
				onChange = {onChangeCity}
				readonly = {readonly}
			/>
			<Input
				value = {data?.avatar}
				placeholder = {t("Аватар")}
				onChange = {onChangeAvatar}
				readonly = {readonly}
			/>
			<CurrencySelect
				value = {data?.currency}
				onChange = {onChangeCurrency}
				readonly = {readonly}
			/>
			<CountrySelect
				value = {data?.country}
				onChange = {onChangeCountry}
				readonly = {readonly}
			/>
		</VStack>
	)
}