import { classNames, Mods } from "shared/lib/classNames/classNames"
import React, { memo, useCallback }  from "react";
import { Select, SelectOption } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";

interface CurrencySelectProps {
	className?: string;
	value?: string;
	onChange?: (value: Currency) => void;
	readonly?: boolean;
}

const currencyOptions: SelectOption<Currency>[] = [
	{value: Currency.RUB, content: Currency.RUB},
	{value: Currency.EUR, content: Currency.EUR},
	{value: Currency.USD, content: Currency.USD},
]

// динамические массивы и объекты оборачиваем в useMemo

export const CurrencySelect = memo((props: CurrencySelectProps) => {

	const { 
		className, 
		value,
		onChange,
		readonly
	} = props

	const mods: Mods = {}

	const onChangeHandler = useCallback((value: string) => {
		onChange?.(value as Currency)
	}, [onChange])

	return (
		<Select 
			className = {classNames("", mods, [className])}
			label = {"Укажите валюту"}
			options = {currencyOptions}
			value = {value}
			onChange = {onChangeHandler}
			readonly = {readonly}
		/>
	)
})