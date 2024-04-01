import { Div } from "../../componentsForStructure/componentsContainer/containerComponents"
import { EmptyHeaderForAdminFields } from "../emptyField/emptyFields"
import { InfoFieldContainer } from "../../componentsForStructure/componentsContainer/infoFieldContainer"
import { SimpleButton } from "../../componentsForStructure/componentsForForm/componentForForm"

const UserInfoForHomeField = ({initialDataForUserEditor_,  handleClickCloseUserInfo}) => {

	return (
			<Div
				className = "adminPage__mainUserContainer mainUserContainer"
			>
				<EmptyHeaderForAdminFields
					blockName = "mainCourseContainer"
				/>
				<Div
					className = "mainUserContainer__mainContainer"
				>
					<InfoFieldContainer
						head = "Информация для преподавателя"
						classNameForDiv = {`mainUserContainer__userDescriptionContainer`}
						classNameForHead = "mainUserContainer__head userDescription__head"
					>
						<Div
							className = "mainUserContainer__borderContainer"
						>
							<Div className = "mainUserContainer__scrollContainer">
								<p
									onClick={ (e) => { e.preventDefault()}}
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
					title = "Закрыть"
					className = "adminPage__button adminPage__button_close"
					handleClick = { handleClickCloseUserInfo }
					/>
			</Div>
		</Div>

	)
}

export default UserInfoForHomeField