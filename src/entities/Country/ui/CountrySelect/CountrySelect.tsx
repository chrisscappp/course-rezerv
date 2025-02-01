import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import React, { memo, useCallback }  from "react";
import { SelectOption } from "@/shared/ui/Select/Select";
import { Country } from "../../model/types/country";
import { ListBox } from "@/shared/ui/Popups";

interface CountrySelectProps {
	className?: string;
	value?: string;
	onChange?: (value: Country) => void;
	readonly?: boolean;
}

const countryOptions: SelectOption<Country>[] = [
	{value: Country.Armenia, content: Country.Armenia},
	{value: Country.Belarus, content: Country.Belarus},
	{value: Country.Kazakhstan, content: Country.Kazakhstan},
	{value: Country.Russia, content: Country.Russia},
	{value: Country.Ukraine, content: Country.Ukraine},
]

// динамические массивы и объекты оборачиваем в useMemo

export const CountrySelect = memo((props: CountrySelectProps) => {

	const { 
		className, 
		value,
		onChange,
		readonly
	} = props

	const mods: Mods = {}

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Country)
	}, [onChange])

	return (
		<ListBox
			className = {classNames("", mods, [className])}
			onChange={onChangeHandler}
			value={value}
			defaultValue="Укажите страну"
			label="Укажите страну >"
			items={countryOptions}
			readonly={readonly}
			direction="top right"
		/>
	)
})