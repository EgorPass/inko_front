import { useSimpleFieldContext } from "../../../context/admin/coursesFieldContext/coursesFieldContext"

import { Div } from "../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton } from "../../componentsForStructure/componentsForForm/componentForForm"
import { InfoFieldContainer } from "../../componentsForStructure/componentsContainer/infoFieldContainer"
import { EmptyHeaderForAdminFields } from "../emptyField/emptyFields"
import { LinkAsButton } from "../../componentsForStructure/componentsForNav/links"

import "../../../styles/adminPage/mainCourseContainer.scss"
import { useLocation } from "react-router-dom"


const CourseInfo = () => {

	const {
				courseInfo,
				initialDataForCourseEditor_,
				handleClickCloseCourseInfo,
				handleClickChangeCourse,
																	} = useSimpleFieldContext()
	const location = useLocation()
	
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
					// head = { `Курс: ${courseInfo.title}` }
					head = { `${courseInfo.title}` }
					
					classNameForDiv = "mainCourseContainer__courseInfoContainer"
					classNameForHead = "mainCourseContainer__head"
					>
					<Div
						className = "mainCourseContainer__borderContainer"
					>
						<Div className = "mainCourseContainer__scrollContainer">
							<p
								onKeyDown = { (e) => {e.preventDefault()}}
								className = "mainCourseContainer__descriptionBody"
								dangerouslySetInnerHTML={{ __html: initialDataForCourseEditor_.current}}
							></p>
						</Div>
					</Div>
				</InfoFieldContainer>
			</Div>
			
			<Div
				className = "mainCourseContainer__buttonContainer"
			>
				{
					courseInfo.isexist && (
						<LinkAsButton
							to = { `/view/pdf?id=${courseInfo.id}&title=${encodeURI( courseInfo.title )}` }
							className= "adminPage__linkAsButton adminPage__button_view"
						>
							Просмотр
						</LinkAsButton>
					)
				}	
				{

					location.pathname.includes("admin") && (
						 <SimpleButton
								title = "Изменить"
								className = "adminPage__button adminPage__button_change"
								handleClick = { 			handleClickChangeCourse 						}
							/>
					)
				}
				<SimpleButton
					title = "Закрыть"
					className = "adminPage__button adminPage__button_close"
					handleClick = { 		handleClickCloseCourseInfo 				}
				/>
			</Div>
		</Div>
	)
}

export default CourseInfo