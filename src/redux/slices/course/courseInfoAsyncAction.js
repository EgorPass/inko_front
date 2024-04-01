import { createAsyncThunk } from "@reduxjs/toolkit"
import AdminService from "../../../services/adminSevice"
import { setAuth } from "../users/isAuthSlice"

export const uploadCourseFileAsyncAction = createAsyncThunk(
	'admin/createCourse',
	async function(  {url, file, setUploadProgress } , { rejectWithValue, dispatch } ) {
			// console.log( "file in action >>>>>>>>", file)
		
		try {
			const res = await AdminService.uploadCourseFile( {url, file, setUploadProgress } )
			return res.data
		}
		catch (e) {
			if (e instanceof Error) {
				return rejectWithValue(e.response.status)
			}
		}
	}
)