import $api from "../http"

export default class UserService {

	static async initialHomePage( inkoAccessToken ) {
		return $api.post("/user/homePage", { inkoAccessToken })
	}

	static async getCoursesForUser( userCourses ) {
		
		// console.log( "get from home page", userCourses )

		return $api.post('/user/getCoursesForUser', { userCourses } )
	}
}