import { useUserLogin } from "../../redux/reduxHooks/useBindeActions";
import { useAuthHooks } from "../../components/componentsHooks/authHooks/useAuthHooks";
import { AuthTemplate } from "../../components/componentsForPages/componentsForAuth/authTemplate";
import { LoginComp } from "../../components/componentsForPages/componentsForAuth/loginComp";

export const LoginPage = () => {
	
	const {
		error, setError,
		textInputState,
		handleClickReset,
		resetTextInputState,
		handleSetVisible,
		handleCloseErrorContainer,
		handleChangeTextInputState,
	} = useAuthHooks({
		login: "",
		password: "",
		hidden: true,
	})

	const setUserLogin = useUserLogin();

	const handleClickSubmit = async (e) => { 
		e.preventDefault();

		const passwordLengthState = textInputState.password.length > 5
		const loginLengthState = textInputState.login.length > 5
		
		if (passwordLengthState && loginLengthState) {
			
			const data = {
				email: textInputState.login,
				password: textInputState.password
			}
			try {
				await setUserLogin( data );
				resetTextInputState()
			}
			catch (e) {
				setError({ state: true, message: e.message })
			}

			// console.log( data )

		}
	}
	
	return (
		<AuthTemplate
			handleClickReset = { handleClickReset }
			handleClickSubmit = { handleClickSubmit }

			error = { error }
			handleCloseErrorContainer = { handleCloseErrorContainer }	
		>
			<LoginComp
				textInputState = { textInputState }
				handleSetVisible = { handleSetVisible }
				handleChangeTextInputState = { handleChangeTextInputState }
			/>
		</AuthTemplate>
	)
}

export default LoginPage