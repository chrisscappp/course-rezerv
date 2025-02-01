import { classNames, Mods } from "@/shared/lib/classNames/classNames"
import cls from "./Select.module.scss"
import React, { ChangeEvent, useMemo }  from "react";

export interface SelectOption<T extends string> {
	value: T;
	content: string;
}

// тип T расширяет string
interface SelectProps<T extends string> {
	className?: string;
	label?: string;
	options?: SelectOption<T>[];
	value?: T;
	onChange?: (value: T) => void;
	readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {

	const { 
		className, 
		label, 
		options,
		onChange,
		value,
		readonly
	} = props

	const mods: Mods = {}

	const optionList = useMemo(() => {
		return options?.map((item) => {
			return (
				<option
					key = {item.value}
					value = {item.value}
				>
					{item.content}
				</option>
			)
		})
	}, [options])

	const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
		onChange?.(e.target.value as T)
	}

	return (
		<div className = {classNames(cls.SelectWrapper, mods, [className])}>
			{
				label &&
				(<span className = {cls.label}>
					{label + ">"}
				</span>)
			}
			<select
				className = {cls.select}
				value = {value}
				onChange = {onChangeHandler}
				disabled = {readonly}
			>
				{optionList}
			</select>
		</div>
	)
}