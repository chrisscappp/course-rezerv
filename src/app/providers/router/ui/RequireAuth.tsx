import { getUserAuthData } from "entities/User"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RouterPath } from "shared/config/routeConfig/routeConfig"

interface RequireAuthProps {
	children: JSX.Element
}

export function RequireAuth({ children }: RequireAuthProps) {
	let auth = useSelector(getUserAuthData)
	let location = useLocation()

	if (!auth) {
		return <Navigate to = {RouterPath.main} state = {{from: location}} replace/>
	}

	return children
}