import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { RouteProps } from "react-router-dom"
import React from "react"

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
    NOT_FOUND = 'not_found',
	PROFILE = 'profile'
} 

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.PROFILE]: "/profile",
	//last
	[AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.MAIN]: {
		path: RouterPath.main,
		element: <MainPage/>
	},
	[AppRoutes.ABOUT]: {
		path: RouterPath.about,
		element: <AboutPage/>
	},
	[AppRoutes.PROFILE]: {
		path: RouterPath.profile,
		element: <ProfilePage/>
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: RouterPath.not_found,
		element: <NotFoundPage/>
	}
}