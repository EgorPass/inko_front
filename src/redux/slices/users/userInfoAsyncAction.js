import { createAsyncThunk } from "@reduxjs/toolkit"
import AdminService from "../../../services/adminSevice"
import UserService from "../../../services/homeService"

export const getUserDataAsyncAction = createAsyncThunk(
	"userInfo/getUserData",
	async function ( user, { rejectWithValue }) {
		// console.log( "inner data in action: ", user )
		try {
			const response = await AdminService.getUserData(  user.id   )
			
			// console.log( "response from async action:", response)
			return {
				user, ...response.data
			}
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue( e.response.status )
			}
		}
	}
)

export const getUserInfoFromTokenAsyncAction = createAsyncThunk(
	"userInfo/getUserInfo",
	async function ( _, { rejectWithValue }) {
		try {
			const inkoAccessToken = window.localStorage.getItem("inkoAccessToken")			
			const response = await UserService.initialHomePage(inkoAccessToken)
			
				return {
					...response.data
				}
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue( e.response.status )
			}
		}
	}
)