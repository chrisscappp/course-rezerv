import React from "react"
import { AboutPage } from "@/pages/AboutPage"
import { MainPage } from "@/pages/MainPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProfilePage } from "@/pages/ProfilePage"
import { ArticlePage } from "@/pages/ArticlesPage"
import { ArticleDetailsPage } from "@/pages/ArticlesDetailsPage"
import { ArticleEditPage } from "@/pages/ArticleEditPage"
import { ArticleCreatePage } from "@/pages/ArticleCreatePage"
import { AdminPanelPage } from "@/pages/AdminPanelPage"
import { UserRoles } from "@/entities/User"
import { ForbiddenPage } from "@/pages/ForbiddenPage"
import { AppRoutes, RouterPath } from "@/shared/consts/router"
import { AppRoutesProps } from "@/shared/types/router"

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