export const UnOrderListComponent = ({className = '', children}) => (
	<ul
		className = { className }
	>
		{ children }
	</ul>
	
)

export const ListItemComponet = ({ id = '', className = "", children }) => (
	
	<li
		id = { id }
		key = { id }
		data-id = { id }
		className= { className }
	>
		{ children }
	</li>

)