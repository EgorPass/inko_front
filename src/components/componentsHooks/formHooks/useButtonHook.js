import { useUserAuth} from "../../../redux/reduxHooks/useBindeActions"
import { checkTokenPromise } from "../authHooks/useAuthHooks"

export const useButtonHook = ( setLoader ) => {
	
	const setAuth = useUserAuth() 
	const wrapperClick = ( callback ) => {
		return async (e) => {
			e.preventDefault()
					let res 
			setLoader(true);
			try {
				res =	await checkTokenPromise()
				console.log( "res from click wrapper:", res )
				setLoader(false)
				callback(e); 
			}
			catch (e) {
				console.log( "отказ по отклику ", res)
				setAuth("logout")
			}
			finally {

			}
		}
	}

	return {
		wrapperClick,
	}
}