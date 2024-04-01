import { useGetStore } from "../../../../../redux/reduxHooks/useGetStore";
import { useSimpleFieldContext } from "../../../../../context/admin/coursesFieldContext/coursesFieldContext";

import { Div } from "../../../../componentsForStructure/componentsContainer/containerComponents";
import { SimpleButton } from "../../../../componentsForStructure/componentsForForm/componentForForm";

import { InfoFieldContainer } from "../../../../componentsForStructure/componentsContainer/infoFieldContainer";

import { UserName } from "./userName";
import { UserRoles } from "./userRoles";
import { UserCourses } from "./userCourses";

import { ToggleMenu } from "../../../toggleMenu";

import '../../../../../styles/adminPage/mainUserContainer.scss'

const UserInfo = () => {
	
	const { subjects, courses } = useGetStore( "adminState" )	
	const { user, userCourses, userRoles } = useGetStore( "userInfo" )
	const {	handleClickChangeUser, handleClickCloseUserInfo, tab, tabs, handleClickToTab, initialDataForUserEditor_ } = useSimpleFieldContext()

	return (

		<Div
			className = "adminPage__mainUserContainer mainUserContainer"
		>

			<Div
				className = "mainUserContainer__tabContainer"
			>
				<ToggleMenu
					isActive = { tab }
					state = { tabs }
					className = { `mainUserContainer__tabItem` }
					handleClick = { handleClickToTab }
				/>
			</Div>

			<Div
				className = "mainUserContainer__mainContainer"
			>
				<InfoFieldContainer
					head="Преподователь"
					classNameForDiv = { `mainUserContainer__userInfoContainer mainUserContainer__userInfoContainer_${tab === "Имя и роли" ? "visible": "hidden"}`}
					classNameForHead = "mainUserContainer__head"
				>
					<Div
						className = "mainUserContainer__borderContainer"
					>	
						<Div
							className = 'mainUserContainer__scrollContainer'
						>
							<UserName
								user = { user }
							/>
							
							<InfoFieldContainer
								head="Роли преподователя"
								classNameForDiv = "mainUserContainer__userRoles"
								classNameForHead = "mainUserContainer__head"
								>
								<UserRoles
									userRoles = { userRoles }
								/>
							</InfoFieldContainer>
						</Div>
					</Div>
				</InfoFieldContainer>
		
				<InfoFieldContainer
					head= "Курсы преподователя"	
					classNameForDiv={`mainUserContainer__userCourseContainer mainUserContainer__userCourseContainer_${tab === "Курсы" ? "visible": "hidden"}`}
					classNameForHead = "mainUserContainer__head"
				>
					<Div
						className = "mainUserContainer__borderContainer"
					>	
						<Div
							className = 'mainUserContainer__scrollContainer'
						>
							<UserCourses
								courses = { courses }
								subjects = { subjects }
								userCourses = { userCourses }
							/>
						</Div>
					</Div>
				</InfoFieldContainer>
			
				<InfoFieldContainer
					head = "Информация для преподавателя"
					classNameForDiv = {`mainUserContainer__userDescriptionContainer mainUserContainer__userDescriptionContainer_${tab === "Инфо" ? "visible": "hidden"}`}
					classNameForHead = "mainUserContainer__head"
				>
					<Div
						className = "mainUserContainer__borderContainer"
					>
						<Div className = "mainUserContainer__scrollContainer">
							<p
								onKeyDown = { (e) => {e.preventDefault()}}
								className = "mainUserContainer__descriptionBody"
								dangerouslySetInnerHTML={{ __html: initialDataForUserEditor_.current}}
							></p>
						</Div>
					</Div>

				</InfoFieldContainer>
			
			</Div>

			<Div
				className = "mainUserContainer__buttonContainer"
			>
				<SimpleButton
					title = "Изменить"
					className = "adminPage__button adminPage__button_change"
					handleClick = { handleClickChangeUser }
				/>

				<SimpleButton
					title = "Закрыть"
					className = "adminPage__button adminPage__button_close"
					handleClick = { handleClickCloseUserInfo }
				/>
			</Div>
		</Div>
	)
}

export default UserInfo