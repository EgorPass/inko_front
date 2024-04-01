import { ListItemComponet, UnOrderListComponent } from "../../../../componentsForStructure/componentsForOrders/listComponents"
import { Span } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleCheckbox } from "../../../../componentsForStructure/componentsForForm/componentForForm"

export const CoursesData = ({
	courses,
	subjects,
	state,
	handleChange, }) => (
		<UnOrderListComponent
			className = "createUserContainer__supLists"
		>
			{
				subjects.map( it => (
					<ListItemComponet
						key = { it.id }
						className = "createUserContainer__supListItem"
					>
						<Span
							title = { it.title }
							className = "createUserContainer__supListTitle"
						/>
						<UnOrderListComponent
							className = "createUserContainer__subLists"
						>
							{
								courses.map(({ id, subjectId, title }) => { 
									if( it.id !== subjectId ) return null											
									return (
										<ListItemComponet
											key = { id }
											className = "createUserContainer__subListItem"
										>
											<SimpleCheckbox
												title = { title }
												dataId = { id }
												checked = { state.includes( id ) }
												handleChange = { handleChange } 
												classNameTitle = "createUserContainer__subListTitle"
												classNameInput = "createUserContainer__subListInput"
												classNameLabel = "createUserContainer__subListLabel"
											/>	
										</ListItemComponet>
									)	
								})
							}
						</UnOrderListComponent>
					</ListItemComponet>
				))
			}
		</UnOrderListComponent>
)