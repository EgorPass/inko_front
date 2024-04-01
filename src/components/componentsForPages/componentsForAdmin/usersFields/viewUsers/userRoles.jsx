import { translator } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin"
import { Span } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { ListItemComponet, UnOrderListComponent } from "../../../../componentsForStructure/componentsForOrders/listComponents"

export const UserRoles = ({ userRoles = [] }) => {

	return (
		<UnOrderListComponent
		className = "mainUserContainer__supLists"
		>
		{
			userRoles.map((it) => (
				<ListItemComponet
				key = { it}
				className = "mainUserContainer__supListItem"
				>
					<Span
						title = { translator[ it ] }
						className = "mainUserContainer__supListTitle"
					/>
				</ListItemComponet>
			))
		}
	</UnOrderListComponent>
	)
}