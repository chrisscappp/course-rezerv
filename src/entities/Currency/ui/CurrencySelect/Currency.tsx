import { classNames, Mods } from "shared/lib/classNames/classNames"
import React, { memo, useCallback }  from "react";
import { SelectOption } from "shared/ui/Select/Select";
import { Currency } from "../../model/types/currency";
import { ListBox } from "shared/ui/Popups";

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
		<ListBox
			onChange={onChangeHandler}
			items={currencyOptions}
			value={value}
			defaultValue="Укажите валюту"
			label="Укажите валюту >"
			readonly={readonly}
			className = {classNames("", mods, [className])}
			direction="top right"
		/>
	)
})