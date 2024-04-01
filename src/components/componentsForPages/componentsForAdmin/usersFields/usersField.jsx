import { useUserField } from "../../../componentsHooks/adminHooks/usersHook/useUserField"
import { SimpleFieldContext } from "../../../../context/admin/coursesFieldContext/coursesFieldContext";

import { Div } from "../../../componentsForStructure/componentsContainer/containerComponents";
import { SimpleButton } from "../../../componentsForStructure/componentsForForm/componentForForm";
import { InfoFieldContainer } from "../../../componentsForStructure/componentsContainer/infoFieldContainer";
import { UsersLists } from "./viewUsers/usersLists";
import { EmptyMainDataFieldContainer } from "../../emptyField/emptyFields"; 

import UserInfo from "./viewUsers/userInfo";
import CreateUserForm from "./createChangeUser/createUserForm";

const UsersField = ({  users = [], children }) => {
	const fieldHook = useUserField({ users })
	const {
		 handleClickCreateUser, changeUser, createUser, user,
	} = fieldHook
	
	return (
		<SimpleFieldContext
			data = { fieldHook }
		>
			<Div
				className = "adminPage__mainListsFieldContainer mainListsFieldContainer"
			>
				{ children }
				<InfoFieldContainer
					head="Список преподавателей"
					classNameForDiv="mainListsFieldContainer__mainListsField mainListsField"
					classNameForHead="mainListsField__head"
				>	
					{
						users && (
							<Div
								className = "mainListsField__scrollBox"
							>
								<UsersLists
									user = { user }
									users = { users }
								/>
							</Div>
						)
					}
				</InfoFieldContainer>
				<Div
					className = "mainListsFieldContainer__buttonContainer"
				>
					<SimpleButton
						title = "Создать Преподавателя"
						className = "adminPage__button adminPage__button_createUser"
						handleClick = {	handleClickCreateUser		}
						disabled = { changeUser }
					/>
				</Div>
			</Div>
			
				{
					!user &&
					!changeUser &&
					(
							<EmptyMainDataFieldContainer />
					)
				}

				{
					changeUser && (
					<CreateUserForm />
					)
				}
				{
					( !changeUser && !createUser ) && user && (
						<UserInfo />
					)
				}

		</SimpleFieldContext>
	)
}

export default UsersField