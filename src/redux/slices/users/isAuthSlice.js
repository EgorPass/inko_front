import { createSlice } from "@reduxjs/toolkit";
import {
	loginAsyncAction, logoutAsyncAction, setPassAsyncAction, checkTokenAsyncAction
} from "./authAsyncAction";

export const { actions: { setAuth }, reducer: isAuth} = createSlice({
	name: "isAuth",
	initialState: {
		state: "pending",
		loading: false,
		// accessToken: "",
		error: null,
	},
	reducers: {
		setAuth: {
			prepare: (val) => ( { payload: val } ),
			reducer: (prev, { payload }) => {
				// console.log( payload )
				return {
					...prev,
					state: payload,
					
								// accessToken: payload.accessToken
							}
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase( loginAsyncAction.pending, pending )
			.addCase( loginAsyncAction.rejected, rejected )
			.addCase( loginAsyncAction.fulfilled, login)
			
			.addCase( setPassAsyncAction.pending, pending )
			.addCase( setPassAsyncAction.rejected, rejected )
			.addCase( setPassAsyncAction.fulfilled, login )

			.addCase( logoutAsyncAction.pending, pending )
			.addCase( logoutAsyncAction.rejected, rejected )
			.addCase( logoutAsyncAction.fulfilled, logout )
	
			.addCase( checkTokenAsyncAction.pending, pendingRefreshToken )
			.addCase( checkTokenAsyncAction.rejected, rejectRefreshToken )
			.addCase( checkTokenAsyncAction.fulfilled, login )
			
	}
})


function pendingRefreshToken(state, { payload }) {
	return {
		state: "pending",
		loading: true,
		error: "accessToken/error"
	}
}

function rejectRefreshToken(state, { payload }) {
	
	console.log("rejected refresh token")
	
	return {
		state: "logout",
		loading: false,
		// accessToken: "",
		error: "refreshToken/error"
	}
}

function rejected( state,  action ) {
	return {
		state: "logout",
		loading: false,
		// accessToken: "",
		error: action.payload,
	}
}

function login( state, { payload } ) {
	return {
		state: "login",
		loading: false,
		// accessToken: payload.accessToken,
		error: null,
	}
}

function logout() {
	
	console.log( "logout >>>>>>>>>>>>>>>>>.")

	return {
		state: "logout",
		loading: false,
		// accessToken: "",
		error: null,
	}
}

function pending( state, { payload } ) {
	return {
		state: "pending",
		loading: true,
		// accessToken: "",
		error: null
	}

}