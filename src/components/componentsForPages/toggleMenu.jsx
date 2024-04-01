import { Span  } from "../componentsForStructure/componentsContainer/containerComponents";

export const ToggleMenu = ({ state = [], className = "", handleClick, isActive = "" }) => {

	
	return (
		state.map(it => (
			<Span
				key = { it }
				title = { it }
				dataId = { it }
				className={
					`${className} 
					${ className }${ isActive === it ? "_active" : "_passive" }
					`
				}
				handleClick = { handleClick }
			/>	
		))
	)
}