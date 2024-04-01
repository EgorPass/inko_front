import { useState } from "react";
import { useTextInputHook } from "../formHooks/useInputHook";
import AuthService from "../../../services/authService";

import { useDispatch } from "react-redux";
import { setAuth } from "../../../redux/slices/users/isAuthSlice";

export const useAuthHooks = ( initialData ) => {
	
	const [ error, setError ] = useState( { state: false, message: null } )
	const {
		textInputState,
		changeInputState,
		resetTextInputState,
		handleChangeTextInputState,
	} = useTextInputHook( initialData )
	
	const handleClickReset = (e) => {
		e.preventDefault();
		resetTextInputState( )
	}
	
	const handleSetVisible = (e) => {
		e.preventDefault()

		const target = e.target;
			if( !target ) return;
		 
		const data = target.dataset.hide
			if( !data ) return;

		changeInputState( data , !textInputState[data])	
	}
	
	const handleCloseErrorContainer = (e) => {
		e.preventDefault()
		setError({state: false, message: ""})
	}

	return {
		error, setError,
		textInputState,
		resetTextInputState,
		handleClickReset,
		handleSetVisible,
		handleCloseErrorContainer,
		handleChangeTextInputState,
	}
}

export const useSetIsAuthState = () => {
	
	const dispatch = useDispatch();

	return () => {
		dispatch( setAuth("logout") )
	}

}

export const checkTokenPromise = () => {
	return	AuthService.getAuth()
						.catch(e => {
							console.log("access token протух ..................")
							return AuthService.refresh();
						})
						.then(res => {
							console.log("взяли новый access token ..................")
							window.localStorage.setItem("inkoAccessToken", res.data.accessToken)
							return res
						})
						.catch(e => {
							console.log( "нет refresh token, поэтому пока .....................")
							throw Error(e.message )
						})
						.finally(() => {
						})
}