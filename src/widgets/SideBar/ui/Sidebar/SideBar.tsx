import { classNames } from "@/shared/lib/classNames/classNames"
import { memo, useMemo, useState } from "react"
import { ThemeSwitcher } from "@/feautures/ThemeSwitcher"
import { LangSwitcher } from "@/feautures/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button"
import React from "react"
import cls from "./SideBar.module.scss"
import { getSidebarItems } from "../../model/selectors/getSidebarItems"
import { SideBarItem } from "../SidebarItem/SideBarItem"
import { useSelector } from "react-redux"
import { VStack } from "@/shared/ui/Stack"

interface SidebarProps {
	className?: string;
} // доп класс

export const Sidebar = memo(({ className }: SidebarProps) => {

	const [collapsed, setCollapsed] = useState(true)
	const sideBarItems = useSelector(getSidebarItems)

	const onToggle = () => {
		setCollapsed(prev => !prev)
	}

	const itemsList = useMemo(() => sideBarItems.map((item) => {
		return (
			<SideBarItem
				key = {item.path}
				item = {item}
				collapsed = {collapsed}
			/>
		)
	}), [collapsed, sideBarItems]) // мемоизировали в памяти список ссылок
	// чтобы они не перерисовывались в момент обновления state у Sidebar - он родитель

	return (
		<aside 
			className = {classNames(cls.Sidebar, {[cls.collapsed]: collapsed}, [className])}
			data-testid = "sidebar"
		>
			<Button 
				data-testid = "sidebar-toggle"
				onClick = {onToggle} 
				className = {cls.collapseBtn}
				theme = {ButtonTheme.BACKGROUND_INVERTED}
				size = {ButtonSize.XL}
				square
			>
				{collapsed ? ">" : "<"}
			</Button>
			<VStack className = {cls.links} gap="8">
				{itemsList}
			</VStack>
			<div
				className = {classNames(cls.switchers, {}, [])}
			>
				<ThemeSwitcher/>
				<LangSwitcher 
					className = {cls.lang}
					short = {collapsed}
				/>
			</div>
		</aside>
	)
})