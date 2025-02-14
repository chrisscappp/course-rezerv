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
import { 
	AppRoutes, 
	getRouteAbout, 
	getRouteAdminPanel, 
	getRouteArticleDetails, 
	getRouteArticleEdit, 
	getRouteArticles, 
	getRouteArticlesCreate, 
	getRouteForbidden, 
	getRouteMain, 
	getRouteProfile,
} from "@/shared/consts/router"
import { AppRoutesProps } from "@/shared/types/router"

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
	[AppRoutes.MAIN]: {
		path: getRouteMain(),
		element: <MainPage/>
	},
	[AppRoutes.ABOUT]: {
		path: getRouteAbout(),
		element: <AboutPage/>
	},
	[AppRoutes.PROFILE]: {
		path: getRouteProfile(':id'),
		element: <ProfilePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES]: {
		path: getRouteArticles(),
		element: <ArticlePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_EDIT]: {
		path: getRouteArticleEdit(':id'),
		element: <ArticleEditPage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_CREATE]: {
		path: getRouteArticlesCreate(),
		element: <ArticleCreatePage/>,
		authOnly: true
	},
	[AppRoutes.ARTICLES_DETAILS]: {
		path: getRouteArticleDetails(':id'),
		element: <ArticleDetailsPage/>,
		authOnly: true
	},
	[AppRoutes.ADMIN_PANEL]: {
		authOnly: true,
		path: getRouteAdminPanel(),
		roles: [UserRoles.ADMIN, UserRoles.MANAGER],
		element: <AdminPanelPage/>
	},
	[AppRoutes.FORBIDDEN_PAGE]: {
		path: getRouteForbidden(),
		element: <ForbiddenPage/>
	},
	//last
	[AppRoutes.NOT_FOUND]: {
		path: "*",
		element: <NotFoundPage/>
	}
}