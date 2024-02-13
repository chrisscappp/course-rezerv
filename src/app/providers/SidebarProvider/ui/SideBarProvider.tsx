import { FC, useMemo, useState } from "react"
import { SideBarContext } from "../lib/SideBarContext"

const SideBarProvider: FC = ({ children }) => {
	
	const [collapsed, setCollapsed] = useState(true)

	const defaultProps = useMemo(() => ({
		collapsed: collapsed,
		setTheme: setCollapsed
	}), [collapsed]) // мемоизируем переменную в памяти

	return (
		<SideBarContext.Provider value={defaultProps}>
			{children}
		</SideBarContext.Provider>
	)
}

export default SideBarProvider
// в этот провайдер будем оборачивать другой компонент
// глобальный доступ с компонента к темам