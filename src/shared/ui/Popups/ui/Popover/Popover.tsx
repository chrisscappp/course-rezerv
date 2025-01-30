import { Popover as HPopover } from "@headlessui/react";
import { ReactNode } from "react";
import { DropdownDirection } from "../../../../types/ui";
import { mapDirectionClasses } from "../../styles/consts";
import cls from "./Popover.module.scss"
import popupCls from "../../styles/popup.module.scss"
import { classNames } from "../../../../lib/classNames/classNames";

interface PopoverProps {
	className?: string,
	direction?: DropdownDirection,
	trigger: ReactNode,
	children: ReactNode
}

export function Popover(props: PopoverProps) {

	const { 
		className,
		trigger,
		direction = "bottom left",
		children
	} = props

	const menuClasses = [mapDirectionClasses[direction]];

	return (
		<HPopover as={"div"} className={classNames(cls.Popover, {}, [className, popupCls.popup])}>
			<HPopover.Button className={popupCls.trigger}>
				{trigger}
			</HPopover.Button>
			<HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
				{children}
			</HPopover.Panel>
		</HPopover>
	)
}