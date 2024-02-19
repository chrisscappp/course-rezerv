import { classNames } from "shared/lib/classNames/classNames"
import { useState } from "react";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useCollapsed } from "app/providers/SidebarProvider/lib/useCollapsed";
import { LangSwitcher } from "widgets/LangSwitcher"
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import React from "react";
import cls from "./SideBar.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";
import { RouterPath } from "shared/config/routeConfig/routeConfig";
import HomeIcon from "shared/assets/icons/home-icon.svg"
import AboutIcon from "shared/assets/icons/about-icon.svg"

interface SidebarProps {
	className?: string;
} // доп класс

export const Sidebar = ({ className }: SidebarProps) => {

	const [ collapsed, setCollapsed ] = useState(true)
	const { t } = useTranslation("navbar")

	const onToggle = () => {
		setCollapsed(prev => !prev)
	}

	//const { collapsed, toggleCollapsed } = useCollapsed()

	//console.log("COLLAPSED", collapsed)

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
				<AppLink 
					theme = {AppLinkTheme.PRIMARY} 
					to = {RouterPath.main} 
					className = {cls.item}
				> 
					<HomeIcon className = {cls.icon}/>
					<span className = {cls.link}>
						{t("Главная")}
					</span>
				</AppLink>
				<AppLink 
					theme = {AppLinkTheme.PRIMARY} 
					to = {RouterPath.about}
					className = {cls.item}
				> 
					<AboutIcon className = {cls.icon}/>
					<span className = {cls.link}>
						{t("О сайте")} 
					</span>	
				</AppLink>
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
}