import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext"
import { Span, Div } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleFieldset, SimpleRadiobox } from "../../../../componentsForStructure/componentsForForm/componentForForm"
import { ListItemComponet, UnOrderListComponent } from "../../../../componentsForStructure/componentsForOrders/listComponents"

export const SubjectsList = ({ subjects, courseChange, handleChange }) => { 

	const { openSbjectChange } = useSimpleFieldContext()


	return (
		
		<SimpleFieldset
			title = "Выберети предмет из списка"
			className="createCourseContainer__borderContainer"
		>
			<Div
				className = "createCourseContainer__scrollContainer"
			>
				<UnOrderListComponent
					className="createCourseContainer__supLists"
				>
					{
						subjects.map(({ id, title }) => (
							<ListItemComponet
								key = { id }
								id = { id }
								data-id = { id }
								className = "createCourseContainer__supListItem"
							>
								<SimpleRadiobox
									key = { id }
									title = { title }
									value = { id }
									name = "subjectId"
									checked = { id === +courseChange.subjectId}
									classNameForLabel = "createCourseContainer__supListLabel"
									classNameForInput = "createCourseContainer__supListInput"
									classNameForTitle = "createCourseContainer__supListTitle"
									handleChange = { handleChange }
								/>
							</ListItemComponet>		
						))
					}
					<ListItemComponet
						key = { null }
						title = { "Создать новый предмет"}
						className = "createCourseContainer__supListItem"
						>
							<Div
								className = "createCourseContainer__supListLabel"
							>
								<Span
									title=""
									className="createCourseContainer__supListInput"
								></Span>
								<Span
									title = "Создать предмет"
									className = "createCourseContainer__createButton"
									handleClick = { openSbjectChange }
								/>
							</Div>
					</ListItemComponet>
				</UnOrderListComponent>
			</Div>

		</SimpleFieldset>
	)
}