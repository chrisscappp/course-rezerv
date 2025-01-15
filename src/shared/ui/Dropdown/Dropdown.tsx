/* eslint-disable react/jsx-key */
import { Menu } from "@headlessui/react"
import cls from "./Dropdown.module.scss"
import { Fragment, ReactNode } from "react"
import { classNames } from "shared/lib/classNames/classNames"
import { DropdownDirection } from "shared/types/ui"
import { AppLink } from "../AppLink/AppLink"

export interface DropdownItem {
	disabled?: boolean,
	content?: ReactNode,
	onClick?: () => void,
	href?: string
}

interface DropdownProps {
	className?: string,
	items: DropdownItem[],
	trigger: ReactNode,
	direction?: DropdownDirection,
}

const mapDirectionClasses: Record<DropdownDirection, string> = {
	"bottom left": cls.optionsBottomLeft,
	"bottom right": cls.optionsBottomRight,
	"top right": cls.optionsTopRight,
	"top left": cls.optionsTopLeft
}

export function Dropdown(props: DropdownProps) {
	const { 
		className, 
		items, 
		trigger,
		direction = "bottom right"
	} = props

	return (
		<Menu as={"div"} className={classNames(cls.Dropdown, {}, [className])}>
			<Menu.Button className={cls.btn}>{trigger}</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, [mapDirectionClasses[direction]])}>
				{items.map((item) => {
					const content = 
						({ active }: { active: boolean }) => (
							<button
								type={'button'}
								onClick={item.onClick}
								disabled={item.disabled}
								className={classNames(cls.item, { [cls.active]: active, [cls.disabled]: item.disabled }, [])}
							>
								{item.content}
							</button>
						)

					if (item.href) {
						return (
							<Menu.Item 
								as={AppLink}
								disabled={item.disabled}
								to={item.href}
							>
								{content}
							</Menu.Item>
						)
					}

					return (
						<Menu.Item 
							as={Fragment}
							disabled={item.disabled}
						>
							{content}
						</Menu.Item>
					)
				})}
			</Menu.Items>
		</Menu>
	);
}