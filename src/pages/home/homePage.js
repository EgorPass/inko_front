import { useGetStore } from "../../redux/reduxHooks/useGetStore"
import { useEffect, useState  } from "react"
import UserService from "../../services/homeService"
import {  useUserState, useCourseInfoAction, useSubjectInfoAction, useUserAuth  } from "../../redux/reduxHooks/useBindeActions"

import { LoaderContainer } from "../../components/componentsForStructure/componentsContainer/loaderContainer"
import { HomeField } from "../../components/componentsForPages/componentsForHome/homeField"
import { ErrorContainer } from "../../components/componentsForStructure/componentsContainer/errorContainer"


const HomePage = () => {
	// console.log( "render HomePage page..............")
	
	const { id, userCourses, loading: userLoading, error  } = useGetStore('user')
	const { loading: courseLoading } = useGetStore("courseInfo")
	const { loading: subjectLoading } = useGetStore("subjectInfo")
	const { error: adminError } = useGetStore( "adminState")

	const [ courses, setCourses ] = useState( [ ] )
	const [ subjects, setSubjects ] = useState( [ ] )
	const [ loading, setLoading ] = useState( !id ? true : false  )

	const setAuth = useUserAuth();
	const { resetCourseInfo } = useCourseInfoAction()
	const { resetSubjectInfo } = useSubjectInfoAction()

	const {
		resetUserErrorAction
	} = useUserState();
	
	const handleClickResetErrors = (e) => {
		e.preventDefault();
		resetUserErrorAction()
	}

	const getUserCourses = async ( userCourses ) => {
		try { 
			const res = await UserService.getCoursesForUser( userCourses )
				setCourses(res.data.courses)
				setSubjects( res.data.subjects )
				setLoading( false )
		}
		catch (e) {
			if (e.response.status === 401) {
				setAuth( "logout")
			}
			setCourses( [ ] )
			setSubjects( [ ] )
		}
	}

	useEffect(() => {
			getUserCourses(  userCourses )
			return () => {
				resetCourseInfo()
				resetSubjectInfo()
			}
	}
		, [ ]
	)


		useEffect(() => {
		if (adminError && adminError === 401) {
				setAuth( "logout")
		}
	}
		, [ adminError ]
	)

	return (

		<main
			className="pegasBody__adminPage adminPage"
		>
			{
				( loading || userLoading || courseLoading || subjectLoading )  && <LoaderContainer />
			}
			{
				error && (
					<ErrorContainer 
						message = {  error }
						handleClickCloseModal = { handleClickResetErrors }
					/>
				)
			}

			<HomeField
				courses = { courses }
				subjects = { subjects }
				setLoading = { setLoading }
			/>

		</main>
	)
}

export default HomePage