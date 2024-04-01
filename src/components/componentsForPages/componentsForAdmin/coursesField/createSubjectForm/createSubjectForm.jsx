import { useCreateSubjects } from "../../../../componentsHooks/adminHooks/subjectsHook/useCreateSubjectsHook"
import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext"

import { Div, Form } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton } from "../../../../componentsForStructure/componentsForForm/componentForForm"
import { NameDataItem } from "../../../../componentsForStructure/nameData/nameData"
import { EmptyHeaderForAdminFields } from "../../../emptyField/emptyFields"

import { optionsForEditorDesc } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin"

import TextEditor from "../../../../componentsForStructure/textEditor/textEditor"

import "../../../../../styles/adminPage/createCourseContainer.scss"

const CreateSubjectForm = ( { subjects} ) => {

	const { changeCourse, closeSubjectChange, createSubject, subjectInfo, setSubjectInfo, initialDataForSubjectEditor_, } = useSimpleFieldContext()
	const subject  = createSubject ? null: subjectInfo
	const {
		
		subjectChange,

		editRef,
		editorState, setEditorState,

		handleChange,

		handleClickClose, 
		handleClickReset,
		handleClickRemove,
		handleClickSave,
	} = useCreateSubjects({ changeCourse, setSubjectInfo, subjects, subject, closeSubjectChange, initialDataForSubjectEditor_ })

	return (
		<Div
			className="adminPage__createCourseContainer createCourseContainer"
		>
			<EmptyHeaderForAdminFields
				blockName = "createCourseContainer"
			/>
		
			<Form
				className = "createCourseContainer__mainContainer"
			>
				<Div
					className = {`createCourseContainer__courseContainer`}
				>
					<Div
						className = "createCourseContainer__dataContainer"
					>
						<NameDataItem
							name = "title"
							value = { subjectChange.title }
							title = "Название предета"
							handleChange={ handleChange }
							blockName = "createCourseContainer"
						/>
					</Div>
					<Div
						className= "createCourseContainer__descriptionSubjectScroll"
					>
						<Div
							className = "createCourseContainer__spaceContainer"
						>
						</Div>
						<Div
							className = "createCourseContainer__subjectTextEditorContainer"
						>
							<TextEditor
								editRef = { editRef }
								editorState = { editorState }
								setEditorState = { setEditorState }
								options = { optionsForEditorDesc }
								wrapperClassName = "createCourseContainer__wrapperClassName"					
								editorClassName = "createCourseContainer__editorClassName"
								toolbarClassName = "createCourseContainer__toolbarClassName"
							/>
						</Div>
					</Div>
				</Div>

			</Form>
			<Div
				className = "createCourseContainer__buttonContainer"
			>
				<SimpleButton
					title = "Сохранить"
					className = "adminPage__button adminPage__button_save"
					handleClick = {	handleClickSave }
				/>
				{
					subject && (
						<SimpleButton
							title = "Удалить"
							className = "adminPage__button adminPage__button_remove"
							handleClick = { 	handleClickRemove 		}
						/>
					)
				}
				<SimpleButton
					title = "Сбросить"
					className = "adminPage__button adminPage__button_reset"
					handleClick = {	handleClickReset }
				/>
				<SimpleButton
					title = "Закрыть"
					handleClick = {	handleClickClose }
					className = "adminPage__button adminPage__button_close"
				/>
			</Div>
		</Div>
	)
}

export default CreateSubjectForm