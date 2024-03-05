import { classNames } from "shared/lib/classNames/classNames"
import { AppRouter } from "app/providers/router"
import { Navbar } from "widgets/Navbar"
import { Sidebar } from "widgets/SideBar"
import { BugButton } from "app/providers/ErrorBoundary/index"
import { Suspense, useEffect } from "react" // для fallback к i18n
import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProvider"
import { useDispatch } from "react-redux"
import { userActions } from "enitites/User"

const App = () => {

	const { theme } = useTheme()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

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