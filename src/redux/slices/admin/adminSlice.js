import { createSlice } from "@reduxjs/toolkit"
import {
	getDataForAdminAsyncAction,
	createUserAsyncAction, updateUserAsyncAction, removeUserAsyncAction,
	createCourseAsyncAction, updateCourseAsyncAction, removeCourseAsyncAction,
	createSubjectAsyncAction, updateSubjectAsyncAction,	removeSubjectAsyncAction,
} from "./adminAsyncAction"



const initialState = {
		users: [],
		courses: [],
		subjects: [],
		error: null,
		loading: false 
		
}

export const { actions: { resetAdminState, resetAdminError, setAdminError }, reducer: adminState } = createSlice({
	name: "admin",
	initialState,
	reducers: {
		resetAdminState: (state, ) => {
			return initialState
		},
		resetAdminError: (state) => {
			return {
				...state,
				error: null
			}
		},
		setAdminError: {
			prepare: (error) => {
				return {
					payload: error
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					error: payload
				}
			}
		}

	},
	extraReducers: (builder) => {
		builder
			.addCase(getDataForAdminAsyncAction.pending, adminDataPending)
			.addCase(getDataForAdminAsyncAction.rejected, adminRejected)
			.addCase(getDataForAdminAsyncAction.fulfilled, adminDataFulfilled)
	
		
			.addCase(createUserAsyncAction.pending, adminDataPending)
			.addCase( createUserAsyncAction.rejected, adminRejected )
			.addCase( createUserAsyncAction.fulfilled, createUserFulfilled )
		
			.addCase(updateUserAsyncAction.pending, adminDataPending)
			.addCase( updateUserAsyncAction.rejected, adminRejected )
			.addCase( updateUserAsyncAction.fulfilled, updateUserFulfiled )
	
			.addCase(removeUserAsyncAction.pending, adminDataPending)
			.addCase( removeUserAsyncAction.rejected, adminRejected )
			.addCase(removeUserAsyncAction.fulfilled, removeUserFulfilled)
		
			.addCase(updateCourseAsyncAction.pending, adminDataPending)
			.addCase( updateCourseAsyncAction.rejected, adminRejected )
			.addCase( updateCourseAsyncAction.fulfilled, updateCourseFulfilled )
		
			.addCase(removeCourseAsyncAction.pending, adminDataPending)
			.addCase( removeCourseAsyncAction.rejected, adminRejected )
			.addCase( removeCourseAsyncAction.fulfilled, removeCourseFulfilled )
	
			.addCase(createCourseAsyncAction.pending, adminDataPending)
			.addCase( createCourseAsyncAction.rejected, adminRejected )
			.addCase(createCourseAsyncAction.fulfilled, createCourseFulfiled)
		
			.addCase(removeSubjectAsyncAction.pending, adminDataPending)
			.addCase( removeSubjectAsyncAction.rejected, adminRejected )
			.addCase(removeSubjectAsyncAction.fulfilled, removeSubjectFulfilled)
		
			.addCase(updateSubjectAsyncAction.pending, adminDataPending)
			.addCase( updateSubjectAsyncAction.rejected, adminRejected )
			.addCase( updateSubjectAsyncAction.fulfilled, updateSubjectFulfilled )

			.addCase(createSubjectAsyncAction.pending, adminDataPending)
			.addCase( createSubjectAsyncAction.rejected, adminRejected )
			.addCase( createSubjectAsyncAction.fulfilled, createSubjectFulfilled )
	}
})

function adminDataPending(state, { payload }) {
	return {
		...state,
		loading: true,
	}
}

function createSubjectFulfilled(state, { payload }) {

	return {
		...state,
		subjects: [...state.subjects, payload],
		loading: false,
	}
}

function updateSubjectFulfilled(state, { payload }) {
	
	return {
		...state,
		subjects: state.subjects.map(it => {
			if( it.id === payload.id) return payload
			return it
		}),
		loading: false,
	}
}

function removeSubjectFulfilled(state, { payload }) {

	return {
		...state,
		subjects: state.subjects.filter(it => it.id !== payload.subjectId),
		loading: false,
	}
}

function createCourseFulfiled(state, { payload }) {
	console.log( "payload at create course:", payload )
	
	return {
		...state,
		courses: [ ...state.courses, payload ],
		loading: false,
	}
}

function removeCourseFulfilled(state, { payload }) {

	return {
		...state,
		courses: state.courses.filter(it => it.id !== payload),
		loading: false,
	}
}

function updateCourseFulfilled(state, { payload }) {
	console.log( "payload at update course:", payload )
	
	return {
		...state,
		courses: state.courses.map(it => {
			if( it.id === payload.id) return payload
			return it
		}),
		loading: false,
	}
}

function removeUserFulfilled( state, { payload } ) {
	return {
		...state,
		users: state.users.filter( it => it.id !== payload ),
		loading: false,
	}
}

function updateUserFulfiled(state, { payload }) {
	
	// console.log( payload)

	return {
		...state,
		users: state.users.map( it => {
			if( it.id === payload.id ) return payload
			return it
		}),
		loading: false,
	}
}

function createUserFulfilled(state, data) {	
	
	// console.log( "paylaod at creator :",  data)

	if (!data.payload) return {
		...state,
		loading: false,
		error: "пользователь не создан :("
	}
	else return {
		...state,
		users: [ ...state.users, data.payload ],
		loading: false,
	}
}

// работает на adminPage
function adminDataFulfilled( state, { payload } )  {
	
	// console.log( "загрузка данных о всех пользователях, курсах и предметах", payload )
	
	// console.log( payload)

	const { users, courses, subjects } = payload ? payload : { users: [], courses: [], subjects:[]};
	
	// console.log( "get user where full data at slice ", users )

	return {
		...state,
		users: [ ...users ],
		courses: [ ...courses ],
		subjects: [ ...subjects ],
		loading: false,
	}		
}

function adminRejected( state, { payload } ) {
	

	return {
		...initialState,
		error: payload,
		loading: false,
	}
}