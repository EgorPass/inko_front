import { Div } from "../../componentsForStructure/componentsContainer/containerComponents";

export const EmptyHeaderForAdminFields = ({ blockName = "mainEmptyDataFieldContainer" }) => {
	return (
		<Div
			className = { `${blockName}__emptyHeader` }
		></Div>
	
	)
}

export const EmptyMainDataFieldContainer = () => {

	return (
		<Div
		className={`adminPage__mainEmptyDataFieldContainer mainEmptyDataFieldContainer`}
		>
			<EmptyHeaderForAdminFields />
			<Div	className = "mainEmptyDataFieldContainer__mainContainer"></Div>
			<Div className = "mainEmptyDataFieldContainer__buttonContainer"></Div>
	</Div>
)
}

