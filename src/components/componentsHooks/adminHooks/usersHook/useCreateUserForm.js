import { useGetStore } from "../../../../redux/reduxHooks/useGetStore"
import { useAdminUsersStateActions, useUserInfoActions, useAdminStateActions } from "../../../../redux/reduxHooks/useBindeActions"
import { useTextInputHook, useCheckboxInputHook } from "../../formHooks/useInputHook"
import { useToggleMenu } from "../../menuHooks/menuHooks"
import { useFormValidator } from "../../validators/useFormValidator"

import { initialRoles, initialUser, rolesId, initialDataForEditor } from "../../../stockData/stockDataForAdmin/stockDataForAdmin"
import { useEditorHook } from "../../editorHooks/useEditorHooks"
import AdminService from "../../../../services/adminSevice"

export const useCreateUserForm = ({
	user,
	users,
	setChangerFalse,
	isCreateUser,
	initialDataForUserEditor_,
}) => {

	const { textValidator , emailValidator, doubleTitleValidator, compareValidatorForUser} = useFormValidator();

	const { id: teacherId } = useGetStore("user")
	const { userCourses, userRoles } = useGetStore("userInfo")

	const {
		textInputState: userState,
		resetTextInputState: userResetState,
		handleChangeTextInputState: userChangeState,
	} = useTextInputHook( user ? user : initialUser )
	
	const {
		checkboxInputState: coursesState,
		resetCheckboxInputState: coursesResetState,
		handleChangeCheckboxInputState: coursesChangeState
	} = useCheckboxInputHook( user ? userCourses : [ ])

	const {
		checkboxInputState: rolesState,
		resetCheckboxInputState: rolesResetState,
		handleChangeCheckboxInputState: rolesChangeState
	} = useCheckboxInputHook( user ? userRoles : [  1000001] )

	const { tab, tabs, handleClickToTab } = useToggleMenu( ["Имя и роли", "Курсы", "Инфо"], "Имя и роли" ) // "Инфо", "Курсы"

		const {
		editRef,				editorState,
		setEditorState, resetEditorState,
	} = useEditorHook(isCreateUser ? initialDataForEditor : initialDataForUserEditor_.current)

	const { 
		createUserAsyncAction: createUser,
		updateUserAsyncAction: updateUser,
		removeUserAsyncAction: removeUser
	} =useAdminUsersStateActions()
	
	const { 
			resetUserDataAction,
			getUserDataAsyncAction: getUserData,
	} = useUserInfoActions()

	const { setAdminError } = useAdminStateActions()

	const handleClickReset = (e) => {
		e.preventDefault();
		userResetState()
		coursesResetState()
		rolesResetState()
		resetEditorState()
	}

	const handleClickClose = (e) => {
		e.preventDefault();
		setChangerFalse()
	}
	
	const handleClickRemove = async (e) => {
		e.preventDefault()
		const del = window.confirm("Вы уверены что хотите удалить этого пользователя")
		if (del) {	
			try {
				
				if (user.id === teacherId) {
					throw Error( "нельзя удалить самого себя" )
				}

				await removeUser(user.id)
				setChangerFalse()
				resetUserDataAction()
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
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		let response
		let id = null
		const html = editRef.current.editor.editor.outerHTML
		const validation = {
			state: true,
			field: '',
		}
		
		const dataForResponse = {
			dataName: userState,
			dataCourses: [ ...coursesState ],
			dataRoles: Object.fromEntries(	initialRoles
																.map( ( [ title ] ) => ( [
																				title,
																				rolesState.includes( rolesId[ title ] )
																			]
		)))}
		
		try {
			Object.entries(dataForResponse.dataName).forEach( ( [ val, prop ] ) => {
				if( val !== "id" && val !== "secondName" && validation.state) {
					if (val === "email") {
						validation.state = emailValidator( prop )
						validation.field = val
					}
					validation.state = textValidator( prop )
					validation.field = val
				}
			})
	
			if (!validation.state) {
				throw new Error (`Пожалуйста правильно заполните поле ${ validation.field }`)
			}

			doubleTitleValidator( users, compareValidatorForUser(user, userState) )

			if (user) {
				response = await updateUser( dataForResponse )	
				id = user.id
			}
			else {
				delete dataForResponse.dataName.id 
				response = await createUser( dataForResponse )
								
				if (response.payload && response.payload.id) {					
					id = response.payload.id	
				}
			}
			
				await AdminService.uploadDescription( {
					path: `/user/uploadDescription?id=${ id }`,
					description: html,
					setUploadProgress: () => {}
				})
			
			if( response.payload )	getUserData( response.payload )
		
			initialDataForUserEditor_.current = html
			setChangerFalse()
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
		editRef,
		editorState,	setEditorState,

		tab, tabs, 		handleClickToTab,
		userState, 		userChangeState,
		coursesState,	coursesChangeState,
		rolesState,		rolesChangeState,
		
		handleClickReset,		handleClickClose,
		handleSubmit, handleClickRemove,
	}
}