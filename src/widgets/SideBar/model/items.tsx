import AboutIcon from "shared/assets/icons/about-icon.svg"
import HomeIcon from "shared/assets/icons/home-icon.svg"
import ProfileIcon from "shared/assets/icons/profile-icon.svg"
import { RouterPath } from "shared/config/routeConfig/routeConfig";

export interface SideBarItemType {
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
	text: string;
	path: string;
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
		text: "Профиль"
	},
]