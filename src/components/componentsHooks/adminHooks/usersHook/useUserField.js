import { useState, useRef } from "react"
import { useGetStore } from "../../../../redux/reduxHooks/useGetStore"
import {  useUserInfoActions, useAdminStateActions } from "../../../../redux/reduxHooks/useBindeActions"
import { useToggleMenu } from "../../menuHooks/menuHooks"
import AdminService from "../../../../services/adminSevice"

import { initialDataForEditor } from "../../../stockData/stockDataForAdmin/stockDataForAdmin"
// import { useButtonHook } from "../../formHooks/useButtonHook"

export const useUserField = ({ users }) => {
	
	const { user } = useGetStore( "userInfo")
	const [ changeUser, setChangeUser ] = useState( false )
	const [ createUser, setCreateUser ] = useState( false )
	const { tab, tabs, handleClickToTab } = useToggleMenu( ["Имя и роли", "Курсы", "Инфо"], "Имя и роли" ) // "Инфо", "Курсы"
	
	const initialDataForUserEditor_ = useRef( initialDataForEditor )
	
	const { 
		resetUserDataAction,
		getUserDataAsyncAction: getUserData,
	} = useUserInfoActions()
	const { setAdminError } = useAdminStateActions()
	
	const handleClickCloseUserInfo = (e) => {
		e.preventDefault();
		resetUserDataAction()
	}

	const handleClickChangeUser = (e) => {
		e.preventDefault();
		setChangeUser( true )
	}

	const handleClickCreateUser = (e) => {
		e.preventDefault();
		if ( changeUser ) return;
		setCreateUser(true)
		setChangeUser( true )
	}

	const setChangerFalse = () => {
		setCreateUser( false )
		setChangeUser( false )
	}

	const handleClickToList = async (e) => {
		const target = e.target
			if (!target) return;
		
		const node = target.closest('ul.mainListsField__supLists li.mainListsField__supListItem[data-id]')
			if (!node) return;

		const userId = node.dataset.id;
		const nextUser = users.find( it => +it.id === +userId)

		if( user && ( user.id === +userId ) ) return 
		
		const path = `/user/getDescription?id=${ userId }`
	
		try {	
			const res = await AdminService.getDescription( path )
			const html = JSON.parse( res.data )
			initialDataForUserEditor_.current = html.description
	
			if (changeUser) {
				setChangeUser( false )
			}
			if (createUser) {
				setCreateUser( false )
			}
			
			getUserData(nextUser)
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
		initialDataForUserEditor_,

		tab, tabs, handleClickToTab,

		user,
		changeUser,			createUser,

		setChangerFalse,

		handleClickToList,

		handleClickCreateUser,
		handleClickChangeUser,
		handleClickCloseUserInfo,
	}
}