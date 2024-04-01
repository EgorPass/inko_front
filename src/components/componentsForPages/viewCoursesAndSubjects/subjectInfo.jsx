import { useLocation } from "react-router-dom"
import { useSimpleFieldContext } from "../../../context/admin/coursesFieldContext/coursesFieldContext"
import { Span, Div } from "../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton } from "../../componentsForStructure/componentsForForm/componentForForm"
import { InfoFieldContainer } from "../../componentsForStructure/componentsContainer/infoFieldContainer"
import { ListItemComponet, UnOrderListComponent } from "../../componentsForStructure/componentsForOrders/listComponents"
import { EmptyHeaderForAdminFields } from "../emptyField/emptyFields"
import "../../../styles/adminPage/mainCourseContainer.scss"

const SubjectInfo = ({ courses }) => {
		
	const {
		subjectInfo,
		handleClickCloseSubjectInfo, handleClickChangeSubject,
		handleClickSub, initialDataForSubjectEditor_, 
	} = useSimpleFieldContext()
	const location = useLocation();

	return (
		<Div
			className="adminPage__mainCourseContainer mainCourseContainer"
		>
			<EmptyHeaderForAdminFields
				blockName = "mainCourseContainer"
			/>
			
			<Div
				className = "mainCourseContainer__mainContainer"
			>
				<InfoFieldContainer
					// head = { `Предмет:  ${subjectInfo.title}` }
					head = { `${subjectInfo.title}` }
					
					classNameForDiv = "mainCourseContainer__courseInfoContainer"
					classNameForHead = "mainCourseContainer__head"
				>
					<Div
						className = "mainCourseContainer__borderContainer"
					>
						<Div className="mainCourseContainer__scrollContainer">
								<p
									className = "mainCourseContainer__descriptionTitle"
								>
									Предмет {`${subjectInfo.title}`} содержит в себе следующие разделы:
								</p>
								<UnOrderListComponent
									className="mainCourseContainer__subLists"
								>
									{
										courses
											.filter( it => it.subjectId === subjectInfo.id )
											.map( ( { title, id } ) => (
												<ListItemComponet
													key = { id }
													id = { id }
													data-id = { id }
													className = "mainCourseContainer__subListItem"
												>
													<Span
														title = { title }
														className = "mainCourseContainer__subListTitle"
														handleClick = { handleClickSub }
													/>
												</ListItemComponet>
											))
									}
								</UnOrderListComponent>
							<div
								onKeyDown = { (e) => {e.preventDefault()}}	
								className = "mainCourseContainer__descriptionBody"
								dangerouslySetInnerHTML={{ __html: initialDataForSubjectEditor_.current}}
							></div>		
						</Div>
					</Div>

				</InfoFieldContainer>
			</Div>
			<Div
				className = "mainCourseContainer__buttonContainer"
			>
				{
					location.pathname.includes("admin") && (
						<SimpleButton
							title = "Изменить"
							className = "adminPage__button adminPage__button_change"
							handleClick = { 			handleClickChangeSubject 		}
						/>
					)
				}
				<SimpleButton
					title = "Закрыть"
					className = "adminPage__button adminPage__button_close"
					handleClick = { 	handleClickCloseSubjectInfo }
				/>
			</Div>
		</Div>
	)
}

export default SubjectInfo