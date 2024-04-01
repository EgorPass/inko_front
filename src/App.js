import { useState, useEffect } from "react";

import AuthService from "./services/authService";

import { AppRoutes } from "./http/AppRoutes";
import { LoaderContainer } from "./components/componentsForStructure/componentsContainer/loaderContainer";
import { useGetStore } from "./redux/reduxHooks/useGetStore";
import { useUserAuth } from "./redux/reduxHooks/useBindeActions";

function App() {
	// console.log("<<<< App render >>>>> ")
  
	const isAuth = useGetStore( "isAuth" ) 
	const [ loader, setLoader ] = useState( true )
	const setAuth = useUserAuth()

	useEffect(() => {		
			AuthService.refresh()
				.then(res => {
					console.log(res)
					window.localStorage.setItem('inkoAccessToken', res.data.accessToken)
					setAuth( "login" )
				})
				.catch(e => {
					window.localStorage.removeItem('inkoAccessToken')
					setAuth("logout")
				})
				.finally(
					setLoader( false )
				)
	}
	 ,[ ]
	)

	if( loader || isAuth.state === "pending" )
		return <LoaderContainer />
	
	else
		return <AppRoutes />

}

export default App;
