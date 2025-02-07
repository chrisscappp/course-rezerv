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