import { HeaderNav } from "./headerNav"

import { Div, Span } from "../../componentsForStructure/componentsContainer/containerComponents"

const HeaderField = () => {


	return (
		<header
				className = "pegasBody__adminHeader adminHeader"
		>
			<Div
				className = "adminHeader__container"
			>

				<Div
					className = "adminHeader__logo"
					>
					<Span
						title = "ИНКО"
						className = "adminHeader__title"
					/>
					
				</Div>
				<HeaderNav />

			</Div>

		</header>
	)
}

export default HeaderField