export const Span = ({ title, className = "", handleClick = null, dataId = "" }) => (
		<span
			data-id = { dataId }
			className = { className }
			onClick = { handleClick }
		>
			{ title }
		</span>
	)
// )

export const Div = ({ className, style = {}, children, handleClick = null, onscroll = null, onmove = null  }) => (
		<div
			style = { style }
			className = { className }
			onClick = { handleClick }
			onScroll={ onscroll }
			onMouseMove={ onmove }
		>
			{ children }
		</div>
	)
// )


export const Form = ({ children, className = "", submit = (e)=> { e.preventDefault()} }) => (
	<form
		onSubmit = { submit }
		className = { className }
	>
		{ children }
	</form>
) 

export const Label = ({ children, className = "" }) => (
	<label className={className}>
		{ children }
	</label>
)

