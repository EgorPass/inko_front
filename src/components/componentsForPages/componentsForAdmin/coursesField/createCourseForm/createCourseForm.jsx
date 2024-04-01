import { useEffect } from "react"
import { useCreateCourses } from "../../../../componentsHooks/adminHooks/coursesHook/useCreateCourseHook"
import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext"

import { Div, Form } from "../../../../componentsForStructure/componentsContainer/containerComponents"
import { SimpleButton } from "../../../../componentsForStructure/componentsForForm/componentForForm"
import { InfoFieldContainer } from "../../../../componentsForStructure/componentsContainer/infoFieldContainer"
import { NameDataItem } from "../../../../componentsForStructure/nameData/nameData"
import { SubjectsList } from "./subjectsList"
import { FileDataContainer } from "./fileDataContainer"
import { UpLoaderContainer } from "../../../../componentsForStructure/componentsContainer/loaderContainer"
import { ToggleMenu } from "../../../toggleMenu"
import { optionsForEditorDesc,  } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin"

import TextEditor from "../../../../componentsForStructure/textEditor/textEditor"

import "../../../../../styles/adminPage/createCourseContainer.scss"

const CreateCourseForm = ({ courses, subjects, displayComp } ) => {

	console.log( "courses at createCourseForm" )

	const { closeCourseChange, createCourse,
		courseInfo, setCourseInfo,
		initialDataForCourseEditor_ } = useSimpleFieldContext()

	const course = createCourse ? null: courseInfo
	const {
		tab, tabs, handleClickToTab,
		file, fileName,
		uploadProgress,
		handleClickRemoveFile,
		editRef,
		handleClickAddFile,
		courseChange,	handleChange, 
		editorState, 	setEditorState,
		handleClickClose,		handleClickReset,
		handleClickRemove, 	handleClickSave,
	} = useCreateCourses({
		courses, course, setCourseInfo, closeCourseChange, initialDataForCourseEditor_, createCourse,

	})

	return (
		<>
			{
				file && (
					<UpLoaderContainer
						file = { file }
						uploadProgress = { uploadProgress }
						courseTitle = { courseChange.title }
					/>
				)
			}
		<Div
			className="adminPage__createCourseContainer createCourseContainer"
			style = { { display: `${ displayComp ? "grid" : "none" }`}}		
		>
			<Div
				className = "createCourseContainer__tabContainer"
			>
				<ToggleMenu
					isActive = { tab }
					state = { tabs }
					className = { `createCourseContainer__tabItem` }
					handleClick = {  handleClickToTab  }
				/>
			</Div>
			<Form
				className = "createCourseContainer__mainContainer"
			>
				<Div
					className = {`createCourseContainer__courseContainer createCourseContainer__courseContainer_${tab === "description" ? "visible" : "hidden"}`}
				>
					<Div
						className = "createCourseContainer__dataContainer"
						>
						<NameDataItem
							name = "title"
							value = { courseChange.title }
							title = "Название курса"
							handleChange = { handleChange }
							blockName = "createCourseContainer"
							/>
					</Div>
					
					<Div
						className= "createCourseContainer__descriptionContainer"
					>
						<FileDataContainer
							file = { file }
							fileName = { fileName }
							courseChange = { courseChange }
							handleClickAddFile = {  handleClickAddFile }
							handleClickRemoveFile = {  handleClickRemoveFile }
						/>
						<Div
							className = "createCourseContainer__courseTextEditorContainer"
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

				<InfoFieldContainer
					head = "Предмет для курс"	
					classNameForDiv={`createCourseContainer__subjectsContainer createCourseContainer__subjectsContainer_${tab === "subjects" ? "visible" : "hidden"}`}
					classNameForHead="createCourseContainer__head"
				>
					<SubjectsList
						subjects = { subjects }
						courseChange = { courseChange }
						handleChange = { handleChange }
					/>
				</InfoFieldContainer>
				
			</Form>

			<Div
				className = "createCourseContainer__buttonContainer"
			>
				
				<SimpleButton
					title = "Сохранить"
					className = "adminPage__button adminPage__button_save"
					handleClick = { handleClickSave }
				/>
				{
					course && (
						<SimpleButton
							title = "Удалить"
							handleClick = { handleClickRemove 	}
							className = "adminPage__button adminPage__button_remove"
						/>				
					)
				}
				<SimpleButton
					title = "Сбросить"
					handleClick = { handleClickReset }
					className = "adminPage__button adminPage__button_reset"
				/>
				<SimpleButton
					title = "Закрыть"
					handleClick = { handleClickClose }
					className = "adminPage__button adminPage__button_close"
				/>
			</Div>
		</Div>
		</>
	)
}

export default CreateCourseForm