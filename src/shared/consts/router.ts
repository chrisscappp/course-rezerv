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

export const getRouteMain = () => '/'
export const getRouteAbout = () => "/about"
export const getRouteProfile = (id: string) => `/profile/${id}`
export const getRouteArticles = () => "/articles"
export const getRouteArticleDetails = (id: string) => `/about/${id}`
export const getRouteArticlesCreate = () => "/articles/create"
export const getRouteArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRouteAdminPanel = () => '/admin'
export const getRouteForbidden = () => "/forbidden";