import { useSubjectInfoAction, useAdminStateActions, useAdminSubjectsStateActions } from "../../../../redux/reduxHooks/useBindeActions"
import { useTextInputHook } from "../../formHooks/useInputHook"
import { useEditorHook } from "../../editorHooks/useEditorHooks"
import { useFormValidator } from "../../validators/useFormValidator"
import AdminService from "../../../../services/adminSevice"
import { initialSubject, initialDataForEditor } from "../../../stockData/stockDataForAdmin/stockDataForAdmin"

export const useCreateSubjects = ({changeCourse, subjects, subject, closeSubjectChange, initialDataForSubjectEditor_  }) => {
	
	const { textValidator , doubleTitleValidator, compareValidatorForCoursesAndSubjects } = useFormValidator()

	const {
		textInputState: subjectChange,
		resetTextInputState: resetSubjectChange,
		handleChangeTextInputState: handleChange,
	} = useTextInputHook( subject ? subject :  initialSubject )
	
	const {
		editRef,				editorState,
		setEditorState, resetEditorState,
	} = useEditorHook(!subject ? initialDataForEditor: initialDataForSubjectEditor_.current )

	const {
		removeSubjectAsyncAction: removeSubject,
		updateSubjectAsyncAction: updateSubject,
		createSubjectAsyncAction: createSubject,
	 } = useAdminSubjectsStateActions()

	const { setAdminError } = useAdminStateActions()
	const { setSubjectInfo, setSubjectLoading } = useSubjectInfoAction()

	const handleClickClose = (e) => {
		e.preventDefault();
		closeSubjectChange()
	}

	const handleClickReset = (e) => {
		e.preventDefault();
		resetSubjectChange()
		resetEditorState()
	}

	const handleClickRemove = (e) => {
		e.preventDefault()
		const state = window.confirm("Уверены, что хотите удалить этот предмет?")
		
		try {
			if (state) {	
				removeSubject(subjectChange.id)
				setSubjectInfo( null )
				closeSubjectChange()
			}
		}
		catch (e) {
			console.log( e )
		}
	}
	
	const handleClickSave = async (e) => {
		e.preventDefault();

		let data, id;

		try {			
			const html = editRef.current.editor.editor.outerHTML
			if (!html) {
				html = "Давайте создадим описание"	
			}

			if ( !textValidator( subjectChange.title )) {
					throw new Error("Заполните пожалуйста поле с названием предмета")
			}

			doubleTitleValidator(
				subjects,
				compareValidatorForCoursesAndSubjects("Предмет", subject, subjectChange )
			)
						
			data = { subject: subjectChange	}
							
			if (subject) {
				await updateSubject( data )
				id = subject.id
			}
			else {
				
				const res = await createSubject( data )
				if (res && res.payload && res.payload.id) {
					id = res.payload.id				
				}	
			}

				await AdminService.uploadDescription({
					path: `/course/uploadDescription?type=${ "subject" }&id=${ id }`,
					description:  html ,
					setUploadProgress: () => {}
				}  )

			initialDataForSubjectEditor_.current = html
			closeSubjectChange()
			if (changeCourse) {
				setSubjectInfo( null )
			}
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
		setSubjectLoading,
		
		subjectChange,

		editRef,
		editorState, setEditorState,

		handleChange,

		handleClickClose, 
		handleClickReset,
		handleClickRemove,
		handleClickSave,


	}
}