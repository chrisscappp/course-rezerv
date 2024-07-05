import AboutIcon from "shared/assets/icons/about-icon.svg"
import HomeIcon from "shared/assets/icons/home-icon.svg"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import ArticleIcon from "shared/assets/icons/articles-icon.svg"
import { RouterPath } from "shared/config/routeConfig/routeConfig"
import { getUserAuthData } from "enitites/User"
import { createSelector } from "@reduxjs/toolkit"
import { SideBarItemType } from "../types/sidebar"

export const getSidebarItems = createSelector(
	getUserAuthData,
	(userData) => {
		const sideBarItemList: SideBarItemType[] = [
			{
				Icon: HomeIcon,
				path: RouterPath.main,
				text: "Главная"
			},
			{
				Icon: AboutIcon,
				path: RouterPath.about,
				text: "О сайте"
			}
		]
		if (userData) {
			sideBarItemList.push(
				{
					Icon: ProfileIcon,
					path: RouterPath.profile + userData?.id,
					text: "Профиль",
					authOnly: true
				},
				{
					Icon: ArticleIcon,
					path: RouterPath.articles,
					text: "Статьи",
					authOnly: true
				})
		}
		return sideBarItemList
	}
)

