import { useOutletContext, Navigate, useLocation} from "react-router-dom"
import { useAuthHooks } from "../../components/componentsHooks/authHooks/useAuthHooks";

import { AuthTemplate } from "../../components/componentsForPages/componentsForAuth/authTemplate";
import { PassComp } from "../../components/componentsForPages/componentsForAuth/passComp";

import { useUserSetPass } from "../../redux/reduxHooks/useBindeActions";

const PasswordPage = () => {
	
	const { email } = useOutletContext();
	const location = useLocation();
	const setPasswordForUser = useUserSetPass()

	const {
		error, setError,
		textInputState,
		handleClickReset,
		resetTextInputState,
		handleSetVisible,
		handleCloseErrorContainer,
		handleChangeTextInputState,
	} = useAuthHooks({
		password: "",
		hidden: true,
		password_: "",
		hidden_: true,
	})

	const handleClickSubmit = async (e) => {
		e.preventDefault();

		const lengthState = textInputState.password.length > 5
		const matchState = textInputState.password === textInputState.password_

		if (!matchState) {
			setError({ state: true, message: "Пароли не совпадают" })
		}
		else if (!lengthState) {
			setError({ state: true, message: "Пароль слишком короткий" })
		}
		else if (lengthState & matchState) {
			const data = {
				email,
				password: textInputState.password
			}
			try {
				await	setPasswordForUser( data )
				resetTextInputState()
			}
			catch (e) {
				setError({ state: true, message: "Произошла ошибка при регистрации"} )
			}
		}
		
	}

	// не работает переход, остаётся на той же странице авторизации и показывается в консоле ошибку.
	if (error.state) {
		return <Navigate to = "/errorPage" replace state = { { error }} />
	}
	else
	return (

		<AuthTemplate
			handleClickReset = { handleClickReset }
			handleClickSubmit = { handleClickSubmit }

			error = { error }
			handleCloseErrorContainer = { handleCloseErrorContainer }	
		>
			<PassComp
				textInputState = { textInputState }
				handleSetVisible = { handleSetVisible }
				handleChangeTextInputState = { handleChangeTextInputState }
			/>
		</AuthTemplate>
	)

}

export default PasswordPage