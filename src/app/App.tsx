import { classNames } from "shared/lib/classNames/classNames"
import { useTheme } from "./providers/ThemeProvider"
import { AppRouter } from "app/providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"
import { BugButton } from "app/providers/ErrorBoundary/index"
import { Suspense } from "react" // для fallback к i18n
import "./styles/index.scss"

const App = () => {

	const { theme } = useTheme()

	return (
		<div className = {classNames("app", {}, [theme])}>
			<Suspense fallback = "">
				<Navbar/>
				<div className = "content-page">
					<Sidebar/>
					<AppRouter/>
				</div>
				<BugButton/>
			</Suspense>
		</div>
	)
}

export default App