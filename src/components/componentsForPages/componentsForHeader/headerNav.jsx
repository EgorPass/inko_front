import { useNavigate } from "react-router-dom"
import { useGetStore } from "../../../redux/reduxHooks/useGetStore";
import { useUserLogout, useUserState } from "../../../redux/reduxHooks/useBindeActions";

import { UnOrderListComponent, ListItemComponet } from "../../componentsForStructure/componentsForOrders/listComponents";

import { LinkAsButton } from "../../componentsForStructure/componentsForNav/links";

export const HeaderNav = () => {
	const user = useGetStore("user")
	const navigate = useNavigate()
	const userLogout = useUserLogout();
	const { resetUserAction } = useUserState()

	console.log( navigate.push )

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			
			navigate("/auth/login", { replace: true, state: { from: "/", user: null } })
			
			await userLogout()
			resetUserAction();
		}
		catch (e) {
			console.log( e )
		}
	}


	return (
		<nav
			className="adminHeader__headerNav"
		>
			<UnOrderListComponent
				className="adminHeader__headerNavLists"
			>
				{
					user.userRoles.length > 2 && (
					<ListItemComponet
						className="adminHeader__headerNavListsItem"
					>
							
							
						<LinkAsButton
							to = "/"
							className = "adminHeader__headerNavLink adminHeader__headerNavLink_home"
							target = "_self"
							>
								{ "Домой"}
							</LinkAsButton>
					</ListItemComponet>
				)		
				}
				{
					(user.userRoles.includes(1111111) || user.userRoles.includes(1001111) ) && (

						<ListItemComponet
						className="adminHeader__headerNavListsItem"
						>
							<LinkAsButton
								to = "/admin"
								className = "adminHeader__headerNavLink adminHeader__headerNavLink_admin"
								target = "_self"
								>
								{"Админ"}
							</LinkAsButton>
						</ListItemComponet>
					)
				}
				<ListItemComponet
					className="adminHeader__headerNavListsItem"
				>
					<LinkAsButton
						to = "/auth/login"
						className="adminHeader__headerNavLink adminHeader__headerNavLink_exit"
						handleClick = { handleLogout }
						state = { { from: "/", user: null}}
					>
						{"Выйти"}
					</LinkAsButton>
				</ListItemComponet>
			</UnOrderListComponent>

		</nav>

	)
}
