import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext"
import { Span } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { ListItemComponet, UnOrderListComponent } from "../../../../componentsForStructure/componentsForOrders/listComponents"

export const UsersLists = ({
	users = [], user
}) => {
	
	const { handleClickToList, } = useSimpleFieldContext()
	return (
		<UnOrderListComponent
		className = "mainListsField__supLists"
		> 
			{
				users.map( (it, i) => (
					<ListItemComponet
					id = { it.id }
					key = { it.id }
					data-id = { it.id }
					className = "mainListsField__supListItem"
					>
						<Span
							title = {`${ it.surName } ${ it.name } ${ it.secondName }`}
							className = {
								`mainListsField__supListTitle 
								${ user && `mainListsField__supListTitle_${ it.id === user.id ? "active": "passive"}` }
								`
							}
							handleClick = {	handleClickToList	}
						/>
					</ListItemComponet>
				))
			}
		</UnOrderListComponent>
	)
}