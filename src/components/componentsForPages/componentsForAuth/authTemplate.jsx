import { Div, Form } from "../../componentsForStructure/componentsContainer/containerComponents"
import { ErrorContainer } from "../../componentsForStructure/componentsContainer/errorContainer"
import { AuthButtonContainer  } from "./buttonContainer"

export const AuthTemplate = ({
	children,

	handleClickReset,
	handleClickSubmit,

	error,
	handleCloseErrorContainer,
}) => {
	
	return (
		<Form
			className = "authPage__formContainer"
		>
			<Div
				className = "authPage__inputsContainer"
			>
				{
					error.state && (
						<ErrorContainer
							message = { error.message }
							handleClickCloseModal = { handleCloseErrorContainer }
						/>
					)
				}
				{ children }
			</Div>
			<Div
				className = "authPage__buttonContainer"
			>
				<AuthButtonContainer
					handleClickReset = { handleClickReset }
					handleClickSubmit = { handleClickSubmit }
				/>
			</Div>
		</Form>

	)
}