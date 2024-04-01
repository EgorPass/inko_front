import { InputComponent } from "../../componentsForStructure/componentsForForm/inputComponent/InputComponent"
import { SetVisiblePassword } from "../../componentsForStructure/componentsForForm/componentForForm"

export const LoginComp = ({
	textInputState, 
	handleSetVisible,
	handleChangeTextInputState

 }) => {
	
	return (
		<>
			<InputComponent
				title = "Логин"
				name = "login"
				placeholder = "email"
				type = "text"
				value = { textInputState.login }
				handleChange = { handleChangeTextInputState }
				classNameField = "authPage__loginTitle"
				classNameInput = "authPage__loginInput"
			/>

			<InputComponent
				title = "Пароль"
				name = "password"
				placeholder = "Пароль"
				type = { textInputState.hidden ? "password" : "text" }
				value = { textInputState.password }
				handleChange = { handleChangeTextInputState }
				classNameField = "authPage__passwordTitle"
				classNameInput = "authPage__passwordInput"
			>
				<SetVisiblePassword
					className={`authPage__visiblePassword authPage__visiblePassword_${textInputState.hidden ? "hidden": "visible"}`}
					data = "hidden"
					handleClick={ handleSetVisible }
				/>
			</InputComponent>
		</>
	)
}