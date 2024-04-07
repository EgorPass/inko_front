import { translator } from "../../stockData/stockDataForAdmin/stockDataForAdmin";

import { Span, Div } from "../componentsContainer/containerComponents";
import { InputComponent } from "../componentsForForm/inputComponent/InputComponent"

export const NameDataItem = ({ value, handleChange, name, title, blockName = "mainDataField", disabled }) => (
	<Div
		className = {`${blockName}__dataItem`}
	>
		<Span
			title = { title }
			className = {`${blockName}__dataProp`}
		/>
		 <InputComponent
			title = { title }
			classNameField = {`${blockName}__dataValue`}
			name = { name }
			value = { value }
			handleChange = { handleChange }
			placeholder = { title }
			classNameInput = { `${blockName}__dataValueInput`}
			disabled = { disabled }
		/> 
	</Div>
)

export const NameData = ({ state, handleChange, blockName, disabled }) => (
	<Div
		className = {`${blockName}__dataContainer`}
	>
		{
			!state.id && (
				<NameDataItem
					title = { translator[ "email" ] }
					name = "email"
					value = { state.email }
					handleChange = { handleChange }
					blockName = { blockName }
					disabled = { disabled }
				/>
			)
		}
		{
			Object.entries(state).map(([prop, value]) => {
				if (prop === "id" || prop === "email") return null
				else return (
						<NameDataItem
							key = { prop }
							name = { prop}
							value = { value }
							title = { translator[ prop ] }
							handleChange = { handleChange }
							blockName = { blockName }
							disabled = { disabled }
						/>
				)
			})
		}
	</Div>
)