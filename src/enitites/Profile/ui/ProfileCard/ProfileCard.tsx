import { classNames, Mods } from "shared/lib/classNames/classNames"
import cls from "./ProfileCard.module.scss"
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "enitites/Profile/model/types/profile";
import { Spinner } from "shared/ui/Spinner/Spinner";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { CurrencySelect, Currency } from "enitites/Currency";
import { Country, CountrySelect } from "enitites/Country";
import React from "react"

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
			<div className = {classNames(cls.ProfileCard, {}, [className, cls.error])}>
				<Text
					text = {error}
					theme = {TextTheme.ERROR}
					align = {TextAlign.CENTER}
				/>
			</div>
		)
	}

	if (isLoading) {
		return (
			<div className = {classNames(cls.ProfileCard, {[cls.loading]: true}, [className])}>
				<Spinner/>
			</div>
		)
	}

	const mods: Mods = {
		[cls.editing]: !readonly
	}

	return (
		<div className = {classNames(cls.ProfileCard, mods, [className])}>
			<div className = {cls.data}>
				{data?.avatar &&
				<div className = {cls.avatarWrapper}>
					<Avatar src = {data?.avatar}/>
				</div>
				}
				<Input
					value = {data?.firstname}
					placeholder = {t("Имя")}
					className = {cls.input}
					onChange = {onChangeFirstname}
					readonly = {readonly}
				/>
				<Input
					value = {data?.lastname}
					placeholder = {t("Фамилия")}
					className = {cls.input}
					onChange = {onChangeLastname}
					readonly = {readonly}
				/>
				<Input
					value = {data?.username}
					placeholder = {t("Логин")}
					className = {cls.input}
					onChange = {onChangeUsername}
					readonly = {readonly}
				/>
				<Input
					value = {data?.age}
					placeholder = {t("Возраст")}
					className = {cls.input}
					onChange = {onChangeAge}
					readonly = {readonly}
				/>
				<Input
					value = {data?.city}
					placeholder = {t("Город")}
					className = {cls.input}
					onChange = {onChangeCity}
					readonly = {readonly}
				/>
				<Input
					value = {data?.avatar}
					placeholder = {t("Аватар")}
					className = {cls.input}
					onChange = {onChangeAvatar}
					readonly = {readonly}
				/>
				<CurrencySelect
					value = {data?.currency}
					onChange = {onChangeCurrency}
					readonly = {readonly}
					className = {cls.input}
				/>
				<CountrySelect
					value = {data?.country}
					onChange = {onChangeCountry}
					readonly = {readonly}
					className = {cls.input}
				/>
			</div>
		</div>
	)
}