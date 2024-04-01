import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	subject: null,
	loading: false,
	error: null,
}

export const { actions: { setSubjectInfo, resetSubjectInfo, setSubjectLoading }, reducer: subjectInfo } = createSlice({
	name: "subjectInfo",
	initialState,
	reducers: {
		setSubjectInfo: {
			prepare: (subject) => {
				return {
					payload: subject
				}
			},
			reducer: (state, { payload }) => {
				return {
					...state,
					subject: payload
				}
			}
		},
		resetSubjectInfo: (state) => {
			return { ...initialState }
		},
		setSubjectLoading: {
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
		}
	}
})