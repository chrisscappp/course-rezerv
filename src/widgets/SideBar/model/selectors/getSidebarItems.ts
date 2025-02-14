import AboutIcon from "@/shared/assets/icons/about-icon.svg"
import HomeIcon from "@/shared/assets/icons/home-icon.svg"
import ProfileIcon from "@/shared/assets/icons/profile-icon.svg"
import ArticleIcon from "@/shared/assets/icons/articles-icon.svg"
import { getUserAuthData } from "@/entities/User";
import { createSelector } from "@reduxjs/toolkit"
import { SideBarItemType } from "../types/sidebar"
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/consts/router";

export const getSidebarItems = createSelector(
	getUserAuthData,
	(userData) => {
		const sideBarItemList: SideBarItemType[] = [
			{
				Icon: HomeIcon,
				path: getRouteMain(),
				text: "Главная"
			},
			{
				Icon: AboutIcon,
				path: getRouteAbout(),
				text: "О сайте"
			}
		]
		if (userData) {
			sideBarItemList.push(
				{
					Icon: ProfileIcon,
					path: getRouteProfile(userData?.id),
					text: "Профиль",
					authOnly: true
				},
				{
					Icon: ArticleIcon,
					path: getRouteArticles(),
					text: "Статьи",
					authOnly: true
				})
		}
		return sideBarItemList
	}
)

