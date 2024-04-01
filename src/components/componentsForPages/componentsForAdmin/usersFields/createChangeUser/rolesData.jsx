import { rolesId, translator, initialRoles } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin";

import { ListItemComponet, UnOrderListComponent } from "../../../../componentsForStructure/componentsForOrders/listComponents";
import { SimpleCheckbox } from "../../../../componentsForStructure/componentsForForm/componentForForm";

export const RolesData = ({ state, handleChange }) => (
	<UnOrderListComponent
		className="createUserContainer__supLists"
	>
		{
			initialRoles.map( ( [ title, cool ] ) => (
					<ListItemComponet
						key = { rolesId[title] }
						className="createUserContainer__supListItem"
					>
						<SimpleCheckbox
							title = { translator[ title ] }
							checked = { state.includes( rolesId[ title ] ) }
							handleChange = {   rolesId[ title ] !== 1000001 ? handleChange : () => {} }
							dataId = { rolesId[ title ]  }
							classNameTitle = "createUserContainer__supListTitle"
							classNameInput = "createUserContainer__supListInput"
							classNameLabel = "createUserContainer__supListLabel"
						/>
					</ListItemComponet>
			))
		}
	</UnOrderListComponent>
)