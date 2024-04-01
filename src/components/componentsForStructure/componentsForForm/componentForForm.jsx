import { forwardRef } from "react"
import { Span } from "../componentsContainer/containerComponents"


export const SimpleButton = ({
															title = "",
															titleClassName = 'adminPage__buttonTitle',
															className = "",
															handleClick = () => {},
															disabled = false,
															alt = null
}) => (
		<button
		className = { className }
		onClick = { handleClick  }
		disabled = { disabled }
		title = { title }
	>
		<span
			className = { titleClassName }
		>
			{ title }
		</span>
	</button>
)

export const TitleForButton = ({ className = "", mod, children }) => {
	
	return (
		<div
			className = { `${ className } ${ className }_${ mod }` }
		>
			{ children }
		</div>
	)
}


export const SimpleFieldset = ({ children, title, className }) =>  (
	<fieldset
		className = { className }
	>
		<legend> { title } </legend>
		{ children }
	</fieldset>
)

export const SetVisiblePassword = ({ className, data, handleClick }) => (
	<span
		data-hide = { data }
		className = { className }
		onClick = { handleClick }
	></span>
)
	
export const SimpleInput = ({
															value = "",
															className,
															handleChange = null,
															handleClick = null,
															handleBlur = null,
															type = "text",
															name = "login",
															placeholder = name,
														}) => (
	<input
		type = { type }
		name = { name }
		value = { value }
		className = { className }
		onChange = { handleChange }
		autoComplete = "true"
		placeholder = { placeholder }
		onClick = { handleClick }
		onBlur = { handleBlur }											
	/>
)

export const DefaultInput = forwardRef(
	function DefaultInput({
													type = "text",
													defaultValue,
													onBlur = null,
													onKeyDown = null,
													className = ""
												},
													ref) {

		return (
			<input
				type = { type }
				ref = { ref }
				defaultValue = { defaultValue }
				onBlur = { onBlur }
				onKeyDown = { onKeyDown }
				className = { className }
			/>
		)
	}
)

export const SimpleCheckbox = ({
																title,
																checked,
																dataId,
																handleChange,
																classNameTitle = "",
																classNameInput = "",
																classNameLabel = "",
															}) => (
	<label
		className = { classNameLabel}
	>
		<input
			type = "checkbox"
			name = { title }
			data-id = { dataId }
			checked = { checked }
			className = { classNameInput }
			onChange = { handleChange }
		/>
		<Span
			title = { title }
			className = { classNameTitle }
		/>
	</label>
)

export const SimpleRadiobox = ({
																value,
																title,
																name = "",
																classNameForLabel="",
																classNameForInput="",
																classNameForTitle ="",
																handleChange,
																checked,
															}) => (
	<label
		className={ classNameForLabel }
	>
		<input
			type = "radio"
			name = { name }
			value = { value }
			className = { classNameForInput }
			onChange = { handleChange }
			autoComplete = "true"
			checked = { checked }
		/>
			<Span
				title = { title }
				className={classNameForTitle}
			/>
	</label>
)