import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames"
import cls from "./SideBarItem.module.scss"
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { SideBarItemType } from "../../model/types/sidebar"
import { memo } from "react";
import React from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "enitites/User";

interface SideBarItemProps {
	item: SideBarItemType;
	collapsed: boolean;
}

// memo сравнивает пропсы. обернули компонент в memo - предотвратили изменение дочернего
export const SideBarItem = memo(({ item, collapsed }: SideBarItemProps) => {

	const { t } = useTranslation("sidebar")
	const authData = useSelector(getUserAuthData)

	if (item.authOnly && !authData) {
		return null
	}

	return (
		<AppLink 
			theme = {AppLinkTheme.PRIMARY} 
			to = {item.path}
			className = {classNames(cls.item, { [cls.collapsed]: collapsed })}
		> 
			<item.Icon className = {cls.icon}/>
			<span className = {cls.link}>
				{t(item.text)} 
			</span>	
		</AppLink>
	)
})