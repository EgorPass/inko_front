import { useEffect,  } from "react";
import { useGetStore } from "../../redux/reduxHooks/useGetStore";

import { useCourseInfoAction, useSubjectInfoAction, useUserInfoActions, useGetDataForAdmin, useAdminStateActions, useUserAuth } from "../../redux/reduxHooks/useBindeActions";

import { ErrorContainer } from "../../components/componentsForStructure/componentsContainer/errorContainer";
import { LoaderContainer } from "../../components/componentsForStructure/componentsContainer/loaderContainer";
import { AdminField } from "../../components/componentsForPages/componentsForAdmin/adminField";


const AdminPage = () => {
	// console.log("render Admin Page............")

	const user = useGetStore("user")
	const { users, courses, subjects, error: adminError, loading: adminLoading } = useGetStore("adminState");
	const { loading: courseLoading } = useGetStore("courseInfo")
	const { loading: subjectLoading } = useGetStore("subjectInfo")
	const { loading: userLoading } = useGetStore( "userInfo")
	const getDataForAdminAction = useGetDataForAdmin()
	
	const { resetCourseInfo } = useCourseInfoAction()
	const { resetSubjectInfo } = useSubjectInfoAction()
	const { resetUserDataAction } = useUserInfoActions()
	const { resetAdminState, resetAdminError } = useAdminStateActions()
	
	const setAuth = useUserAuth();

	const handleClickResetErrors = ( e ) => {
		e.preventDefault()
		resetAdminError();
	} 

	useEffect(() => {		
		getDataForAdminAction()
		return () => {
			 	resetCourseInfo()
				resetSubjectInfo()
				resetUserDataAction()
				resetAdminState();
		}
	}, [])

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
				(	
					userLoading ||
					adminLoading ||
					courseLoading ||
					subjectLoading) && (
						< LoaderContainer /> 
					)
			}
			{
				( adminError ) && (
					<ErrorContainer 
						message = { adminError  }
						handleClickCloseModal = { handleClickResetErrors }
					/>
				)
			}
			<AdminField
				user = { user }
				users = { users }
				courses = { courses }
				subjects = { subjects }
				adminError = { adminError }
			/>
		</main>
	)
}

export default AdminPage