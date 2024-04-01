import $api from "../http"

export default class AuthService {

	static async setPassword({ email, password } ) {
		return $api.post("/user/setPassword", { email, password })
	}

	static async login(email, password) {
		return $api.post("/user/login", { email, password })
	}

	static async refresh( ) {
		return $api.get( "/user/refresh" )
	}

	static async getAuth() {
		return $api.get( "/user/getAuth")
	}

	static async logout( ) {
		return $api.post( "/user/logout" )
	}

	static async verifyUserToken( token ) {
		return $api.post("/user/verifyUserToken", { token } )
	}
}