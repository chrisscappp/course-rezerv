import { classNames } from "@/shared/lib/classNames/classNames"
import { AppRouter } from "@/app/providers/router"
import { Navbar } from "@/widgets/Navbar"
import { Sidebar } from "@/widgets/SideBar"
import { Suspense, useEffect } from "react" // для fallback к i18n
import "./styles/index.scss"
import { useTheme } from "./providers/ThemeProvider"
import { useDispatch, useSelector } from "react-redux"
import { getUserInited, userActions } from "@/entities/User"

const App = () => {

	const { theme } = useTheme()
	const dispatch = useDispatch()
	const initedAuthData = useSelector(getUserInited)

	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])
	// AppRouter рендериться раньше чем данные об авторизации. добавим флаг

	return (
		<div className = {classNames("app", {}, [theme])}>
			<Suspense fallback = "">
				<Navbar/>				
				<div className = "content-page">
					<Sidebar/>
					{initedAuthData && <AppRouter/>}
				</div>
			</Suspense>
		</div>
	)
}

export default App