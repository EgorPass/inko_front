import { lazy, Suspense } from "react"
import { Route, Routes, BrowserRouter } from "react-router-dom"

import { LoaderContainer } from "../components/componentsForStructure/componentsContainer/loaderContainer"
import "../styles/adminLayout.scss"

const LoginLayout = lazy( () => import( "../layouts/loginLayout" ) )
const AdminLayout = lazy( () => import( "../layouts/adminLayout" ) )

const HomePage = lazy( () => import ( "../pages/home/homePage" ) )
const AdminPage = lazy( () => import ( "../pages/admin/adminPage" ) )
const PdfPage = lazy( () => import ( "../pages/pdf/PdfViewPage" ) )
const ErrorPage = lazy( () => import ( "../pages/error/errorPage" ) )

const LoginPage = lazy( () => import ( "../pages/auth/loginPage" ) )
const PasswordPage = lazy( () => import ( "../pages/auth/passwordPage" ) )

export const AppRoutes = () => {
	console.log( "App Routes")

	return (
		<BrowserRouter>
			<Suspense
				fallback = { <LoaderContainer />}
			>
				<Routes >

						<Route path="/" element={	
							<AdminLayout />																		
																		}>
							
							<Route index element={
																				<HomePage />
																			} />
							<Route path="/home" element={
								<HomePage />
																					} />
							
							<Route path = "/admin" element={
																								<AdminPage />
																							} />
							<Route path="/view/pdf" element={
																							<PdfPage />
																					} />
						
							<Route path="/errorPage" element={
																								<ErrorPage/>
																							} />
							<Route path = "/*" element={
								<ErrorPage/>
							} />
						</Route>
					

						<Route path = "/auth" element = { <LoginLayout /> }>
							<Route path = "login" element = { <LoginPage /> } />	
							<Route path = "setPass" element = { <PasswordPage /> } />	
						</Route>

				</Routes>
			</Suspense>
		</BrowserRouter>

	)
}