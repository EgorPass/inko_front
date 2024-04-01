import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	course: null,
	loading: false,
	error: null,
}

export const { actions: { setCourseInfo, resetCourseInfo, setCourseLoading }, reducer: courseInfo } = createSlice({
	name: "courseInfo",
	initialState,
	reducers: {
		setCourseInfo: {
			prepare: (course) => {
				return {
					payload: course
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					course: payload
				}
			}
		},
		resetCourseInfo: (state) => {
			return { ...initialState }
		},
		setCourseLoading: {
			prepare: (cool) => {
				return {
					payload: cool
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					loading: payload
				}
			}
		},
		
	},
})