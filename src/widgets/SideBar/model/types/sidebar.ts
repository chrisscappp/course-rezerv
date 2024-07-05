export interface SideBarItemType {
	Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
	text: string;
	path: string;
	authOnly?: boolean;
}