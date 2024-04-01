import { useCoursesFieldHook } from "../../../componentsHooks/adminHooks/coursesHook/useCoursesFieldHook.js";
import { SimpleFieldContext } from "../../../../context/admin/coursesFieldContext/coursesFieldContext.js";

import { Div } from "../../../componentsForStructure/componentsContainer/containerComponents.jsx";
import { SimpleButton } from "../../../componentsForStructure/componentsForForm/componentForForm.jsx";
import { InfoFieldContainer } from "../../../componentsForStructure/componentsContainer/infoFieldContainer.jsx";
import { CourseListMenu } from "../../courseListMenu.jsx";
import { EmptyMainDataFieldContainer } from "../../emptyField/emptyFields.jsx";

import CourseInfo from "../../viewCoursesAndSubjects/courseInfo.jsx"
import SubjectInfo from "../../viewCoursesAndSubjects/subjectInfo.jsx";
import CreateCourseForm from "./createCourseForm/createCourseForm.jsx";
import CreateSubjectForm from "./createSubjectForm/createSubjectForm.jsx";


const CoursesField = ({ courses = [], subjects = [], children }) => {
	
	
	const fieldHook = useCoursesFieldHook( { courses, subjects })
	const {
		filter, classes,
		changeCourse, changeSubject, courseInfo, subjectInfo,
		handleClickCreateSubject, handleClickCreateCourse,
	} = fieldHook
	
	return (
		<SimpleFieldContext
			data = { fieldHook }
		>
			<Div
				className = "adminPage__mainListsFieldContainer mainListsFieldContainer"
			>
				{
					children
				}
				<InfoFieldContainer
					head="Список курсов"
					classNameForDiv="mainListsFieldContainer__mainListsField mainListsField"
					classNameForHead="mainListsField__head"
				>
					<Div
						className = "mainListsField__scrollBox"
					>	
						<CourseListMenu
							courses = { courses }
							subjects = { subjects }
							filter = { filter }
							classes = { classes }
						/>

					</Div>
				</InfoFieldContainer>
				<Div
					className = "mainListsFieldContainer__buttonContainer"
				>
					<SimpleButton
						title = "Создать предмет"
						className = "adminPage__button adminPage__button_createSubject"
						disabled = { changeSubject }
						handleClick = {	handleClickCreateSubject	}
					/>
					<SimpleButton
						title = "Создать курс"
						className = "adminPage__button adminPage__button_createCourse"
						disabled = { changeCourse}
						handleClick = {	handleClickCreateCourse	}
					/>
				</Div>
			</Div>
			
				{
					!courseInfo && !subjectInfo && !changeCourse && !changeSubject && (
						<EmptyMainDataFieldContainer />
					)
				}
			{
					changeCourse && (
						<CreateCourseForm
							displayComp = { !changeSubject }
							courses=  { courses }	
							subjects = { subjects }
						/>
					)
				}
				{
					changeSubject && (
						<CreateSubjectForm
							// subject = { fieldHook.createSubject ? null : fieldHook.subjectInfo}
							subjects = { subjects }
						/>
					)
				}
				{
					!changeCourse && !changeSubject &&
					!subjectInfo &&	courseInfo && (
						<CourseInfo />
					)
				}
				{
					!changeCourse &&
					!changeSubject &&
					subjectInfo && (
						<SubjectInfo
							courses = { courses }
						/>
					)
				}

		</SimpleFieldContext>
	)
}

export default CoursesField