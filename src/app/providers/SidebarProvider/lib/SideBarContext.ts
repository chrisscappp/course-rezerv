import { createContext } from "react";

export interface ISideBarContextProps {
	collapsed?: boolean;
	setCollapsed?: (collapsed: boolean) => void;
}

export const SideBarContext = createContext<ISideBarContextProps>({})
