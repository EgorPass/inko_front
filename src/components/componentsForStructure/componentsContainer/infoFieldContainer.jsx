import { Div } from "./containerComponents"
export const InfoFieldContainer = ({ children, classNameForDiv = '', classNameForHead = '', head, }) => (
	<Div
		className= {classNameForDiv}
	>
		<h4
			className= { classNameForHead}
		>
			{ head }
		</h4>

		{ children }

	</Div>
)