import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import { setAuth } from "../slices/users/isAuthSlice"

import {
	loginAsyncAction, logoutAsyncAction, setPassAsyncAction,	checkTokenAsyncAction
} from "../slices/users/authAsyncAction"

import { resetAdminState, resetAdminError, setAdminError } from "../slices/admin/adminSlice"

import {
	getDataForAdminAsyncAction,
	createUserAsyncAction, updateUserAsyncAction, removeUserAsyncAction,
	createCourseAsyncAction, updateCourseAsyncAction, removeCourseAsyncAction, 
	createSubjectAsyncAction, removeSubjectAsyncAction, updateSubjectAsyncAction
} from "../slices/admin/adminAsyncAction"

import { getUserDataAsyncAction, getUserInfoFromTokenAsyncAction } from "../slices/users/userInfoAsyncAction"

import { getUserFromTokenAsyncAction } from "../slices/user/userAsyncAction"

import { resetUserAction, resetUserErrorAction, setUserError } from "../slices/user/userSlice"

import { setUserLoading, resetUserDataAction, resetUserError,  } from "../slices/users/userInfoSlice"

import { setCourseInfo, resetCourseInfo, setCourseLoading } from "../slices/course/courseInfoSlice"
import { setSubjectInfo, resetSubjectInfo, setSubjectLoading } from "../slices/subject/subjectInfoSlice"


///////////////////// ADMIN //////////////////////////
export const useAdminStateActions = () => {
	const dispatch = useDispatch()
	return bindActionCreators( {resetAdminState, resetAdminError, setAdminError }, dispatch )
}

/////////////////////// user /////////////////////////

export const useGetUserFromToken = () => {
	const dispatch = useDispatch();
	return bindActionCreators(  getUserFromTokenAsyncAction, dispatch )
}


export const useUserState = () => {
	const dispatch = useDispatch();
	return bindActionCreators( { resetUserAction, resetUserErrorAction, setUserError } , dispatch )
}

/////////////////// AUTH ACTION /////////////////////
export const useUserAuth = () => {
	const dispatch = useDispatch();
	return bindActionCreators( setAuth, dispatch )
}

export const useUserLogin = () => {
	const dispatch = useDispatch();
	return bindActionCreators( loginAsyncAction, dispatch )
}

export const useUserLogout = () => {
	const dispatch = useDispatch();
	return bindActionCreators( logoutAsyncAction, dispatch )
}

export const useUserSetPass = () => {
	const dispatch = useDispatch();
	return bindActionCreators( setPassAsyncAction, dispatch )
}

export const useCheckToken = () => {
	const dispatch = useDispatch();
	return bindActionCreators( checkTokenAsyncAction, dispatch )
}


/////////////////// USER INFO //////////////////////////////
export const useGetDataForAdmin = () => {
	const dispatch = useDispatch();
	return bindActionCreators( getDataForAdminAsyncAction, dispatch )
}

export const useAdminUsersStateActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(
		{
			createUserAsyncAction,
			updateUserAsyncAction,
			removeUserAsyncAction
		}, dispatch )
}

export const useUserInfoActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(
		{
			setUserLoading,
			resetUserError,
			resetUserDataAction,
			getUserDataAsyncAction,
		}, dispatch)
	
}

export const useGetUserData = () => {
	const dispatch = useDispatch();
	return bindActionCreators(  getUserDataAsyncAction, dispatch )
}

export const useGetUserInfoFromToken = () => {
	const dispatch = useDispatch();
	return bindActionCreators(  getUserInfoFromTokenAsyncAction, dispatch )
}


export const useResetUserDataAction = () => {
	const dispatch = useDispatch();
	return bindActionCreators({ resetUserDataAction, resetUserError }, dispatch )
}

//////////////////////  COURSES  //////////////////////////
export const useAdminCoursesStateActins = () => {
	const dispatch = useDispatch();
	return bindActionCreators(
		{
			updateCourseAsyncAction,
			createCourseAsyncAction,
			removeCourseAsyncAction
		}, dispatch)
}

export const useCourseInfoAction = () => {
	const dispatch = useDispatch();
	return bindActionCreators( { setCourseInfo, resetCourseInfo, setCourseLoading } , dispatch )
}

////////////////////// SUBJECTS ////////////////////////////////////////
export const useAdminSubjectsStateActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(
		{
			removeSubjectAsyncAction,
			updateSubjectAsyncAction,
			createSubjectAsyncAction
		}, dispatch)

}

export const useSubjectInfoAction = () => {
	const dispatch = useDispatch();
	return bindActionCreators(
		{
			setSubjectInfo,
			resetSubjectInfo,
			setSubjectLoading
		}, dispatch)
}