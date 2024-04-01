import { useToggleMenu } from "../../componentsHooks/menuHooks/menuHooks"

import { Div } from "../../componentsForStructure/componentsContainer/containerComponents"
import { ToggleMenu } from "../../componentsForPages/toggleMenu"
import { rolesId } from "../../stockData/stockDataForAdmin/stockDataForAdmin"

import UsersField from "./usersFields/usersField"
import CoursesField from "./coursesField/coursesField"

import "../../../styles/adminPage/mainListsFieldContainer.scss"

export const AdminField = ({ user, users, courses, subjects ,  toggles }) => {
	// console.log( "render AdminField ............")

	const { tab, tabs, handleClickToTab } = useToggleMenu( user.userRoles.filter(it => it !== 1000001 && it !== 1000011).map(it => rolesId[it]) );

	// const { tab, tabs, handleClickToTab } = useToggleMenu(["users", "courses"] );

	return (
		<>
			{
				tab === "users" && (
					<UsersField
						users = { users }
						courses = { courses }
						subjects = { subjects }
						>
						<Div
							className = "mainListsFieldContainer__tabContainer"
						>
							<ToggleMenu
								isActive = { tab }
								state = { tabs }
								className = { `mainListsFieldContainer__tabItem` }
								handleClick = {  handleClickToTab }
								/>
						</Div>
				</UsersField>
				)						
			}

			{
				tab === "courses" && (
					<CoursesField
						courses = { courses }
						subjects = { subjects }
						>
						<Div
							className = "mainListsFieldContainer__tabContainer"
							>
							<ToggleMenu
								isActive = { tab }
								state = { tabs }
								className = { `mainListsFieldContainer__tabItem` }
								handleClick = { handleClickToTab }
							/>
						</Div>
					
				</CoursesField>
				)						
			}
		</>
	)
}