import { Link } from "react-router-dom"

export const LinkAsButton = ({
	children,
	to = '',
	classNameTitle = "adminPage__buttonTitle",
	className = "",
	style = {}, target = "_blank", handleClick = null, state = null }) => {

	return (

		<Link
			to = { to }
			className = { className }
			style = { style }
			target = { target }
			onClick = { handleClick }
			state = { state }
			title = { children }
		>
			<span
				className = {classNameTitle}
			>
				{ children }
			</span>
		</Link>
	)
}