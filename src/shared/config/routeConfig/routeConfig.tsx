import React from "react"
import { AboutPage } from "@/pages/AboutPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { RouteProps } from "react-router-dom"
import { ArticlePage } from "@/pages/ArticlesPage"
import { ArticleDetailsPage } from "@/pages/ArticlesDetailsPage"
import { ArticleEditPage } from "@/pages/ArticleEditPage"
import { ArticleCreatePage } from "@/pages/ArticleCreatePage"
import { AdminPanelPage } from "@/pages/AdminPanelPage"
import { UserRoles } from "@/entities/User"
import { ForbiddenPage } from "@/pages/ForbiddenPage"

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRoles[];
}

export enum AppRoutes {
	MAIN = 'main',
	ABOUT = 'about',
	PROFILE = 'profile',
	ARTICLES = "articles",
	ARTICLES_DETAILS = "articles_details",
	ARTICLES_CREATE = "articles_create",
	ARTICLES_EDIT = "articles_edit",
	ADMIN_PANEL = "admin_panel",
	FORBIDDEN_PAGE = "forbidden_page",
	//last
	NOT_FOUND = 'not_found',
} 

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.MAIN]: "/",
	[AppRoutes.ABOUT]: "/about",
	[AppRoutes.PROFILE]: "/profile/", // + :id
	[AppRoutes.ARTICLES]: "/articles",
	[AppRoutes.ARTICLES_DETAILS]: "/articles/", // + :id
	[AppRoutes.ARTICLES_CREATE]: "/articles/create",
	[AppRoutes.ARTICLES_EDIT]: "/articles/:id/edit", // + :id
	[AppRoutes.ADMIN_PANEL]: "/admin",
	[AppRoutes.FORBIDDEN_PAGE]: "/forbidden",
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
	[AppRoutes.ARTICLES_EDIT]: {
		path: RouterPath.articles_edit,
		element: <ArticleEditPage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_CREATE]: {
		path: RouterPath.articles_create,
		element: <ArticleCreatePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: `${RouterPath.articles_details}:id`,
		element: <ArticleDetailsPage/>,
		authOnly: true
	},
	[AppRoutes.ADMIN_PANEL]: {
		authOnly: true,
		path: RouterPath.admin_panel,
		roles: [UserRoles.ADMIN, UserRoles.MANAGER],
		element: <AdminPanelPage/>
	},
	[AppRoutes.FORBIDDEN_PAGE]: {
		element: <ForbiddenPage/>,
		path: RouterPath.forbidden_page
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: RouterPath.not_found,
		element: <NotFoundPage/>
	}
}