import { useGetStore } from "../../../../../redux/reduxHooks/useGetStore"

import { useCreateUserForm } from "../../../../componentsHooks/adminHooks/usersHook/useCreateUserForm"

import { Div, Form } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton } from "../../../../componentsForStructure/componentsForForm/componentForForm"

import { InfoFieldContainer } from "../../../../componentsForStructure/componentsContainer/infoFieldContainer"
import { NameData } from "../../../../componentsForStructure/nameData/nameData"
import { RolesData } from "./rolesData"
import { CoursesData } from "./coursesData"
import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext"

import { ToggleMenu } from "../../../toggleMenu"

import TextEditor from "../../../../componentsForStructure/textEditor/textEditor"
import { optionsForEditorDesc } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin"

import '../../../../../styles/adminPage/createUserContainer.scss'

const CreateUserForm = ( { isCreateUser } ) => {
	
	const { user, createUser, setChangerFalse, initialDataForUserEditor_ } = useSimpleFieldContext()
	const { users, courses, subjects } = useGetStore("adminState")
	
	const { 

		editRef,
		editorState,	setEditorState,

		tab, tabs, 		handleClickToTab,
		
		userState, 		userChangeState,
		coursesState,	coursesChangeState,
		rolesState,		rolesChangeState,

		handleClickReset, handleClickClose,
		handleSubmit, 		handleClickRemove,
	} = useCreateUserForm( { user: (createUser ? null: user), setChangerFalse, users, isCreateUser: createUser, initialDataForUserEditor_ } )
	


	
	return (
		<Div
			className = "adminPage__createUserContainer createUserContainer"
		>
			<Div
				className = "createUserContainer__tabContainer"
			>
				<ToggleMenu
					isActive = { tab }
					state = { tabs }
					className = { `createUserContainer__tabItem` }
					handleClick = { handleClickToTab }
				/>
			</Div>

			<Form
				className = "createUserContainer__mainContainer"
			>			

				<InfoFieldContainer
						head="Преподаватель"
						classNameForDiv={`createUserContainer__userInfoContainer createUserContainer__userInfoContainer_${tab === "Имя и роли" ? "visible": "hidden"}`}
						classNameForHead="createUserContainer__head"
					>
						<Div
							className = "createUserContainer__borderContainer"
						>
							<Div
								className = "createUserContainer__scrollContainer"
							>
								<NameData
									state = { userState }
									handleChange = { userChangeState }
									blockName = "createUserContainer"
								/>

								<InfoFieldContainer
									head = "Роли преподователя"	
									classNameForDiv="createUserContainer__userRoles"
									classNameForHead="createUserContainer__head"
									>
								<RolesData
									state = { rolesState }
									handleChange = { rolesChangeState }
									/>
								</InfoFieldContainer>
							</Div>
						</Div>	
				</InfoFieldContainer>
		

				<InfoFieldContainer
						head = "Курсы"
						classNameForDiv={`createUserContainer__userCourseContainer createUserContainer__userCourseContainer_${tab === "Курсы" ? "visible" : "hidden"}`}
						classNameForHead = "createUserContainer__head"
				>
						<Div
							className = "createUserContainer__borderContainer"
						>
							<Div
								className = "createUserContainer__scrollContainer"
							>
								<CoursesData
									state = { coursesState }
									handleChange = { coursesChangeState }					
									courses = { courses }
									subjects = { subjects }
								/>		
							</Div>
						</Div>
				</InfoFieldContainer>
			
				<InfoFieldContainer
					head = "Информация для перподователя"
					classNameForDiv = { `createUserContainer__userDescriptionContainer createUserContainer__userDescriptionContainer_${ tab === "Инфо" ? "visible" : "hidden" }` }
					classNameForHead = { `createUserContainer__head` }
				>
					<Div
						className = "createUserContainer__userTextEditorContainer"
					>
						<TextEditor
							editRef = { editRef }
							editorState = { editorState }
							setEditorState = { setEditorState }
							options = { optionsForEditorDesc }
							wrapperClassName = "createUserContainer__wrapperClassName"					
							editorClassName = "createUserContainer__editorClassName"
							toolbarClassName = "createUserContainer__toolbarClassName"
						/>
					</Div>
				</InfoFieldContainer>
				
			</Form>

			<Div
				className = "createUserContainer__buttonContainer"
			>
				<SimpleButton
					title = "Сохранить"
					handleClick = {	handleSubmit 	}
					className="adminPage__button adminPage__button_save"
				/>
				{
					user && (
						<SimpleButton
							title = "Удалить"
							handleClick = {			handleClickRemove 					}
							className="adminPage__button adminPage__button_remove"
						/>
					)
				}
				<SimpleButton
					title = "Сбросить"
					handleClick = {	handleClickReset 	}
					className="adminPage__button adminPage__button_reset"
				/>
				<SimpleButton
					title = "Закрыть"
					handleClick = {	handleClickClose 	}
					className="adminPage__button adminPage__button_close"
				/>
			</Div>
		</Div>
	)
}

export default CreateUserForm