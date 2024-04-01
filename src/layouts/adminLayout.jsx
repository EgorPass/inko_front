import { useEffect } from "react"
import { useGetStore } from "../redux/reduxHooks/useGetStore"
import { Navigate, useLocation } from "react-router-dom"
import { useGetUserFromToken, useUserState } from "../redux/reduxHooks/useBindeActions"

import { Layout } from "../components/componentsForPages/componentsForAdminLayout/layout"

import { LoaderContainer } from "../components/componentsForStructure/componentsContainer/loaderContainer"


const AdminLayout = () => {
	// console.log( "render AdminLayout......................")
	
	const user = useGetStore( 'user')
	const isAuth = useGetStore( "isAuth" )
	const getUserFromToken = useGetUserFromToken()
	const { resetUserAction } = useUserState()

	const location = useLocation();
	
	useEffect(() => {
		
		// console.log( "render Admin layout from useEffect ---------")
		if (user.id === null) {	
			getUserFromToken()
		}

		return () => {
			resetUserAction();
		}
	}
		, [ ]
	)

	if (isAuth.state === "logout") {
		return <Navigate to = "/auth/login" replace state = { { from: location.pathname + location.search, user: user.id } } />
	}
	if (isAuth.state === "pending" || user.id === null ) return <LoaderContainer />
	if (isAuth.state === "login")
		return (
			<Layout
				// location = { location }
			/>
		)
}

export default AdminLayout