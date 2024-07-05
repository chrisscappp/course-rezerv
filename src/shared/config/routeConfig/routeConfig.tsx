import React from "react"
import { AboutPage } from "pages/AboutPage"
import { MainPage } from "pages/MainPage"
import { NotFoundPage } from "pages/NotFoundPage"
import { ProfilePage } from "pages/ProfilePage"
import { RouteProps } from "react-router-dom"
import { ArticlePage } from "pages/ArticlesPage"
import { ArticleDetailsPage } from "pages/ArticlesDetailsPage"

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
}

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
    NOT_FOUND = 'not_found',
	PROFILE = 'profile',
	ARTICLES = "articles",
	ARTICLES_DETAILS = "articles_details",
} 

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.PROFILE]: "/profile/", // + :id
	[AppRoutes.ARTICLES]: "/articles",
	[AppRoutes.ARTICLES_DETAILS]: "/articles/", // + :id
	//last
	[AppRoutes.NOT_FOUND]: "*"
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: RouterPath.main,
		element: <MainPage/>
	},
	[AppRoutes.ABOUT]: {
		path: RouterPath.about,
		element: <AboutPage/>
	},
	[AppRoutes.PROFILE]: {
		path: `${RouterPath.profile}:id`,
		element: <ProfilePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES]: {
		path: RouterPath.articles,
		element: <ArticlePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: `${RouterPath.articles_details}:id`,
		element: <ArticleDetailsPage/>,
		authOnly: true
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: RouterPath.not_found,
		element: <NotFoundPage/>
	}
}