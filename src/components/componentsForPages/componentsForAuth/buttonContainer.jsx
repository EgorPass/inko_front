import { SimpleButton } from "../../componentsForStructure/componentsForForm/componentForForm";

export const AuthButtonContainer = ({ handleClickReset, handleClickSubmit }) =>  (
	<>
		<SimpleButton
			title = "Сохранить"
			className = "authPage__button authPage__button_save"
			titleClassName="authPage__buttonTitle"
			handleClick = { handleClickSubmit }
		/>
		<SimpleButton
			title = "Очистить"
			className = "authPage__button authPage__button_cancel"
			titleClassName="authPage__buttonTitle"
			handleClick = { handleClickReset }
		/>

	</>
)
