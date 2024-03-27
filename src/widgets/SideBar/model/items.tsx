import AboutIcon from "shared/assets/icons/about-icon.svg"
import HomeIcon from "shared/assets/icons/home-icon.svg"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import ArticleIcon from "shared/assets/icons/articles-icon.svg"
import { RouterPath } from "shared/config/routeConfig/routeConfig";

export interface SideBarItemType {
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
	text: string;
	path: string;
	authOnly?: boolean;
}

export const SideBarItemList: SideBarItemType[] = [
	{
		Icon: HomeIcon,
		path: RouterPath.main,
		text: "Главная"
	},
	{
		Icon: AboutIcon,
		path: RouterPath.about,
		text: "О сайте"
	},
	{
		Icon: ProfileIcon,
		path: RouterPath.profile,
		text: "Профиль",
		authOnly: true
	},
	{
		Icon: ArticleIcon,
		path: RouterPath.articles,
		text: "Статьи",
		authOnly: true
	}
]