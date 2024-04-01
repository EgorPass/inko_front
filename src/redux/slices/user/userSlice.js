import { createSlice } from "@reduxjs/toolkit"
import { getUserFromTokenAsyncAction, getUserInfoForUsersCoursesAsyncAction } from "./userAsyncAction"
import { rolesId } from "../../../components/stockData/stockDataForAdmin/stockDataForAdmin"

const initialState = {
	id: null,
	userCourses: [ ],
	userRoles: [ 1000001 ],
	loading: false,
	error: null,
}

export const { actions: { resetUserAction, resetUserErrorAction, setUserError }, reducer: user } = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserError: {
			prepare: (error) => {
				return {
					payload: error
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					error: payload,
				}
			}
		},
		resetUserAction: (state) => {
			// console.log( "reset user ")
			return { ...initialState }
		},
		resetUserErrorAction: (state) => {
			return {...initialState }
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserFromTokenAsyncAction.pending, userInfoPending)
			.addCase(getUserFromTokenAsyncAction.rejected, userInfoRejected)
			.addCase(getUserFromTokenAsyncAction.fulfilled, userInfoFulfilled)
	}
})

function userInfoPending(state, { payload }) {
	
	return {
		...initialState,
		loading: true,
	}

}

function userInfoRejected(state, { payload }) {
	
	return {
		...initialState,
		error: payload,
	}

}

function userInfoFulfilled(state, { payload }) {
	
	let { user, userRoles, userCourses } = payload
	
	let id = user.id
	userCourses =userCourses.map( ({ courseId }) => courseId )
	userRoles = Object.entries(userRoles)
		.filter( ( [ title, value ] ) => title !== "id" && title !== "userId" && value !== false )
		.map(([title]) => rolesId[title]).sort((x, y) => y - x)
		
	return {
		...initialState,
		id,	userCourses, userRoles,
	}

}
