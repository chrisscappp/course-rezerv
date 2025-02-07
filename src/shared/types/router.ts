// eslint-disable-next-line alexandroo4-plugin/fsd-layers-imports-beer-insomnia
import { UserRoles } from "@/entities/User"
import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
	authOnly?: boolean;
	roles?: UserRoles[];
}