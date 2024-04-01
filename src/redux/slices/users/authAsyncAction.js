import { createAsyncThunk } from "@reduxjs/toolkit"
import { checkTokenPromise } from "../../../components/componentsHooks/authHooks/useAuthHooks"
import AuthService from "../../../services/authService"

export const loginAsyncAction = createAsyncThunk(
	"isAuth/login",
	async function ({ email, password }, { rejectWithValue }) {
		
		try {
			const res = await AuthService.login(email, password)

			window.localStorage.setItem("inkoAccessToken", res.data.accessToken)

			return { state: !!res.data.accessToken, accessToken: res.data.accessToken }
		}
		catch (e) {
			if (e instanceof Error) {
				console.log( "errorrrrrrrrrrrrrrr")
				return rejectWithValue( e.message)
			}
		}
 	}
)
	 
export const setPassAsyncAction = createAsyncThunk(
	"isAuth/setPass",
	async function ({ email, password }, { rejectWithValue }) {
		try {
			const res = await AuthService.setPassword({ email, password } )
			window.localStorage.setItem("inkoAccessToken", res.data.accessToken)
			
			return { state: !!res.data.accessToken, accessToken: res.data.accessToken }
			
			// console.log(res)
		}
		catch (e) {
			if (e instanceof Error) {
				// console.log( e.message )
				return rejectWithValue( e.message )
			}
		}
	}
)

export const checkTokenAsyncAction = createAsyncThunk(
	"isAuth/checkToken",
	async function ( _, { rejectWithValue }) {
		try {
			const res = await checkTokenPromise();
			// window.localStorage.setItem("inkoAccessToken", res.data.accessToken)
			
			return { state: !!res.data.accessToken, accessToken: res.data.accessToken }
			
		}
		catch (e) {
			if (e instanceof Error) {
				// console.log( "error at get auth action ", e.message)
				return rejectWithValue( e.message )
			}
		}
	}
)

export const logoutAsyncAction = createAsyncThunk(
	"isAuth/logout",
	async function (_, { rejectWithValue }) {
		
		try {
			const res = await AuthService.logout()
			window.localStorage.removeItem("inkoAccessToken")
			// console.log( res )
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue( e.message )
			}
		}
	}
)
