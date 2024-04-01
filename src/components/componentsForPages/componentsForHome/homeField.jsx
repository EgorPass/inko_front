import { useCoursesFieldHook } from "../../componentsHooks/adminHooks/coursesHook/useCoursesFieldHook";
import { useHomeFieldHooks } from "../../componentsHooks/homeHook/useHomeFieldHooks";

import { SimpleFieldContext } from "../../../context/admin/coursesFieldContext/coursesFieldContext";

import { Div, Span } from "../../componentsForStructure/componentsContainer/containerComponents";
import { InfoFieldContainer } from "../../componentsForStructure/componentsContainer/infoFieldContainer";
import { EmptyHeaderForAdminFields, EmptyMainDataFieldContainer } from "../emptyField/emptyFields";
import { CourseListMenu } from "../courseListMenu";

import SubjectInfo from "../viewCoursesAndSubjects/subjectInfo";
import CourseInfo from "../viewCoursesAndSubjects/courseInfo";
import UserInfoForHomeField from "./userInfoForHomeField";

import "../../../styles/adminPage/mainListsFieldContainer.scss"

export const HomeField = ({ courses, subjects, setLoading }) => {
	// console.log( "render Home Field page..............")

	const fieldHook = useCoursesFieldHook({ courses, subjects })
	const {
		classes, filter, userDesc,
		initialDataForUserEditor_,
		handleClickGetUserInfo, handleClickCloseUserInfo
	} = useHomeFieldHooks( { courses, setLoading } )
	

	return (
		<SimpleFieldContext
			data = { fieldHook }
		>
		<Div
			className = "adminPage__mainListsFieldContainer mainListsFieldContainer adminPage__homeListsFieldContainer"
		>
			<EmptyHeaderForAdminFields />
			<InfoFieldContainer
				head="Список курсов"
				classNameForDiv="mainListsFieldContainer__mainListsField mainListsField"
				classNameForHead="mainListsField__head"
			>
				<Div
					className = "mainListsField__scrollBox"
				>
					<CourseListMenu
						classes = { classes }
						courses = { courses }
						subjects = { subjects }
						filter = { filter }
					/>
					
				</Div>
			</InfoFieldContainer>
			<Div
				className = "mainListsFieldContainer__buttonContainer"
			>
					<Div>
						<Span
							title = "информация для пользователя" 
							handleClick = { handleClickGetUserInfo }
							className = { `mainListsFieldContainer__linkTitle` }
						/>
				</Div>
			</Div>
			
		</Div>
		{
			!fieldHook.courseInfo && !fieldHook.subjectInfo && !userDesc && (

				<EmptyMainDataFieldContainer />
			)
		}
		{
			fieldHook.courseInfo && (
				<CourseInfo />
			)
		}
		{
			fieldHook.subjectInfo && (
				<SubjectInfo
					courses = { courses }
				/>
			)
			}
			{
				!fieldHook.courseInfo && !fieldHook.subjectInfo && userDesc && (
					<UserInfoForHomeField
						initialDataForUserEditor_ = { initialDataForUserEditor_ }
						handleClickCloseUserInfo = { handleClickCloseUserInfo }
					/>
			)
			}
		</SimpleFieldContext>

	)
}