import { useGetStore } from "../redux/reduxHooks/useGetStore"
import { Outlet, useLocation, Navigate } from "react-router-dom"

import "../styles/loginLayout.scss"

const LoginLayout = () => {
	const isAuth = useGetStore("isAuth")
	const inkoAccessToken = window.localStorage.getItem("inkoAccessToken")
		
	const location = useLocation()
	const from = ( inkoAccessToken && location?.state?.from ) || '/'
	const authState = { email: "", title: "", from }
	

	if ( location.pathname === "/auth/setPass" && location.search) {
		try {
			const email = location.search && location.search.slice(location.search.indexOf("=") + 1)
			authState.email = email
			authState.title = "Регистрация"
		}
		catch (e) {
			console.log(e.message)
		}
	}
	else {
		authState.title = "Авторизация"
	}


	if( isAuth.state === "login" || inkoAccessToken ) 
		return <Navigate to = { authState.from } replace />
	else
		return (
		<section
			className = "pegasBody__authBody"
		>
			<header
				className = "pegasBody__authHeader"
			>
				<h2>
					{ authState.title }
				</h2>
			</header>

			<main
				className = "pegasBody__authPage authPage"
			>
				<Outlet context={ authState }  />
			</main>

			<footer
				className = "pegasBody__authFooter"
			>
			</footer>
		</section>
	)
}

export default LoginLayout