import { createAsyncThunk } from "@reduxjs/toolkit"
import UserService from "../../../services/homeService"


export const getUserFromTokenAsyncAction = createAsyncThunk(
	"user/getUser",
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
				return rejectWithValue(e.response.status)
			}
		}
	}
)
