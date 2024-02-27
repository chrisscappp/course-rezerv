/* eslint-disable react/display-name */
import { classNames } from "shared/lib/classNames/classNames"
import { ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef } from "react";
import React, {useState} from "react"
import cls from "./Input.module.scss"

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">

interface InputProps extends HTMLInputProps {
	className?: string;
	value?: string;
	type?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
	autoFocus?: boolean;
} // специальный тип html тега

export const Input = memo((props: InputProps) => {

	const { 
		className,
		value,
		type = 'text',
		placeholder = "your text",
		onChange,
		autoFocus,
		...otherProps
	} = props
	// переопределяем св-ва которые будем использовать кастомно

	const [isFocused, setIsFocused] = useState(false)
	const [caretPosition, setCaretPosition] = useState(0)
	const ref = useRef<HTMLInputElement>(null)
	// заюзали ref чтобы напрямую изменять DOM
	
	useEffect(() => {
		if (autoFocus) {
			setIsFocused(true)
			ref.current?.focus()
			// можем использовать атрибуты input, тк в реф передали HTMLInputElement
		}
	}, [autoFocus])

	const onBlur = () => {
		setIsFocused(false)
	} // выходим из инпута

	const onFocus = () => {
		setIsFocused(true)
	} // нажимаем на инпут

	const onSelect = (e: any) => {
		setCaretPosition(e?.target?.selectionStart || 0)
	} // нажимаем на инпут

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
		setCaretPosition(e.target.value.length)
	}

	return (
		<div 
			className = {classNames(cls.InputWrapper, {}, [className])}
		>
			<div className = {cls.placeholder}>
				{`${placeholder}>`}
			</div>
			<div className = {cls.caretWrapper}>
				<input 
					ref = {ref}
					type = {type} 
					value = {value}
					onChange = {onChangeHandler}
					className = {cls.input}
					onBlur = {onBlur}
					onFocus = {onFocus}
					onSelect = {onSelect}
					{...otherProps}
				/>
				{isFocused && (
					<span
						className = {cls.caret}
						style = {{left: `${caretPosition * 7}px`}}
					/>
				)}
			</div>
		</div>
	)
})