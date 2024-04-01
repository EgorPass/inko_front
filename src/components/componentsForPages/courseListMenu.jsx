import { useGetStore } from "../../redux/reduxHooks/useGetStore";
import { useSimpleFieldContext } from "../../context/admin/coursesFieldContext/coursesFieldContext";

import { UnOrderListComponent, ListItemComponet } from "../componentsForStructure/componentsForOrders/listComponents";
import { Span } from "../componentsForStructure/componentsContainer/containerComponents";

export const CourseListMenu = ({
	classes,
	courses,
	subjects,
	filter,
}) => {

	const { course } = useGetStore("courseInfo")
	const { subject } = useGetStore("subjectInfo")
	const { handleClickSup, handleClickSub  } = useSimpleFieldContext();

	return (
		<UnOrderListComponent
			className = { classes.supLists }
		>
			{
				subjects
					.filter( filter )
					.map(({ id, title }) => {
						return (
							<ListItemComponet
								id = { id }
								key = { id }
								data-id = { id }
								className = { classes.supListItem }
							>
								<Span
									title = {title}
									handleClick = {  handleClickSup  }
									className = { `${ classes.supListTitle } ${ (subject ? (`${classes.supListTitle}_${ subject.id === id ? "active" : "passive"}` ) : "") }` }
								/>
								<UnOrderListComponent
									className = { classes.subLists }
								>
									{
										courses
											.filter(it => it.subjectId === id)
											.map(({ id, title }) => {
												return (
													<ListItemComponet
														id = { id }
														key = { id }
														data-id = { id }
														className = { classes.subListItem }
													>
														<Span
															title = { title} 
															handleClick = {  handleClickSub  }
															className = { `${ classes.subListTitle } ${ (course ? (`${classes.subListTitle}_${ course.id === id ? "active" : "passive"}` ) : "") }` }
														/>
													</ListItemComponet>
												)
											})
									}
								</UnOrderListComponent>
							</ListItemComponet>
						)
					})
			}
		</UnOrderListComponent>	
	)
}