import { useLocation } from "react-router-dom"
import { Div } from "../../components/componentsForStructure/componentsContainer/containerComponents"



const ErrorPage = () => {
	
	const location = useLocation()

	// const error = location?.state?.error || ("Произошла ошибка" + location.pathname.includes("auth") ? " при авторизации" : " по не придвиденным причинам" )

	return (
		<Div
		>
			{ "что то пошло не так " }
		</Div>
	)
}

export default ErrorPage