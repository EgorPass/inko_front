import { useGetStore } from "../../../redux/reduxHooks/useGetStore"
import { useState, useRef, useMemo } from "react"

import { useCourseInfoAction, useSubjectInfoAction } from "../../../redux/reduxHooks/useBindeActions"

import { initialDataForEditor } from "../../stockData/stockDataForAdmin/stockDataForAdmin"

import AdminService from "../../../services/adminSevice"

export const useHomeFieldHooks = ({
	courses,
	setLoading,
}) => {
	
	const user = useGetStore("user")
	const { course: courseInfo } = useGetStore("courseInfo")
	const { subject: subjectInfo } = useGetStore("subjectInfo")

	const [userDesc, setUserDesc] = useState(false)


	const { setCourseInfo, resetCourseInfo, } = useCourseInfoAction();
	const { setSubjectInfo, resetSubjectInfo,  } = useSubjectInfoAction();

	const prevSubjectInfo = useRef( null )
	const prevCourseInfo = useRef( null )
	const initialDataForUserEditor_ = useRef( initialDataForEditor )

	const classes = useMemo(() => ({
		supLists: "mainListsField__supLists",	
		supListItem: "mainListsField__supListItem",
		supListTitle: "mainListsField__supListTitle",
		subLists: "mainListsField__subLists",
		subListItem: "mainListsField__subListItem",
		subListTitle: "mainListsField__subListTitle",
	}), [])
	
	const filter = ( { id } ) => {
		const res = courses.filter((it) => it.subjectId === id)
		if (res.length > 0) return true;
			return false
	}

		const handleClickGetUserInfo = async (e) => {
		e.preventDefault();
		setLoading(true)
		
		const path = `/user/getDescription?id=${ user.id }`
		try {	
			const res = await AdminService.getDescription( path )
			const html = JSON.parse( res.data )
			
			initialDataForUserEditor_.current = html.description
		}
		catch (e) {
			initialDataForUserEditor_.current = initialDataForEditor
			console.log (e)
		}
		prevCourseInfo.current = courseInfo
		prevSubjectInfo.current = subjectInfo
		
		setLoading(false)
		resetCourseInfo()
		resetSubjectInfo()
		setUserDesc(true)
	}

	const handleClickCloseUserInfo = (e) => {
		e.preventDefault();
		setUserDesc( false )
		setCourseInfo( prevCourseInfo.current )
		setSubjectInfo( prevSubjectInfo.current )
	}

	return {
		classes, filter, userDesc,
		initialDataForUserEditor_,

		handleClickGetUserInfo, handleClickCloseUserInfo

	}
}