import $api from "../http"

export default class AdminService {

	static async registration( dataName, dataRoles, dataCourses ) {
		return $api.post("/user/registration", { dataName, dataRoles, dataCourses } )
	}

	static async getAllUsers() {
		return $api.get("/user/getAllUsers")
	}
	
	static async getDefaultCourses() {
		return $api.get("/course/getCourses")
	}

	static async getUserData(id) {
		return $api.post(	"/user/getUserData",	{ id } )
	}

	static async updateUserData( dataName, dataRoles, dataCourses ) {
		return $api.post("/user/updateUserData", { dataName, dataRoles, dataCourses } )
	}

	static async removeUser(userId) {
		return $api.post("/user/removeUser", { userId })
	}
	
	
	static async removeCourse(courseId ) {
		return $api.post('/course/removeCourse', { courseId })
	}

	static async updateCourse({
		course, //description,
		fileName,
	}) {
		return $api.post(
			'/course/updateCourse',
			{
				course, //description,
				fileName,
			},
		)
	}
	
	static async createCourse({
		course, //description,
		fileName
	}) {
		return $api.post(
			"/course/createCourse",
			{
				course, //description,
				fileName,
			},
		)
	}

	static async uploadDescription({ description, setUploadProgress, path }) {
		return $api.post(path, { description }, {
			onUploadProgress: (ProgressEvent) => {
				let progress = Math.round(
					ProgressEvent.loaded / ProgressEvent.total * 100
				)
				setUploadProgress( progress )
			},
			// responseType: "arraybuffer",
			method: "post",
			headers: {
				// "Content-Type": "multipart/form-data",
				"Content-Type": "text/html",
			}
		})
	}

	static async getDescription(path, type, id ) {
		return $api.get( path ) //`/course/getDescription?type=${type}&id=${id}` )
	}
	

	static async uploadCourseFile({ file,  setUploadProgress }) {
		return $api.post("/course/uploadCourseFile", { file  }, {
			onUploadProgress: (ProgressEvent) => {
				let progress = Math.round(
					ProgressEvent.loaded / ProgressEvent.total * 100
				)
				setUploadProgress( progress )
			},
			// responseType: "arraybuffer",
			method: "post",
			headers: {
				"Content-Type": "multipart/form-data",
				// "Content-Type": file.type
			
			}
		} )
	}

	static async deleteFileFromUpload() {
		return $api.delete( '/course/deleteFileFromUpload')
	}

	static async deleteCourseFile({ course, isCreateCourse }) {
		console.log( "isCreateCourse in axios", isCreateCourse)
		return $api.post(`/course/deleteCourseFile`, {  course, isCreateCourse } )
	}

	static async resetCourseFile({ course, isCreateCourse }) {
		return $api.post("/course/resetCourseFile", { course, isCreateCourse } )
	}
	
	static async createSubject({
		subject,
		// description
	}) {
		return $api.post("/course/createSubject", {
			subject,
			// description
		})
	}

	static async updateSubject({
		subject,
		// description
	}) {
		return $api.post("/course/updateSubject", {
			subject,
			// description
		})	
	}

	static async removeSubject(subjectId) {
		return $api.post("/course/removeSubject", { subjectId })
	}


}