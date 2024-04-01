import { Div } from './containerComponents'
import { SimpleButton } from "../componentsForForm/componentForForm"


export const ErrorContainer = ({ message, handleClickCloseModal }) => {
	
	return (
		<Div
			className = "pegasBody__errorBody errorContainer"
		>
			
			<Div
				className = "pegasBody__mainErrorContainer mainErrorContainer"
			>

				<Div
					className = "mainErrorContainer__messageContainer"
				>
					
					<p
						className = "mainErrorContainer__errorMessage"
					>
						{ message }
					</p>
				</Div>

				<Div
					className = "mainErrorContainer__buttonContainer"
					>
					<SimpleButton
						title = "OK"
						className = 'adminPage__button'
						handleClick = { handleClickCloseModal }
					/>
				</Div>
			</Div>
			
		</Div>
	)
}