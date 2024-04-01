import { SimpleInput, SimpleFieldset } from "../componentForForm" 

export const InputComponent = ({
	title,
	classNameField,
	name,
	type = "text",
	value = "",
	handleChange,
	handleClick = null,
	placeholder = name,
	classNameInput,
	children,
}) => (

	<SimpleFieldset
		title = { title }
		className = { classNameField }
		>
		<SimpleInput
			type = { type }
			name = { name }
			placeholder = { placeholder }
			value = { value }
			className = { classNameInput }
			handleChange = { handleChange }
			handleClick = { handleClick }
		/>
		{ children }
	</SimpleFieldset>
)