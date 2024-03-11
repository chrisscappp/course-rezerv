import { classNames } from "shared/lib/classNames/classNames"
import { memo, useMemo, useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import React from "react";
import cls from "./SideBar.module.scss"
import { SideBarItemList } from "widgets/SideBar/model/items";
import { SideBarItem } from "../SidebarItem/SideBarItem"

interface SidebarProps {
	className?: string;
} // доп класс

export const Sidebar = memo(({ className }: SidebarProps) => {

	const [ collapsed, setCollapsed ] = useState(true)

	const onToggle = () => {
		setCollapsed(prev => !prev)
	}

	const itemsList = useMemo(() => SideBarItemList.map((item) => {
		return (
			<SideBarItem
				key = {item.path}
				item = {item}
				collapsed = {collapsed}
			/>
		)
	}), [collapsed]) // мемоизировали в памяти список ссылок
	// чтобы они не перерисовывались в момент обновления state у Sidebar - он родитель

	return (
		<div 
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
			<div className = {cls.links}>
				{itemsList}
			</div>
			<div
				className = {classNames(cls.switchers, {}, [])}
			>
				<ThemeSwitcher/>
				<LangSwitcher 
					className = {cls.lang}
					short = {collapsed}
				/>
			</div>
		</div>
	)
})