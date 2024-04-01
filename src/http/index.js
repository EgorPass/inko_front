import axios from "axios"
export const API_URL = "http://localhost:3001/api"
const $api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
	headers: {
		"Access-Controll-Allow-Origin": "http://localhost:3001/api", //"localhost:3001",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
	}
})

$api.interceptors.request.use((config) => {	
	
	console.log( "отправка access token перед нужным запросом")

	config.headers.Authorization = `Bearer ${localStorage.getItem("inkoAccessToken")}`
	return config
 })


$api.interceptors.response.use(
	(config) => {
		return config
	}, 

	async (error) => {
		window.localStorage.removeItem("inkoAccessToken")

		const originalRequest = error.config;

		if (error.response.status === 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true;
		
			try {
				const res = await axios.get(`${API_URL}/user/refresh`, { withCredentials: true })
				window.localStorage.setItem('inkoAccessToken', res.data.accessToken)
				return $api.request( originalRequest )
			}
			catch (e) {
				console.log("не авторизован")
			}
		}
		throw error
	}
 )


 export default $api 