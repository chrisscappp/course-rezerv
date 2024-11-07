import { 
	Listbox as HListBox
} from "@headlessui/react"
import { Fragment, ReactNode } from "react"
import cls from "./ListBox.module.scss"
import { classNames, Mods } from "shared/lib/classNames/classNames"
import { Button, ButtonTheme } from "../Button/Button"
import { HStack } from "../Stack"

export interface ListBoxItem {
	value: string,
	content: ReactNode,
	disabled?: boolean
}

type ListDirection = "top" | "bottom"

interface ListBoxProps {
	className?: string,
	items?: ListBoxItem[],
	value?: string,
	defaultValue?: string,
	onChange: <T extends string>(value: T) => void,
	readonly?: boolean,
	direction?: ListDirection,
	label?: string
}

const mapDirectionClasses: Record<ListDirection, string> = {
	bottom: cls.optionsBottom,
	top: cls.optionsTop
}

export function ListBox(props: ListBoxProps) {
	const { 
		items, 
		value,
		defaultValue,
		onChange,
		readonly,
		direction = "bottom",
		label,
		className
	} = props

	const optionsClasses = [mapDirectionClasses[direction]];

	return (
		<HStack gap="4">
			{label && (<span>{label}</span>)}
			<HListBox 
				className={classNames(cls.ListBox, {}, [className])}
				value={value} 
				onChange={onChange}
				as={"div"}
				disabled={readonly}
			>
				<HListBox.Button as={Fragment}>
					<Button className={cls.triggerBtn} theme={ButtonTheme.OUTLINE_INVERTED}>
						{value ?? defaultValue}
					</Button>
				</HListBox.Button>
				<HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
					{items?.map((item) => (
						<HListBox.Option 
							key={item.value} 
							value={item.value} 
							disabled={item.disabled}
							as={Fragment}
						>
							{({active, selected}) => (
								<li className={classNames(
									cls.item, 
									{
										[cls.active]: active, 
										[cls.unavailable]: item.disabled
									}, 
									[]
								)}>
									{selected && "!"}
									{item.content}
								</li>
							)}
						</HListBox.Option>
					))}
				</HListBox.Options>
			</HListBox>
		</HStack>
	)
}