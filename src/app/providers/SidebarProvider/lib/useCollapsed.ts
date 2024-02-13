import { useContext } from "react"
import { SideBarContext } from './SideBarContext'

interface UseCollapsedResult {
	collapsed: boolean;
	toggleCollapsed: () => void;
}

export function useCollapsed(): UseCollapsedResult {
	const { collapsed, setCollapsed } = useContext(SideBarContext)

	const toggleCollapsed = () => {
		setCollapsed(!collapsed)
	}

	return { toggleCollapsed, collapsed }
}