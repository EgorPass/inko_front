import $api from "../http"

export default class CourseService {

	

	static async getPdfFileForViewer(courseId, onloadProgress) {
		// console.log( " course id is: ", courseId )
		return $api.get(`/course/getPdfFileForViewer?courseId=${courseId}`, {
			responseType: "blob",
			onDownloadProgress: onloadProgress,
		} )
	}

}

