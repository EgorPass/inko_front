import { Outlet } from "react-router-dom"
import HeaderField from "../componentsForHeader/headerField"

import "../../../styles/adminPage/headerContainer.scss"
import "../../../styles/adminPage/adminPage.scss"

export const Layout = ( ) => {

	return (
		<section
			className = "pegasBody__adminBody"
		>

			<HeaderField />
				
			<Outlet />

			<footer
				className = "pegasBody__adminFooter"
			>
				footer
			</footer>
		</section>
	)
} 
