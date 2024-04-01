import { useState, useRef, useMemo, useCallback } from "react"
import { useGetStore } from "../../../../redux/reduxHooks/useGetStore"
import { useCourseInfoAction, useSubjectInfoAction, useAdminStateActions } from "../../../../redux/reduxHooks/useBindeActions"
// import { useButtonHook } from "../../formHooks/useButtonHook"

import { initialDataForEditor } from "../../../stockData/stockDataForAdmin/stockDataForAdmin"

import AdminService from "../../../../services/adminSevice"


export const useCoursesFieldHook = ({ courses, subjects }) => {

	
	const { course: courseInfo } = useGetStore("courseInfo")
	const { subject: subjectInfo } = useGetStore("subjectInfo")
	
	const { setCourseInfo, resetCourseInfo, setCourseLoading } = useCourseInfoAction();
	const { setSubjectInfo, resetSubjectInfo, setSubjectLoading  } = useSubjectInfoAction();
	const { setAdminError } = useAdminStateActions()
	const [ changeCourse, setChangeCourse ] = useState( false )
	const [ createCourse, setCreateCourse ] = useState( false )
	
	const [ changeSubject, setChangeSubject ] = useState( false )
	const [ createSubject, setCreateSubject ] = useState( false )
	
	const prevSubject = useRef(null)
	
	const initialDataForCourseEditor_ = useRef(initialDataForEditor)
	const initialDataForSubjectEditor_ = useRef(initialDataForEditor)

	// const { wrapperClick } = useButtonHook( setSubjectLoading )

	const closeCourseChange = () => {
		setCreateCourse( false )
		setChangeCourse( false )
	}

	const closeSubjectChange = () => {
		setChangeSubject( false );
		setCreateSubject( false );
	}

	const openSbjectChange = () => {
		setChangeSubject( true );
		setCreateSubject( true );
	}

	const getDescription = async (path, field ) => {
		setSubjectLoading( true )
			// const path = `/course/getDescription?type=${field}&id=${id}`
		try {
			
			const res = await AdminService.getDescription(path) //, field, id )
			
			if (res.data) {
				const html = JSON.parse( res.data )
				
				switch (field) {
					case "subject": initialDataForSubjectEditor_.current = html.description
					break;
					case "course": initialDataForCourseEditor_.current = html.description
					break;
					
					default: return false
				}
			}
		} catch (e) {
			console.log( e )
			setAdminError( e.response.status )
		}
		setSubjectLoading( false )
	}

	const handleClickSup = async (e) => {
		const target = e.target
			if (!target) return;

		const node = target.closest('ul.mainListsField__supLists li.mainListsField__supListItem[data-id]')
			if (!node) return;
	
			const id = node.dataset.id		
		
		if( subjectInfo && ( subjectInfo.id === +id ) ) return 
		
			await getDescription(`/course/getDescription?type=subject&id=${id}`, "subject", )
					
		const subject = subjects.find(it => it.id === +id)
		
		if( changeCourse ) {
			closeCourseChange(  )
		}
		if( changeSubject ) {
			closeSubjectChange( )
		}
		if( subjectInfo && subjectInfo.id === +id ) return 

		resetCourseInfo( )
		setSubjectInfo( subject )
		// console.log( "click at subject ")
	}

	const handleClickSub = async (e) => {
		const target = e.target
			if (!target) return;
		
		const node = target.closest('ul.mainListsField__subLists li.mainListsField__subListItem[data-id], ul.mainCourseContainer__subLists li.mainCourseContainer__subListItem[data-id]')
		if (!node) return;
		
		const id = node.dataset.id
		
		if( courseInfo && ( +id === courseInfo.id ) ) return 

		prevSubject.current = subjectInfo
		
		await getDescription(`/course/getDescription?type=course&id=${id}`, "course" )

		const course = courses.find( it => it.id === +id )
		
		if( changeCourse ) {
			closeCourseChange( )
		}
		if( changeSubject ) {
			closeSubjectChange( )
		}
		if( courseInfo && courseInfo.id === +id) return 

		resetSubjectInfo()
		setCourseInfo(course)	
	}


	const handleClickCreateCourse = (e) => {
		e.preventDefault();
		if( changeCourse ) return
		setCreateCourse( true )
		setChangeCourse( true )
		resetSubjectInfo();
	}

	const handleClickCreateSubject = (e) => {
		e.preventDefault();
		if (changeSubject) return;
		openSbjectChange()
	}

	const handleClickCloseCourseInfo = (e) => {
		e.preventDefault();
		resetCourseInfo( )
		if (prevSubject.current && ( prevSubject.current.id === courseInfo.subjectId)) {
			setSubjectInfo( prevSubject.current )
		}
	}

	const handleClickChangeCourse = (e) => {
		e.preventDefault();
		setChangeCourse( true )
	}

	const handleClickCloseSubjectInfo = (e) => {
		e.preventDefault();
		resetSubjectInfo( )
		prevSubject.current = null 
	}

	const handleClickChangeSubject = (e) => {
		e.preventDefault();
		setChangeSubject( true )
	}


	const classes = useMemo( ()=>( {
		supLists: "mainListsField__supLists",	
		supListItem: "mainListsField__supListItem",
		supListTitle: "mainListsField__supListTitle",
		subLists: "mainListsField__subLists",
		subListItem: "mainListsField__subListItem",
		subListTitle: "mainListsField__subListTitle",
	} ) , [ ] )

	const filter = useCallback(() => (
		({ id }) => {
			return true 
		}
	), [])
	// console.log( courseInfo )

	return {
		// wrapperClick,

		classes, filter,

		prevSubject, 
		
		openSbjectChange,

		handleClickSup,		handleClickSub,
		courseInfo, 			handleClickCloseCourseInfo,
		changeCourse,			closeCourseChange,			handleClickChangeCourse,
		createCourse,			handleClickCreateCourse,
		initialDataForCourseEditor_,
			
		subjectInfo,			handleClickCloseSubjectInfo,
		changeSubject,		closeSubjectChange,				handleClickChangeSubject,
		createSubject,		handleClickCreateSubject,
		initialDataForSubjectEditor_,
	}
}