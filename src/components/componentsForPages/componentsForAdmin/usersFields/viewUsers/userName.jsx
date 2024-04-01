import { translator } from "../../../../stockData/stockDataForAdmin/stockDataForAdmin";
import { Div, Span } from "../../../../componentsForStructure/componentsContainer/containerComponents";

export const UserName = ({ user }) => (
	<Div className = "mainUserContainer__dataContainer" >
		{
			Object.entries(user)
				.filter(([prop]) => prop !== "id" )
				.map(([prop, value]) =>  (
						<Div
							key = { prop }
							className="mainUserContainer__dataItem"
						>
							<Span
								title={`${ translator[prop]}: `}
								className="mainUserContainer__dataProp"
							/>
							<Span
								title = { value }
								className="mainUserContainer__dataValue"
							/>
						</Div>
				)) 
		}
	</Div>
)