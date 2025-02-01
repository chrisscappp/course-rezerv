import { Menu } from "@headlessui/react"
import cls from "./Dropdown.module.scss"
import { Fragment, ReactNode } from "react"
import { classNames } from "@/shared/lib/classNames/classNames"
import { DropdownDirection } from "@/shared/types/ui"
import { AppLink } from "../../../AppLink/AppLink"
import { mapDirectionClasses } from "../../styles/consts"
import popupCls from "../../styles/popup.module.scss"

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

export function Dropdown(props: DropdownProps) {
	const { 
		className, 
		items, 
		trigger,
		direction = "bottom right"
	} = props

	return (
		<Menu as={"div"} className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
			<Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
			<Menu.Items className={classNames(cls.menu, {}, [mapDirectionClasses[direction]])}>
				{items.map((item, index) => {
					const content = 
						({ active }: { active: boolean }) => (
							<button
								type={'button'}
								onClick={item.onClick}
								disabled={item.disabled}
								className={classNames(cls.item, { [popupCls.active]: active, [popupCls.disabled]: item.disabled }, [])}
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
								key={item.href}
							>
								{content}
							</Menu.Item>
						)
					}

					return (
						<Menu.Item 
							as={Fragment}
							disabled={item.disabled}
							key={`ui-dropdown-${index}`}
						>
							{content}
						</Menu.Item>
					)
				})}
			</Menu.Items>
		</Menu>
	);
}