import { createAsyncThunk } from "@reduxjs/toolkit"
import AdminService from "../../../services/adminSevice"

import { setCourseInfo } from "../course/courseInfoSlice";
import { setSubjectInfo } from "../subject/subjectInfoSlice";

export const getDataForAdminAsyncAction = createAsyncThunk(
	"admin/getDataForAdmin",
	async function (_, { rejectWithValue, dispatch }) {
		try {
			const users = await AdminService.getAllUsers();
			const corAndSub = await AdminService.getDefaultCourses()
			const obj = {
				users: users.data,
				courses: corAndSub.data.courses,
				subjects: corAndSub.data.subjects
			}
				return obj 
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const createUserAsyncAction = createAsyncThunk(
	"admin/createUser",
	async function( {dataName, dataRoles, dataCourses}, {rejectWithValue, dispatch } ) {
		try {
			const res = await AdminService.registration( dataName, dataRoles, dataCourses )
			return res.data 
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	} 
)

export const updateUserAsyncAction = createAsyncThunk(
	"admin/updateUser",
	async function( {dataName, dataRoles, dataCourses}, {rejectWithValue, dispatch} ) {
		try {
			const res = await AdminService.updateUserData( dataName, dataRoles, dataCourses )
			return res.data 
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	} 
)

export const removeUserAsyncAction = createAsyncThunk(
	'admin/removeUser',
	async function (userId, { rejectWithValue, dispatch }) {
		try {
			await AdminService.removeUser(userId)
			return userId
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const createCourseAsyncAction = createAsyncThunk(
	'admin/createCourse',
	async function( { course, fileName }, { rejectWithValue, dispatch } ) {
		
		// console.log( "course in action: ", course  )
		try {
			const res = await AdminService.createCourse({ course, fileName	})
			dispatch( setCourseInfo( res.data ) )
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const updateCourseAsyncAction = createAsyncThunk(
	'admin/updateCourse',
	async function ( { course, fileName }, { rejectWithValue, dispatch }) {
		try {
			const res = await AdminService.updateCourse( {	course, fileName } )			
			dispatch( setCourseInfo( res.data ) )
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const removeCourseAsyncAction = createAsyncThunk(
	"admin/removeCourse",
	async function (courseId, { rejectWithValue, dispatch }) {
		try {
			await AdminService.removeCourse( courseId )
			return courseId
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const createSubjectAsyncAction = createAsyncThunk(
	"admin/createSubject",
	async function ( { subject, description }, { rejectWithValue,dispatch }) {
		try {
			const res = await AdminService.createSubject( { subject, description } )
			dispatch( setSubjectInfo( res.data ) )
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const updateSubjectAsyncAction = createAsyncThunk(
	"admin/updateSubject",
	async function ({ subject, description }, { rejectWithValue, dispatch }) {
		try {
			const res = await AdminService.updateSubject({ subject, description })
			dispatch( setSubjectInfo( res.data ) )
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)

export const removeSubjectAsyncAction = createAsyncThunk(
	"admin/removeSubject",
	async function (subjectId, { rejectWithValue, dispatch }) {
		try {			
			const res = await AdminService.removeSubject(subjectId)
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)