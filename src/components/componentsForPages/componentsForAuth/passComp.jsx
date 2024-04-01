import { InputComponent } from "../../componentsForStructure/componentsForForm/inputComponent/InputComponent"
import { SetVisiblePassword } from "../../componentsForStructure/componentsForForm/componentForForm"

export const PassComp = ({
	textInputState,
	handleSetVisible,
	handleChangeTextInputState,
}) => {
	
	return (
		<>
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
					className = {`authPage__visiblePassword authPage__visiblePassword_${textInputState.hidden ? "hidden": "visible"}`}
					data = "hidden"
					handleClick={ handleSetVisible }
				/>
			</InputComponent>

			<InputComponent
				title = "Повторите пароль"
				name = "password_"
				placeholder = "Пароль"
				type = { textInputState.hidden_ ? "password" : "text" }
				value = { textInputState.password_ }
				handleChange = { handleChangeTextInputState }
				classNameField = "authPage__passwordTitle"
				classNameInput = "authPage__passwordInput"
			>
				<SetVisiblePassword
					className = {`authPage__visiblePassword authPage__visiblePassword_${textInputState.hidden_ ? "hidden": "visible"}`}
					data = "hidden_"
					handleClick={ handleSetVisible }
				/>
			</InputComponent>
		</>

	)
}