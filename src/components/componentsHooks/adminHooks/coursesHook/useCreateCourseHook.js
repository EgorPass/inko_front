import { useState  } from "react";
import { useAdminCoursesStateActins, useCourseInfoAction, useAdminStateActions } from "../../../../redux/reduxHooks/useBindeActions";
import { useTextInputHook } from "../../formHooks/useInputHook";
import { useEditorHook } from "../../editorHooks/useEditorHooks";
import { useToggleMenu } from "../../menuHooks/menuHooks";
import { useFormValidator } from "../../validators/useFormValidator";
import AdminService from "../../../../services/adminSevice";

import { initialCourse, initialDataForEditor } from "../../../stockData/stockDataForAdmin/stockDataForAdmin";

export const useCreateCourses = ({
	courses, course, closeCourseChange, initialDataForCourseEditor_, createCourse: isCreateCourse,
	// resetEditorState, editRef,
}) => {

	const {
		textInputState: courseChange,
		changeInputState: setCourseChange,
		resetTextInputState: resetCourseChange,
		handleChangeTextInputState: handleChange
	} = useTextInputHook(course ? course : initialCourse)
	
	const { tab, tabs, handleClickToTab } = useToggleMenu( ["description", "subjects"], "description" ) 
	
	const [ fileName, setFileName ] = useState( course ? course.fileName: " " )
	const [file, setFile] = useState(null)
	const [uploadProgress, setUploadProgress] = useState(0);

	const {
		editRef,				editorState,
		setEditorState, resetEditorState,
	} = useEditorHook(isCreateCourse ? initialDataForEditor : initialDataForCourseEditor_.current)
	
	const { 
		updateCourseAsyncAction: updateCourse,
		createCourseAsyncAction: createCourse,
		removeCourseAsyncAction: removeCourse,
	} = useAdminCoursesStateActins()
	
	const { setCourseInfo } = useCourseInfoAction()
	const { setAdminError } = useAdminStateActions()
	
	const { textValidator, doubleTitleValidator, compareValidatorForCoursesAndSubjects } = useFormValidator()
	
	async function handleClickAddFile(e) {		
		const target = e.target
		if (!target) return;

		let file = target.files[0]
		if (!file) return;

		setFile(file)
		
		setFileName( file.name)
		try{

			const res = await AdminService.uploadCourseFile( { file, name: file.name, setUploadProgress } )
			
			if (res.statusText.toLocaleLowerCase() === "ok") {
				setCourseChange("isexist", true)
			}
		}
		catch(e) {
			setAdminError( e.response.status )
		}
		finally{
			setUploadProgress(0)
			setFile(null)
		}
		
	}

	const resetFileToServer = async () => {
		let response
		try {
			
			response = await AdminService.resetCourseFile( {course: courseChange, isCreateCourse } )
		}
		catch (e) {
			setAdminError(  e.response.status )
		}
		return response
	}

	const handleClickClose = async (e) => {
		e.preventDefault();

		const res = await resetFileToServer()

		closeCourseChange()
	}

	const handleClickReset = async (e) => {
		e.preventDefault();
		
		const res = await resetFileToServer()

		resetCourseChange()
		resetEditorState()
		setFileName( course ? course.fileName : " ")
	}

	const handleClickRemoveFile = async (e) => {
		e.preventDefault()
		
		let res

		try {
			
			if (isCreateCourse || !course.isexist) {
				res = await	AdminService.deleteFileFromUpload()
			}
			else {
				res = await AdminService.deleteCourseFile({ course, isCreateCourse });			
			}
			
			if(res.statusText.toLocaleLowerCase() === "ok") {
				setCourseChange( "isexist", false)
				setFileName( "" )
			}
		}
		catch (e) {
			setAdminError(  e.response.status )
		}
	}

	const handleClickRemove = (e) => {
		e.preventDefault();
		removeCourse( course.id )
		setCourseInfo( null )
		
		closeCourseChange()
	}

	const handleClickSave = async (e) => {
		e.preventDefault();
		
		let data, html, id;
		
		try {
			html = editRef.current.editor.editor.outerHTML
			if (!html) {
				html = "Давайте создадим описание"	
			}
			
			data = {
				course: {
					...courseChange,
					subjectId: +courseChange.subjectId,
				},
				fileName,
			}
			
			if (!textValidator(courseChange.title)) {
				throw new Error("Заполните пожалуйста поле с названием предмета")
			}
			
			doubleTitleValidator(
				courses,
				compareValidatorForCoursesAndSubjects("Курс", course, courseChange)
			)

			if (courseChange.subjectId === null) {
					throw new Error(`Выберете предмет для курса "${courseChange.title}"`)		
			}

			if (course) {
				await updateCourse(data)
				id = course.id;
			}
			else {			
				const res = await createCourse( data )
				if (res && res.payload && res.payload.id) {
					id = res.payload.id				
				}	
			}
				await AdminService.uploadDescription({
					path: `/course/uploadDescription?type=${ "course" }&id=${ id }`,
					description:  html ,
					setUploadProgress: () => {}
				})
			
			initialDataForCourseEditor_.current = html
			closeCourseChange()
		} 
		catch (e) {
			let error;
			if (e.response && e.response.status === 401) {
				error = 401
			}
			else {
				error = e.message
			}
			setAdminError( error )
		}
	}

	return {

		tab, tabs, handleClickToTab,

		file, fileName,
		uploadProgress,
		handleClickRemoveFile,
		editRef,
		handleClickAddFile,
		courseChange, handleChange, 
		editorState, 	setEditorState,
		handleClickClose,		handleClickReset,
		handleClickRemove, 	handleClickSave
	}
}