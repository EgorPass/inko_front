import { configureStore,combineReducers } from '@reduxjs/toolkit';

import { isAuth } from '../slices/users/isAuthSlice';

import { user } from "../slices/user/userSlice"

import { adminState } from "../slices/admin/adminSlice"

import { userInfo } from '../slices/users/userInfoSlice';
import { courseInfo } from '../slices/course/courseInfoSlice';
import { subjectInfo } from '../slices/subject/subjectInfoSlice';

const reducer = combineReducers({ 
	isAuth,
	user,
	adminState,
	userInfo,
	courseInfo,
	subjectInfo,
})

export const store = configureStore({
	reducer
});
