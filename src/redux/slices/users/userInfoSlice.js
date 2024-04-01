import { createSlice } from "@reduxjs/toolkit"
import { getUserDataAsyncAction, getUserInfoFromTokenAsyncAction } from "./userInfoAsyncAction"
import { rolesId } from "../../../components/stockData/stockDataForAdmin/stockDataForAdmin"

const initialState = {
	user: null,
	userCourses: [],
	userRoles: [ 1000001 ],
	loading: false,
	error: null,
}

export const { actions: {
	// setUserInfo,
	setUserLoading,
	resetUserDataAction,
	resetUserError,
}, reducer: userInfo } = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		setUserLoading: {
			prepare: (cool) => {
				return {
					payload: cool
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					loading: payload,
				}
			}
		},
		resetUserDataAction: (state) => {
			// console.log( "reset user ")
			return { ...initialState }
		},
		resetUserError: (state) => {
			return {
				...state,
				error: null
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserDataAsyncAction.pending, userInfoPending)
			.addCase(getUserDataAsyncAction.rejected, userInfoRejected)
			.addCase(getUserDataAsyncAction.fulfilled, userInfoFulfilled)

			.addCase(getUserInfoFromTokenAsyncAction.pending, userInfoPending)
			.addCase(getUserInfoFromTokenAsyncAction.rejected, userInfoRejected)
			.addCase(getUserInfoFromTokenAsyncAction.fulfilled, userInfoFulfilled)
	}
})

function userInfoPending(state, { payload }) {
	return {
		...state,
		error: null,
		loading: true,
	}
}

function userInfoRejected(state, { payload }) {
	
	return {
		...state,
		error: payload,
		loading: false,
	}
}

function userInfoFulfilled(state, { payload }) {
	// console.log( "клик на преподе и загрузка его инфы:", payload )

	// console.log( "payload from slice: " , payload )

	let { user, userRoles, userCourses } = payload

	// console.log( "data at reducer:", payload)

	userCourses = userCourses.map( ( { courseId } ) => courseId )
	userRoles = Object.entries(userRoles)
		.filter( ( [ title, value ] ) => title !== "id" && title !== "userId" && value !== false )
		.map( ( [ title ] ) => rolesId[title] ).sort( (x, y) => y - x)
	
	return {
		user,
		userCourses,
		userRoles,
		error: null,
		loading: false,
	}
}